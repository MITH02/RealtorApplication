import React from "react";
import { ScrollView, View, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { colors, spacing } from "../../styles/theme";
import {
  Container,
  Header,
  HeaderTitle,
  StatCard,
  StatValue,
  StatLabel,
  ActionCard,
  ActionText,
} from "../../components/StyledComponents";
import styled from "@emotion/native";

type ContractorDashboardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ContractorDashboard"
>;



interface Props {
  navigation: ContractorDashboardNavigationProp;
}

const Content = styled.ScrollView`
  flex: 1;
  background-color: ${colors.background};
`;

const StatsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${spacing.md}px;
  margin-bottom: ${spacing.lg}px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.text};
  margin: ${spacing.lg}px ${spacing.md}px ${spacing.md}px;
`;

const ActionsContainer = styled.View`
  padding: 0 ${spacing.md}px;
  margin-bottom: ${spacing.xl}px;
`;

const TaskCard = styled.TouchableOpacity<{
  status: "pending" | "submitted" | "approved" | "overdue";
}>`
  background-color: ${colors.surface};
  border-radius: 12px;
  padding: ${spacing.lg}px;
  margin-bottom: ${spacing.md}px;
  border-left-width: 4px;
  border-left-color: ${(props) =>
    props.status === "pending"
      ? colors.warning
      : props.status === "submitted"
        ? colors.primary
        : props.status === "approved"
          ? colors.success
          : colors.error};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2;
`;

const TaskHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.sm}px;
`;

const TaskTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.text};
  flex: 1;
`;

const TaskStatus = styled.View<{
  status: "pending" | "submitted" | "approved" | "overdue";
}>`
  background-color: ${(props) =>
    props.status === "pending"
      ? colors.warning + "20"
      : props.status === "submitted"
        ? colors.primary + "20"
        : props.status === "approved"
          ? colors.success + "20"
          : colors.error + "20"};
  padding: 4px 8px;
  border-radius: 8px;
`;

const TaskStatusText = styled.Text<{
  status: "pending" | "submitted" | "approved" | "overdue";
}>`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) =>
    props.status === "pending"
      ? colors.warning
      : props.status === "submitted"
        ? colors.primary
        : props.status === "approved"
          ? colors.success
          : colors.error};
`;

const TaskDetail = styled.Text`
  font-size: 14px;
  color: ${colors.textSecondary};
  margin-bottom: 4px;
`;

const DeadlineText = styled.Text<{ isOverdue: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.isOverdue ? colors.error : colors.textSecondary)};
`;

const LogoutButton = styled.TouchableOpacity`
  background-color: ${colors.error};
  padding: ${spacing.md}px ${spacing.lg}px;
  border-radius: 8px;
  margin: ${spacing.lg}px;
  align-items: center;
`;

const LogoutText = styled.Text`
  color: ${colors.surface};
  font-size: 16px;
  font-weight: 600;
`;

