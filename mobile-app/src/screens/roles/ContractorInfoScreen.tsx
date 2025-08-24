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

type ContractorInfoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ContractorInfo"
>;

interface Props {
  navigation: ContractorInfoScreenNavigationProp;
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
  background-color: ${colors.contractor};
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
  background-color: ${colors.contractor}20;
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

const ProcessStep = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${spacing.md}px;
  padding: ${spacing.md}px;
  background-color: ${colors.contractor}10;
  border-radius: 8px;
`;

export default function ContractorInfoScreen({ navigation }: Props) {
  const features = [
    { icon: "📋", text: "View assigned tasks and deadlines" },
    { icon: "📱", text: "Real-time task notifications" },
    { icon: "📸", text: "Upload progress photos and updates" },
    { icon: "✅", text: "Mark tasks as completed" },
    { icon: "💬", text: "Communicate with project admins" },
    { icon: "⏰", text: "Track time and deadlines" },
  ];

  const workProcess = [
    {
      step: "1",
      title: "Receive Task Assignment",
      description: "Get notified when new tasks are assigned to you",
    },
    {
      step: "2",
      title: "Review Requirements",
      description: "Check task details, deadlines, and specifications",
    },
    {
      step: "3",
      title: "Execute Work",
      description: "Complete the assigned work according to requirements",
    },
    {
      step: "4",
      title: "Submit for Approval",
      description: "Mark task as complete and request admin approval",
    },
    {
      step: "5",
      title: "Get Approval",
      description: "Wait for admin review and approval or feedback",
    },
  ];

  const handleLogin = () => {
    navigation.navigate("Login", { role: "contractor" });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <LinearGradient
        colors={[colors.contractor, "#D97706"]}
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
                👷
              </BodyText>
            </IconContainer>
            <Title style={{ color: colors.surface }}>Contractor</Title>
            <BodyText
              style={{
                color: colors.surface,
                textAlign: "center",
                opacity: 0.9,
              }}
            >
              Execute tasks efficiently and collaborate with project
              administrators
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
                Your Tools & Features
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
                How It Works
              </BodyText>
              {workProcess.map((process, index) => (
                <ProcessStep key={index}>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: colors.contractor,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: spacing.md,
                    }}
                  >
                    <BodyText
                      style={{
                        color: colors.surface,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {process.step}
                    </BodyText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <BodyText
                      style={{
                        fontWeight: "600",
                        color: colors.text,
                        marginBottom: 4,
                      }}
                    >
                      {process.title}
                    </BodyText>
                    <BodyText
                      style={{
                        color: colors.textSecondary,
                        fontSize: 14,
                        lineHeight: 18,
                      }}
                    >
                      {process.description}
                    </BodyText>
                  </View>
                </ProcessStep>
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
                Task Status Tracking
              </BodyText>
              <View style={{ marginBottom: spacing.md }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: spacing.sm,
                  }}
                >
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: colors.warning,
                      marginRight: spacing.sm,
                    }}
                  />
                  <BodyText style={{ color: colors.text }}>
                    Pending - Task assigned, work in progress
                  </BodyText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: spacing.sm,
                  }}
                >
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: colors.primary,
                      marginRight: spacing.sm,
                    }}
                  />
                  <BodyText style={{ color: colors.text }}>
                    Submitted - Awaiting admin approval
                  </BodyText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: spacing.sm,
                  }}
                >
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: colors.success,
                      marginRight: spacing.sm,
                    }}
                  />
                  <BodyText style={{ color: colors.text }}>
                    Approved - Task completed successfully
                  </BodyText>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: colors.error,
                      marginRight: spacing.sm,
                    }}
                  />
                  <BodyText style={{ color: colors.text }}>
                    Overdue - Past deadline, needs attention
                  </BodyText>
                </View>
              </View>
            </Card>

            <View style={{ marginTop: spacing.lg }}>
              <Button onPress={handleLogin}>
                <ButtonText>Access Contractor Dashboard</ButtonText>
              </Button>
            </View>
          </ScrollView>
        </Content>
      </LinearGradient>
    </Container>
  );
}
