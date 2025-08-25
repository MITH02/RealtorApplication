import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { theme } from "@/styles/theme";
import { useState } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import VideoLoaderScreen from "./components/VideoLoaderScreen";
import RoleSelection from "./components/RoleSelection";
import ContractorScreen from "./components/roles/ContractorScreen";
import BuilderScreen from "./components/roles/BuilderScreen";
import AdminScreen from "./components/roles/AdminScreen";
import AdminDashboard from "./components/roles/AdminDashboard";
import BuilderDashboard from "./components/roles/BuilderDashboard";
import ContractorDashboard from "./components/roles/ContractorDashboard";
import NotificationsSystem from "./components/NotificationsSystem";
import DeadlineTracker from "./components/DeadlineTracker";
import NotFound from "./pages/NotFound";
import styled from "@emotion/styled";

const queryClient = new QueryClient();

type AppState =
  | "video-loader"
  | "role-selection"
  | "contractor-info"
  | "builder-info"
  | "admin-info"
  | "authenticated";

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    hsl(210 40% 98%),
    hsl(217 91% 95%),
    hsl(221 83% 92%)
  );
  position: relative;

  .dark & {
    background: linear-gradient(
      135deg,
      hsl(222 84% 5%),
      hsl(217 91% 10%),
      hsl(221 83% 12%)
    );
  }
`;

const TopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  .dark & {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(51, 65, 85, 0.3);
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(
    to right,
    hsl(217 91% 60%),
    hsl(271 91% 65%),
    hsl(221 83% 60%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin: 0;

  .dark & {
    background: linear-gradient(
      to right,
      hsl(217 91% 65%),
      hsl(271 91% 70%),
      hsl(221 83% 65%)
    );
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.3);

  .dark & {
    background: rgba(30, 41, 59, 0.7);
    border-color: rgba(51, 65, 85, 0.3);
  }
`;

