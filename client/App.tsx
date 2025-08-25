import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import BuilderDashboard from "./components/BuilderDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

type AppState =
  | "video-loader"
  | "role-selection"
  | "contractor-info"
  | "builder-info"
  | "admin-info"
  | "contractor-login"
  | "builder-login"
  | "admin-login";

const AppContent = () => {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const [appState, setAppState] = useState<AppState>("video-loader");

  // Show loading while authentication is being checked
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, hsl(210 40% 98%), hsl(217 91% 95%), hsl(221 83% 92%))",
        }}
      >
        <div
          style={{
            width: "3rem",
            height: "3rem",
            border: "4px solid hsla(214, 100%, 50%, 0.3)",
            borderTop: "4px solid hsl(214, 100%, 50%)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // If user is authenticated, show appropriate dashboard
  if (isAuthenticated && user) {
    switch (user.role) {
      case "SUPER_ADMIN":
        return <AdminDashboard onLogout={logout} />;
      case "ADMIN":
        return <BuilderDashboard onLogout={logout} />;
      case "CONTRACTOR":
        return <Dashboard role="contractor" onLogout={logout} />;
      default:
        // Unknown role, logout user
        logout();
        return <RoleSelection onRoleSelect={handleRoleSelect} />;
    }
  }

  const handleGetStarted = () => {
    setAppState("role-selection");
  };

  const handleRoleSelect = (role: "builder" | "contractor" | "admin") => {
    setAppState(`${role}-info` as AppState);
  };

  const handleLogin = (role: "builder" | "contractor" | "admin") => {
    setAppState(`${role}-login` as AppState);
  };

  const handleLoginSuccess = () => {
    // After successful login, the user state will update and the component will re-render
    // showing the appropriate dashboard based on the user's role
  };

  const handleBack = () => {
    switch (appState) {
      case "contractor-info":
      case "builder-info":
      case "admin-info":
        setAppState("role-selection");
        break;
      case "contractor-login":
        setAppState("contractor-info");
        break;
      case "builder-login":
        setAppState("builder-info");
        break;
      case "admin-login":
        setAppState("admin-info");
        break;
      default:
        setAppState("role-selection");
    }
  };

  const renderCurrentScreen = () => {
    switch (appState) {
      case "video-loader":
        return <VideoLoaderScreen onGetStarted={handleGetStarted} />;

      case "role-selection":
        return <RoleSelection onRoleSelect={handleRoleSelect} />;

      case "contractor-info":
        return (
          <ContractorScreen
            onLogin={() => handleLogin("contractor")}
            onSignup={() => handleLogin("contractor")}
            onBack={handleBack}
          />
        );

      case "builder-info":
        return (
          <BuilderScreen
            onLogin={() => handleLogin("builder")}
            onSignup={() => handleLogin("builder")}
            onBack={handleBack}
          />
        );

      case "admin-info":
        return (
          <AdminScreen
            onLogin={() => handleLogin("admin")}
            onSignup={() => handleLogin("admin")}
            onBack={handleBack}
          />
        );

      case "contractor-login":
        return (
          <LoginForm
            role="contractor"
            onBack={handleBack}
            onSuccess={handleLoginSuccess}
          />
        );

      case "builder-login":
        return (
          <LoginForm
            role="builder"
            onBack={handleBack}
            onSuccess={handleLoginSuccess}
          />
        );

      case "admin-login":
        return (
          <LoginForm
            role="admin"
            onBack={handleBack}
            onSuccess={handleLoginSuccess}
          />
        );

      default:
        return <RoleSelection onRoleSelect={handleRoleSelect} />;
    }
  };

  return renderCurrentScreen();
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
