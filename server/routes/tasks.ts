import { RequestHandler } from "express";

// Mock data for now - in a real app, this would come from your database
const mockTasks = [
  {
    id: 1,
    name: "Electrical Wiring Installation",
    description: "Install electrical wiring for the entire building",
    type: "ELECTRICAL_WORK",
    priority: "HIGH",
    status: "ASSIGNED",
    estimatedDurationDays: 14,
    estimatedCost: 25000,
    startDate: "2024-02-01",
    deadline: "2024-02-15",
    buildingId: 1,
    contractorId: 1,
    assignedContractor: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      specialization: "Electrical Work"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Plumbing System Setup",
    description: "Install plumbing system for all units",
    type: "PLUMBING_WORK",
    priority: "MEDIUM",
    status: "PENDING_APPROVAL",
    estimatedDurationDays: 21,
    estimatedCost: 35000,
    startDate: "2024-02-16",
    deadline: "2024-03-09",
    buildingId: 1,
    contractorId: 2,
    assignedContractor: {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      specialization: "Plumbing Work"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Create a new task
export const createTask: RequestHandler = (req, res) => {
  try {
    const taskData = req.body;
    console.log("Creating task with data:", taskData);
    
    const newTask = {
      id: mockTasks.length + 1,
      ...taskData,
      status: "ASSIGNED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedContractor: {
        id: taskData.contractorId,
        firstName: "John", // In a real app, fetch from contractors
        lastName: "Doe",
        specialization: "General"
      }
    };
    
    console.log("Created task:", newTask);
    mockTasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

// Get task by ID
export const getTaskById: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const task = mockTasks.find(t => t.id === parseInt(id));
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Failed to fetch task" });
  }
};

// Get all tasks for a builder
export const getBuilderTasks: RequestHandler = (req, res) => {
  try {
    // In a real app, you'd filter by the authenticated builder's ID
    res.json(mockTasks);
  } catch (error) {
    console.error("Error fetching builder tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// Get tasks by building
export const getTasksByBuilding: RequestHandler = (req, res) => {
  try {
    const { buildingId } = req.params;
    const buildingTasks = mockTasks.filter(t => t.buildingId === parseInt(buildingId));
    res.json(buildingTasks);
  } catch (error) {
    console.error("Error fetching building tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// Approve task
export const approveTask: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const taskIndex = mockTasks.findIndex(t => t.id === parseInt(id));
    
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    mockTasks[taskIndex].status = "APPROVED";
    mockTasks[taskIndex].updatedAt = new Date().toISOString();
    
    res.json(mockTasks[taskIndex]);
  } catch (error) {
    console.error("Error approving task:", error);
    res.status(500).json({ message: "Failed to approve task" });
  }
};

// Reject task
export const rejectTask: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const taskIndex = mockTasks.findIndex(t => t.id === parseInt(id));
    
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    mockTasks[taskIndex].status = "REJECTED";
    mockTasks[taskIndex].updatedAt = new Date().toISOString();
    
    res.json(mockTasks[taskIndex]);
  } catch (error) {
    console.error("Error rejecting task:", error);
    res.status(500).json({ message: "Failed to reject task" });
  }
};

// Add task update
export const addTaskUpdate: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { message, updateType, imageUrls } = req.body;
    
    console.log("Adding task update:", { id, message, updateType, imageUrls });
    
    // Validate required fields
    if (!message || !updateType) {
      return res.status(400).json({ 
        message: "Missing required fields: message and updateType are required" 
      });
    }
    
    // In a real app, you'd save this to a task updates table
    const update = {
      id: Date.now(),
      taskId: parseInt(id),
      message,
      type: updateType,
      imageUrls: imageUrls || [],
      createdAt: new Date().toISOString(),
      createdBy: {
        id: 1,
        firstName: "Builder",
        lastName: "User"
      }
    };
    
    console.log("Created update:", update);
    res.status(201).json(update);
  } catch (error) {
    console.error("Error adding task update:", error);
    res.status(500).json({ message: "Failed to add task update" });
  }
};

// Get task updates
export const getTaskUpdates: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    
    // In a real app, you'd fetch from a task updates table
    const updates = [
      {
        id: 1,
        taskId: parseInt(id),
        message: "Task started successfully",
        type: "STATUS_CHANGE",
        imageUrls: [],
        createdAt: new Date().toISOString(),
        createdBy: {
          id: 1,
          firstName: "Builder",
          lastName: "User"
        }
      }
    ];
    
    res.json(updates);
  } catch (error) {
    console.error("Error fetching task updates:", error);
    res.status(500).json({ message: "Failed to fetch task updates" });
  }
};
