import React from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { colors, spacing } from '../../styles/theme';
import { Container, Header, HeaderTitle, StatCard, StatValue, StatLabel, ActionCard, ActionText } from '../../components/StyledComponents';
import styled from '@emotion/native';

type SuperAdminDashboardNavigationProp = StackNavigationProp<RootStackParamList, 'SuperAdminDashboard'>;

interface Props {
  navigation: SuperAdminDashboardNavigationProp;
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

export default function SuperAdminDashboard({ navigation }: Props) {
  const stats = [
    { label: 'Total Admins', value: '5', icon: '👥' },
    { label: 'Active Sessions', value: '12', icon: '🔐' },
    { label: 'System Health', value: '99%', icon: '💚' },
    { label: 'Data Backup', value: 'OK', icon: '💾' },
  ];

  const actions = [
    { title: 'Manage Admin Accounts', subtitle: 'Create, edit, or deactivate admin users', icon: '👤' },
    { title: 'System Configuration', subtitle: 'Configure global settings and preferences', icon: '⚙️' },
    { title: 'User Permissions', subtitle: 'Set role-based access controls', icon: '🔒' },
    { title: 'Analytics Dashboard', subtitle: 'View system usage and performance metrics', icon: '📊' },
    { title: 'Backup Management', subtitle: 'Configure and monitor data backups', icon: '💾' },
    { title: 'Security Audit', subtitle: 'Review security logs and compliance', icon: '🛡️' },
  ];

  const handleActionPress = (actionTitle: string) => {
    Alert.alert(
      actionTitle,
      'This feature will be implemented in the next phase. Currently showing Super Admin interface.',
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
        <HeaderTitle>Super Admin Dashboard</HeaderTitle>
      </Header>

      <Content showsVerticalScrollIndicator={false}>
        <SectionTitle>System Overview</SectionTitle>
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
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>

        <SectionTitle>Administrative Actions</SectionTitle>
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
                backgroundColor: colors.superAdmin + '20',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <ActionText style={{ 
                  color: colors.superAdmin, 
                  fontSize: 16,
                  fontWeight: '600'
                }}>
                  →
                </ActionText>
              </View>
            </ActionCard>
          ))}
        </ActionsContainer>

        <View style={{
          margin: spacing.lg,
          padding: spacing.lg,
          backgroundColor: colors.superAdmin + '10',
          borderRadius: 12,
          borderLeftWidth: 4,
          borderLeftColor: colors.superAdmin,
        }}>
          <ActionText style={{ 
            fontWeight: '600', 
            color: colors.text,
            marginBottom: spacing.sm 
          }}>
            Super Admin Responsibilities
          </ActionText>
          <ActionText style={{ 
            color: colors.textSecondary,
            lineHeight: 20,
            fontSize: 14
          }}>
            Your role focuses on system administration and user management. Daily project operations 
            are handled by Admin users who manage buildings, contractors, and tasks.
          </ActionText>
        </View>

        <LogoutButton onPress={handleLogout}>
          <LogoutText>Logout</LogoutText>
        </LogoutButton>
      </Content>
    </Container>
  );
}
