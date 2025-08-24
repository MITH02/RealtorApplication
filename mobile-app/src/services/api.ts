import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:8080/api'; // Update this for production

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Helper method to get stored tokens
  private async getTokens(): Promise<AuthTokens | null> {
    try {
      const tokens = await AsyncStorage.getItem('auth_tokens');
      return tokens ? JSON.parse(tokens) : null;
    } catch (error) {
      console.error('Error getting tokens:', error);
      return null;
    }
  }

  // Helper method to store tokens
  private async storeTokens(tokens: AuthTokens): Promise<void> {
    try {
      await AsyncStorage.setItem('auth_tokens', JSON.stringify(tokens));
    } catch (error) {
      console.error('Error storing tokens:', error);
    }
  }

  // Helper method to clear tokens
  private async clearTokens(): Promise<void> {
    try {
      await AsyncStorage.removeItem('auth_tokens');
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }

  // Helper method to make authenticated requests
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const tokens = await this.getTokens();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (tokens) {
        headers.Authorization = `Bearer ${tokens.accessToken}`;
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      if (response.status === 401 && tokens) {
        // Token might be expired, try to refresh
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry the original request with new token
          headers.Authorization = `Bearer ${refreshed.accessToken}`;
          const retryResponse = await fetch(`${this.baseURL}${endpoint}`, {
            ...options,
            headers,
          });
          return await retryResponse.json();
        } else {
          // Refresh failed, clear tokens and redirect to login
          await this.clearTokens();
          throw new Error('Authentication failed');
        }
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Authentication methods
  async login(email: string, password: string): Promise<ApiResponse<any>> {
    const response = await this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data && response.data.accessToken) {
      await this.storeTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
    }

    return response;
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    phoneNumber?: string;
    specialization?: string;
    yearsOfExperience?: number;
    certificationDetails?: string;
  }): Promise<ApiResponse<any>> {
    return this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async refreshToken(): Promise<AuthTokens | null> {
    try {
      const tokens = await this.getTokens();
      if (!tokens) return null;

      const response = await fetch(`${this.baseURL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tokens.refreshToken),
      });

      if (response.ok) {
        const newTokens = await response.json();
        await this.storeTokens({
          accessToken: newTokens.accessToken,
          refreshToken: newTokens.refreshToken,
        });
        return newTokens;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
    return null;
  }

  async logout(): Promise<void> {
    await this.makeRequest('/auth/logout', { method: 'POST' });
    await this.clearTokens();
  }

  async getCurrentUser(): Promise<ApiResponse<any>> {
    return this.makeRequest('/auth/me');
  }

  // Building methods
  async getBuildings(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/buildings');
  }

  async getBuildingById(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/buildings/${id}`);
  }

  async createBuilding(buildingData: {
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
  }): Promise<ApiResponse<any>> {
    return this.makeRequest('/buildings', {
      method: 'POST',
      body: JSON.stringify(buildingData),
    });
  }

  async updateBuilding(id: number, buildingData: any): Promise<ApiResponse<any>> {
    return this.makeRequest(`/buildings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(buildingData),
    });
  }

  async updateBuildingStatus(id: number, status: string): Promise<ApiResponse<any>> {
    return this.makeRequest(`/buildings/${id}/status?status=${status}`, {
      method: 'PATCH',
    });
  }

  async deleteBuilding(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/buildings/${id}`, { method: 'DELETE' });
  }

  async getMyBuildings(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/buildings/my-buildings');
  }

  async getOverdueBuildings(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/buildings/overdue');
  }

  async searchBuildings(query: string): Promise<ApiResponse<any[]>> {
    return this.makeRequest(`/buildings/search?q=${encodeURIComponent(query)}`);
  }

  // Task methods
  async getTasks(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/tasks/admin/all');
  }

  async getMyTasks(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/tasks/my-tasks');
  }

  async getMyActiveTasks(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/tasks/my-tasks/active');
  }

  async getTaskById(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/tasks/${id}`);
  }

  async getTasksByBuilding(buildingId: number): Promise<ApiResponse<any[]>> {
    return this.makeRequest(`/tasks/building/${buildingId}`);
  }

  async createTask(taskData: {
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
  }): Promise<ApiResponse<any>> {
    return this.makeRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTaskProgress(
    id: number,
    progress: number,
    notes?: string
  ): Promise<ApiResponse<any>> {
    return this.makeRequest(`/tasks/${id}/progress`, {
      method: 'PATCH',
      body: JSON.stringify({ progress, notes }),
    });
  }

  async markTaskAsCompleted(
    id: number,
    completionNotes?: string
  ): Promise<ApiResponse<any>> {
    return this.makeRequest(`/tasks/${id}/complete`, {
      method: 'PATCH',
      body: JSON.stringify({ completionNotes }),
    });
  }

  async approveTask(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/tasks/${id}/approve`, { method: 'PATCH' });
  }

  async rejectTask(id: number, rejectionReason: string): Promise<ApiResponse<any>> {
    return this.makeRequest(`/tasks/${id}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ rejectionReason }),
    });
  }

  async updateTaskStatus(id: number, status: string): Promise<ApiResponse<any>> {
    return this.makeRequest(`/tasks/${id}/status?status=${status}`, {
      method: 'PATCH',
    });
  }

  async getTasksPendingApproval(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/tasks/pending-approval');
  }

  async getOverdueTasks(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/tasks/overdue');
  }

  async addTaskUpdate(
    id: number,
    message: string,
    updateType: string,
    imageUrls?: string[]
  ): Promise<ApiResponse<any>> {
    return this.makeRequest(`/tasks/${id}/updates`, {
      method: 'POST',
      body: JSON.stringify({ message, updateType, imageUrls }),
    });
  }

  async getTaskUpdates(id: number): Promise<ApiResponse<any[]>> {
    return this.makeRequest(`/tasks/${id}/updates`);
  }

  async deleteTask(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/tasks/${id}`, { method: 'DELETE' });
  }

  // Notification methods
  async getNotifications(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/notifications');
  }

  async getUnreadNotifications(): Promise<ApiResponse<any[]>> {
    return this.makeRequest('/notifications/unread');
  }

  async getUnreadNotificationCount(): Promise<ApiResponse<number>> {
    return this.makeRequest('/notifications/unread/count');
  }

  async markNotificationAsRead(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/notifications/${id}/read`, { method: 'PATCH' });
  }

  async markAllNotificationsAsRead(): Promise<ApiResponse<any>> {
    return this.makeRequest('/notifications/mark-all-read', { method: 'PATCH' });
  }

  async deleteNotification(id: number): Promise<ApiResponse<any>> {
    return this.makeRequest(`/notifications/${id}`, { method: 'DELETE' });
  }

  // Statistics methods
  async getBuildingCountByStatus(status: string): Promise<ApiResponse<number>> {
    return this.makeRequest(`/buildings/stats/count-by-status?status=${status}`);
  }

  async getTaskCountByStatus(status: string): Promise<ApiResponse<number>> {
    return this.makeRequest(`/tasks/stats/count-by-status?status=${status}`);
  }
}

export const apiService = new ApiService();
export default apiService;
