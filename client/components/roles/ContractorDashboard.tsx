import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useAuth } from "@/contexts/AuthContext";
import { User, Task, TaskStatus, STATUS_COLORS } from "@/types";
import apiService from "@/services/api";
import { keyframes } from "@emotion/react";
import MediaUpload from "@/components/MediaUpload";
import MediaGallery, { MediaItem } from "@/components/MediaGallery";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

// Styled Components
const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: hsl(222 84% 4.9%);
  margin-bottom: 0.5rem;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const Subtitle = styled.p`
  color: hsl(215 16% 47%);
  font-size: 1.125rem;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div<{ urgent?: boolean }>`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${slideIn} 0.6s ease-out;
  animation-fill-mode: both;
  position: relative;

  ${(props) =>
    props.urgent &&
    `
    border-color: hsl(0 84% 60%);
    animation: ${pulse} 2s infinite;
  `}

  .dark & {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(51, 65, 85, 0.3);
  }
`;

const StatValue = styled.div<{ color?: string }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.color || "hsl(217 91% 60%)"};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: hsl(215 16% 47%);
  font-size: 0.875rem;
  font-weight: 500;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.active
      ? `
    background: hsl(217 91% 60%);
    color: white;
  `
      : `
    background: hsl(210 40% 96%);
    color: hsl(215 16% 47%);
    
    &:hover {
      background: hsl(210 40% 90%);
    }
    
    .dark & {
      background: hsl(217 32% 17%);
      color: hsl(215 20% 65%);
      
      &:hover {
        background: hsl(217 32% 20%);
      }
    }
  `}
`;