export default function ContractorDashboard({ navigation }: Props) {
  const stats = [
    { label: "Assigned Projects", value: "3", icon: "🏗️" },
    { label: "Completed Tasks", value: "12", icon: "✅" },
    { label: "Pending Tasks", value: "5", icon: "📋" },
    { label: "Days to Deadline", value: "4", icon: "📅" },
  ];

  const myTasks = [
    {
      id: 1,
      title: "Electrical Wiring - Building A",
      building: "Residential Complex A",
      deadline: "2024-01-15",
      status: "pending" as const,
      description: "Install electrical wiring for floors 1-3",
    },
    {
      id: 2,
      title: "Plumbing Installation - Building B",
      building: "Office Complex B",
      deadline: "2024-01-10",
      status: "overdue" as const,
      description: "Complete plumbing for basement level",
    },
    {
      id: 3,
      title: "Tiling Work - Building A",
      building: "Residential Complex A",
      deadline: "2024-01-20",
      status: "submitted" as const,
      description: "Floor tiling for ground floor units",
    },
    {
      id: 4,
      title: "Painting - Building C",
      building: "Commercial Plaza C",
      deadline: "2024-01-25",
      status: "approved" as const,
      description: "Interior painting for retail spaces",
    },
  ];

  const actions = [
    {
      title: "View All Tasks",
      subtitle: "See complete task list and details",
      icon: "📋",
    },
    {
      title: "Update Progress",
      subtitle: "Add photos and progress updates",
      icon: "📸",
    },
    {
      title: "Submit Completion",
      subtitle: "Mark tasks as completed",
      icon: "✅",
    },
    {
      title: "Request Extension",
      subtitle: "Request deadline extension",
      icon: "⏰",
    },
    {
      title: "Messages",
      subtitle: "Communicate with project admin",
      icon: "💬",
    },
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "In Progress";
      case "submitted":
        return "Under Review";
      case "approved":
        return "Approved";
      case "overdue":
        return "Overdue";
      default:
        return status;
    }
  };

  const isOverdue = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate < today;
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return "Due today";
    } else {
      return `${diffDays} days remaining`;
    }
  };

  const handleTaskPress = (task: any) => {
    Alert.alert(
      task.title,
      `Building: ${task.building}\nDeadline: ${task.deadline}\n\n${task.description}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Update Progress",
          onPress: () => handleActionPress("Update Progress"),
        },
        task.status === "pending" && {
          text: "Mark Complete",
          onPress: () => handleMarkComplete(task),
        },
      ].filter(Boolean) as any,
    );
  };

  const handleMarkComplete = (task: any) => {
    Alert.alert(
      "Mark Task Complete",
      `Are you sure you want to mark "${task.title}" as completed and submit it for approval?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Submit for Approval",
          onPress: () => {
            Alert.alert("Success", "Task submitted for admin approval!");
          },
        },
      ],
    );
  };

  const handleActionPress = (actionTitle: string) => {
    Alert.alert(
      actionTitle,
      "This feature will be implemented with the Spring Boot backend integration.",
      [{ text: "OK" }],
    );
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => navigation.navigate("RoleSelection"),
      },
    ]);
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Contractor Dashboard</HeaderTitle>
      </Header>

      <Content showsVerticalScrollIndicator={false}>
        <SectionTitle>Your Stats</SectionTitle>
        <StatsContainer>
          {stats.map((stat, index) => (
            <StatCard key={index} style={{ width: "48%" }}>
              <View style={{ alignItems: "center", marginBottom: spacing.sm }}>
                <View
                  style={{
                    fontSize: 24,
                    marginBottom: spacing.xs,
                  }}
                >
                  <StatValue style={{ fontSize: 20 }}>{stat.icon}</StatValue>
                </View>
              </View>
              <StatValue
                style={{
                  color:
                    stat.label === "Days to Deadline" &&
                    parseInt(stat.value) <= 3
                      ? colors.error
                      : colors.primary,
                }}
              >
                {stat.value}
              </StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>

        <SectionTitle>My Tasks</SectionTitle>
        <ActionsContainer>
          {myTasks.map((task, index) => (
            <TaskCard
              key={index}
              status={task.status}
              onPress={() => handleTaskPress(task)}
              activeOpacity={0.7}
            >
              <TaskHeader>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskStatus status={task.status}>
                  <TaskStatusText status={task.status}>
                    {getStatusText(task.status)}
                  </TaskStatusText>
                </TaskStatus>
              </TaskHeader>

              <TaskDetail>📍 {task.building}</TaskDetail>
              <TaskDetail>{task.description}</TaskDetail>
              <DeadlineText isOverdue={isOverdue(task.deadline)}>
                📅 {getDaysUntilDeadline(task.deadline)}
              </DeadlineText>
            </TaskCard>
          ))}
        </ActionsContainer>

        <SectionTitle>Quick Actions</SectionTitle>
        <ActionsContainer>
          {actions.map((action, index) => (
            <ActionCard
              key={index}
              onPress={() => handleActionPress(action.title)}
              activeOpacity={0.7}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <View style={{ marginRight: spacing.sm }}>
                    <StatValue style={{ fontSize: 20 }}>
                      {action.icon}
                    </StatValue>
                  </View>
                  <ActionText style={{ fontWeight: "600" }}>
                    {action.title}
                  </ActionText>
                </View>
                <ActionText
                  style={{
                    fontSize: 14,
                    color: colors.textSecondary,
                    marginLeft: 28,
                  }}
                >
                  {action.subtitle}
                </ActionText>
              </View>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: colors.contractor + "20",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActionText
                  style={{
                    color: colors.contractor,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  →
                </ActionText>
              </View>
            </ActionCard>
          ))}
        </ActionsContainer>

        <LogoutButton onPress={handleLogout}>
          <LogoutText>Logout</LogoutText>
        </LogoutButton>
      </Content>
    </Container>
  );
}
