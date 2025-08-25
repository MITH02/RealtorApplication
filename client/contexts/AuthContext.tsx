import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import apiService from '@/services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole: UserRole | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('accessToken'),
    isAuthenticated: false,
    isLoading: true,
    userRole: null,
  });

  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const response = await apiService.login({ email, password });
      
      const user: User = {
        id: response.id,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        role: response.role as UserRole,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setState({
        user,
        token: response.accessToken,
        isAuthenticated: true,
        isLoading: false,
        userRole: response.role as UserRole,
      });

      // Store refresh token if available
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        user: null,
        token: null,
        isAuthenticated: false,
        userRole: null,
      }));
      apiService.clearToken();
      throw error;
    }
  };

  const logout = () => {
    apiService.logout().catch(console.error);
    apiService.clearToken();
    localStorage.removeItem('refreshToken');
    
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      userRole: null,
    });
  };

  const refreshAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      const response = await apiService.getCurrentUser();
      
      const user: User = {
        id: response.id,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        role: response.role as UserRole,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        userRole: response.role as UserRole,
      });
    } catch (error) {
      console.error('Auth refresh failed:', error);
      logout();
    }
  };

  const updateUser = (user: User) => {
    setState(prev => ({
      ...prev,
      user,
      userRole: user.role,
    }));
  };

  // Initialize auth state on mount
  useEffect(() => {
    refreshAuth();
  }, []);

  // Auto-refresh token logic
  useEffect(() => {
    if (!state.token) return;

    const refreshInterval = setInterval(async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await apiService.refreshToken(refreshToken);
          setState(prev => ({
            ...prev,
            token: response.accessToken,
          }));
          if (response.refreshToken) {
            localStorage.setItem('refreshToken', response.refreshToken);
          }
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
        logout();
      }
    }, 15 * 60 * 1000); // Refresh every 15 minutes

    return () => clearInterval(refreshInterval);
  }, [state.token]);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    refreshAuth,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Role-based hooks for convenience
export function useIsAdmin() {
  const { userRole } = useAuth();
  return userRole === 'ADMIN';
}

export function useIsBuilder() {
  const { userRole } = useAuth();
  return userRole === 'BUILDER';
}

export function useIsContractor() {
  const { userRole } = useAuth();
  return userRole === 'CONTRACTOR';
}

// Route protection hook
export function useRequireAuth(allowedRoles?: UserRole[]) {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  
  if (isLoading) {
    return { canAccess: false, isLoading: true };
  }

  if (!isAuthenticated || !userRole) {
    return { canAccess: false, isLoading: false, redirectTo: '/login' };
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return { canAccess: false, isLoading: false, redirectTo: '/unauthorized' };
  }

  return { canAccess: true, isLoading: false };
}
