import { RequestHandler } from "express";

// Mock data for now - in a real app, this would come from your database
const mockContractors = [
  {
    id: 1,
    email: "contractor1@example.com",
    firstName: "John",
    lastName: "Doe",
    role: "CONTRACTOR",
    phoneNumber: "+1234567890",
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    specialization: "Electrical Work",
    yearsOfExperience: 5,
    certificationDetails: "Licensed Electrician"
  },
  {
    id: 2,
    email: "contractor2@example.com",
    firstName: "Jane",
    lastName: "Smith",
    role: "CONTRACTOR",
    phoneNumber: "+1234567891",
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    specialization: "Plumbing Work",
    yearsOfExperience: 8,
    certificationDetails: "Master Plumber"
  }
];

// Get all contractors (admin endpoint)
export const getAllContractors: RequestHandler = (req, res) => {
  try {
    res.json(mockContractors);
  } catch (error) {
    console.error("Error fetching contractors:", error);
    res.status(500).json({ message: "Failed to fetch contractors" });
  }
};

// Get available contractors (for builders to assign tasks)
export const getAvailableContractors: RequestHandler = (req, res) => {
  try {
    // Filter only active contractors
    const availableContractors = mockContractors.filter(contractor => contractor.isActive);
    res.json(availableContractors);
  } catch (error) {
    console.error("Error fetching available contractors:", error);
    res.status(500).json({ message: "Failed to fetch available contractors" });
  }
};

// Get user counts for admin stats
export const getUserCounts: RequestHandler = (req, res) => {
  try {
    const counts = {
      builders: 2,
      contractors: mockContractors.length,
      admins: 1
    };
    res.json(counts);
  } catch (error) {
    console.error("Error fetching user counts:", error);
    res.status(500).json({ message: "Failed to fetch user counts" });
  }
};
