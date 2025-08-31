import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useAuth } from "@/contexts/AuthContext";
import { User, BuilderFormData } from "@/types";
import apiService from "@/services/api";
import { keyframes } from "@emotion/react";

// Animations
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

const slideIn = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Styled Components
const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: hsl(222 84% 4.9%);
  margin-bottom: 0.5rem;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const Subtitle = styled.p`
  color: hsl(215 16% 47%);
  font-size: 1.125rem;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${slideIn} 0.6s ease-out;
  animation-fill-mode: both;

  .dark & {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(51, 65, 85, 0.3);
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: hsl(217 91% 60%);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: hsl(215 16% 47%);
  font-size: 0.875rem;
  font-weight: 500;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const ActionSection = styled.div`
  margin-bottom: 2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button<{ variant?: "primary" | "secondary" | "danger" }>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${(props) =>
    props.variant === "primary" &&
    `
    background: hsl(217 91% 60%);
    color: white;
    
    &:hover {
      background: hsl(217 91% 55%);
      transform: translateY(-1px);
    }
  `}

  ${(props) =>
    props.variant === "secondary" &&
    `
    background: hsl(210 40% 96%);
    color: hsl(215 16% 47%);
    
    &:hover {
      background: hsl(210 40% 90%);
    }
    
    .dark & {
      background: hsl(217 32% 17%);
      color: hsl(215 20% 65%);
      
      &:hover {
        background: hsl(217 32% 20%);
      }
    }
  `}

  ${(props) =>
    props.variant === "danger" &&
    `
    background: hsl(0 84% 60%);
    color: white;
    
    &:hover {
      background: hsl(0 84% 55%);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const BuildersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const BuilderCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(51, 65, 85, 0.3);
  }
`;

const BuilderInfo = styled.div`
  margin-bottom: 1rem;
`;

const BuilderName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: hsl(222 84% 4.9%);
  margin-bottom: 0.25rem;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const BuilderEmail = styled.p`
  color: hsl(215 16% 47%);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const BuilderPhone = styled.p`
  color: hsl(215 16% 47%);
  font-size: 0.875rem;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const StatusBadge = styled.span<{ active: boolean }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;

  ${(props) =>
    props.active
      ? `
    background: hsl(142 76% 85%);
    color: hsl(142 76% 25%);
  `
      : `
    background: hsl(0 84% 85%);
    color: hsl(0 84% 25%);
  `}
`;

const BuilderActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SmallButton = styled.button<{
  variant?: "primary" | "secondary" | "danger";
}>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;

  ${(props) =>
    props.variant === "primary" &&
    `
    background: hsl(217 91% 60%);
    color: white;
    
    &:hover {
      background: hsl(217 91% 55%);
    }
  `}

  ${(props) =>
    props.variant === "secondary" &&
    `
    background: hsl(210 40% 96%);
    color: hsl(215 16% 47%);
    
    &:hover {
      background: hsl(210 40% 90%);
    }
    
    .dark & {
      background: hsl(217 32% 17%);
      color: hsl(215 20% 65%);
      
      &:hover {
        background: hsl(217 32% 20%);
      }
    }
  `}

  ${(props) =>
    props.variant === "danger" &&
    `
    background: hsl(0 84% 60%);
    color: white;
    
    &:hover {
      background: hsl(0 84% 55%);
    }
  `}
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;

  .dark & {
    background: hsl(222 84% 4.9%);
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: hsl(222 84% 4.9%);
  margin-bottom: 1.5rem;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: hsl(222 84% 4.9%);
  font-size: 0.875rem;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid hsl(214 31% 91%);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: hsl(217 91% 60%);
  }

  .dark & {
    background: hsl(217 32% 17%);
    border-color: hsl(217 32% 20%);
    color: hsl(210 40% 98%);
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

interface AdminDashboardProps {
  user: User;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [builders, setBuilders] = useState<User[]>([]);
  const [contractors, setContractors] = useState<User[]>([]);
  const [stats, setStats] = useState({
    builders: 0,
    contractors: 0,
    admins: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showContractorModal, setShowContractorModal] = useState(false);
  const [editingBuilder, setEditingBuilder] = useState<User | null>(null);
  const [editingContractor, setEditingContractor] = useState<User | null>(null);
  const [formData, setFormData] = useState<BuilderFormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [contractorFormData, setContractorFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    specialization: "",
    yearsOfExperience: 0,
    certificationDetails: "",
  });

  const fetchBuilders = async () => {
    try {
      const buildersData = await apiService.getAllBuilders();
      setBuilders(buildersData);
    } catch (error) {
      console.error("Failed to fetch builders:", error);
    }
  };

  const fetchContractors = async () => {
    try {
      const contractorsData = await apiService.getAllContractors();
      setContractors(contractorsData);
    } catch (error) {
      console.error("Failed to fetch contractors:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await apiService.getUserCounts();
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchBuilders(), fetchContractors(), fetchStats()]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleCreateBuilder = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiService.createBuilder({
        ...formData,
        role: "BUILDER",
      });

      setShowCreateModal(false);
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
      });

      await fetchBuilders();
      await fetchStats();
    } catch (error) {
      console.error("Failed to create builder:", error);
      alert("Failed to create builder. Please try again.");
    }
  };

  const handleUpdateBuilder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingBuilder) return;

    try {
      await apiService.updateBuilder(editingBuilder.id, {
        ...formData,
        role: "BUILDER",
      });

      setEditingBuilder(null);
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
      });

      await fetchBuilders();
    } catch (error) {
      console.error("Failed to update builder:", error);
      alert("Failed to update builder. Please try again.");
    }
  };

  const handleToggleBuilderStatus = async (
    builderId: number,
    currentStatus: boolean,
  ) => {
    try {
      await apiService.updateBuilderStatus(builderId, !currentStatus);
      await fetchBuilders();
      await fetchStats();
    } catch (error) {
      console.error("Failed to update builder status:", error);
      alert("Failed to update builder status. Please try again.");
    }
  };

  const handleDeleteBuilder = async (builderId: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this builder? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      await apiService.deleteBuilder(builderId);
      await fetchBuilders();
      await fetchStats();
    } catch (error) {
      console.error("Failed to delete builder:", error);
      alert("Failed to delete builder. Please try again.");
    }
  };

  const openEditModal = (builder: User) => {
    setEditingBuilder(builder);
    setFormData({
      email: builder.email,
      password: "",
      firstName: builder.firstName,
      lastName: builder.lastName,
      phoneNumber: builder.phoneNumber || "",
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
      phoneNumber: "",
    });
  };

  // Contractor management functions
  const handleCreateContractor = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiService.registerUserByRole({
        ...contractorFormData,
        role: "CONTRACTOR",
      });

      setShowContractorModal(false);
      setContractorFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        specialization: "",
        yearsOfExperience: 0,
        certificationDetails: "",
      });

      await fetchContractors();
      await fetchStats();
    } catch (error) {
      console.error("Failed to create contractor:", error);
      alert("Failed to create contractor. Please try again.");
    }
  };

  const handleUpdateContractor = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingContractor) return;

    try {
      await apiService.updateBuilder(editingContractor.id, {
        ...contractorFormData,
        role: "CONTRACTOR",
      });

      setEditingContractor(null);
      setContractorFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        specialization: "",
        yearsOfExperience: 0,
        certificationDetails: "",
      });

      await fetchContractors();
    } catch (error) {
      console.error("Failed to update contractor:", error);
      alert("Failed to update contractor. Please try again.");
    }
  };

  const handleToggleContractorStatus = async (
    contractorId: number,
    currentStatus: boolean,
  ) => {
    try {
      await apiService.updateBuilderStatus(contractorId, !currentStatus);
      await fetchContractors();
    } catch (error) {
      console.error("Failed to update contractor status:", error);
      alert("Failed to update contractor status. Please try again.");
    }
  };

  const handleDeleteContractor = async (contractorId: number) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this contractor? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      await apiService.deleteBuilder(contractorId);
      await fetchContractors();
      await fetchStats();
    } catch (error) {
      console.error("Failed to delete contractor:", error);
      alert("Failed to delete contractor. Please try again.");
    }
  };

  const openContractorEditModal = (contractor: User) => {
    setEditingContractor(contractor);
    setContractorFormData({
      email: contractor.email,
      password: "",
      firstName: contractor.firstName,
      lastName: contractor.lastName,
      phoneNumber: contractor.phoneNumber || "",
      specialization: contractor.specialization || "",
      yearsOfExperience: contractor.yearsOfExperience || 0,
      certificationDetails: contractor.certificationDetails || "",
    });
  };

  const closeContractorModal = () => {
    setShowContractorModal(false);
    setEditingContractor(null);
    setContractorFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      specialization: "",
      yearsOfExperience: 0,
      certificationDetails: "",
    });
  };

  if (isLoading) {
    return (
      <DashboardContainer>
        <div>Loading...</div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>Admin Dashboard</Title>
        <Subtitle>Manage Builder accounts and system administration</Subtitle>
      </Header>

      <StatsGrid>
        <StatCard style={{ animationDelay: "0.1s" }}>
          <StatValue>{stats.builders}</StatValue>
          <StatLabel>Total Builders</StatLabel>
        </StatCard>
        <StatCard style={{ animationDelay: "0.2s" }}>
          <StatValue>{stats.contractors}</StatValue>
          <StatLabel>Total Contractors</StatLabel>
        </StatCard>
        <StatCard style={{ animationDelay: "0.3s" }}>
          <StatValue>{stats.admins}</StatValue>
          <StatLabel>Total Admins</StatLabel>
        </StatCard>
      </StatsGrid>

      <ActionSection>
        <ActionButtons>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            + Create New Builder
          </Button>
          <Button variant="secondary" onClick={fetchBuilders}>
            Refresh Data
          </Button>
        </ActionButtons>
      </ActionSection>

      <BuildersGrid>
        {builders.map((builder) => (
          <BuilderCard key={builder.id}>
            <BuilderInfo>
              <BuilderName>
                {builder.firstName} {builder.lastName}
              </BuilderName>
              <BuilderEmail>{builder.email}</BuilderEmail>
              {builder.phoneNumber && (
                <BuilderPhone>📞 {builder.phoneNumber}</BuilderPhone>
              )}
              <StatusBadge active={builder.isActive}>
                {builder.isActive ? "Active" : "Inactive"}
              </StatusBadge>
            </BuilderInfo>

            <BuilderActions>
              <SmallButton
                variant="primary"
                onClick={() => openEditModal(builder)}
              >
                Edit
              </SmallButton>
              <SmallButton
                variant="secondary"
                onClick={() =>
                  handleToggleBuilderStatus(builder.id, builder.isActive)
                }
              >
                {builder.isActive ? "Deactivate" : "Activate"}
              </SmallButton>
              <SmallButton
                variant="danger"
                onClick={() => handleDeleteBuilder(builder.id)}
              >
                Delete
              </SmallButton>
            </BuilderActions>
          </BuilderCard>
        ))}
      </BuildersGrid>

      {/* Contractor Management Section */}
      <ActionSection>
        <ActionButtons>
          <Button variant="primary" onClick={() => setShowContractorModal(true)}>
            + Create New Contractor
          </Button>
          <Button variant="secondary" onClick={fetchContractors}>
            Refresh Contractors
          </Button>
        </ActionButtons>
      </ActionSection>

      <BuildersGrid>
        {contractors.map((contractor) => (
          <BuilderCard key={contractor.id}>
            <BuilderInfo>
              <BuilderName>
                {contractor.firstName} {contractor.lastName}
              </BuilderName>
              <BuilderEmail>{contractor.email}</BuilderEmail>
              {contractor.phoneNumber && (
                <BuilderPhone>📞 {contractor.phoneNumber}</BuilderPhone>
              )}
              {contractor.specialization && (
                <BuilderPhone>🔧 {contractor.specialization}</BuilderPhone>
              )}
              <StatusBadge active={contractor.isActive}>
                {contractor.isActive ? "Active" : "Inactive"}
              </StatusBadge>
            </BuilderInfo>

            <BuilderActions>
              <SmallButton
                variant="primary"
                onClick={() => openContractorEditModal(contractor)}
              >
                Edit
              </SmallButton>
              <SmallButton
                variant="secondary"
                onClick={() =>
                  handleToggleContractorStatus(contractor.id, contractor.isActive)
                }
              >
                {contractor.isActive ? "Deactivate" : "Activate"}
              </SmallButton>
              <SmallButton
                variant="danger"
                onClick={() => handleDeleteContractor(contractor.id)}
              >
                Delete
              </SmallButton>
            </BuilderActions>
          </BuilderCard>
        ))}
      </BuildersGrid>

      {/* Create/Edit Modal */}
      <Modal isOpen={showCreateModal || !!editingBuilder}>
        <ModalContent>
          <ModalTitle>
            {editingBuilder ? "Edit Builder" : "Create New Builder"}
          </ModalTitle>

          <Form
            onSubmit={
              editingBuilder ? handleUpdateBuilder : handleCreateBuilder
            }
          >
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                Password {editingBuilder && "(leave blank to keep current)"}
              </Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                required={!editingBuilder}
              />
            </FormGroup>

            <FormGroup>
              <Label>First Name</Label>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Last Name</Label>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                }
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Phone Number (Optional)</Label>
              <Input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
              />
            </FormGroup>

            <FormActions>
              <Button type="button" variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {editingBuilder ? "Update Builder" : "Create Builder"}
              </Button>
            </FormActions>
          </Form>
        </ModalContent>
      </Modal>

      {/* Contractor Create/Edit Modal */}
      <Modal isOpen={showContractorModal || !!editingContractor}>
        <ModalContent>
          <ModalTitle>
            {editingContractor ? "Edit Contractor" : "Create New Contractor"}
          </ModalTitle>

          <Form
            onSubmit={
              editingContractor ? handleUpdateContractor : handleCreateContractor
            }
          >
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={contractorFormData.email}
                onChange={(e) =>
                  setContractorFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                Password {editingContractor && "(leave blank to keep current)"}
              </Label>
              <Input
                type="password"
                value={contractorFormData.password}
                onChange={(e) =>
                  setContractorFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                required={!editingContractor}
              />
            </FormGroup>

            <FormGroup>
              <Label>First Name</Label>
              <Input
                type="text"
                value={contractorFormData.firstName}
                onChange={(e) =>
                  setContractorFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Last Name</Label>
              <Input
                type="text"
                value={contractorFormData.lastName}
                onChange={(e) =>
                  setContractorFormData((prev) => ({ ...prev, lastName: e.target.value }))
                }
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Phone Number (Optional)</Label>
              <Input
                type="tel"
                value={contractorFormData.phoneNumber}
                onChange={(e) =>
                  setContractorFormData((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>Specialization</Label>
              <Input
                type="text"
                value={contractorFormData.specialization}
                onChange={(e) =>
                  setContractorFormData((prev) => ({
                    ...prev,
                    specialization: e.target.value,
                  }))
                }
                placeholder="e.g., Electrical, Plumbing, HVAC"
              />
            </FormGroup>

            <FormGroup>
              <Label>Years of Experience</Label>
              <Input
                type="number"
                value={contractorFormData.yearsOfExperience}
                onChange={(e) =>
                  setContractorFormData((prev) => ({
                    ...prev,
                    yearsOfExperience: parseInt(e.target.value) || 0,
                  }))
                }
                min="0"
              />
            </FormGroup>

            <FormGroup>
              <Label>Certification Details (Optional)</Label>
              <Input
                type="text"
                value={contractorFormData.certificationDetails}
                onChange={(e) =>
                  setContractorFormData((prev) => ({
                    ...prev,
                    certificationDetails: e.target.value,
                  }))
                }
                placeholder="e.g., Licensed Electrician, Certified Plumber"
              />
            </FormGroup>

            <FormActions>
              <Button type="button" variant="secondary" onClick={closeContractorModal}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {editingContractor ? "Update Contractor" : "Create Contractor"}
              </Button>
            </FormActions>
          </Form>
        </ModalContent>
      </Modal>
    </DashboardContainer>
  );
}
