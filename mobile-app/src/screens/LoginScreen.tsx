import React, { useState } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { colors, spacing } from '../styles/theme';
import { Container, Title, BodyText, Button, ButtonText, Input, Card } from '../components/StyledComponents';
import styled from '@emotion/native';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

const Content = styled.View`
  flex: 1;
  padding: ${spacing.xl}px;
  justify-content: center;
`;

const Header = styled.View`
  align-items: center;
  margin-bottom: ${spacing.xl}px;
`;

const IconContainer = styled.View<{ roleColor: string }>`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${props => props.roleColor};
  justify-content: center;
  align-items: center;
  margin-bottom: ${spacing.lg}px;
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

const FormContainer = styled.View`
  margin-top: ${spacing.xl}px;
`;

const LoadingOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const LoadingCard = styled.View`
  background-color: ${colors.surface};
  padding: ${spacing.xl}px;
  border-radius: ${spacing.lg}px;
  align-items: center;
`;

export default function LoginScreen({ navigation, route }: Props) {
  const { role } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roleConfig = {
    super_admin: {
      title: 'Super Admin Login',
      icon: '👑',
      color: colors.superAdmin,
      gradientColors: [colors.superAdmin, '#6D28D9'],
    },
    admin: {
      title: 'Admin Login',
      icon: '🏗️',
      color: colors.admin,
      gradientColors: [colors.admin, '#1E40AF'],
    },
    contractor: {
      title: 'Contractor Login',
      icon: '👷',
      color: colors.contractor,
      gradientColors: [colors.contractor, '#D97706'],
    },
  };

  const config = roleConfig[role];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to appropriate dashboard
      const dashboardMap = {
        super_admin: 'SuperAdminDashboard',
        admin: 'AdminDashboard',
        contractor: 'ContractorDashboard',
      };

      navigation.navigate(dashboardMap[role] as keyof RootStackParamList);
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your credentials and try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality will be available soon');
  };

  return (
    <Container>
      <LinearGradient
        colors={config.gradientColors}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <BackButton onPress={handleBack}>
          <BodyText style={{ fontSize: 18, color: colors.text }}>←</BodyText>
        </BackButton>

        <Content>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Header>
              <IconContainer roleColor={config.color}>
                <BodyText style={{ fontSize: 32, color: colors.surface }}>{config.icon}</BodyText>
              </IconContainer>
              <Title style={{ color: colors.surface }}>{config.title}</Title>
              <BodyText style={{ color: colors.surface, textAlign: 'center', opacity: 0.9 }}>
                Enter your credentials to access your dashboard
              </BodyText>
            </Header>

            <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
              <FormContainer>
                <BodyText style={{ 
                  fontSize: 16, 
                  fontWeight: '600', 
                  color: colors.text, 
                  marginBottom: spacing.sm 
                }}>
                  Email Address
                </BodyText>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <BodyText style={{ 
                  fontSize: 16, 
                  fontWeight: '600', 
                  color: colors.text, 
                  marginBottom: spacing.sm 
                }}>
                  Password
                </BodyText>
                <Input
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <Button 
                  onPress={handleLogin}
                  disabled={isLoading}
                  style={{
                    backgroundColor: config.color,
                    opacity: isLoading ? 0.7 : 1,
                  }}
                >
                  <ButtonText>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </ButtonText>
                </Button>

                <View style={{ 
                  alignItems: 'center', 
                  marginTop: spacing.lg,
                  paddingTop: spacing.md,
                  borderTopWidth: 1,
                  borderTopColor: colors.border 
                }}>
                  <Button 
                    variant="outline" 
                    onPress={handleForgotPassword}
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: config.color,
                    }}
                  >
                    <ButtonText variant="outline" style={{ color: config.color }}>
                      Forgot Password?
                    </ButtonText>
                  </Button>
                </View>
              </FormContainer>
            </Card>

            <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', marginTop: spacing.lg }}>
              <BodyText style={{ 
                fontSize: 16, 
                fontWeight: '600', 
                color: colors.text, 
                marginBottom: spacing.sm 
              }}>
                Demo Credentials
              </BodyText>
              <BodyText style={{ color: colors.textSecondary, lineHeight: 22 }}>
                For testing purposes, you can use any email and password combination. 
                The authentication is currently simulated.
              </BodyText>
            </Card>
          </ScrollView>
        </Content>

        {isLoading && (
          <LoadingOverlay>
            <LoadingCard>
              <BodyText style={{ 
                fontSize: 18, 
                fontWeight: '600', 
                color: colors.text,
                marginBottom: spacing.md 
              }}>
                Signing In...
              </BodyText>
              <BodyText style={{ color: colors.textSecondary }}>
                Please wait while we verify your credentials
              </BodyText>
            </LoadingCard>
          </LoadingOverlay>
        )}
      </LinearGradient>
    </Container>
  );
}
