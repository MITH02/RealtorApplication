import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { SimpleThemeToggle } from "@/components/theme-toggle";
import {
  apiClient,
  Building,
  Task,
  User,
  BuildingCreateRequest,
  TaskCreateRequest,
} from "@/services/api";

interface BuilderDashboardProps {
  onLogout: () => void;
}

// Keyframes for animations
const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    to bottom right,
    hsl(214, 100%, 98%) 0%,
    hsl(214, 100%, 95%) 50%,
    hsl(214, 100%, 92%) 100%
  );
  position: relative;
  overflow: hidden;

  .dark & {
    background: linear-gradient(
      to bottom right,
      hsl(214, 84%, 5%) 0%,
      hsl(214, 28%, 17%) 50%,
      hsl(214, 50%, 12%) 100%
    );
  }
`;

const FloatingElement = styled.div<{ delay?: string }>`
  position: absolute;
  border-radius: 50%;
  filter: blur(2rem);
  animation: ${floatAnimation} 6s ease-in-out infinite;
  animation-delay: ${(props) => props.delay || "0s"};
`;

const FloatingElement1 = styled(FloatingElement)`
  top: 5rem;
  left: 5rem;
  width: 10rem;
  height: 10rem;
  background: linear-gradient(
    to bottom right,
    hsla(214, 100%, 70%, 0.1),
    hsla(226, 100%, 70%, 0.1)
  );
`;

const FloatingElement2 = styled(FloatingElement)`
  top: 10rem;
  right: 5rem;
  width: 8rem;
  height: 8rem;
  background: linear-gradient(
    to bottom right,
    hsla(214, 100%, 70%, 0.15),
    hsla(226, 100%, 70%, 0.15)
  );
  filter: blur(1rem);
`;

const FloatingElement3 = styled(FloatingElement)`
  bottom: 8rem;
  left: 8rem;
  width: 7rem;
  height: 7rem;
  background: linear-gradient(
    to bottom right,
    hsla(226, 100%, 70%, 0.1),
    hsla(214, 100%, 70%, 0.1)
  );
  filter: blur(0.75rem);
