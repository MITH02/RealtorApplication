// API Service for ConstructPro Frontend
// This service provides type-safe API calls matching the backend DTOs

// Types matching backend DTOs
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

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
    this.token = localStorage.getItem("accessToken");
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async makeRequest<T>(
    endpoint: string,
    method: string = "GET",
    body?: any,
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method,
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Network error" }));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      );
    }

    return response.json();
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("accessToken", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("accessToken");
  }

  // Authentication APIs
  async login(credentials: LoginRequest): Promise<JwtResponse> {
    const response = await this.makeRequest<JwtResponse>(
      "/auth/login",
      "POST",
      credentials,
    );
    this.setToken(response.accessToken);
    return response;
  }

  async register(userData: SignupRequest): Promise<MessageResponse> {
    return this.makeRequest<MessageResponse>(
      "/auth/register",
      "POST",
      userData,
    );
  }

  async refreshToken(refreshToken: string): Promise<JwtResponse> {
    const response = await this.makeRequest<JwtResponse>(
      "/auth/refresh-token",
      "POST",
      refreshToken,
    );
    this.setToken(response.accessToken);
    return response;
  }

  async logout(): Promise<MessageResponse> {
    const response = await this.makeRequest<MessageResponse>(
      "/auth/logout",
      "POST",
    );
    this.clearToken();
    return response;
  }

  async getCurrentUser(): Promise<JwtResponse> {
    return this.makeRequest<JwtResponse>("/auth/me");
  }

  // Admin APIs
  async getAllBuilders(): Promise<User[]> {
    return this.makeRequest<User[]>("/admin/builders");
  }

  async getBuilderById(id: number): Promise<User> {
    return this.makeRequest<User>(`/admin/builders/${id}`);
  }

  async createBuilder(builderData: SignupRequest): Promise<MessageResponse> {
    return this.makeRequest<MessageResponse>(
      "/admin/builders",
      "POST",
      builderData,
    );
  }

  async updateBuilder(
    id: number,
    builderData: SignupRequest,
  ): Promise<MessageResponse> {
    return this.makeRequest<MessageResponse>(
      `/admin/builders/${id}`,
      "PUT",
      builderData,
    );
  }

  async updateBuilderStatus(
    id: number,
    active: boolean,
  ): Promise<MessageResponse> {
    return this.makeRequest<MessageResponse>(
      `/admin/builders/${id}/status?active=${active}`,
      "PATCH",
    );
  }

  async deleteBuilder(id: number): Promise<MessageResponse> {
    return this.makeRequest<MessageResponse>(`/admin/builders/${id}`, "DELETE");
  }

  async getAllContractors(): Promise<User[]> {
    return this.makeRequest<User[]>("/admin/contractors");
  }

  async getUserCounts(): Promise<{
    builders: number;
    contractors: number;
    admins: number;
  }> {
    return this.makeRequest<{
      builders: number;
      contractors: number;
      admins: number;
    }>("/admin/stats/user-counts");
  }

  // Building APIs
  async createBuilding(buildingData: BuildingCreateRequest): Promise<Building> {
    return this.makeRequest<Building>("/buildings", "POST", buildingData);
  }

  async getAllBuildings(): Promise<Building[]> {
    return this.makeRequest<Building[]>("/buildings");
  }

  async getBuildingById(id: number): Promise<Building> {
    return this.makeRequest<Building>(`/buildings/${id}`);
  }

  async updateBuilding(
    id: number,
    buildingData: BuildingCreateRequest,
  ): Promise<Building> {
    return this.makeRequest<Building>(`/buildings/${id}`, "PUT", buildingData);
  }

  async updateBuildingStatus(id: number, status: string): Promise<Building> {
    return this.makeRequest<Building>(
      `/buildings/${id}/status?status=${status}`,
      "PATCH",
    );
  }

  async deleteBuilding(id: number): Promise<MessageResponse> {
    return this.makeRequest<MessageResponse>(`/buildings/${id}`, "DELETE");
  }

  async getMyBuildings(): Promise<Building[]> {
    return this.makeRequest<Building[]>("/buildings/my-buildings");
  }

  async getOverdueBuildings(): Promise<Building[]> {
    return this.makeRequest<Building[]>("/buildings/overdue");
  }

  async getActiveBuildings(): Promise<Building[]> {
    return this.makeRequest<Building[]>("/buildings/active");
  }

  async searchBuildings(query: string): Promise<Building[]> {
    return this.makeRequest<Building[]>(
      `/buildings/search?q=${encodeURIComponent(query)}`,
    );
  }

  async getBuildingCountByStatus(status: string): Promise<number> {
    return this.makeRequest<number>(
      `/buildings/stats/count-by-status?status=${status}`,
    );
  }

  // Task APIs
  async createTask(taskData: TaskCreateRequest): Promise<Task> {
    return this.makeRequest<Task>("/tasks", "POST", taskData);
  }

  async getTaskById(id: number): Promise<Task> {
    return this.makeRequest<Task>(`/tasks/${id}`);
  }

  async getMyTasks(): Promise<Task[]> {
    return this.makeRequest<Task[]>("/tasks/my-tasks");
  }

  async getMyActiveTasks(): Promise<Task[]> {
    return this.makeRequest<Task[]>("/tasks/my-tasks/active");
  }

  async getTasksByBuilding(buildingId: number): Promise<Task[]> {
    return this.makeRequest<Task[]>(`/tasks/building/${buildingId}`);
  }

  async getBuilderTasks(): Promise<Task[]> {
    return this.makeRequest<Task[]>("/tasks/builder/all");
  }

  async getTasksPendingApproval(): Promise<Task[]> {
    return this.makeRequest<Task[]>("/tasks/pending-approval");
  }

  async getOverdueTasks(): Promise<Task[]> {
    return this.makeRequest<Task[]>("/tasks/overdue");
  }

  async updateTaskProgress(
    id: number,
    progress: number,
    notes?: string,
  ): Promise<Task> {
    return this.makeRequest<Task>(`/tasks/${id}/progress`, "PATCH", {
      progress,
      notes,
    });
  }

  async markTaskAsCompleted(
    id: number,
    completionNotes?: string,
  ): Promise<Task> {
    return this.makeRequest<Task>(`/tasks/${id}/complete`, "PATCH", {
      completionNotes,
    });
  }

  async approveTask(id: number): Promise<Task> {
    return this.makeRequest<Task>(`/tasks/${id}/approve`, "PATCH");
  }

  async rejectTask(id: number, rejectionReason: string): Promise<Task> {
    return this.makeRequest<Task>(`/tasks/${id}/reject`, "PATCH", {
      rejectionReason,
    });
  }

  async updateTaskStatus(id: number, status: string): Promise<Task> {
    return this.makeRequest<Task>(
      `/tasks/${id}/status?status=${status}`,
      "PATCH",
    );
  }

  async addTaskUpdate(
    id: number,
    message: string,
    updateType: string,
    imageUrls?: string[],
  ): Promise<TaskUpdate> {
    return this.makeRequest<TaskUpdate>(`/tasks/${id}/updates`, "POST", {
      message,
      updateType,
      imageUrls,
    });
  }

  async getTaskUpdates(id: number): Promise<TaskUpdate[]> {
    return this.makeRequest<TaskUpdate[]>(`/tasks/${id}/updates`);
  }

  async deleteTask(id: number): Promise<MessageResponse> {
    return this.makeRequest<MessageResponse>(`/tasks/${id}`, "DELETE");
  }

  async getTaskCountByStatus(status: string): Promise<number> {
    return this.makeRequest<number>(
      `/tasks/stats/count-by-status?status=${status}`,
    );
  }

  // Notification APIs
  async getUserNotifications(): Promise<Notification[]> {
    return this.makeRequest<Notification[]>("/notifications");
  }

  async getUnreadNotifications(): Promise<Notification[]> {
    return this.makeRequest<Notification[]>("/notifications/unread");
  }

  async getUnreadNotificationCount(): Promise<number> {
    return this.makeRequest<number>("/notifications/unread/count");
  }

  async markNotificationAsRead(id: number): Promise<Notification> {
    return this.makeRequest<Notification>(`/notifications/${id}/read`, "PATCH");
  }

  async markAllNotificationsAsRead(): Promise<MessageResponse> {
    return this.makeRequest<MessageResponse>(
      "/notifications/mark-all-read",
      "PATCH",
    );
  }

  async deleteNotification(id: number): Promise<MessageResponse> {
    return this.makeRequest<MessageResponse>(`/notifications/${id}`, "DELETE");
  }

  // Media Upload APIs
  async uploadSingleFile(file: File, onProgress?: (progress: number) => void): Promise<MediaUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (onProgress) {
        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100);
            onProgress(progress);
          }
        });
      }

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(new Error("Invalid JSON response"));
          }
        } else {
          try {
            const errorResponse = JSON.parse(xhr.responseText);
            reject(new Error(errorResponse.message || `HTTP error! status: ${xhr.status}`));
          } catch {
            reject(new Error(`HTTP error! status: ${xhr.status}`));
          }
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Network error during upload"));
      });

      xhr.addEventListener("timeout", () => {
        reject(new Error("Upload timeout"));
      });

      xhr.open("POST", `${this.baseURL}/media/upload`);
      if (this.token) {
        xhr.setRequestHeader("Authorization", `Bearer ${this.token}`);
      }

      xhr.timeout = 5 * 60 * 1000; // 5 minutes timeout
      xhr.send(formData);
    });
  }

  async uploadMultipleFiles(
    files: File[],
    onProgress?: (progress: number) => void
  ): Promise<MediaUploadResponse[]> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (onProgress) {
        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100);
            onProgress(progress);
          }
        });
      }

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(new Error("Invalid JSON response"));
          }
        } else {
          try {
            const errorResponse = JSON.parse(xhr.responseText);
            reject(new Error(errorResponse.message || `HTTP error! status: ${xhr.status}`));
          } catch {
            reject(new Error(`HTTP error! status: ${xhr.status}`));
          }
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Network error during upload"));
      });

      xhr.addEventListener("timeout", () => {
        reject(new Error("Upload timeout"));
      });

      xhr.open("POST", `${this.baseURL}/media/upload-multiple`);
      if (this.token) {
        xhr.setRequestHeader("Authorization", `Bearer ${this.token}`);
      }

      xhr.timeout = 10 * 60 * 1000; // 10 minutes timeout for multiple files
      xhr.send(formData);
    });
  }

  async deleteMediaFile(filename: string): Promise<MessageResponse> {
    return this.makeRequest<MessageResponse>(`/media/files/${filename}`, "DELETE");
  }

  async getMediaFileInfo(filename: string): Promise<MediaFileInfo> {
    return this.makeRequest<MediaFileInfo>(`/media/info/${filename}`);
  }

  async getMediaHealth(): Promise<MediaHealthResponse> {
    return this.makeRequest<MediaHealthResponse>("/media/health");
  }

  // Building-Contractor Assignment APIs
  async assignContractorToBuilding(
    assignmentData: BuildingContractorAssignRequest,
  ): Promise<BuildingContractor> {
    return this.makeRequest<BuildingContractor>(
      "/building-contractors/assign",
      "POST",
      assignmentData,
    );
  }

  async unassignContractorFromBuilding(
    buildingId: number,
    contractorId: number,
  ): Promise<MessageResponse> {
    return this.makeRequest<MessageResponse>(
      `/building-contractors/unassign?buildingId=${buildingId}&contractorId=${contractorId}`,
      "DELETE",
    );
  }

  async getBuildingContractors(
    buildingId: number,
  ): Promise<BuildingContractor[]> {
    return this.makeRequest<BuildingContractor[]>(
      `/building-contractors/building/${buildingId}`,
    );
  }

  async getContractorBuildings(
    contractorId: number,
  ): Promise<BuildingContractor[]> {
    return this.makeRequest<BuildingContractor[]>(
      `/building-contractors/contractor/${contractorId}`,
    );
  }

  async getAllBuildingContractors(
    buildingId: number,
  ): Promise<BuildingContractor[]> {
    return this.makeRequest<BuildingContractor[]>(
      `/building-contractors/building/${buildingId}/all`,
    );
  }
}

export const apiService = new ApiService();
export default apiService;