const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
`;

const TaskCard = styled.div<{ priority: string; isOverdue?: boolean }>`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;

  ${(props) =>
    props.isOverdue &&
    `
    border-left: 4px solid hsl(0 84% 60%);
    animation: ${pulse} 2s infinite;
  `}

  ${(props) =>
    props.priority === "URGENT" &&
    `
    border-left: 4px solid hsl(0 84% 60%);
  `}

  ${(props) =>
    props.priority === "HIGH" &&
    `
    border-left: 4px solid hsl(25 95% 53%);
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(51, 65, 85, 0.3);
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
`;

const TaskTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: hsl(222 84% 4.9%);
  margin: 0;
  flex: 1;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const TaskMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.75rem;
`;

const StatusBadge = styled.span<{ status: TaskStatus }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  background: ${(props) =>
    STATUS_COLORS[props.status] || STATUS_COLORS.ASSIGNED};
  white-space: nowrap;
`;

const PriorityBadge = styled.span<{ priority: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  background: ${(props) =>
    STATUS_COLORS[props.priority as keyof typeof STATUS_COLORS] ||
    STATUS_COLORS.LOW};
  white-space: nowrap;
`;

const TaskInfo = styled.div`
  color: hsl(215 16% 47%);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.5;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const ProgressSection = styled.div`
  margin-bottom: 1rem;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(222 84% 4.9%);

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: hsl(210 40% 96%);
  border-radius: 4px;
  overflow: hidden;

  .dark & {
    background: hsl(217 32% 17%);
  }
`;

const ProgressFill = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background: linear-gradient(to right, hsl(217 91% 60%), hsl(142 76% 36%));
  transition: width 0.3s ease;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Button = styled.button<{
  variant?: "primary" | "secondary" | "danger" | "success";
}>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 100px;

  ${(props) =>
    props.variant === "primary" &&
    `
    background: hsl(217 91% 60%);
    color: white;
    
    &:hover {
      background: hsl(217 91% 55%);
    }
  `}

  ${(props) =>
    props.variant === "success" &&
    `
    background: hsl(142 76% 36%);
    color: white;
    
    &:hover {
      background: hsl(142 76% 31%);
    }
  `}

  ${(props) =>
    props.variant === "secondary" &&
    `
    background: hsl(210 40% 96%);
    color: hsl(215 16% 47%);
    
    &:hover {
      background: hsl(210 40% 90%);
    }
    
    .dark & {
      background: hsl(217 32% 17%);
      color: hsl(215 20% 65%);
      
      &:hover {
        background: hsl(217 32% 20%);
      }
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;

  .dark & {
    background: hsl(222 84% 4.9%);
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: hsl(222 84% 4.9%);
  margin-bottom: 1.5rem;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: hsl(222 84% 4.9%);
  font-size: 0.875rem;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid hsl(214 31% 91%);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: hsl(217 91% 60%);
  }

  .dark & {
    background: hsl(217 32% 17%);
    border-color: hsl(217 32% 20%);
    color: hsl(210 40% 98%);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid hsl(214 31% 91%);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: hsl(217 91% 60%);
  }

  .dark & {
    background: hsl(217 32% 17%);
    border-color: hsl(217 32% 20%);
    color: hsl(210 40% 98%);
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: hsl(215 16% 47%);

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

interface ContractorDashboardProps {
  user: User;
}

export default function ContractorDashboard({
  user,
}: ContractorDashboardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Form states
  const [progressValue, setProgressValue] = useState(0);
  const [progressNotes, setProgressNotes] = useState("");
  const [completionNotes, setCompletionNotes] = useState("");

  // Media upload states
  const [uploadedMediaUrls, setUploadedMediaUrls] = useState<string[]>([]);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Task media (existing images/videos from task updates)
  const [taskMedia, setTaskMedia] = useState<{ [taskId: number]: MediaItem[] }>({});

  const fetchTasks = async () => {
    try {
      const tasksData = await apiService.getMyTasks();
      setTasks(tasksData);
      setFilteredTasks(tasksData);

      // Fetch media for each task
      await fetchTasksMedia(tasksData);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const fetchTasksMedia = async (tasks: Task[]) => {
    try {
      const mediaPromises = tasks.map(async (task) => {
        try {
          const updates = await apiService.getTaskUpdates(task.id);
          const media: MediaItem[] = [];

          updates.forEach((update) => {
            if (update.imageUrls && update.imageUrls.length > 0) {
              update.imageUrls.forEach((url, index) => {
                const isVideo = url.includes('.mp4') || url.includes('.mov') || url.includes('.avi') || url.includes('.webm');
                media.push({
                  id: `${update.id}-${index}`,
                  url,
                  type: isVideo ? "video" : "image",
                  caption: update.message,
                  uploadedAt: update.createdAt,
                  uploadedBy: `${update.createdBy.firstName} ${update.createdBy.lastName}`,
                });
              });
            }
          });

          return { taskId: task.id, media };
        } catch (error) {
          console.error(`Failed to fetch media for task ${task.id}:`, error);
          return { taskId: task.id, media: [] };
        }
      });

      const results = await Promise.all(mediaPromises);
      const mediaMap: { [taskId: number]: MediaItem[] } = {};
      results.forEach(({ taskId, media }) => {
        mediaMap[taskId] = media;
      });

      setTaskMedia(mediaMap);
    } catch (error) {
      console.error("Failed to fetch tasks media:", error);
    }
  };

  const handleMediaUploadComplete = (urls: string[]) => {
    setUploadedMediaUrls((prev) => [...prev, ...urls]);
    setUploadError(null);
  };

  const handleMediaUploadError = (error: string) => {
    setUploadError(error);
  };

  const clearUploadedMedia = () => {
    setUploadedMediaUrls([]);
    setUploadError(null);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchTasks();
      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      switch (activeFilter) {
        case "assigned":
          return task.status === "ASSIGNED";
        case "in_progress":
          return task.status === "IN_PROGRESS";
        case "completed":
          return task.status === "COMPLETED" || task.status === "APPROVED";
        case "rejected":
          return task.status === "REJECTED";
        case "overdue":
          return isTaskOverdue(task);
        default:
          return true;
      }
    });
    setFilteredTasks(filtered);
  }, [tasks, activeFilter]);

  const isTaskOverdue = (task: Task): boolean => {
    const today = new Date();
    const deadline = new Date(task.deadline);
    return (
      deadline < today &&
      task.status !== "COMPLETED" &&
      task.status !== "APPROVED"
    );
  };

  const handleUpdateProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask) return;

    try {
      // Update progress first
      await apiService.updateTaskProgress(
        selectedTask.id,
        progressValue,
        progressNotes,
      );

      // Add media if uploaded
      if (uploadedMediaUrls.length > 0) {
        await apiService.addTaskUpdate(
          selectedTask.id,
          progressNotes || `Progress update: ${progressValue}%`,
          "PROGRESS_UPDATE",
          uploadedMediaUrls
        );
      }

      setShowProgressModal(false);
      setSelectedTask(null);
      setProgressValue(0);
      setProgressNotes("");
      clearUploadedMedia();
      await fetchTasks();
    } catch (error) {
      console.error("Failed to update progress:", error);
      alert("Failed to update progress. Please try again.");
    }
  };

  const handleMarkCompleted = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask) return;

    try {
      // Mark task as completed first
      await apiService.markTaskAsCompleted(selectedTask.id, completionNotes);

      // Add completion media if uploaded
      if (uploadedMediaUrls.length > 0) {
        await apiService.addTaskUpdate(
          selectedTask.id,
          completionNotes || "Task completed with media",
          "COMPLETION",
          uploadedMediaUrls
        );
      }

      setShowCompleteModal(false);
      setSelectedTask(null);
      setCompletionNotes("");
      clearUploadedMedia();
      await fetchTasks();
    } catch (error) {
      console.error("Failed to mark task as completed:", error);
      alert("Failed to mark task as completed. Please try again.");
    }
  };

  const openProgressModal = (task: Task) => {
    setSelectedTask(task);
    setProgressValue(task.progressPercentage);
    clearUploadedMedia();
    setShowProgressModal(true);
  };

  const openCompleteModal = (task: Task) => {
    setSelectedTask(task);
    clearUploadedMedia();
    setShowCompleteModal(true);
  };

  const closeProgressModal = () => {
    setShowProgressModal(false);
    setSelectedTask(null);
    setProgressValue(0);
    setProgressNotes("");
    clearUploadedMedia();
  };

  const closeCompleteModal = () => {
    setShowCompleteModal(false);
    setSelectedTask(null);
    setCompletionNotes("");
    clearUploadedMedia();
  };

  const stats = {
    total: tasks.length,
    assigned: tasks.filter((t) => t.status === "ASSIGNED").length,
    inProgress: tasks.filter((t) => t.status === "IN_PROGRESS").length,
    completed: tasks.filter(
      (t) => t.status === "COMPLETED" || t.status === "APPROVED",
    ).length,
    overdue: tasks.filter(isTaskOverdue).length,
  };

  if (isLoading) {
    return (
      <DashboardContainer>
        <div>Loading...</div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>Contractor Dashboard</Title>
        <Subtitle>Manage your assigned tasks and track progress</Subtitle>
      </Header>

      <StatsGrid>
        <StatCard style={{ animationDelay: "0.1s" }}>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Total Tasks</StatLabel>
        </StatCard>
        <StatCard style={{ animationDelay: "0.2s" }}>
          <StatValue color={STATUS_COLORS.IN_PROGRESS}>
            {stats.inProgress}
          </StatValue>
          <StatLabel>In Progress</StatLabel>
        </StatCard>
        <StatCard style={{ animationDelay: "0.3s" }}>
          <StatValue color={STATUS_COLORS.APPROVED}>
            {stats.completed}
          </StatValue>
          <StatLabel>Completed</StatLabel>
        </StatCard>
        <StatCard urgent={stats.overdue > 0} style={{ animationDelay: "0.4s" }}>
          <StatValue color={STATUS_COLORS.REJECTED}>{stats.overdue}</StatValue>
          <StatLabel>Overdue Tasks</StatLabel>
        </StatCard>
      </StatsGrid>

      <FilterSection>
        <FilterButtons>
          <FilterButton
            active={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
          >
            All Tasks ({stats.total})
          </FilterButton>
          <FilterButton
            active={activeFilter === "assigned"}
            onClick={() => setActiveFilter("assigned")}
          >
            Assigned ({stats.assigned})
          </FilterButton>
          <FilterButton
            active={activeFilter === "in_progress"}
            onClick={() => setActiveFilter("in_progress")}
          >
            In Progress ({stats.inProgress})
          </FilterButton>
          <FilterButton
            active={activeFilter === "completed"}
            onClick={() => setActiveFilter("completed")}
          >
            Completed ({stats.completed})
          </FilterButton>
          {stats.overdue > 0 && (
            <FilterButton
              active={activeFilter === "overdue"}
              onClick={() => setActiveFilter("overdue")}
            >
              🚨 Overdue ({stats.overdue})
            </FilterButton>
          )}
        </FilterButtons>
      </FilterSection>

      {filteredTasks.length === 0 ? (
        <EmptyState>
          <h3>No tasks found</h3>
          <p>
            {activeFilter === "all"
              ? "You don't have any tasks assigned yet."
              : `No tasks match the ${activeFilter.replace("_", " ")} filter.`}
          </p>
        </EmptyState>
      ) : (
        <TasksGrid>
          {filteredTasks.map((task) => {
            const overdue = isTaskOverdue(task);
            const daysUntilDeadline = Math.ceil(
              (new Date(task.deadline).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24),
            );

            return (
              <TaskCard
                key={task.id}
                priority={task.priority}
                isOverdue={overdue}
              >
                <TaskHeader>
                  <TaskTitle>{task.name}</TaskTitle>
                  <TaskMeta>
                    <StatusBadge status={task.status}>
                      {task.status.replace("_", " ")}
                    </StatusBadge>
                    <PriorityBadge priority={task.priority}>
                      {task.priority}
                    </PriorityBadge>
                  </TaskMeta>
                </TaskHeader>

                <TaskInfo>
                  🏢 <strong>Building:</strong> {task.building.name}
                  <br />
                  📅 <strong>Deadline:</strong>{" "}
                  {new Date(task.deadline).toLocaleDateString()}
                  {overdue && (
                    <span style={{ color: STATUS_COLORS.REJECTED }}>
                      {" "}
                      (Overdue!)
                    </span>
                  )}
                  {!overdue &&
                    daysUntilDeadline <= 3 &&
                    daysUntilDeadline > 0 && (
                      <span style={{ color: STATUS_COLORS.HIGH }}>
                        {" "}
                        ({daysUntilDeadline} days left)
                      </span>
                    )}
                  <br />
                  🔧 <strong>Type:</strong> {task.type.replace("_", " ")}
                  <br />
                  {task.description && (
                    <>
                      📝 <strong>Description:</strong> {task.description}
                    </>
                  )}
                </TaskInfo>

                <ProgressSection>
                  <ProgressLabel>
                    <span>Progress</span>
                    <span>{task.progressPercentage}%</span>
                  </ProgressLabel>
                  <ProgressBar>
                    <ProgressFill percentage={task.progressPercentage} />
                  </ProgressBar>
                </ProgressSection>

                {/* Media Gallery for this task */}
                {taskMedia[task.id] && taskMedia[task.id].length > 0 && (
                  <div style={{ marginTop: "1rem" }}>
                    <MediaGallery
                      items={taskMedia[task.id]}
                      title="Progress Photos & Videos"
                      showDetails={false}
                      readOnly={true}
                      emptyMessage=""
                    />
                  </div>
                )}

                <TaskActions>
                  {task.status === "ASSIGNED" ||
                  task.status === "IN_PROGRESS" ? (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => openProgressModal(task)}
                      >
                        📸 Update Progress
                      </Button>
                      {task.progressPercentage >= 100 ||
                      task.status === "IN_PROGRESS" ? (
                        <Button
                          variant="success"
                          onClick={() => openCompleteModal(task)}
                        >
                          ✅ Mark Complete
                        </Button>
                      ) : null}
                    </>
                  ) : task.status === "COMPLETED" ? (
                    <Button variant="secondary" disabled>
                      Awaiting Approval
                    </Button>
                  ) : task.status === "APPROVED" ? (
                    <Button variant="success" disabled>
                      ✓ Approved
                    </Button>
                  ) : task.status === "REJECTED" ? (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => openProgressModal(task)}
                      >
                        📸 Resume Work
                      </Button>
                      {task.rejectionReason && (
                        <div
                          style={{
                            marginTop: "0.5rem",
                            padding: "0.5rem",
                            background: "rgba(239, 68, 68, 0.1)",
                            borderRadius: "0.25rem",
                            fontSize: "0.75rem",
                            color: STATUS_COLORS.REJECTED,
                          }}
                        >
                          <strong>Rejection reason:</strong>{" "}
                          {task.rejectionReason}
                        </div>
                      )}
                    </>
                  ) : null}
                </TaskActions>
              </TaskCard>
            );
          })}
        </TasksGrid>
      )}

      {/* Progress Update Modal */}
      <Modal isOpen={showProgressModal}>
        <ModalContent>
          <ModalTitle>Update Task Progress</ModalTitle>

          <Form onSubmit={handleUpdateProgress}>
            <FormGroup>
              <Label>Progress Percentage (0-100)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={progressValue}
                onChange={(e) => setProgressValue(Number(e.target.value))}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Progress Notes (Optional)</Label>
              <TextArea
                value={progressNotes}
                onChange={(e) => setProgressNotes(e.target.value)}
                placeholder="Describe what work has been completed..."
              />
            </FormGroup>

            <FormGroup>
              <Label>Upload Progress Photos & Videos</Label>
              <MediaUpload
                onUploadComplete={handleMediaUploadComplete}
                onUploadProgress={(progress) => console.log("Upload progress:", progress)}
                onError={handleMediaUploadError}
                context="task_progress"
                maxFiles={5}
                maxSizeM={25}
              />
              {uploadError && (
                <div style={{
                  color: "hsl(0 84% 60%)",
                  fontSize: "0.875rem",
                  marginTop: "0.5rem"
                }}>
                  {uploadError}
                </div>
              )}
            </FormGroup>

            <FormActions>
              <Button
                type="button"
                variant="secondary"
                onClick={closeProgressModal}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isUploadingMedia}
              >
                {isUploadingMedia ? "Uploading..." : "Update Progress"}
              </Button>
            </FormActions>
          </Form>
        </ModalContent>
      </Modal>

      {/* Complete Task Modal */}
      <Modal isOpen={showCompleteModal}>
        <ModalContent>
          <ModalTitle>Mark Task as Completed</ModalTitle>

          <Form onSubmit={handleMarkCompleted}>
            <FormGroup>
              <Label>Completion Notes</Label>
              <TextArea
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
                placeholder="Describe the completed work, any issues encountered, or additional notes for the builder..."
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Upload Completion Photos & Videos</Label>
              <MediaUpload
                onUploadComplete={handleMediaUploadComplete}
                onUploadProgress={(progress) => console.log("Upload progress:", progress)}
                onError={handleMediaUploadError}
                context="task_completion"
                maxFiles={8}
                maxSizeM={30}
              />
              {uploadError && (
                <div style={{
                  color: "hsl(0 84% 60%)",
                  fontSize: "0.875rem",
                  marginTop: "0.5rem"
                }}>
                  {uploadError}
                </div>
              )}
            </FormGroup>

            <FormActions>
              <Button
                type="button"
                variant="secondary"
                onClick={closeCompleteModal}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="success"
                disabled={isUploadingMedia}
              >
                {isUploadingMedia ? "Uploading..." : "Mark as Completed"}
              </Button>
            </FormActions>
          </Form>
        </ModalContent>
      </Modal>
    </DashboardContainer>
  );
}
