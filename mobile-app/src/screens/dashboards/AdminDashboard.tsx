import React from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { colors, spacing } from '../../styles/theme';
import { Container, Header, HeaderTitle, StatCard, StatValue, StatLabel, ActionCard, ActionText } from '../../components/StyledComponents';
import styled from '@emotion/native';

type AdminDashboardNavigationProp = StackNavigationProp<RootStackParamList, 'AdminDashboard'>;

interface Props {
  navigation: AdminDashboardNavigationProp;
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

const AlertBanner = styled.View`
  background-color: ${colors.error}20;
  border-left-width: 4px;
  border-left-color: ${colors.error};
  padding: ${spacing.md}px;
  margin: ${spacing.md}px;
  border-radius: 8px;
`;

const AlertText = styled.Text`
  color: ${colors.error};
  font-weight: 600;
  margin-bottom: 4px;
`;

const AlertSubtext = styled.Text`
  color: ${colors.textSecondary};
  font-size: 14px;
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

export default function AdminDashboard({ navigation }: Props) {
  const stats = [
    { label: 'Total Buildings', value: '8', icon: '🏢' },
    { label: 'Active Contractors', value: '15', icon: '👷' },
    { label: 'Pending Approvals', value: '7', icon: '⏳' },
    { label: 'Overdue Tasks', value: '3', icon: '🚨' },
  ];

  const actions = [
    { title: 'Create New Building', subtitle: 'Add a new construction project', icon: '🏗️' },
    { title: 'Manage Contractors', subtitle: 'View and assign contractor roles', icon: '👥' },
    { title: 'Review Task Approvals', subtitle: 'Approve or reject completed work', icon: '✅' },
    { title: 'Task Management', subtitle: 'Create and assign new tasks', icon: '📋' },
    { title: 'Project Timeline', subtitle: 'View deadlines and progress', icon: '📅' },
    { title: 'Reports & Analytics', subtitle: 'Generate project performance reports', icon: '📊' },
  ];

  const recentActivity = [
    { action: 'Task completed', detail: 'Electrical work - Building A', time: '2 hours ago', status: 'success' },
    { action: 'New contractor assigned', detail: 'John Smith - Plumbing specialist', time: '5 hours ago', status: 'info' },
    { action: 'Task overdue', detail: 'Painting work - Building C', time: '1 day ago', status: 'warning' },
  ];

  const overdueAlerts = [
    { building: 'Building C', contractor: 'Mike Johnson', task: 'Painting work', daysOverdue: 2 },
    { building: 'Building A', contractor: 'Sarah Williams', task: 'Final inspection', daysOverdue: 1 },
  ];

  const handleActionPress = (actionTitle: string) => {
    Alert.alert(
      actionTitle,
      'This feature will be implemented with the Spring Boot backend integration.',
      [{ text: 'OK' }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => navigation.navigate('RoleSelection')
        }
      ]
    );
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Admin Dashboard</HeaderTitle>
      </Header>

      <Content showsVerticalScrollIndicator={false}>
        {/* Overdue Alerts */}
        {overdueAlerts.length > 0 && (
          <>
            <SectionTitle style={{ color: colors.error }}>⚠️ Overdue Alerts</SectionTitle>
            {overdueAlerts.map((alert, index) => (
              <AlertBanner key={index}>
                <AlertText>
                  {alert.task} - {alert.building}
                </AlertText>
                <AlertSubtext>
                  Contractor: {alert.contractor} • {alert.daysOverdue} day(s) overdue
                </AlertSubtext>
              </AlertBanner>
            ))}
          </>
        )}

        <SectionTitle>Project Overview</SectionTitle>
        <StatsContainer>
          {stats.map((stat, index) => (
            <StatCard key={index} style={{ width: '48%' }}>
              <View style={{ alignItems: 'center', marginBottom: spacing.sm }}>
                <View style={{
                  fontSize: 24,
                  marginBottom: spacing.xs,
                }}>
                  <StatValue style={{ fontSize: 20 }}>{stat.icon}</StatValue>
                </View>
              </View>
              <StatValue style={{ 
                color: stat.label === 'Overdue Tasks' ? colors.error : colors.primary 
              }}>
                {stat.value}
              </StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>

        <SectionTitle>Quick Actions</SectionTitle>
        <ActionsContainer>
          {actions.map((action, index) => (
            <ActionCard 
              key={index}
              onPress={() => handleActionPress(action.title)}
              activeOpacity={0.7}
            >
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <View style={{ marginRight: spacing.sm }}>
                    <StatValue style={{ fontSize: 20 }}>{action.icon}</StatValue>
                  </View>
                  <ActionText style={{ fontWeight: '600' }}>{action.title}</ActionText>
                </View>
                <ActionText style={{ 
                  fontSize: 14, 
                  color: colors.textSecondary,
                  marginLeft: 28 
                }}>
                  {action.subtitle}
                </ActionText>
              </View>
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: colors.admin + '20',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <ActionText style={{ 
                  color: colors.admin, 
                  fontSize: 16,
                  fontWeight: '600'
                }}>
                  →
                </ActionText>
              </View>
            </ActionCard>
          ))}
        </ActionsContainer>

        <SectionTitle>Recent Activity</SectionTitle>
        <ActionsContainer>
          {recentActivity.map((activity, index) => (
            <ActionCard key={index} style={{ opacity: 0.8 }}>
              <View style={{ flex: 1 }}>
                <ActionText style={{ fontWeight: '600', marginBottom: 4 }}>
                  {activity.action}
                </ActionText>
                <ActionText style={{ 
                  fontSize: 14, 
                  color: colors.textSecondary,
                  marginBottom: 4
                }}>
                  {activity.detail}
                </ActionText>
                <ActionText style={{ 
                  fontSize: 12, 
                  color: colors.textSecondary 
                }}>
                  {activity.time}
                </ActionText>
              </View>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: 
                  activity.status === 'success' ? colors.success :
                  activity.status === 'warning' ? colors.warning : colors.primary,
              }} />
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
