import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { SimpleThemeToggle } from "@/components/theme-toggle";
import { apiClient, User, SignupRequest } from "@/services/api";

interface AdminDashboardProps {
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
    hsl(271, 91%, 98%) 0%,
    hsl(271, 91%, 95%) 50%,
    hsl(271, 91%, 92%) 100%
  );
  position: relative;
  overflow: hidden;

  .dark & {
    background: linear-gradient(
      to bottom right,
      hsl(271, 84%, 5%) 0%,
      hsl(271, 28%, 17%) 50%,
      hsl(271, 50%, 12%) 100%
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
    hsla(271, 100%, 70%, 0.1),
    hsla(280, 100%, 70%, 0.1)
  );
`;

const FloatingElement2 = styled(FloatingElement)`
  top: 10rem;
  right: 5rem;
  width: 8rem;
  height: 8rem;
  background: linear-gradient(
    to bottom right,
    hsla(271, 100%, 70%, 0.15),
    hsla(280, 100%, 70%, 0.15)
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
    hsla(280, 100%, 70%, 0.1),
    hsla(290, 100%, 70%, 0.1)
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
  background: hsla(271, 91%, 100%, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid hsla(271, 91%, 100%, 0.5);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  .dark & {
    background: hsla(271, 28%, 17%, 0.8);
    border-bottom: 1px solid hsla(271, 28%, 17%, 0.5);
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
    hsl(271, 100%, 50%),
    hsl(280, 100%, 50%),
    hsl(290, 100%, 50%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  .dark & {
    background: linear-gradient(
      to right,
      hsl(271, 100%, 70%),
      hsl(280, 100%, 70%),
      hsl(290, 100%, 70%)
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
    hsla(271, 100%, 50%, 0.2),
    hsla(280, 100%, 40%, 0.2)
  );
  backdrop-filter: blur(4px);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(271, 100%, 50%);
  border: 1px solid hsla(271, 91%, 100%, 0.3);

  .dark & {
    border: 1px solid hsla(271, 28%, 17%, 0.3);
    color: hsl(271, 100%, 70%);
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
  background: hsla(271, 91%, 100%, 0.7);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid hsla(271, 91%, 100%, 0.5);
  color: hsl(271, 16%, 47%);

  &:hover {
    background: hsla(271, 91%, 100%, 0.9);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
  }

  .dark & {
    background: hsla(271, 28%, 17%, 0.7);
    border: 1px solid hsla(271, 28%, 17%, 0.5);
    color: hsl(271, 20%, 65%);

    &:hover {
      background: hsla(271, 28%, 17%, 0.9);
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
  background: linear-gradient(to right, hsl(271, 28%, 17%), hsl(271, 16%, 47%));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1rem;

  .dark & {
    background: linear-gradient(
      to right,
      hsl(271, 91%, 100%),
      hsl(271, 20%, 65%)
    );
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

const WelcomeBox = styled.div`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: hsla(271, 91%, 100%, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 9999px;
  border: 1px solid hsla(271, 91%, 100%, 0.5);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  .dark & {
    background: hsla(271, 28%, 17%, 0.8);
    border: 1px solid hsla(271, 28%, 17%, 0.5);
  }

  p {
    color: hsl(271, 16%, 47%);
    font-weight: 600;

    .dark & {
      color: hsl(271, 20%, 65%);
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
  background: hsla(271, 91%, 100%, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
  border: 1px solid hsla(271, 91%, 100%, 0.5);
  transition: all 0.5s ease;
  animation: ${fadeIn} 0.5s ease ${(props) => props.index * 100}ms both;

  &:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    transform: scale(1.05) translateY(-0.5rem);
  }

  .dark & {
    background: hsla(271, 28%, 17%, 0.9);
    border: 1px solid hsla(271, 28%, 17%, 0.5);
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
    hsl(271, 100%, 50%),
    hsl(280, 100%, 50%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  .dark & {
    background: linear-gradient(
      to right,
      hsl(271, 100%, 70%),
      hsl(280, 100%, 70%)
    );
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

const StatLabel = styled.p`
  color: hsl(271, 16%, 47%);
  font-size: 0.875rem;
  font-weight: 500;

  .dark & {
    color: hsl(271, 20%, 65%);
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

const BuilderManagementCard = styled.div`
  background: hsla(271, 91%, 100%, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border: 1px solid hsla(271, 91%, 100%, 0.5);

  .dark & {
    background: hsla(271, 28%, 17%, 0.9);
    border: 1px solid hsla(271, 28%, 17%, 0.5);
  }
`;

const SidebarCard = styled.div`
  background: hsla(271, 91%, 100%, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border: 1px solid hsla(271, 91%, 100%, 0.5);

  .dark & {
    background: hsla(271, 28%, 17%, 0.9);
    border: 1px solid hsla(271, 28%, 17%, 0.5);
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, hsl(271, 28%, 17%), hsl(271, 16%, 47%));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1.5rem;

  .dark & {
    background: linear-gradient(
      to right,
      hsl(271, 91%, 100%),
      hsl(271, 20%, 65%)
    );
    background-clip: text;
    -webkit-background-clip: text;
  }
`;

const CreateBuilderButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(
    to right,
    hsl(271, 100%, 50%),
    hsl(280, 100%, 50%)
  );
  color: white;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;

  &:hover {
    background: linear-gradient(
      to right,
      hsl(271, 100%, 45%),
      hsl(280, 100%, 45%)
    );
    transform: scale(1.05);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
  }
`;

const BuilderTable = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  font-weight: 600;
  color: hsl(271, 16%, 47%);
  border-bottom: 1px solid hsla(271, 91%, 100%, 0.3);

  .dark & {
    color: hsl(271, 20%, 65%);
    border-bottom: 1px solid hsla(271, 28%, 17%, 0.3);
  }
`;

const TableRow = styled.tr`
  transition: all 0.2s ease;

  &:hover {
    background: hsla(271, 100%, 50%, 0.05);
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid hsla(271, 91%, 100%, 0.1);

  .dark & {
    border-bottom: 1px solid hsla(271, 28%, 17%, 0.1);
  }
`;

const StatusBadge = styled.span<{ status: "active" | "inactive" }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(props) =>
    props.status === "active"
      ? "linear-gradient(to right, hsl(142, 76%, 36%), hsl(142, 76%, 26%))"
      : "linear-gradient(to right, hsl(0, 84%, 60%), hsl(0, 84%, 50%))"};
  color: white;
`;

const ActionButton = styled.button<{
  variant: "edit" | "deactivate" | "activate";
}>`
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0 0.25rem;
  transition: all 0.2s ease;
  background: ${(props) => {
    switch (props.variant) {
      case "edit":
        return "hsla(214, 100%, 50%, 0.1)";
      case "deactivate":
        return "hsla(0, 84%, 60%, 0.1)";
      case "activate":
        return "hsla(142, 76%, 36%, 0.1)";
      default:
        return "hsla(214, 100%, 50%, 0.1)";
    }
  }};
  color: ${(props) => {
    switch (props.variant) {
      case "edit":
        return "hsl(214, 100%, 50%)";
      case "deactivate":
        return "hsl(0, 84%, 60%)";
      case "activate":
        return "hsl(142, 76%, 36%)";
      default:
        return "hsl(214, 100%, 50%)";
    }
  }};

  &:hover {
    background: ${(props) => {
      switch (props.variant) {
        case "edit":
          return "hsla(214, 100%, 50%, 0.2)";
        case "deactivate":
          return "hsla(0, 84%, 60%, 0.2)";
        case "activate":
          return "hsla(142, 76%, 36%, 0.2)";
        default:
          return "hsla(214, 100%, 50%, 0.2)";
      }
    }};
    transform: scale(1.1);
  }

  svg {
    width: 1rem;
    height: 1rem;
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
  background: hsla(271, 91%, 100%, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  padding: 2rem;
  margin: 1rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);

  .dark & {
    background: hsla(271, 28%, 17%, 0.95);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: hsl(271, 16%, 47%);

  .dark & {
    color: hsl(271, 20%, 65%);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid hsla(271, 91%, 100%, 0.3);
  border-radius: 0.5rem;
  background: hsla(271, 91%, 100%, 0.5);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: hsl(271, 100%, 50%);
    box-shadow: 0 0 0 3px hsla(271, 100%, 50%, 0.1);
  }

  .dark & {
    background: hsla(271, 28%, 17%, 0.5);
    border-color: hsla(271, 28%, 17%, 0.3);
    color: hsl(271, 20%, 65%);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid hsla(271, 91%, 100%, 0.3);
  border-radius: 0.5rem;
  background: hsla(271, 91%, 100%, 0.5);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: hsl(271, 100%, 50%);
    box-shadow: 0 0 0 3px hsla(271, 100%, 50%, 0.1);
  }

  .dark & {
    background: hsla(271, 28%, 17%, 0.5);
    border-color: hsla(271, 28%, 17%, 0.3);
    color: hsl(271, 20%, 65%);
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
    hsl(271, 100%, 50%),
    hsl(280, 100%, 50%)
  );
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(
      to right,
      hsl(271, 100%, 45%),
      hsl(280, 100%, 45%)
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
  background: hsla(271, 91%, 100%, 0.5);
  color: hsl(271, 16%, 47%);
  border: 1px solid hsla(271, 91%, 100%, 0.3);
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: hsla(271, 91%, 100%, 0.8);
    transform: scale(1.05);
  }

  .dark & {
    background: hsla(271, 28%, 17%, 0.5);
    border-color: hsla(271, 28%, 17%, 0.3);
    color: hsl(271, 20%, 65%);

    &:hover {
      background: hsla(271, 28%, 17%, 0.8);
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
  border: 2px solid hsla(271, 100%, 50%, 0.3);
  border-top: 2px solid hsl(271, 100%, 50%);
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

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 0.75rem;
  background: hsla(271, 91%, 100%, 0.5);
  margin-bottom: 1rem;

  .dark & {
    background: hsla(271, 28%, 17%, 0.5);
  }
`;

const ActivityIcon = styled.div<{
  color: "green" | "blue" | "red";
  delay?: string;
}>`
  width: 2.5rem;
  height: 2.5rem;
  background: ${(props) => {
    switch (props.color) {
      case "green":
        return "linear-gradient(to bottom right, hsl(142, 76%, 36%), hsl(142, 76%, 26%))";
      case "blue":
        return "linear-gradient(to bottom right, hsl(271, 100%, 70%), hsl(271, 100%, 50%))";
      case "red":
        return "linear-gradient(to bottom right, hsl(0, 84%, 70%), hsl(0, 84%, 50%))";
      default:
        return "linear-gradient(to bottom right, hsl(271, 100%, 70%), hsl(271, 100%, 50%))";
    }
  }};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;

  div {
    width: 1rem;
    height: 1rem;
    background: white;
    border-radius: 50%;
    animation: ${pulseAnimation} 2s ease-in-out infinite;
    animation-delay: ${(props) => props.delay || "0s"};
  }
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(271, 28%, 17%);
  margin-bottom: 0.25rem;

  .dark & {
    color: hsl(271, 20%, 65%);
  }
`;

const ActivityTime = styled.p`
  font-size: 0.75rem;
  color: hsl(271, 16%, 47%);

  .dark & {
    color: hsl(271, 20%, 65%);
  }
`;

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [builders, setBuilders] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBuilder, setEditingBuilder] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<SignupRequest>>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "ADMIN",
    phoneNumber: "",
  });

  // Stats
  const [stats, setStats] = useState({
    totalBuilders: 0,
    activeBuilders: 0,
    inactiveBuilders: 0,
    recentSignups: 0,
  });

  useEffect(() => {
    loadBuilders();
  }, []);

  const loadBuilders = async () => {
    try {
      setLoading(true);
      const users = await apiClient.getUsers();
      const builderUsers = users.filter((user) => user.role === "ADMIN"); // Backend uses ADMIN for builders
      setBuilders(builderUsers);

      // Calculate stats
      const activeCount = builderUsers.filter(
        (builder) => builder.isActive,
      ).length;
      const inactiveCount = builderUsers.length - activeCount;
      const recentCount = builderUsers.filter((builder) => {
        const lastLogin = new Date(builder.lastLogin || "");
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return lastLogin > weekAgo;
      }).length;

      setStats({
        totalBuilders: builderUsers.length,
        activeBuilders: activeCount,
        inactiveBuilders: inactiveCount,
        recentSignups: recentCount,
      });
    } catch (err) {
      setError("Failed to load builders");
      console.error("Error loading builders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBuilder = async () => {
    try {
      setLoading(true);
      await apiClient.createUser(formData as SignupRequest);
      setShowCreateModal(false);
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "ADMIN",
        phoneNumber: "",
      });
      await loadBuilders();
    } catch (err) {
      setError("Failed to create builder");
      console.error("Error creating builder:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBuilder = async () => {
    if (!editingBuilder) return;

    try {
      setLoading(true);
      await apiClient.updateUser(editingBuilder.id, formData);
      setEditingBuilder(null);
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "ADMIN",
        phoneNumber: "",
      });
      await loadBuilders();
    } catch (err) {
      setError("Failed to update builder");
      console.error("Error updating builder:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateBuilder = async (builderId: number) => {
    try {
      await apiClient.deactivateUser(builderId);
      await loadBuilders();
    } catch (err) {
      setError("Failed to deactivate builder");
      console.error("Error deactivating builder:", err);
    }
  };

  const openEditModal = (builder: User) => {
    setEditingBuilder(builder);
    setFormData({
      email: builder.email,
      firstName: builder.firstName,
      lastName: builder.lastName,
      role: "ADMIN",
      phoneNumber: builder.phoneNumber,
    });
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setEditingBuilder(null);
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "ADMIN",
      phoneNumber: "",
    });
    setError(null);
  };

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
              <RoleBadge>Admin</RoleBadge>
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
          <MainTitle>Admin Dashboard</MainTitle>
          <WelcomeBox>
            <p>Manage builder accounts and system administration</p>
          </WelcomeBox>
        </TitleSection>

        {/* Stats Grid */}
        <StatsGrid>
          <StatCard index={0}>
            <StatContent>
              <StatIcon>🏗️</StatIcon>
              <div>
                <StatValue>{stats.totalBuilders}</StatValue>
                <StatLabel>Total Builders</StatLabel>
              </div>
            </StatContent>
          </StatCard>
          <StatCard index={1}>
            <StatContent>
              <StatIcon>✅</StatIcon>
              <div>
                <StatValue>{stats.activeBuilders}</StatValue>
                <StatLabel>Active Builders</StatLabel>
              </div>
            </StatContent>
          </StatCard>
          <StatCard index={2}>
            <StatContent>
              <StatIcon>⏸️</StatIcon>
              <div>
                <StatValue>{stats.inactiveBuilders}</StatValue>
                <StatLabel>Inactive Builders</StatLabel>
              </div>
            </StatContent>
          </StatCard>
          <StatCard index={3}>
            <StatContent>
              <StatIcon>📈</StatIcon>
              <div>
                <StatValue>{stats.recentSignups}</StatValue>
                <StatLabel>Recent Activity</StatLabel>
              </div>
            </StatContent>
          </StatCard>
        </StatsGrid>

        <ContentGrid>
          <BuilderManagementCard>
            <SectionTitle>Builder Management</SectionTitle>

            <CreateBuilderButton onClick={() => setShowCreateModal(true)}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Builder
            </CreateBuilderButton>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <BuilderTable>
              {loading ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <LoadingSpinner />
                </div>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <TableHeader>Name</TableHeader>
                      <TableHeader>Email</TableHeader>
                      <TableHeader>Phone</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Last Login</TableHeader>
                      <TableHeader>Actions</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {builders.map((builder) => (
                      <TableRow key={builder.id}>
                        <TableCell>
                          {builder.firstName} {builder.lastName}
                        </TableCell>
                        <TableCell>{builder.email}</TableCell>
                        <TableCell>{builder.phoneNumber || "N/A"}</TableCell>
                        <TableCell>
                          <StatusBadge
                            status={builder.isActive ? "active" : "inactive"}
                          >
                            {builder.isActive ? "Active" : "Inactive"}
                          </StatusBadge>
                        </TableCell>
                        <TableCell>
                          {builder.lastLogin
                            ? new Date(builder.lastLogin).toLocaleDateString()
                            : "Never"}
                        </TableCell>
                        <TableCell>
                          <ActionButton
                            variant="edit"
                            onClick={() => openEditModal(builder)}
                          >
                            <svg
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </ActionButton>
                          {builder.isActive ? (
                            <ActionButton
                              variant="deactivate"
                              onClick={() =>
                                handleDeactivateBuilder(builder.id)
                              }
                            >
                              <svg
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                                />
                              </svg>
                            </ActionButton>
                          ) : (
                            <ActionButton
                              variant="activate"
                              onClick={() =>
                                handleDeactivateBuilder(builder.id)
                              }
                            >
                              <svg
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </ActionButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              )}
            </BuilderTable>
          </BuilderManagementCard>

          <SidebarCard>
            <SectionTitle>Recent Activity</SectionTitle>
            <ActivityItem>
              <ActivityIcon color="green">
                <div></div>
              </ActivityIcon>
              <ActivityContent>
                <ActivityTitle>New builder registered</ActivityTitle>
                <ActivityTime>2 hours ago</ActivityTime>
              </ActivityContent>
            </ActivityItem>
            <ActivityItem>
              <ActivityIcon color="blue" delay="0.5s">
                <div></div>
              </ActivityIcon>
              <ActivityContent>
                <ActivityTitle>Builder account updated</ActivityTitle>
                <ActivityTime>1 day ago</ActivityTime>
              </ActivityContent>
            </ActivityItem>
            <ActivityItem>
              <ActivityIcon color="red" delay="1s">
                <div></div>
              </ActivityIcon>
              <ActivityContent>
                <ActivityTitle>Builder account deactivated</ActivityTitle>
                <ActivityTime>2 days ago</ActivityTime>
              </ActivityContent>
            </ActivityItem>
          </SidebarCard>
        </ContentGrid>
      </Main>

      {/* Create/Edit Builder Modal */}
      <Modal isOpen={showCreateModal || !!editingBuilder}>
        <ModalContent>
          <SectionTitle>
            {editingBuilder ? "Edit Builder" : "Create New Builder"}
          </SectionTitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <Label>First Name</Label>
            <Input
              type="text"
              value={formData.firstName || ""}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="Enter first name"
            />
          </FormGroup>

          <FormGroup>
            <Label>Last Name</Label>
            <Input
              type="text"
              value={formData.lastName || ""}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Enter last name"
            />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter email address"
            />
          </FormGroup>

          {!editingBuilder && (
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={formData.password || ""}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter password"
              />
            </FormGroup>
          )}

          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              value={formData.phoneNumber || ""}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              placeholder="Enter phone number"
            />
          </FormGroup>

          <ButtonGroup>
            <CancelButton onClick={closeModal}>Cancel</CancelButton>
            <SubmitButton
              onClick={
                editingBuilder ? handleUpdateBuilder : handleCreateBuilder
              }
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner />
              ) : editingBuilder ? (
                "Update"
              ) : (
                "Create"
              )}
            </SubmitButton>
          </ButtonGroup>
        </ModalContent>
      </Modal>
    </DashboardContainer>
  );
}
