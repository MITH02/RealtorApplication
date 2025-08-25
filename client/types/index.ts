// Re-export all types from API service for easy importing
export type {
  LoginRequest,
  SignupRequest,
  BuildingCreateRequest,
  TaskCreateRequest,
  JwtResponse,
  MessageResponse,
  User,
  Building,
  Task,
  TaskUpdate,
  Notification,
} from "../services/api";

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