const UserAvatar = styled.div<{ role: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: white;
  background: ${props => {
    switch (props.role) {
      case 'ADMIN':
        return 'linear-gradient(135deg, hsl(271 91% 65%), hsl(271 91% 55%))';
      case 'BUILDER':
        return 'linear-gradient(135deg, hsl(217 91% 60%), hsl(217 91% 50%))';
      case 'CONTRACTOR':
        return 'linear-gradient(135deg, hsl(25 95% 53%), hsl(25 95% 43%))';
      default:
        return 'hsl(215 16% 47%)';
    }
  }};
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
  color: hsl(222 84% 4.9%);

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const RoleBadge = styled.span<{ role: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  background: ${props => {
    switch (props.role) {
      case 'ADMIN':
        return 'hsl(271 91% 65%)';
      case 'BUILDER':
        return 'hsl(217 91% 60%)';
      case 'CONTRACTOR':
        return 'hsl(25 95% 53%)';
      default:
        return 'hsl(215 16% 47%)';
    }
  }};
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: hsl(0 84% 60%);
  color: white;

  &:hover {
    background: hsl(0 84% 55%);
    transform: translateY(-1px);
  }
`;

const DashboardContent = styled.div`
  padding-top: 5rem; // Account for fixed top bar
`;

// Enhanced Login Form Component
const EnhancedLoginForm = ({ role, onBack, onSuccess }: {
  role: "admin" | "builder" | "contractor";
  onBack: () => void;
  onSuccess: () => void;
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(135deg, hsl(210 40% 98%), hsl(217 91% 95%), hsl(221 83% 92%))'
    }}>
      <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <button 
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.75rem',
            borderRadius: '0.75rem',
            background: 'rgba(255, 255, 255, 0.7)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
      </div>
      
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(24px)',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.5)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              margin: '0 auto 1rem',
              background: role === 'admin' ? 'linear-gradient(135deg, hsl(271 91% 65%), hsl(271 91% 55%))' :
                         role === 'builder' ? 'linear-gradient(135deg, hsl(217 91% 60%), hsl(217 91% 50%))' :
                         'linear-gradient(135deg, hsl(25 95% 53%), hsl(25 95% 43%))',
              borderRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              {role === 'admin' ? '⚙️' : role === 'builder' ? '🏗️' : '👷'}
            </div>
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              marginBottom: '0.5rem',
              color: 'hsl(215 28% 17%)'
            }}>
              {role.charAt(0).toUpperCase() + role.slice(1)} Login
            </h1>
            <p style={{ color: 'hsl(215 16% 47%)', fontSize: '0.875rem' }}>
              Sign in to your {role} account
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && (
              <div style={{
                padding: '0.75rem',
                background: 'rgba(239, 68, 68, 0.1)',
                borderRadius: '0.5rem',
                color: 'hsl(0 84% 60%)',
                fontSize: '0.875rem',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: '500', 
                marginBottom: '0.5rem',
                color: 'hsl(210 40% 28%)'
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid hsl(220 13% 91%)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: '500', 
                marginBottom: '0.5rem',
                color: 'hsl(210 40% 28%)'
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid hsl(220 13% 91%)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.875rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                background: role === 'admin' ? 'linear-gradient(135deg, hsl(271 91% 65%), hsl(271 91% 55%))' :
                           role === 'builder' ? 'linear-gradient(135deg, hsl(217 91% 60%), hsl(217 91% 50%))' :
                           'linear-gradient(135deg, hsl(25 95% 53%), hsl(25 95% 43%))',
                color: 'white',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: 'hsl(215 16% 47%)', fontSize: '0.875rem' }}>
              Demo credentials:
              <br />
              <strong>admin@constructpro.com / admin123</strong>
              <br />
              <strong>builder@constructpro.com / builder123</strong>
              <br />
              <strong>contractor@constructpro.com / contractor123</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppContent = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const [appState, setAppState] = useState<AppState>("video-loader");

  const handleGetStarted = () => {
    setAppState("role-selection");
  };

  const handleRoleSelect = (role: "admin" | "builder" | "contractor") => {
    setAppState(`${role}-info` as AppState);
  };

  const handleLogin = (role: "admin" | "builder" | "contractor") => {
    // This will be handled by the EnhancedLoginForm
  };

  const handleLoginSuccess = () => {
    setAppState("authenticated");
  };

  const handleBack = () => {
    switch (appState) {
      case "contractor-info":
      case "builder-info":
      case "admin-info":
        setAppState("role-selection");
        break;
      default:
        setAppState("role-selection");
    }
  };

  const handleLogout = () => {
    logout();
    setAppState("role-selection");
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, hsl(210 40% 98%), hsl(217 91% 95%), hsl(221 83% 92%))'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            border: '3px solid hsl(217 91% 60%)',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            margin: '0 auto 1rem',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ color: 'hsl(215 16% 47%)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, show the appropriate dashboard
  if (isAuthenticated && user) {
    return (
      <AppContainer>
        <DashboardContainer>
          <TopBar>
            <Logo>ConstructPro</Logo>
            <TopBarActions>
              <DeadlineTracker showAlerts={true} />
              <NotificationsSystem />
              <UserInfo>
                <UserAvatar role={user.role}>
                  {user.role === 'ADMIN' ? '⚙️' : user.role === 'BUILDER' ? '🏗️' : '👷'}
                </UserAvatar>
                <div>
                  <UserName>{user.firstName} {user.lastName}</UserName>
                  <br />
                  <RoleBadge role={user.role}>{user.role}</RoleBadge>
                </div>
              </UserInfo>
              <LogoutButton onClick={handleLogout}>
                Logout
              </LogoutButton>
            </TopBarActions>
          </TopBar>

          <DashboardContent>
            {user.role === 'ADMIN' && <AdminDashboard user={user} />}
            {user.role === 'BUILDER' && <BuilderDashboard user={user} />}
            {user.role === 'CONTRACTOR' && <ContractorDashboard user={user} />}
          </DashboardContent>
        </DashboardContainer>
      </AppContainer>
    );
  }

  // Show app flow for non-authenticated users
  const renderCurrentScreen = () => {
    switch (appState) {
      case "video-loader":
        return <VideoLoaderScreen onGetStarted={handleGetStarted} />;

      case "role-selection":
        return <RoleSelection onRoleSelect={handleRoleSelect} />;

      case "contractor-info":
        return (
          <ContractorScreen
            onLogin={() => setAppState("role-selection")} // Go to login form
            onSignup={() => setAppState("role-selection")}
            onBack={handleBack}
          />
        );

      case "builder-info":
        return (
          <BuilderScreen
            onLogin={() => setAppState("role-selection")} // Go to login form  
            onSignup={() => setAppState("role-selection")}
            onBack={handleBack}
          />
        );

      case "admin-info":
        return (
          <AdminScreen
            onLogin={() => setAppState("role-selection")} // Go to login form
            onSignup={() => setAppState("role-selection")}
            onBack={handleBack}
          />
        );

      default:
        return <RoleSelection onRoleSelect={handleRoleSelect} />;
    }
  };

  return renderCurrentScreen();
};

// Login Route Component
const LoginRoute = ({ role }: { role: "admin" | "builder" | "contractor" }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <EnhancedLoginForm
      role={role}
      onBack={() => window.history.back()}
      onSuccess={() => window.location.href = '/'}
    />
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <EmotionThemeProvider theme={theme}>
      <GlobalStyles />
      <ThemeProvider defaultTheme="system" storageKey="constructpro-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<AppContent />} />
                <Route path="/login/admin" element={<LoginRoute role="admin" />} />
                <Route path="/login/builder" element={<LoginRoute role="builder" />} />
                <Route path="/login/contractor" element={<LoginRoute role="contractor" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </EmotionThemeProvider>
  </QueryClientProvider>
);

export default App;
