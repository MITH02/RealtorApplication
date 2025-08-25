import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useAuth } from '@/contexts/AuthContext';
import { User, Building, Task, BuildingFormData, TaskFormData, TaskStatus, STATUS_COLORS } from '@/types';
import apiService from '@/services/api';
import { keyframes } from '@emotion/react';

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

// Styled Components
const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
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

const TabsContainer = styled.div`
  margin-bottom: 2rem;
`;

const TabsList = styled.div`
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid hsl(214 31% 91%);

  .dark & {
    border-color: hsl(217 32% 17%);
  }
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 0.5rem 0.5rem 0 0;
  transition: all 0.2s ease;
  position: relative;

  ${props => props.active ? `
    color: hsl(217 91% 60%);
    background: rgba(59, 130, 246, 0.1);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: hsl(217 91% 60%);
    }
  ` : `
    color: hsl(215 16% 47%);
    
    &:hover {
      color: hsl(222 84% 4.9%);
      background: hsl(210 40% 96%);
    }
    
    .dark & {
      color: hsl(215 20% 65%);
      
      &:hover {
        color: hsl(210 40% 98%);
        background: hsl(217 32% 17%);
      }
    }
  `}
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${slideIn} 0.6s ease-out;
  animation-fill-mode: both;

  .dark & {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(51, 65, 85, 0.3);
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: hsl(217 91% 60%);
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

const ActionSection = styled.div`
  margin-bottom: 2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' | 'success' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${props => props.variant === 'primary' && `
    background: hsl(217 91% 60%);
    color: white;
    
    &:hover {
      background: hsl(217 91% 55%);
      transform: translateY(-1px);
    }
  `}

  ${props => props.variant === 'secondary' && `
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

  ${props => props.variant === 'success' && `
    background: hsl(142 76% 36%);
    color: white;
    
    &:hover {
      background: hsl(142 76% 31%);
    }
  `}

  ${props => props.variant === 'danger' && `
    background: hsl(0 84% 60%);
    color: white;
    
    &:hover {
      background: hsl(0 84% 55%);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(51, 65, 85, 0.3);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: hsl(222 84% 4.9%);
  margin-bottom: 0.5rem;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const CardInfo = styled.div`
  color: hsl(215 16% 47%);
  font-size: 0.875rem;
  margin-bottom: 1rem;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const StatusBadge = styled.span<{ status: TaskStatus }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  background: ${props => STATUS_COLORS[props.status] || STATUS_COLORS.ASSIGNED};
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const SmallButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' | 'success' }>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => props.variant === 'primary' && `
    background: hsl(217 91% 60%);
    color: white;
    
    &:hover {
      background: hsl(217 91% 55%);
    }
  `}

  ${props => props.variant === 'success' && `
    background: hsl(142 76% 36%);
    color: white;
    
    &:hover {
      background: hsl(142 76% 31%);
    }
  `}

  ${props => props.variant === 'danger' && `
    background: hsl(0 84% 60%);
    color: white;
    
    &:hover {
      background: hsl(0 84% 55%);
    }
  `}

  ${props => props.variant === 'secondary' && `
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

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 600px;
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

const Select = styled.select`
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

interface BuilderDashboardProps {
  user: User;
}

export default function BuilderDashboard({ user }: BuilderDashboardProps) {
  const [activeTab, setActiveTab] = useState('buildings');
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [contractors, setContractors] = useState<User[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [showBuildingModal, setShowBuildingModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState<Building | null>(null);
  const [selectedBuildingForTask, setSelectedBuildingForTask] = useState<Building | null>(null);
  
  // Form states
  const [buildingForm, setBuildingForm] = useState<BuildingFormData>({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    type: 'RESIDENTIAL',
    totalFloors: undefined,
    totalArea: undefined,
    estimatedBudget: undefined,
    startDate: '',
    expectedCompletionDate: '',
  });

  const [taskForm, setTaskForm] = useState<TaskFormData>({
    name: '',
    description: '',
    type: 'CIVIL_WORK',
    priority: 'MEDIUM',
    estimatedDurationDays: undefined,
    estimatedCost: undefined,
    startDate: '',
    deadline: '',
    buildingId: 0,
    contractorId: 0,
  });

  const fetchBuildings = async () => {
    try {
      const buildingsData = await apiService.getAllBuildings();
      setBuildings(buildingsData);
    } catch (error) {
      console.error('Failed to fetch buildings:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const tasksData = await apiService.getBuilderTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const fetchPendingTasks = async () => {
    try {
      const pendingData = await apiService.getTasksPendingApproval();
      setPendingTasks(pendingData);
    } catch (error) {
      console.error('Failed to fetch pending tasks:', error);
    }
  };

  const fetchContractors = async () => {
    try {
      const contractorsData = await apiService.getAllContractors();
      setContractors(contractorsData);
    } catch (error) {
      console.error('Failed to fetch contractors:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchBuildings(),
        fetchTasks(),
        fetchPendingTasks(),
        fetchContractors(),
      ]);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  const handleCreateBuilding = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createBuilding(buildingForm);
      setShowBuildingModal(false);
      resetBuildingForm();
      await fetchBuildings();
    } catch (error) {
      console.error('Failed to create building:', error);
      alert('Failed to create building. Please try again.');
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createTask(taskForm);
      setShowTaskModal(false);
      resetTaskForm();
      await fetchTasks();
    } catch (error) {
      console.error('Failed to create task:', error);
      alert('Failed to create task. Please try again.');
    }
  };

  const handleApproveTask = async (taskId: number) => {
    try {
      await apiService.approveTask(taskId);
      await fetchTasks();
      await fetchPendingTasks();
    } catch (error) {
      console.error('Failed to approve task:', error);
      alert('Failed to approve task. Please try again.');
    }
  };

  const handleRejectTask = async (taskId: number) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;
    
    try {
      await apiService.rejectTask(taskId, reason);
      await fetchTasks();
      await fetchPendingTasks();
    } catch (error) {
      console.error('Failed to reject task:', error);
      alert('Failed to reject task. Please try again.');
    }
  };

  const openTaskModal = (building?: Building) => {
    if (building) {
      setSelectedBuildingForTask(building);
      setTaskForm(prev => ({ ...prev, buildingId: building.id }));
    }
    setShowTaskModal(true);
  };

  const resetBuildingForm = () => {
    setBuildingForm({
      name: '',
      description: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      type: 'RESIDENTIAL',
      totalFloors: undefined,
      totalArea: undefined,
      estimatedBudget: undefined,
      startDate: '',
      expectedCompletionDate: '',
    });
    setEditingBuilding(null);
  };

  const resetTaskForm = () => {
    setTaskForm({
      name: '',
      description: '',
      type: 'CIVIL_WORK',
      priority: 'MEDIUM',
      estimatedDurationDays: undefined,
      estimatedCost: undefined,
      startDate: '',
      deadline: '',
      buildingId: 0,
      contractorId: 0,
    });
    setSelectedBuildingForTask(null);
  };

  const stats = {
    totalBuildings: buildings.length,
    activeBuildings: buildings.filter(b => b.status === 'IN_PROGRESS').length,
    completedBuildings: buildings.filter(b => b.status === 'COMPLETED').length,
    totalTasks: tasks.length,
    pendingApproval: pendingTasks.length,
    completedTasks: tasks.filter(t => t.status === 'APPROVED').length,
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
        <Title>Builder Dashboard</Title>
        <Subtitle>Manage your construction projects and tasks</Subtitle>
      </Header>

      <StatsGrid>
        <StatCard style={{ animationDelay: '0.1s' }}>
          <StatValue>{stats.totalBuildings}</StatValue>
          <StatLabel>Total Buildings</StatLabel>
        </StatCard>
        <StatCard style={{ animationDelay: '0.2s' }}>
          <StatValue>{stats.activeBuildings}</StatValue>
          <StatLabel>Active Projects</StatLabel>
        </StatCard>
        <StatCard style={{ animationDelay: '0.3s' }}>
          <StatValue>{stats.totalTasks}</StatValue>
          <StatLabel>Total Tasks</StatLabel>
        </StatCard>
        <StatCard style={{ animationDelay: '0.4s' }}>
          <StatValue>{stats.pendingApproval}</StatValue>
          <StatLabel>Pending Approval</StatLabel>
        </StatCard>
      </StatsGrid>

      <TabsContainer>
        <TabsList>
          <Tab active={activeTab === 'buildings'} onClick={() => setActiveTab('buildings')}>
            Buildings
          </Tab>
          <Tab active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')}>
            All Tasks
          </Tab>
          <Tab active={activeTab === 'approvals'} onClick={() => setActiveTab('approvals')}>
            Pending Approvals ({stats.pendingApproval})
          </Tab>
        </TabsList>
      </TabsContainer>

      {activeTab === 'buildings' && (
        <>
          <ActionSection>
            <ActionButtons>
              <Button variant="primary" onClick={() => setShowBuildingModal(true)}>
                + Create New Building
              </Button>
              <Button variant="secondary" onClick={fetchBuildings}>
                Refresh
              </Button>
            </ActionButtons>
          </ActionSection>

          <ItemsGrid>
            {buildings.map((building) => (
              <Card key={building.id}>
                <CardTitle>{building.name}</CardTitle>
                <CardInfo>
                  📍 {building.address}<br/>
                  🏗️ {building.type}<br/>
                  📅 {building.startDate ? new Date(building.startDate).toLocaleDateString() : 'Not set'}
                </CardInfo>
                
                <CardActions>
                  <SmallButton variant="primary" onClick={() => openTaskModal(building)}>
                    Add Task
                  </SmallButton>
                  <SmallButton variant="secondary">
                    View Details
                  </SmallButton>
                </CardActions>
              </Card>
            ))}
          </ItemsGrid>
        </>
      )}

      {activeTab === 'tasks' && (
        <>
          <ActionSection>
            <ActionButtons>
              <Button variant="primary" onClick={() => setShowTaskModal(true)}>
                + Create New Task
              </Button>
              <Button variant="secondary" onClick={fetchTasks}>
                Refresh
              </Button>
            </ActionButtons>
          </ActionSection>

          <ItemsGrid>
            {tasks.map((task) => (
              <Card key={task.id}>
                <CardTitle>{task.name}</CardTitle>
                <CardInfo>
                  🏢 {task.building.name}<br/>
                  👷 {task.assignedContractor.firstName} {task.assignedContractor.lastName}<br/>
                  📅 Deadline: {new Date(task.deadline).toLocaleDateString()}<br/>
                  📊 Progress: {task.progressPercentage}%
                </CardInfo>
                
                <StatusBadge status={task.status}>{task.status.replace('_', ' ')}</StatusBadge>
                
                <CardActions>
                  {task.status === 'COMPLETED' && (
                    <>
                      <SmallButton variant="success" onClick={() => handleApproveTask(task.id)}>
                        Approve
                      </SmallButton>
                      <SmallButton variant="danger" onClick={() => handleRejectTask(task.id)}>
                        Reject
                      </SmallButton>
                    </>
                  )}
                  <SmallButton variant="secondary">
                    View Details
                  </SmallButton>
                </CardActions>
              </Card>
            ))}
          </ItemsGrid>
        </>
      )}

      {activeTab === 'approvals' && (
        <ItemsGrid>
          {pendingTasks.map((task) => (
            <Card key={task.id}>
              <CardTitle>{task.name}</CardTitle>
              <CardInfo>
                🏢 {task.building.name}<br/>
                👷 {task.assignedContractor.firstName} {task.assignedContractor.lastName}<br/>
                📅 Completed: {task.completionDate ? new Date(task.completionDate).toLocaleDateString() : 'N/A'}<br/>
                💬 {task.completionNotes || 'No completion notes'}
              </CardInfo>
              
              <StatusBadge status={task.status}>{task.status.replace('_', ' ')}</StatusBadge>
              
              <CardActions>
                <SmallButton variant="success" onClick={() => handleApproveTask(task.id)}>
                  ✓ Approve
                </SmallButton>
                <SmallButton variant="danger" onClick={() => handleRejectTask(task.id)}>
                  ✗ Reject
                </SmallButton>
              </CardActions>
            </Card>
          ))}
        </ItemsGrid>
      )}

      {/* Building Modal */}
      <Modal isOpen={showBuildingModal}>
        <ModalContent>
          <ModalTitle>Create New Building</ModalTitle>
          
          <Form onSubmit={handleCreateBuilding}>
            <FormGroup>
              <Label>Building Name</Label>
              <Input
                type="text"
                value={buildingForm.name}
                onChange={(e) => setBuildingForm(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Description</Label>
              <TextArea
                value={buildingForm.description}
                onChange={(e) => setBuildingForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Address</Label>
              <Input
                type="text"
                value={buildingForm.address}
                onChange={(e) => setBuildingForm(prev => ({ ...prev, address: e.target.value }))}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Building Type</Label>
              <Select
                value={buildingForm.type}
                onChange={(e) => setBuildingForm(prev => ({ ...prev, type: e.target.value as any }))}
              >
                <option value="RESIDENTIAL">Residential</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="INDUSTRIAL">Industrial</option>
                <option value="MIXED_USE">Mixed Use</option>
                <option value="INFRASTRUCTURE">Infrastructure</option>
              </Select>
            </FormGroup>
            
            <FormActions>
              <Button type="button" variant="secondary" onClick={() => {
                setShowBuildingModal(false);
                resetBuildingForm();
              }}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Create Building
              </Button>
            </FormActions>
          </Form>
        </ModalContent>
      </Modal>

      {/* Task Modal */}
      <Modal isOpen={showTaskModal}>
        <ModalContent>
          <ModalTitle>Create New Task</ModalTitle>
          
          <Form onSubmit={handleCreateTask}>
            <FormGroup>
              <Label>Task Name</Label>
              <Input
                type="text"
                value={taskForm.name}
                onChange={(e) => setTaskForm(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Description</Label>
              <TextArea
                value={taskForm.description}
                onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Building</Label>
              <Select
                value={taskForm.buildingId}
                onChange={(e) => setTaskForm(prev => ({ ...prev, buildingId: Number(e.target.value) }))}
                required
              >
                <option value="">Select a building</option>
                {buildings.map(building => (
                  <option key={building.id} value={building.id}>
                    {building.name}
                  </option>
                ))}
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Assign Contractor</Label>
              <Select
                value={taskForm.contractorId}
                onChange={(e) => setTaskForm(prev => ({ ...prev, contractorId: Number(e.target.value) }))}
                required
              >
                <option value="">Select a contractor</option>
                {contractors.map(contractor => (
                  <option key={contractor.id} value={contractor.id}>
                    {contractor.firstName} {contractor.lastName} - {contractor.specialization}
                  </option>
                ))}
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Task Type</Label>
              <Select
                value={taskForm.type}
                onChange={(e) => setTaskForm(prev => ({ ...prev, type: e.target.value as any }))}
              >
                <option value="CIVIL_WORK">Civil Work</option>
                <option value="ELECTRICAL_WORK">Electrical Work</option>
                <option value="PLUMBING_WORK">Plumbing Work</option>
                <option value="TILING">Tiling</option>
                <option value="PAINTING">Painting</option>
                <option value="ROOFING">Roofing</option>
                <option value="FLOORING">Flooring</option>
                <option value="CARPENTRY">Carpentry</option>
                <option value="MASONRY">Masonry</option>
                <option value="HVAC">HVAC</option>
                <option value="LANDSCAPING">Landscaping</option>
                <option value="INSPECTION">Inspection</option>
                <option value="CLEANUP">Cleanup</option>
                <option value="OTHER">Other</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Priority</Label>
              <Select
                value={taskForm.priority}
                onChange={(e) => setTaskForm(prev => ({ ...prev, priority: e.target.value as any }))}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={taskForm.startDate}
                onChange={(e) => setTaskForm(prev => ({ ...prev, startDate: e.target.value }))}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Deadline</Label>
              <Input
                type="date"
                value={taskForm.deadline}
                onChange={(e) => setTaskForm(prev => ({ ...prev, deadline: e.target.value }))}
                required
              />
            </FormGroup>
            
            <FormActions>
              <Button type="button" variant="secondary" onClick={() => {
                setShowTaskModal(false);
                resetTaskForm();
              }}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Create Task
              </Button>
            </FormActions>
          </Form>
        </ModalContent>
      </Modal>
    </DashboardContainer>
  );
}
