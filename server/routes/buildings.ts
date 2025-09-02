import { RequestHandler } from "express";

// Mock data for now - in a real app, this would come from your database
const mockBuildings = [
  {
    id: 1,
    name: "Sunset Apartments",
    description: "Modern residential complex with 50 units",
    address: "123 Sunset Blvd",
    city: "Los Angeles",
    state: "CA",
    postalCode: "90210",
    country: "USA",
    type: "RESIDENTIAL",
    status: "IN_PROGRESS",
    totalFloors: 5,
    totalArea: 50000,
    estimatedBudget: 5000000,
    startDate: "2024-01-15",
    expectedCompletionDate: "2024-12-31",
    projectManagerId: 1
  },
  {
    id: 2,
    name: "Downtown Office Tower",
    description: "Commercial office building with retail space",
    address: "456 Business Ave",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "USA",
    type: "COMMERCIAL",
    status: "PLANNING",
    totalFloors: 20,
    totalArea: 150000,
    estimatedBudget: 25000000,
    startDate: "2024-06-01",
    expectedCompletionDate: "2026-06-01",
    projectManagerId: 1
  }
];

// Create a new building
export const createBuilding: RequestHandler = (req, res) => {
  try {
    const buildingData = req.body;
    const newBuilding = {
      id: mockBuildings.length + 1,
      ...buildingData,
      status: "PLANNING",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockBuildings.push(newBuilding);
    res.status(201).json(newBuilding);
  } catch (error) {
    console.error("Error creating building:", error);
    res.status(500).json({ message: "Failed to create building" });
  }
};

// Get all buildings
export const getAllBuildings: RequestHandler = (req, res) => {
  try {
    res.json(mockBuildings);
  } catch (error) {
    console.error("Error fetching buildings:", error);
    res.status(500).json({ message: "Failed to fetch buildings" });
  }
};

// Get building by ID
export const getBuildingById: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const building = mockBuildings.find(b => b.id === parseInt(id));
    
    if (!building) {
      return res.status(404).json({ message: "Building not found" });
    }
    
    res.json(building);
  } catch (error) {
    console.error("Error fetching building:", error);
    res.status(500).json({ message: "Failed to fetch building" });
  }
};

// Update building
export const updateBuilding: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const buildingData = req.body;
    const buildingIndex = mockBuildings.findIndex(b => b.id === parseInt(id));
    
    if (buildingIndex === -1) {
      return res.status(404).json({ message: "Building not found" });
    }
    
    mockBuildings[buildingIndex] = {
      ...mockBuildings[buildingIndex],
      ...buildingData,
      updatedAt: new Date().toISOString()
    };
    
    res.json(mockBuildings[buildingIndex]);
  } catch (error) {
    console.error("Error updating building:", error);
    res.status(500).json({ message: "Failed to update building" });
  }
};

// Update building status
export const updateBuildingStatus: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const buildingIndex = mockBuildings.findIndex(b => b.id === parseInt(id));
    
    if (buildingIndex === -1) {
      return res.status(404).json({ message: "Building not found" });
    }
    
    mockBuildings[buildingIndex].status = status as string;
    mockBuildings[buildingIndex].updatedAt = new Date().toISOString();
    
    res.json(mockBuildings[buildingIndex]);
  } catch (error) {
    console.error("Error updating building status:", error);
    res.status(500).json({ message: "Failed to update building status" });
  }
};

// Delete building
export const deleteBuilding: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const buildingIndex = mockBuildings.findIndex(b => b.id === parseInt(id));
    
    if (buildingIndex === -1) {
      return res.status(404).json({ message: "Building not found" });
    }
    
    mockBuildings.splice(buildingIndex, 1);
    res.json({ message: "Building deleted successfully" });
  } catch (error) {
    console.error("Error deleting building:", error);
    res.status(500).json({ message: "Failed to delete building" });
  }
};

// Get builder's buildings
export const getMyBuildings: RequestHandler = (req, res) => {
  try {
    // In a real app, you'd filter by the authenticated user's ID
    res.json(mockBuildings);
  } catch (error) {
    console.error("Error fetching builder's buildings:", error);
    res.status(500).json({ message: "Failed to fetch buildings" });
  }
};
