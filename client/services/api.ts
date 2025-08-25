// API Configuration and Services for ConstructPro Backend
const API_BASE_URL = '/api';

// Types based on backend entities
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'CONTRACTOR';
  phoneNumber?: string;
  isActive: boolean;
  lastLogin?: string;
  specialization?: string;
  yearsOfExperience?: number;
  certificationDetails?: string;
}

export interface Building {
  id: number;
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  type: 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'INFRASTRUCTURE';
  status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  totalFloors?: number;
  totalArea?: number;
  estimatedBudget?: number;
  actualCost?: number;
  startDate?: string;
  expectedCompletionDate?: string;
  actualCompletionDate?: string;
  createdBy: User;
  projectManager: User;
  completionPercentage?: number;
  isOverdue?: boolean;
}

export interface Task {
  id: number;
  name: string;
  description?: string;
  type: 'FOUNDATION' | 'FRAMING' | 'ROOFING' | 'ELECTRICAL' | 'PLUMBING' | 'HVAC' | 'DRYWALL' | 'FLOORING' | 'PAINTING' | 'LANDSCAPING' | 'INSPECTION' | 'OTHER';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'APPROVED' | 'REJECTED' | 'ON_HOLD';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  estimatedDurationDays?: number;
  actualDurationDays?: number;
  estimatedCost?: number;
  actualCost?: number;
  startDate?: string;
  deadline?: string;
  completionDate?: string;
  approvalDate?: string;
  progressPercentage: number;
  rejectionReason?: string;
  completionNotes?: string;
  building: Building;
  assignedContractor?: User;
  createdBy: User;
  approvedBy?: User;
  isOverdue?: boolean;
  daysUntilDeadline?: number;
  daysOverdue?: number;
}

export interface TaskUpdate {
  id: number;
  updateType: 'PROGRESS' | 'COMPLETION' | 'ISSUE' | 'MILESTONE' | 'OTHER';
  message: string;
  progressPercentage?: number;
  hoursWorked?: number;
  imageUrls?: string[];
  locationNotes?: string;
  issuesEncountered?: string;
  nextSteps?: string;
  updatedBy: User;
  createdAt: string;
}

export interface Notification {
  id: number;
  type: 'TASK_ASSIGNED' | 'TASK_COMPLETED' | 'TASK_APPROVED' | 'TASK_REJECTED' | 'TASK_OVERDUE' | 'DEADLINE_REMINDER' | 'BUILDING_STATUS_CHANGED' | 'DAILY_SUMMARY';
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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'CONTRACTOR';
  phoneNumber?: string;
  specialization?: string;
  yearsOfExperience?: number;
  certificationDetails?: string;
}

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface BuildingCreateRequest {
  name: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  type: 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'INFRASTRUCTURE';
  totalFloors?: number;
  totalArea?: number;
  estimatedBudget?: number;
  startDate?: string;
  expectedCompletionDate?: string;
  projectManagerId: number;
}

export interface TaskCreateRequest {
  name: string;
  description?: string;
  type: 'FOUNDATION' | 'FRAMING' | 'ROOFING' | 'ELECTRICAL' | 'PLUMBING' | 'HVAC' | 'DRYWALL' | 'FLOORING' | 'PAINTING' | 'LANDSCAPING' | 'INSPECTION' | 'OTHER';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  estimatedDurationDays?: number;
  estimatedCost?: number;
  startDate?: string;
  deadline?: string;
  buildingId: number;
  assignedContractorId?: number;
}

