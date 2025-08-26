// Core types - defined here to avoid circular imports
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "BUILDER" | "CONTRACTOR";
  phoneNumber?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  specialization?: string;
  yearsOfExperience?: number;
  certificationDetails?: string;
}

export interface Building {
  id: number;
  name: string;
  description?: string;
  address: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  type:
    | "RESIDENTIAL"
    | "COMMERCIAL"
    | "INDUSTRIAL"
    | "MIXED_USE"
    | "INFRASTRUCTURE";
  status: "PLANNING" | "IN_PROGRESS" | "ON_HOLD" | "COMPLETED" | "CANCELLED";
  totalFloors?: number;
  totalArea?: number;
  estimatedBudget?: number;
  actualCost?: number;
  startDate?: string;
  expectedCompletionDate?: string;
  actualCompletionDate?: string;
  createdBy: User;
  projectManager?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  name: string;
  description?: string;
  type:
    | "CIVIL_WORK"
    | "ELECTRICAL_WORK"
    | "PLUMBING_WORK"
    | "TILING"
    | "PAINTING"
    | "ROOFING"
    | "FLOORING"
    | "CARPENTRY"
    | "MASONRY"
    | "HVAC"
    | "LANDSCAPING"
    | "INSPECTION"
    | "CLEANUP"
    | "OTHER";
  status:
    | "ASSIGNED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "APPROVED"
    | "REJECTED"
    | "ON_HOLD"
    | "CANCELLED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  estimatedDurationDays?: number;
  actualDurationDays?: number;
  estimatedCost?: number;
  actualCost?: number;
  startDate: string;
  deadline: string;
  completionDate?: string;
  approvalDate?: string;
  progressPercentage: number;
  rejectionReason?: string;
  completionNotes?: string;
  building: Building;
  assignedContractor: User;
  createdBy: User;
  approvedBy?: User;
  dependencies: Task[];
  taskUpdates: TaskUpdate[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskUpdate {
  id: number;
  message: string;
  updateType:
    | "PROGRESS_UPDATE"
    | "STATUS_CHANGE"
    | "COMPLETION"
    | "ISSUE_REPORTED"
    | "APPROVAL"
    | "REJECTION";
  imageUrls?: string[];
  createdBy: User;
  createdAt: string;
}

export interface Notification {
  id: number;
  user: User;
  type:
    | "TASK_ASSIGNED"
    | "TASK_COMPLETED"
    | "TASK_APPROVED"
    | "TASK_REJECTED"
    | "TASK_OVERDUE"
    | "DEADLINE_REMINDER"
    | "NEW_BUILDING_CREATED"
    | "CONTRACTOR_ASSIGNED"
    | "SYSTEM_UPDATE"
    | "APPROVAL_REQUEST"
    | "PROGRESS_UPDATE";
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  relatedTask?: Task;
  relatedBuilding?: Building;
  relatedUser?: User;
  createdAt: string;
  readAt?: string;
  expiresAt?: string;
}

// API request/response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber?: string;
  specialization?: string;
  yearsOfExperience?: number;
  certificationDetails?: string;
}

export interface BuildingCreateRequest {
  name: string;
  description?: string;
  address: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  type: string;
  totalFloors?: number;
  totalArea?: number;
  estimatedBudget?: number;
  startDate?: string;
  expectedCompletionDate?: string;
  projectManagerId?: number;
}

export interface TaskCreateRequest {
  name: string;
  description?: string;
  type: string;
  priority: string;
  estimatedDurationDays?: number;
  estimatedCost?: number;
  startDate: string;
  deadline: string;
  buildingId: number;
  contractorId: number;
  dependencyTaskIds?: string[];
}

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
  type: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface MessageResponse {
  message: string;
}

export interface BuildingContractor {
  id: number;
  building: Building;
  contractor: User;
  assignedBy: User;
  isActive: boolean;
  roleInProject?: string;
  notes?: string;
  assignedAt: string;
  removedAt?: string;
}

export interface BuildingContractorAssignRequest {
  buildingId: number;
  contractorId: number;
  roleInProject?: string;
  notes?: string;
}

// Additional frontend-specific types
export type UserRole = "ADMIN" | "BUILDER" | "CONTRACTOR";

export type TaskStatus =
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "APPROVED"
  | "REJECTED"
  | "ON_HOLD"
  | "CANCELLED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type BuildingStatus =
  | "PLANNING"
  | "IN_PROGRESS"
  | "ON_HOLD"
  | "COMPLETED"
  | "CANCELLED";

export type TaskType =
  | "CIVIL_WORK"
  | "ELECTRICAL_WORK"
  | "PLUMBING_WORK"
  | "TILING"
  | "PAINTING"
  | "ROOFING"
  | "FLOORING"
  | "CARPENTRY"
  | "MASONRY"
  | "HVAC"
  | "LANDSCAPING"
  | "INSPECTION"
  | "CLEANUP"
  | "OTHER";

export type BuildingType =
  | "RESIDENTIAL"
  | "COMMERCIAL"
  | "INDUSTRIAL"
  | "MIXED_USE"
  | "INFRASTRUCTURE";

// Component props types
export interface DashboardProps {
  user: User;
}

export interface StatusIndicatorProps {
  status: TaskStatus;
  text?: string;
  size?: "small" | "medium" | "large";
}

export interface TaskCardProps {
  task: Task;
  onUpdate?: (task: Task) => void;
  onApprove?: (taskId: number) => void;
  onReject?: (taskId: number, reason: string) => void;
  showActions?: boolean;
}

export interface BuildingCardProps {
  building: Building;
  onUpdate?: (building: Building) => void;
  onDelete?: (buildingId: number) => void;
  showActions?: boolean;
}

export interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead?: (notificationId: number) => void;
  onDelete?: (notificationId: number) => void;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface BuilderFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface ContractorFormData extends BuilderFormData {
  specialization?: string;
  yearsOfExperience?: number;
  certificationDetails?: string;
}

export interface BuildingFormData {
  name: string;
  description?: string;
  address: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  type: BuildingType;
  totalFloors?: number;
  totalArea?: number;
  estimatedBudget?: number;
  startDate?: string;
  expectedCompletionDate?: string;
}

export interface TaskFormData {
  name: string;
  description?: string;
  type: TaskType;
  priority: TaskPriority;
  estimatedDurationDays?: number;
  estimatedCost?: number;
  startDate: string;
  deadline: string;
  buildingId: number;
  contractorId: number;
}

// Application state types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

// Utility types
export interface PaginationParams {
  page: number;
  size: number;
  sort?: string;
  direction?: "ASC" | "DESC";
}

export interface FilterParams {
  status?: string;
  type?: string;
  priority?: string;
  buildingId?: number;
  contractorId?: number;
  dateFrom?: string;
  dateTo?: string;
}

export interface SearchParams {
  query: string;
  filters?: FilterParams;
  pagination?: PaginationParams;
}

// Dashboard stats types
export interface DashboardStats {
  totalBuildings: number;
  activeBuildings: number;
  completedBuildings: number;
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
  overdueTasks: number;
  totalContractors?: number;
  activeContractors?: number;
}

// Color scheme for status indicators
export const STATUS_COLORS = {
  // Task statuses
  ASSIGNED: "#f59e0b", // amber
  IN_PROGRESS: "#3b82f6", // blue
  COMPLETED: "#10b981", // emerald
  APPROVED: "#22c55e", // green
  REJECTED: "#ef4444", // red
  ON_HOLD: "#6b7280", // gray
  CANCELLED: "#9ca3af", // gray

  // Building statuses
  PLANNING: "#8b5cf6", // violet
  // IN_PROGRESS: '#3b82f6', // blue (shared)
  // ON_HOLD: '#6b7280', // gray (shared)
  // COMPLETED: '#10b981', // emerald (shared)
  // CANCELLED: '#9ca3af', // gray (shared)

  // Priority colors
  LOW: "#10b981", // emerald
  MEDIUM: "#f59e0b", // amber
  HIGH: "#f97316", // orange
  URGENT: "#ef4444", // red
} as const;

export type StatusColor = (typeof STATUS_COLORS)[keyof typeof STATUS_COLORS];
