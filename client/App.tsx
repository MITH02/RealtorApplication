import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import VideoLoaderScreen from "./components/VideoLoaderScreen";
import RoleSelection from "./components/RoleSelection";
import ContractorScreen from "./components/roles/ContractorScreen";
import BuilderScreen from "./components/roles/BuilderScreen";
import AdminScreen from "./components/roles/AdminScreen";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
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
  | "admin-login"
  | "contractor-dashboard"
  | "builder-dashboard"
  | "admin-dashboard";

const AppContent = () => {
  const [appState, setAppState] = useState<AppState>("video-loader");

  const handleGetStarted = () => {
    setAppState("role-selection");
  };

  const handleRoleSelect = (role: "builder" | "contractor" | "admin") => {
    setAppState(`${role}-info` as AppState);
  };

  const handleLogin = (role: "builder" | "contractor" | "admin") => {
    setAppState(`${role}-login` as AppState);
  };

  const handleLoginSuccess = (role: "builder" | "contractor" | "admin") => {
    setAppState(`${role}-dashboard` as AppState);
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

  const handleLogout = () => {
    setAppState("role-selection");
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
            onSuccess={() => handleLoginSuccess("contractor")}
          />
        );

      case "builder-login":
        return (
          <LoginForm
            role="builder"
            onBack={handleBack}
            onSuccess={() => handleLoginSuccess("builder")}
          />
        );

      case "admin-login":
        return (
          <LoginForm
            role="admin"
            onBack={handleBack}
            onSuccess={() => handleLoginSuccess("admin")}
          />
        );

      case "contractor-dashboard":
        return <Dashboard role="contractor" onLogout={handleLogout} />;

      case "builder-dashboard":
        return <Dashboard role="builder" onLogout={handleLogout} />;

      case "admin-dashboard":
        return <Dashboard role="admin" onLogout={handleLogout} />;

      default:
        return <RoleSelection onRoleSelect={handleRoleSelect} />;
    }
  };

  return renderCurrentScreen();
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