// API Client Class
class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('accessToken');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('accessToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Try to refresh token
      const refreshed = await this.refreshToken();
      if (refreshed) {
        // Retry the request with new token
        headers['Authorization'] = `Bearer ${this.token}`;
        const retryResponse = await fetch(url, {
          ...options,
          headers,
        });
        if (!retryResponse.ok) {
          throw new Error(`HTTP error! status: ${retryResponse.status}`);
        }
        return retryResponse.json();
      } else {
        this.clearToken();
        throw new Error('Authentication failed');
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(refreshToken),
      });

      if (response.ok) {
        const data: JwtResponse = await response.json();
        this.setToken(data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    return false;
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<JwtResponse> {
    const response = await this.request<JwtResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    this.setToken(response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }

  async register(userData: SignupRequest): Promise<{ message: string }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<{ message: string }> {
    const response = await this.request<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
    this.clearToken();
    return response;
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/auth/me');
  }

  // Building endpoints
  async getBuildings(): Promise<Building[]> {
    return this.request<Building[]>('/buildings');
  }

  async getBuilding(id: number): Promise<Building> {
    return this.request<Building>(`/buildings/${id}`);
  }

  async createBuilding(building: BuildingCreateRequest): Promise<Building> {
    return this.request<Building>('/buildings', {
      method: 'POST',
      body: JSON.stringify(building),
    });
  }

  async updateBuilding(id: number, building: Partial<BuildingCreateRequest>): Promise<Building> {
    return this.request<Building>(`/buildings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(building),
    });
  }

  async updateBuildingStatus(id: number, status: string): Promise<Building> {
    return this.request<Building>(`/buildings/${id}/status?status=${status}`, {
      method: 'PATCH',
    });
  }

  async deleteBuilding(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/buildings/${id}`, {
      method: 'DELETE',
    });
  }

  async getOverdueBuildings(): Promise<Building[]> {
    return this.request<Building[]>('/buildings/overdue');
  }

  async getActiveBuildings(): Promise<Building[]> {
    return this.request<Building[]>('/buildings/active');
  }

  async searchBuildings(query: string): Promise<Building[]> {
    return this.request<Building[]>(`/buildings/search?q=${encodeURIComponent(query)}`);
  }

  async getBuildingCountByStatus(status: string): Promise<number> {
    return this.request<number>(`/buildings/stats/count-by-status?status=${status}`);
  }

  // Task endpoints
  async createTask(task: TaskCreateRequest): Promise<Task> {
    return this.request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  async getTask(id: number): Promise<Task> {
    return this.request<Task>(`/tasks/${id}`);
  }

  async getBuildingTasks(buildingId: number): Promise<Task[]> {
    return this.request<Task[]>(`/tasks/building/${buildingId}`);
  }

  async getAllAdminTasks(): Promise<Task[]> {
    return this.request<Task[]>('/tasks/admin/all');
  }

  async getPendingApprovalTasks(): Promise<Task[]> {
    return this.request<Task[]>('/tasks/pending-approval');
  }

  async getOverdueTasks(): Promise<Task[]> {
    return this.request<Task[]>('/tasks/overdue');
  }

  async updateTaskProgress(id: number, progress: number, notes?: string): Promise<Task> {
    return this.request<Task>(`/tasks/${id}/progress`, {
      method: 'PATCH',
      body: JSON.stringify({ progress, notes }),
    });
  }

  async markTaskCompleted(id: number, completionNotes?: string): Promise<Task> {
    return this.request<Task>(`/tasks/${id}/complete`, {
      method: 'PATCH',
      body: JSON.stringify({ completionNotes }),
    });
  }

  async approveTask(id: number): Promise<Task> {
    return this.request<Task>(`/tasks/${id}/approve`, {
      method: 'PATCH',
    });
  }

  async rejectTask(id: number, reason: string): Promise<Task> {
    return this.request<Task>(`/tasks/${id}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    });
  }

  async updateTaskStatus(id: number, status: string): Promise<Task> {
    return this.request<Task>(`/tasks/${id}/status?status=${status}`, {
      method: 'PATCH',
    });
  }

  async addTaskUpdate(id: number, update: Partial<TaskUpdate>): Promise<TaskUpdate> {
    return this.request<TaskUpdate>(`/tasks/${id}/updates`, {
      method: 'POST',
      body: JSON.stringify(update),
    });
  }

  async getTaskUpdates(id: number): Promise<TaskUpdate[]> {
    return this.request<TaskUpdate[]>(`/tasks/${id}/updates`);
  }

  async deleteTask(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  async getTaskCountByStatus(status: string): Promise<number> {
    return this.request<number>(`/tasks/stats/count-by-status?status=${status}`);
  }

  // Notification endpoints
  async getNotifications(): Promise<Notification[]> {
    return this.request<Notification[]>('/notifications');
  }

  async getUnreadNotifications(): Promise<Notification[]> {
    return this.request<Notification[]>('/notifications/unread');
  }

  async getUnreadNotificationCount(): Promise<number> {
    return this.request<number>('/notifications/unread/count');
  }

  async markNotificationAsRead(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  }

  async markAllNotificationsAsRead(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/notifications/mark-all-read', {
      method: 'PATCH',
    });
  }

  async deleteNotification(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/notifications/${id}`, {
      method: 'DELETE',
    });
  }

  // User management (for Admin)
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/admin/users');
  }

  async getContractors(): Promise<User[]> {
    return this.request<User[]>('/admin/contractors');
  }

  async createUser(userData: SignupRequest): Promise<User> {
    return this.request<User>('/admin/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: number, userData: Partial<SignupRequest>): Promise<User> {
    return this.request<User>(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deactivateUser(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/admin/users/${id}/deactivate`, {
      method: 'PATCH',
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Utility functions
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'COMPLETED':
    case 'APPROVED':
      return 'green';
    case 'IN_PROGRESS':
      return 'blue';
    case 'PENDING':
      return 'yellow';
    case 'REJECTED':
    case 'OVERDUE':
      return 'red';
    case 'ON_HOLD':
      return 'gray';
    default:
      return 'gray';
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'URGENT':
      return 'red';
    case 'HIGH':
      return 'orange';
    case 'MEDIUM':
      return 'yellow';
    case 'LOW':
      return 'green';
    default:
      return 'gray';
  }
};