`;

const BackgroundElements = styled.div`
  position: absolute;
  inset: 0;
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  background: hsla(214, 100%, 100%, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid hsla(214, 100%, 100%, 0.5);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  .dark & {
    background: hsla(214, 28%, 17%, 0.8);
    border-bottom: 1px solid hsla(214, 28%, 17%, 0.5);
  }
`;

const HeaderContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 900;
  background: linear-gradient(
    to right,
    hsl(214, 100%, 50%),
    hsl(226, 100%, 50%),
    hsl(238, 100%, 50%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  .dark & {
    background: linear-gradient(
      to right,
      hsl(214, 100%, 70%),
      hsl(226, 100%, 70%),
      hsl(238, 100%, 70%)
    );
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

const RoleBadge = styled.span`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(
    to right,
    hsla(214, 100%, 50%, 0.2),
    hsla(226, 100%, 40%, 0.2)
  );
  backdrop-filter: blur(4px);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(214, 100%, 50%);
  border: 1px solid hsla(214, 100%, 100%, 0.3);

  .dark & {
    border: 1px solid hsla(214, 28%, 17%, 0.3);
    color: hsl(214, 100%, 70%);
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: hsla(214, 100%, 100%, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid hsla(214, 100%, 100%, 0.5);
  color: hsl(214, 16%, 47%);

  &:hover {
    background: hsla(214, 100%, 100%, 0.9);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }

  .dark & {
    background: hsla(214, 28%, 17%, 0.7);
    border: 1px solid hsla(214, 28%, 17%, 0.5);
    color: hsl(214, 20%, 65%);

    &:hover {
      background: hsla(214, 28%, 17%, 0.9);
    }
  }

  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }
`;

const Main = styled.main`
  position: relative;
  z-index: 10;
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (min-width: 640px) {
    padding: 2rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem 2rem;
  }
`;

const TitleSection = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const MainTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  background: linear-gradient(to right, hsl(214, 28%, 17%), hsl(214, 16%, 47%));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1rem;

  .dark & {
    background: linear-gradient(
      to right,
      hsl(214, 100%, 100%),
      hsl(214, 20%, 65%)
    );
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

const WelcomeBox = styled.div`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: hsla(214, 100%, 100%, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 9999px;
  border: 1px solid hsla(214, 100%, 100%, 0.5);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  .dark & {
    background: hsla(214, 28%, 17%, 0.8);
    border: 1px solid hsla(214, 28%, 17%, 0.5);
  }

  p {
    color: hsl(214, 16%, 47%);
    font-weight: 600;

    .dark & {
      color: hsl(214, 20%, 65%);
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div<{ index: number }>`
  background: hsla(214, 100%, 100%, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
  border: 1px solid hsla(214, 100%, 100%, 0.5);
  transition: all 0.5s ease;
  animation: ${fadeIn} 0.5s ease ${(props) => props.index * 100}ms both;

  &:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    transform: scale(1.05) translateY(-0.5rem);
  }

  .dark & {
    background: hsla(214, 28%, 17%, 0.9);
    border: 1px solid hsla(214, 28%, 17%, 0.5);
  }
`;

const StatContent = styled.div`
  display: flex;
  align-items: center;
`;

const StatIcon = styled.div`
  font-size: 2.25rem;
  margin-right: 1rem;
  transition: transform 0.3s ease;

  ${StatCard}:hover & {
    transform: scale(1.1);
  }
`;

const StatValue = styled.p`
  font-size: 1.875rem;
  font-weight: 700;
  background: linear-gradient(
    to right,
    hsl(214, 100%, 50%),
    hsl(226, 100%, 50%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  .dark & {
    background: linear-gradient(
      to right,
      hsl(214, 100%, 70%),
      hsl(226, 100%, 70%)
    );
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

const StatLabel = styled.p`
  color: hsl(214, 16%, 47%);
  font-size: 0.875rem;
  font-weight: 500;

  .dark & {
    color: hsl(214, 20%, 65%);
  }
`;

const TabsContainer = styled.div`
  margin-bottom: 2rem;
`;

const TabsList = styled.div`
  display: flex;
  background: hsla(214, 100%, 100%, 0.5);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  padding: 0.25rem;
  border: 1px solid hsla(214, 100%, 100%, 0.3);
  margin-bottom: 2rem;

  .dark & {
    background: hsla(214, 28%, 17%, 0.5);
    border: 1px solid hsla(214, 28%, 17%, 0.3);
  }
`;

const Tab = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.isActive
      ? "linear-gradient(to right, hsl(214, 100%, 50%), hsl(226, 100%, 50%))"
      : "transparent"};
  color: ${(props) => (props.isActive ? "white" : "hsl(214, 16%, 47%)")};

  &:hover {
    background: ${(props) =>
      props.isActive
        ? "linear-gradient(to right, hsl(214, 100%, 45%), hsl(226, 100%, 45%))"
        : "hsla(214, 100%, 50%, 0.1)"};
  }

  .dark & {
    color: ${(props) => (props.isActive ? "white" : "hsl(214, 20%, 65%)")};
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const MainCard = styled.div`
  background: hsla(214, 100%, 100%, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border: 1px solid hsla(214, 100%, 100%, 0.5);

  .dark & {
    background: hsla(214, 28%, 17%, 0.9);
    border: 1px solid hsla(214, 28%, 17%, 0.5);
  }
`;

const SidebarCard = styled.div`
  background: hsla(214, 100%, 100%, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border: 1px solid hsla(214, 100%, 100%, 0.5);

  .dark & {
    background: hsla(214, 28%, 17%, 0.9);
    border: 1px solid hsla(214, 28%, 17%, 0.5);
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, hsl(214, 28%, 17%), hsl(214, 16%, 47%));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1.5rem;

  .dark & {
    background: linear-gradient(
      to right,
      hsl(214, 100%, 100%),
      hsl(214, 20%, 65%)
    );
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(
    to right,
    hsl(214, 100%, 50%),
    hsl(226, 100%, 50%)
  );
  color: white;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;

  &:hover {
    background: linear-gradient(
      to right,
      hsl(214, 100%, 45%),
      hsl(226, 100%, 45%)
    );
    transform: scale(1.05);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
  }
`;

const Card = styled.div`
  background: hsla(214, 100%, 100%, 0.5);
  backdrop-filter: blur(4px);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid hsla(214, 100%, 100%, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: hsla(214, 100%, 100%, 0.8);
    transform: scale(1.02);
  }

  .dark & {
    background: hsla(214, 28%, 17%, 0.5);
    border: 1px solid hsla(214, 28%, 17%, 0.3);

    &:hover {
      background: hsla(214, 28%, 17%, 0.8);
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: hsl(214, 28%, 17%);

  .dark & {
    color: hsl(214, 20%, 65%);
  }
`;

const CardMeta = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Badge = styled.span<{
  variant: "status" | "priority" | "type";
  color: string;
}>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(props) => {
    switch (props.color) {
      case "green":
        return "linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 26%))";
      case "yellow":
        return "linear-gradient(to right, hsl(45, 100%, 51%), hsl(45, 100%, 41%))";
      case "red":
        return "linear-gradient(to right, hsl(0, 84%, 60%), hsl(0, 84%, 50%))";
      case "blue":
        return "linear-gradient(to right, hsl(214, 100%, 60%), hsl(214, 100%, 50%))";
      case "purple":
        return "linear-gradient(to right, hsl(271, 100%, 60%), hsl(271, 100%, 50%))";
      default:
        return "linear-gradient(to right, hsl(214, 100%, 60%), hsl(214, 100%, 50%))";
    }
  }};
  color: white;
`;

const CardContent = styled.div`
  color: hsl(214, 16%, 47%);
  font-size: 0.875rem;
  line-height: 1.5;

  .dark & {
    color: hsl(214, 20%, 65%);
  }
`;

const ProgressBar = styled.div`
  margin-top: 1rem;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: between;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  color: hsl(214, 16%, 47%);

  .dark & {
    color: hsl(214, 20%, 65%);
  }
`;

const ProgressTrack = styled.div`
  height: 0.5rem;
  background: hsla(214, 100%, 100%, 0.3);
  border-radius: 9999px;
  overflow: hidden;

  .dark & {
    background: hsla(214, 28%, 17%, 0.3);
  }
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${(props) => props.progress}%;
  background: linear-gradient(
    to right,
    hsl(214, 100%, 50%),
    hsl(226, 100%, 50%)
  );
  border-radius: 9999px;
  transition: width 0.5s ease;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button<{
  variant: "primary" | "secondary" | "danger";
}>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.3s ease;
  background: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "linear-gradient(to right, hsl(214, 100%, 50%), hsl(226, 100%, 50%))";
      case "secondary":
        return "hsla(214, 100%, 100%, 0.5)";
      case "danger":
        return "linear-gradient(to right, hsl(0, 84%, 60%), hsl(0, 84%, 50%))";
      default:
        return "hsla(214, 100%, 100%, 0.5)";
    }
  }};
  color: ${(props) =>
    props.variant === "secondary" ? "hsl(214, 16%, 47%)" : "white"};
  border: ${(props) =>
    props.variant === "secondary"
      ? "1px solid hsla(214, 100%, 100%, 0.3)"
      : "none"};

  &:hover {
    transform: scale(1.05);
    background: ${(props) => {
      switch (props.variant) {
        case "primary":
          return "linear-gradient(to right, hsl(214, 100%, 45%), hsl(226, 100%, 45%))";
        case "secondary":
          return "hsla(214, 100%, 100%, 0.8)";
        case "danger":
          return "linear-gradient(to right, hsl(0, 84%, 55%), hsl(0, 84%, 45%))";
        default:
          return "hsla(214, 100%, 100%, 0.8)";
      }
    }};
  }

  .dark & {
    color: ${(props) =>
      props.variant === "secondary" ? "hsl(214, 20%, 65%)" : "white"};
    background: ${(props) => {
      if (props.variant === "secondary") {
        return "hsla(214, 28%, 17%, 0.5)";
      }
      return props.variant === "danger"
        ? "linear-gradient(to right, hsl(0, 84%, 60%), hsl(0, 84%, 50%))"
        : "linear-gradient(to right, hsl(214, 100%, 50%), hsl(226, 100%, 50%))";
    }};
    border: ${(props) =>
      props.variant === "secondary"
        ? "1px solid hsla(214, 28%, 17%, 0.3)"
        : "none"};

    &:hover {
      background: ${(props) => {
        if (props.variant === "secondary") {
          return "hsla(214, 28%, 17%, 0.8)";
        }
        return props.variant === "danger"
          ? "linear-gradient(to right, hsl(0, 84%, 55%), hsl(0, 84%, 45%))"
          : "linear-gradient(to right, hsl(214, 100%, 45%), hsl(226, 100%, 45%))";
      }};
    }
  }
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 50;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: hsla(214, 100%, 100%, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  padding: 2rem;
  margin: 1rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);

  .dark & {
    background: hsla(214, 28%, 17%, 0.95);
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: hsl(214, 16%, 47%);

  .dark & {
    color: hsl(214, 20%, 65%);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid hsla(214, 100%, 100%, 0.3);
  border-radius: 0.5rem;
  background: hsla(214, 100%, 100%, 0.5);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: hsl(214, 100%, 50%);
    box-shadow: 0 0 0 3px hsla(214, 100%, 50%, 0.1);
  }

  .dark & {
    background: hsla(214, 28%, 17%, 0.5);
    border-color: hsla(214, 28%, 17%, 0.3);
    color: hsl(214, 20%, 65%);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid hsla(214, 100%, 100%, 0.3);
  border-radius: 0.5rem;
  background: hsla(214, 100%, 100%, 0.5);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: hsl(214, 100%, 50%);
    box-shadow: 0 0 0 3px hsla(214, 100%, 50%, 0.1);
  }

  .dark & {
    background: hsla(214, 28%, 17%, 0.5);
    border-color: hsla(214, 28%, 17%, 0.3);
    color: hsl(214, 20%, 65%);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid hsla(214, 100%, 100%, 0.3);
  border-radius: 0.5rem;
  background: hsla(214, 100%, 100%, 0.5);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: hsl(214, 100%, 50%);
    box-shadow: 0 0 0 3px hsla(214, 100%, 50%, 0.1);
  }

  .dark & {
    background: hsla(214, 28%, 17%, 0.5);
    border-color: hsla(214, 28%, 17%, 0.3);
    color: hsl(214, 20%, 65%);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SubmitButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background: linear-gradient(
    to right,
    hsl(214, 100%, 50%),
    hsl(226, 100%, 50%)
  );
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(
      to right,
      hsl(214, 100%, 45%),
      hsl(226, 100%, 45%)
    );
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background: hsla(214, 100%, 100%, 0.5);
  color: hsl(214, 16%, 47%);
  border: 1px solid hsla(214, 100%, 100%, 0.3);
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: hsla(214, 100%, 100%, 0.8);
    transform: scale(1.05);
  }

  .dark & {
    background: hsla(214, 28%, 17%, 0.5);
    border-color: hsla(214, 28%, 17%, 0.3);
    color: hsl(214, 20%, 65%);

    &:hover {
      background: hsla(214, 28%, 17%, 0.8);
    }
  }
`;

const ErrorMessage = styled.div`
  padding: 0.75rem;
  background: hsla(0, 84%, 60%, 0.1);
  border: 1px solid hsla(0, 84%, 60%, 0.3);
  border-radius: 0.5rem;
  color: hsl(0, 84%, 60%);
  margin-bottom: 1rem;
`;

const LoadingSpinner = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid hsla(214, 100%, 50%, 0.3);
  border-top: 2px solid hsl(214, 100%, 50%);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const getStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
    case "APPROVED":
      return "green";
    case "IN_PROGRESS":
      return "blue";
    case "PENDING":
      return "yellow";
    case "REJECTED":
    case "OVERDUE":
      return "red";
    case "ON_HOLD":
      return "purple";
    default:
      return "blue";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "URGENT":
      return "red";
    case "HIGH":
      return "yellow";
    case "MEDIUM":
      return "blue";
    case "LOW":
      return "green";
    default:
      return "blue";
  }
};

export default function BuilderDashboard({ onLogout }: BuilderDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "buildings" | "tasks" | "approvals"
  >("buildings");
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [contractors, setContractors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [showBuildingModal, setShowBuildingModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null,
  );

  // Form data
  const [buildingForm, setBuildingForm] = useState<
    Partial<BuildingCreateRequest>
  >({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    type: "RESIDENTIAL",
    totalFloors: 1,
    totalArea: 0,
    estimatedBudget: 0,
    startDate: "",
    expectedCompletionDate: "",
    projectManagerId: 0,
  });

  const [taskForm, setTaskForm] = useState<Partial<TaskCreateRequest>>({
    name: "",
    description: "",
    type: "OTHER",
    priority: "MEDIUM",
    estimatedDurationDays: 1,
    estimatedCost: 0,
    startDate: "",
    deadline: "",
    buildingId: 0,
    assignedContractorId: 0,
  });

  // Stats
  const [stats, setStats] = useState({
    totalBuildings: 0,
    activeTasks: 0,
    pendingApprovals: 0,
    completedProjects: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [buildingsData, tasksData, pendingData, contractorsData] =
        await Promise.all([
          apiClient.getBuildings(),
          apiClient.getAllAdminTasks(),
          apiClient.getPendingApprovalTasks(),
          apiClient.getContractors(),
        ]);

      setBuildings(buildingsData);
      setTasks(tasksData);
      setPendingTasks(pendingData);
      setContractors(contractorsData);

      // Calculate stats
      const completedCount = buildingsData.filter(
        (b) => b.status === "COMPLETED",
      ).length;
      const activeTasksCount = tasksData.filter(
        (t) => t.status === "IN_PROGRESS" || t.status === "PENDING",
      ).length;

      setStats({
        totalBuildings: buildingsData.length,
        activeTasks: activeTasksCount,
        pendingApprovals: pendingData.length,
        completedProjects: completedCount,
      });
    } catch (err) {
      setError("Failed to load data");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBuilding = async () => {
    try {
      setLoading(true);
      await apiClient.createBuilding(buildingForm as BuildingCreateRequest);
      setShowBuildingModal(false);
      setBuildingForm({
        name: "",
        description: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        type: "RESIDENTIAL",
        totalFloors: 1,
        totalArea: 0,
        estimatedBudget: 0,
        startDate: "",
        expectedCompletionDate: "",
        projectManagerId: 0,
      });
      await loadData();
    } catch (err) {
      setError("Failed to create building");
      console.error("Error creating building:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async () => {
    try {
      setLoading(true);
      await apiClient.createTask(taskForm as TaskCreateRequest);
      setShowTaskModal(false);
      setTaskForm({
        name: "",
        description: "",
        type: "OTHER",
        priority: "MEDIUM",
        estimatedDurationDays: 1,
        estimatedCost: 0,
        startDate: "",
        deadline: "",
        buildingId: 0,
        assignedContractorId: 0,
      });
      await loadData();
    } catch (err) {
      setError("Failed to create task");
      console.error("Error creating task:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveTask = async (taskId: number) => {
    try {
      await apiClient.approveTask(taskId);
      await loadData();
    } catch (err) {
      setError("Failed to approve task");
      console.error("Error approving task:", err);
    }
  };

  const handleRejectTask = async (taskId: number, reason: string) => {
    try {
      await apiClient.rejectTask(taskId, reason);
      await loadData();
    } catch (err) {
      setError("Failed to reject task");
      console.error("Error rejecting task:", err);
    }
  };

  const renderBuildings = () => (
    <>
      <CreateButton onClick={() => setShowBuildingModal(true)}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Create New Building
      </CreateButton>

      {buildings.map((building) => (
        <Card key={building.id}>
          <CardHeader>
            <CardTitle>{building.name}</CardTitle>
            <CardMeta>
              <Badge variant="status" color={getStatusColor(building.status)}>
                {building.status}
              </Badge>
              <Badge variant="type" color="blue">
                {building.type}
              </Badge>
            </CardMeta>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Address:</strong> {building.address}, {building.city}
            </p>
            <p>
              <strong>Manager:</strong> {building.projectManager.firstName}{" "}
              {building.projectManager.lastName}
            </p>
            {building.description && <p>{building.description}</p>}
          </CardContent>
          {building.completionPercentage !== undefined && (
            <ProgressBar>
              <ProgressLabel>
                <span>Progress</span>
                <span>{building.completionPercentage}%</span>
              </ProgressLabel>
              <ProgressTrack>
                <ProgressFill progress={building.completionPercentage} />
              </ProgressTrack>
            </ProgressBar>
          )}
          <ActionButtons>
            <ActionButton
              variant="primary"
              onClick={() => setSelectedBuilding(building)}
            >
              View Details
            </ActionButton>
            <ActionButton
              variant="secondary"
              onClick={() => setShowTaskModal(true)}
            >
              Add Task
            </ActionButton>
          </ActionButtons>
        </Card>
      ))}
    </>
  );

  const renderTasks = () => (
    <>
      <CreateButton onClick={() => setShowTaskModal(true)}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Create New Task
      </CreateButton>

      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader>
            <CardTitle>{task.name}</CardTitle>
            <CardMeta>
              <Badge variant="status" color={getStatusColor(task.status)}>
                {task.status}
              </Badge>
              <Badge variant="priority" color={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
              <Badge variant="type" color="purple">
                {task.type}
              </Badge>
            </CardMeta>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Building:</strong> {task.building.name}
            </p>
            {task.assignedContractor && (
              <p>
                <strong>Contractor:</strong> {task.assignedContractor.firstName}{" "}
                {task.assignedContractor.lastName}
              </p>
            )}
            {task.deadline && (
              <p>
                <strong>Deadline:</strong>{" "}
                {new Date(task.deadline).toLocaleDateString()}
              </p>
            )}
            {task.description && <p>{task.description}</p>}
          </CardContent>
          <ProgressBar>
            <ProgressLabel>
              <span>Progress</span>
              <span>{task.progressPercentage}%</span>
            </ProgressLabel>
            <ProgressTrack>
              <ProgressFill progress={task.progressPercentage} />
            </ProgressTrack>
          </ProgressBar>
        </Card>
      ))}
    </>
  );

  const renderApprovals = () => (
    <>
      {pendingTasks.map((task) => (
        <Card key={task.id}>
          <CardHeader>
            <CardTitle>{task.name}</CardTitle>
            <CardMeta>
              <Badge variant="status" color="yellow">
                PENDING APPROVAL
              </Badge>
              <Badge variant="priority" color={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
            </CardMeta>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Building:</strong> {task.building.name}
            </p>
            {task.assignedContractor && (
              <p>
                <strong>Contractor:</strong> {task.assignedContractor.firstName}{" "}
                {task.assignedContractor.lastName}
              </p>
            )}
            {task.completionNotes && (
              <p>
                <strong>Completion Notes:</strong> {task.completionNotes}
              </p>
            )}
            {task.completionDate && (
              <p>
                <strong>Completed:</strong>{" "}
                {new Date(task.completionDate).toLocaleDateString()}
              </p>
            )}
          </CardContent>
          <ActionButtons>
            <ActionButton
              variant="primary"
              onClick={() => handleApproveTask(task.id)}
            >
              Approve
            </ActionButton>
            <ActionButton
              variant="danger"
              onClick={() => handleRejectTask(task.id, "Needs revision")}
            >
              Reject
            </ActionButton>
          </ActionButtons>
        </Card>
      ))}
    </>
  );

  return (
    <DashboardContainer>
      <BackgroundElements>
        <FloatingElement1 />
        <FloatingElement2 delay="1s" />
        <FloatingElement3 delay="2s" />
      </BackgroundElements>

      <Header>
        <HeaderContainer>
          <HeaderContent>
            <HeaderLeft>
              <Title>ConstructPro</Title>
              <RoleBadge>Builder</RoleBadge>
            </HeaderLeft>
            <HeaderRight>
              <SimpleThemeToggle />
              <LogoutButton onClick={onLogout}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </LogoutButton>
            </HeaderRight>
          </HeaderContent>
        </HeaderContainer>
      </Header>

      <Main>
        <TitleSection>
          <MainTitle>Builder Dashboard</MainTitle>
          <WelcomeBox>
            <p>Manage your construction projects and track progress</p>
          </WelcomeBox>
        </TitleSection>

        {/* Stats Grid */}
        <StatsGrid>
          <StatCard index={0}>
            <StatContent>
              <StatIcon>🏢</StatIcon>
              <div>
                <StatValue>{stats.totalBuildings}</StatValue>
                <StatLabel>Total Buildings</StatLabel>
              </div>
            </StatContent>
          </StatCard>
          <StatCard index={1}>
            <StatContent>
              <StatIcon>🚧</StatIcon>
              <div>
                <StatValue>{stats.activeTasks}</StatValue>
                <StatLabel>Active Tasks</StatLabel>
              </div>
            </StatContent>
          </StatCard>
          <StatCard index={2}>
            <StatContent>
              <StatIcon>⏳</StatIcon>
              <div>
                <StatValue>{stats.pendingApprovals}</StatValue>
                <StatLabel>Pending Approvals</StatLabel>
              </div>
            </StatContent>
          </StatCard>
          <StatCard index={3}>
            <StatContent>
              <StatIcon>✅</StatIcon>
              <div>
                <StatValue>{stats.completedProjects}</StatValue>
                <StatLabel>Completed Projects</StatLabel>
              </div>
            </StatContent>
          </StatCard>
        </StatsGrid>

        <TabsContainer>
          <TabsList>
            <Tab
              isActive={activeTab === "buildings"}
              onClick={() => setActiveTab("buildings")}
            >
              Buildings
            </Tab>
            <Tab
              isActive={activeTab === "tasks"}
              onClick={() => setActiveTab("tasks")}
            >
              Tasks
            </Tab>
            <Tab
              isActive={activeTab === "approvals"}
              onClick={() => setActiveTab("approvals")}
            >
              Approvals
            </Tab>
          </TabsList>
        </TabsContainer>

        <ContentGrid>
          <MainCard>
            <SectionTitle>
              {activeTab === "buildings" && "Building Management"}
              {activeTab === "tasks" && "Task Management"}
              {activeTab === "approvals" && "Pending Approvals"}
            </SectionTitle>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {loading ? (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {activeTab === "buildings" && renderBuildings()}
                {activeTab === "tasks" && renderTasks()}
                {activeTab === "approvals" && renderApprovals()}
              </>
            )}
          </MainCard>

          <SidebarCard>
            <SectionTitle>Quick Stats</SectionTitle>
            <Card>
              <CardContent>
                <p>
                  <strong>Overdue Tasks:</strong>{" "}
                  {tasks.filter((t) => t.isOverdue).length}
                </p>
                <p>
                  <strong>This Week's Deadlines:</strong>{" "}
                  {
                    tasks.filter((t) => {
                      if (!t.deadline) return false;
                      const deadline = new Date(t.deadline);
                      const nextWeek = new Date(
                        Date.now() + 7 * 24 * 60 * 60 * 1000,
                      );
                      return deadline <= nextWeek;
                    }).length
                  }
                </p>
                <p>
                  <strong>Active Contractors:</strong>{" "}
                  {contractors.filter((c) => c.isActive).length}
                </p>
              </CardContent>
            </Card>
          </SidebarCard>
        </ContentGrid>
      </Main>

      {/* Building Modal */}
      <Modal isOpen={showBuildingModal}>
        <ModalContent>
          <SectionTitle>Create New Building</SectionTitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGrid>
            <FormGroup>
              <Label>Building Name</Label>
              <Input
                type="text"
                value={buildingForm.name || ""}
                onChange={(e) =>
                  setBuildingForm({ ...buildingForm, name: e.target.value })
                }
                placeholder="Enter building name"
              />
            </FormGroup>

            <FormGroup>
              <Label>Type</Label>
              <Select
                value={buildingForm.type || "RESIDENTIAL"}
                onChange={(e) =>
                  setBuildingForm({
                    ...buildingForm,
                    type: e.target.value as any,
                  })
                }
              >
                <option value="RESIDENTIAL">Residential</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="INDUSTRIAL">Industrial</option>
                <option value="INFRASTRUCTURE">Infrastructure</option>
              </Select>
            </FormGroup>
          </FormGrid>

          <FormGroup>
            <Label>Description</Label>
            <Textarea
              value={buildingForm.description || ""}
              onChange={(e) =>
                setBuildingForm({
                  ...buildingForm,
                  description: e.target.value,
                })
              }
              placeholder="Enter building description"
            />
          </FormGroup>

          <FormGrid>
            <FormGroup>
              <Label>Address</Label>
              <Input
                type="text"
                value={buildingForm.address || ""}
                onChange={(e) =>
                  setBuildingForm({ ...buildingForm, address: e.target.value })
                }
                placeholder="Enter address"
              />
            </FormGroup>

            <FormGroup>
              <Label>City</Label>
              <Input
                type="text"
                value={buildingForm.city || ""}
                onChange={(e) =>
                  setBuildingForm({ ...buildingForm, city: e.target.value })
                }
                placeholder="Enter city"
              />
            </FormGroup>
          </FormGrid>

          <FormGrid>
            <FormGroup>
              <Label>State</Label>
              <Input
                type="text"
                value={buildingForm.state || ""}
                onChange={(e) =>
                  setBuildingForm({ ...buildingForm, state: e.target.value })
                }
                placeholder="Enter state"
              />
            </FormGroup>

            <FormGroup>
              <Label>Postal Code</Label>
              <Input
                type="text"
                value={buildingForm.postalCode || ""}
                onChange={(e) =>
                  setBuildingForm({
                    ...buildingForm,
                    postalCode: e.target.value,
                  })
                }
                placeholder="Enter postal code"
              />
            </FormGroup>
          </FormGrid>

          <FormGrid>
            <FormGroup>
              <Label>Total Floors</Label>
              <Input
                type="number"
                value={buildingForm.totalFloors || 1}
                onChange={(e) =>
                  setBuildingForm({
                    ...buildingForm,
                    totalFloors: parseInt(e.target.value),
                  })
                }
                min="1"
              />
            </FormGroup>

            <FormGroup>
              <Label>Total Area (sq ft)</Label>
              <Input
                type="number"
                value={buildingForm.totalArea || ""}
                onChange={(e) =>
                  setBuildingForm({
                    ...buildingForm,
                    totalArea: parseFloat(e.target.value),
                  })
                }
              />
            </FormGroup>
          </FormGrid>

          <FormGrid>
            <FormGroup>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={buildingForm.startDate || ""}
                onChange={(e) =>
                  setBuildingForm({
                    ...buildingForm,
                    startDate: e.target.value,
                  })
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>Expected Completion</Label>
              <Input
                type="date"
                value={buildingForm.expectedCompletionDate || ""}
                onChange={(e) =>
                  setBuildingForm({
                    ...buildingForm,
                    expectedCompletionDate: e.target.value,
                  })
                }
              />
            </FormGroup>
          </FormGrid>

          <ButtonGroup>
            <CancelButton onClick={() => setShowBuildingModal(false)}>
              Cancel
            </CancelButton>
            <SubmitButton onClick={handleCreateBuilding} disabled={loading}>
              {loading ? <LoadingSpinner /> : "Create Building"}
            </SubmitButton>
          </ButtonGroup>
        </ModalContent>
      </Modal>

      {/* Task Modal */}
      <Modal isOpen={showTaskModal}>
        <ModalContent>
          <SectionTitle>Create New Task</SectionTitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGrid>
            <FormGroup>
              <Label>Task Name</Label>
              <Input
                type="text"
                value={taskForm.name || ""}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, name: e.target.value })
                }
                placeholder="Enter task name"
              />
            </FormGroup>

            <FormGroup>
              <Label>Building</Label>
              <Select
                value={taskForm.buildingId || ""}
                onChange={(e) =>
                  setTaskForm({
                    ...taskForm,
                    buildingId: parseInt(e.target.value),
                  })
                }
              >
                <option value="">Select Building</option>
                {buildings.map((building) => (
                  <option key={building.id} value={building.id}>
                    {building.name}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </FormGrid>

          <FormGroup>
            <Label>Description</Label>
            <Textarea
              value={taskForm.description || ""}
              onChange={(e) =>
                setTaskForm({ ...taskForm, description: e.target.value })
              }
              placeholder="Enter task description"
            />
          </FormGroup>

          <FormGrid>
            <FormGroup>
              <Label>Type</Label>
              <Select
                value={taskForm.type || "OTHER"}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, type: e.target.value as any })
                }
              >
                <option value="FOUNDATION">Foundation</option>
                <option value="FRAMING">Framing</option>
                <option value="ROOFING">Roofing</option>
                <option value="ELECTRICAL">Electrical</option>
                <option value="PLUMBING">Plumbing</option>
                <option value="HVAC">HVAC</option>
                <option value="DRYWALL">Drywall</option>
                <option value="FLOORING">Flooring</option>
                <option value="PAINTING">Painting</option>
                <option value="LANDSCAPING">Landscaping</option>
                <option value="INSPECTION">Inspection</option>
                <option value="OTHER">Other</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Priority</Label>
              <Select
                value={taskForm.priority || "MEDIUM"}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, priority: e.target.value as any })
                }
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </Select>
            </FormGroup>
          </FormGrid>

          <FormGrid>
            <FormGroup>
              <Label>Assigned Contractor</Label>
              <Select
                value={taskForm.assignedContractorId || ""}
                onChange={(e) =>
                  setTaskForm({
                    ...taskForm,
                    assignedContractorId: parseInt(e.target.value),
                  })
                }
              >
                <option value="">Select Contractor</option>
                {contractors.map((contractor) => (
                  <option key={contractor.id} value={contractor.id}>
                    {contractor.firstName} {contractor.lastName}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Duration (days)</Label>
              <Input
                type="number"
                value={taskForm.estimatedDurationDays || 1}
                onChange={(e) =>
                  setTaskForm({
                    ...taskForm,
                    estimatedDurationDays: parseInt(e.target.value),
                  })
                }
                min="1"
              />
            </FormGroup>
          </FormGrid>

          <FormGrid>
            <FormGroup>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={taskForm.startDate || ""}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, startDate: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>Deadline</Label>
              <Input
                type="date"
                value={taskForm.deadline || ""}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, deadline: e.target.value })
                }
              />
            </FormGroup>
          </FormGrid>

          <ButtonGroup>
            <CancelButton onClick={() => setShowTaskModal(false)}>
              Cancel
            </CancelButton>
            <SubmitButton onClick={handleCreateTask} disabled={loading}>
              {loading ? <LoadingSpinner /> : "Create Task"}
            </SubmitButton>
          </ButtonGroup>
        </ModalContent>
      </Modal>
    </DashboardContainer>
  );
}
