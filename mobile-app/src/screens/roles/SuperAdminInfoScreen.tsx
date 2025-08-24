import React from "react";
import { ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { colors, spacing } from "../../styles/theme";
import {
  Container,
  Title,
  BodyText,
  Button,
  ButtonText,
  Card,
} from "../../components/StyledComponents";
import styled from "@emotion/native";

type SuperAdminInfoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SuperAdminInfo"
>;

interface Props {
  navigation: SuperAdminInfoScreenNavigationProp;
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
  background-color: ${colors.superAdmin};
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
  background-color: ${colors.superAdmin}20;
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

export default function SuperAdminInfoScreen({ navigation }: Props) {
  const features = [
    { icon: "👥", text: "Configure and manage Admin accounts" },
    { icon: "⚙️", text: "System-level configuration access" },
    { icon: "🔐", text: "User role and permission management" },
    { icon: "📊", text: "High-level system analytics" },
    { icon: "🛡️", text: "Security and compliance oversight" },
  ];

  const responsibilities = [
    "Create and configure Admin user accounts",
    "Set system-wide permissions and policies",
    "Monitor overall system health and usage",
    "Manage organizational settings and preferences",
    "Limited involvement in daily project operations",
  ];

  const handleLogin = () => {
    navigation.navigate("Login", { role: "super_admin" });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <LinearGradient
        colors={[colors.superAdmin, "#6D28D9"]}
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
              <BodyText style={{ fontSize: 32, color: colors.surface }}>
                👑
              </BodyText>
            </IconContainer>
            <Title style={{ color: colors.surface }}>Super Admin</Title>
            <BodyText
              style={{
                color: colors.surface,
                textAlign: "center",
                opacity: 0.9,
              }}
            >
              High-level system administration with focus on user management and
              system configuration
            </BodyText>
          </Header>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
              <BodyText
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: colors.text,
                  marginBottom: spacing.md,
                }}
              >
                Key Features
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

            <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
              <BodyText
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: colors.text,
                  marginBottom: spacing.md,
                }}
              >
                Your Responsibilities
              </BodyText>
              {responsibilities.map((responsibility, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginBottom: spacing.sm,
                    alignItems: "flex-start",
                  }}
                >
                  <BodyText
                    style={{
                      color: colors.superAdmin,
                      marginRight: spacing.sm,
                      fontSize: 16,
                    }}
                  >
                    •
                  </BodyText>
                  <BodyText
                    style={{
                      flex: 1,
                      color: colors.text,
                      lineHeight: 22,
                    }}
                  >
                    {responsibility}
                  </BodyText>
                </View>
              ))}
            </Card>

            <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
              <BodyText
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: colors.text,
                  marginBottom: spacing.md,
                }}
              >
                Important Note
              </BodyText>
              <BodyText
                style={{
                  color: colors.textSecondary,
                  lineHeight: 22,
                  fontStyle: "italic",
                }}
              >
                As a Super Admin, your role is focused on system administration
                and user management. Daily project operations, building
                management, and task assignments are handled by Admin users.
              </BodyText>
            </Card>

            <View style={{ marginTop: spacing.lg }}>
              <Button onPress={handleLogin}>
                <ButtonText>Access Super Admin Panel</ButtonText>
              </Button>
            </View>
          </ScrollView>
        </Content>
      </LinearGradient>
    </Container>
  );
}
