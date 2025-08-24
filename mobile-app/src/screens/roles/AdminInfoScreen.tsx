import React from 'react';
import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';
import { colors, spacing } from '../../styles/theme';
import { Container, Title, BodyText, Button, ButtonText, Card } from '../../components/StyledComponents';
import styled from '@emotion/native';

type AdminInfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AdminInfo'>;

interface Props {
  navigation: AdminInfoScreenNavigationProp;
}

const Content = styled.View`
  flex: 1;
  padding: ${spacing.xl}px;
`;

const Header = styled.View`
  align-items: center;
  margin-bottom: ${spacing.xl}px;
  margin-top: ${spacing.xxl}px;
`;

const IconContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${colors.admin};
  justify-content: center;
  align-items: center;
  margin-bottom: ${spacing.lg}px;
`;

const FeatureItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${spacing.md}px;
`;

const FeatureIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.admin}20;
  justify-content: center;
  align-items: center;
  margin-right: ${spacing.md}px;
`;

const FeatureText = styled.Text`
  font-size: 16px;
  color: ${colors.text};
  flex: 1;
  line-height: 22px;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: ${spacing.xxl}px;
  left: ${spacing.lg}px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.surface};
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 4;
`;

export default function AdminInfoScreen({ navigation }: Props) {
  const features = [
    { icon: '🏢', text: 'Create and manage unlimited buildings' },
    { icon: '👷', text: 'Assign contractors to specific projects' },
    { icon: '📋', text: 'Define custom task workflows' },
    { icon: '⏰', text: 'Set deadlines and track progress' },
    { icon: '✅', text: 'Approve or reject contractor work' },
    { icon: '📊', text: 'Generate detailed project reports' },
  ];

  const workflowSteps = [
    'Civil work foundation and structure',
    'Electrical wiring and systems',
    'Plumbing installation',
    'Tiling and flooring',
    'Painting and finishing',
    'Final inspections and handover',
  ];

  const handleLogin = () => {
    navigation.navigate('Login', { role: 'admin' });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <LinearGradient
        colors={[colors.admin, '#1E40AF']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <BackButton onPress={handleBack}>
          <BodyText style={{ fontSize: 18, color: colors.text }}>←</BodyText>
        </BackButton>

        <Content>
          <Header>
            <IconContainer>
              <BodyText style={{ fontSize: 32, color: colors.surface }}>🏗️</BodyText>
            </IconContainer>
            <Title style={{ color: colors.surface }}>Admin</Title>
            <BodyText style={{ color: colors.surface, textAlign: 'center', opacity: 0.9 }}>
              Central control for building management, task assignment, and project oversight
            </BodyText>
          </Header>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
              <BodyText style={{ 
                fontSize: 18, 
                fontWeight: '600', 
                color: colors.text, 
                marginBottom: spacing.md 
              }}>
                Core Capabilities
              </BodyText>
              {features.map((feature, index) => (
                <FeatureItem key={index}>
                  <FeatureIcon>
                    <BodyText style={{ fontSize: 18 }}>{feature.icon}</BodyText>
                  </FeatureIcon>
                  <FeatureText>{feature.text}</FeatureText>
                </FeatureItem>
              ))}
            </Card>

            <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
              <BodyText style={{ 
                fontSize: 18, 
                fontWeight: '600', 
                color: colors.text, 
                marginBottom: spacing.md 
              }}>
                Typical Workflow Steps
              </BodyText>
              {workflowSteps.map((step, index) => (
                <View key={index} style={{ 
                  flexDirection: 'row', 
                  marginBottom: spacing.sm,
                  alignItems: 'center'
                }}>
                  <View style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: colors.admin,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: spacing.md
                  }}>
                    <BodyText style={{ 
                      color: colors.surface, 
                      fontSize: 12,
                      fontWeight: '600'
                    }}>
                      {index + 1}
                    </BodyText>
                  </View>
                  <BodyText style={{ 
                    flex: 1, 
                    color: colors.text,
                    lineHeight: 22
                  }}>
                    {step}
                  </BodyText>
                </View>
              ))}
            </Card>

            <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
              <BodyText style={{ 
                fontSize: 18, 
                fontWeight: '600', 
                color: colors.text, 
                marginBottom: spacing.md 
              }}>
                Approval Workflow
              </BodyText>
              <BodyText style={{ 
                color: colors.textSecondary,
                lineHeight: 22,
                marginBottom: spacing.md
              }}>
                When contractors complete tasks, you'll receive approval requests. You can:
              </BodyText>
              <View style={{ marginLeft: spacing.md }}>
                <BodyText style={{ color: colors.success, marginBottom: spacing.xs }}>
                  ✅ Approve - Task moves to completed status
                </BodyText>
                <BodyText style={{ color: colors.error, marginBottom: spacing.xs }}>
                  ❌ Reject - Task returns to pending with feedback
                </BodyText>
              </View>
            </Card>

            <View style={{ marginTop: spacing.lg }}>
              <Button onPress={handleLogin}>
                <ButtonText>Access Admin Dashboard</ButtonText>
              </Button>
            </View>
          </ScrollView>
        </Content>
      </LinearGradient>
    </Container>
  );
}
