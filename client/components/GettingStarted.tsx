import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

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

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

  .dark & {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(51, 65, 85, 0.3);
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: hsl(222 84% 4.9%);
  margin-bottom: 1rem;
  text-align: center;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: hsl(217 91% 60%);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .dark & {
    color: hsl(217 91% 65%);
  }
`;

const StepsList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Step = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.75rem;
  border-left: 3px solid hsl(217 91% 60%);

  .dark & {
    background: rgba(30, 41, 59, 0.5);
  }
`;

const StepNumber = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: hsl(217 91% 60%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  font-weight: 600;
  color: hsl(222 84% 4.9%);
  margin: 0 0 0.5rem 0;

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const StepDescription = styled.p`
  color: hsl(215 16% 47%);
  margin: 0;
  line-height: 1.5;

  .dark & {
    color: hsl(215 20% 65%);
  }
`;

const Credentials = styled.div`
  background: rgba(59, 130, 246, 0.1);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-top: 1rem;
  border-left: 3px solid hsl(217 91% 60%);
`;

const CredentialTitle = styled.h5`
  font-weight: 600;
  color: hsl(217 91% 60%);
  margin: 0 0 0.5rem 0;

  .dark & {
    color: hsl(217 91% 65%);
  }
`;

const CredentialItem = styled.div`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  color: hsl(222 84% 4.9%);
  margin-bottom: 0.25rem;

  .dark & {
    color: hsl(210 40% 98%);
  }

  strong {
    color: hsl(217 91% 60%);

    .dark & {
      color: hsl(217 91% 65%);
    }
  }
`;

const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const RoleCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0.75rem;
  padding: 1rem;
  border-left: 3px solid;

  &:nth-of-type(1) {
    border-color: hsl(271 91% 65%);
  }

  &:nth-of-type(2) {
    border-color: hsl(217 91% 60%);
  }

  &:nth-of-type(3) {
    border-color: hsl(25 95% 53%);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.7);
  }
`;

const RoleTitle = styled.h4`
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: hsl(222 84% 4.9%);

  .dark & {
    color: hsl(210 40% 98%);
  }
`;

const RoleFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    color: hsl(215 16% 47%);
    font-size: 0.875rem;
    margin-bottom: 0.25rem;

    .dark & {
      color: hsl(215 20% 65%);
    }

    &::before {
      content: '•';
      color: hsl(217 91% 60%);
      font-weight: 600;
      margin-right: 0.5rem;
    }
  }
`;

export default function GettingStarted() {
  return (
    <Container>
      <Card>
        <Title>🚀 Welcome to ConstructPro</Title>
        
        <Section>
          <SectionTitle>
            🎯 Quick Start Guide
          </SectionTitle>
          
          <StepsList>
            <Step>
              <StepNumber>1</StepNumber>
              <StepContent>
                <StepTitle>Select Your Role</StepTitle>
                <StepDescription>
                  Choose your role from the landing page: Admin, Builder, or Contractor. Each role has different capabilities and access levels.
                </StepDescription>
              </StepContent>
            </Step>
            
            <Step>
              <StepNumber>2</StepNumber>
              <StepContent>
                <StepTitle>Sign In</StepTitle>
                <StepDescription>
                  Use the demo credentials below to sign in and explore the features available for each role.
                </StepDescription>
              </StepContent>
            </Step>
            
            <Step>
              <StepNumber>3</StepNumber>
              <StepContent>
                <StepTitle>Explore Features</StepTitle>
                <StepDescription>
                  Navigate through the dashboard to see role-specific features like project management, task assignment, and progress tracking.
                </StepDescription>
              </StepContent>
            </Step>
          </StepsList>
        </Section>

        <Section>
          <SectionTitle>
            🔐 Demo Login Credentials
          </SectionTitle>
          
          <Credentials>
            <CredentialTitle>Test Accounts</CredentialTitle>
            <CredentialItem>
              <strong>Admin:</strong> admin@constructpro.com / admin123
            </CredentialItem>
            <CredentialItem>
              <strong>Builder:</strong> builder@constructpro.com / builder123
            </CredentialItem>
            <CredentialItem>
              <strong>Contractor:</strong> contractor@constructpro.com / contractor123
            </CredentialItem>
          </Credentials>
        </Section>

        <Section>
          <SectionTitle>
            👥 Role Capabilities
          </SectionTitle>
          
          <RoleGrid>
            <RoleCard>
              <RoleTitle>⚙️ Admin</RoleTitle>
              <RoleFeatures>
                <li>Manage Builder accounts (CRUD)</li>
                <li>View system-wide statistics</li>
                <li>Monitor all user activities</li>
                <li>System administration</li>
              </RoleFeatures>
            </RoleCard>
            
            <RoleCard>
              <RoleTitle>🏗️ Builder</RoleTitle>
              <RoleFeatures>
                <li>Create and manage buildings</li>
                <li>Assign contractors to projects</li>
                <li>Create and assign tasks</li>
                <li>Approve/reject task completions</li>
                <li>Track project progress</li>
              </RoleFeatures>
            </RoleCard>
            
            <RoleCard>
              <RoleTitle>👷 Contractor</RoleTitle>
              <RoleFeatures>
                <li>View assigned tasks</li>
                <li>Update task progress</li>
                <li>Mark tasks as completed</li>
                <li>Receive deadline notifications</li>
                <li>Track project status</li>
              </RoleFeatures>
            </RoleCard>
          </RoleGrid>
        </Section>

        <Section>
          <SectionTitle>
            🔔 System Features
          </SectionTitle>
          
          <StepsList>
            <Step>
              <StepNumber>📊</StepNumber>
              <StepContent>
                <StepTitle>Status Indicators</StepTitle>
                <StepDescription>
                  Color-coded status system: 🟢 Approved, 🟡 Pending, 🔴 Overdue tasks with real-time updates.
                </StepDescription>
              </StepContent>
            </Step>
            
            <Step>
              <StepNumber>⏰</StepNumber>
              <StepContent>
                <StepTitle>Deadline Tracking</StepTitle>
                <StepDescription>
                  Automatic deadline monitoring with alerts for overdue tasks and upcoming deadlines.
                </StepDescription>
              </StepContent>
            </Step>
            
            <Step>
              <StepNumber>🔔</StepNumber>
              <StepContent>
                <StepTitle>Notifications</StepTitle>
                <StepDescription>
                  Real-time notifications for task updates, approvals, rejections, and deadline reminders.
                </StepDescription>
              </StepContent>
            </Step>
          </StepsList>
        </Section>
      </Card>
    </Container>
  );
}
