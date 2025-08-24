import React from "react";
import { ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { colors, spacing } from "../styles/theme";
import {
  Container,
  Title,
  BodyText,
  RoleCard,
  RoleTitle,
  RoleDescription,
} from "../components/StyledComponents";
import styled from "@emotion/native";

type RoleSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RoleSelection"
>;

interface Props {
  navigation: RoleSelectionScreenNavigationProp;
}

const Content = styled.View`
  flex: 1;
  padding: ${spacing.xl}px;
  justify-content: center;
`;

const Header = styled.View`
  align-items: center;
  margin-bottom: ${spacing.xxl}px;
`;

const RoleContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export default function RoleSelectionScreen({ navigation }: Props) {
  const roles = [
    {
      id: "super_admin",
      title: "Super Admin",
      description:
        "Configure admin accounts and manage system settings. Limited access to daily operations.",
      color: colors.superAdmin,
      icon: "👑",
      route: "SuperAdminInfo" as keyof RootStackParamList,
    },
    {
      id: "admin",
      title: "Admin",
      description:
        "Manage buildings, assign contractors, create tasks, and approve work completions.",
      color: colors.admin,
      icon: "🏗️",
      route: "AdminInfo" as keyof RootStackParamList,
    },
    {
      id: "contractor",
      title: "Contractor",
      description:
        "View assigned tasks, update progress, and submit work for approval.",
      color: colors.contractor,
      icon: "👷",
      route: "ContractorInfo" as keyof RootStackParamList,
    },
  ];

  const handleRoleSelect = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
  };

  return (
    <Container>
      <LinearGradient
        colors={["#F8FAFC", "#E2E8F0"]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Content>
          <Header>
            <Title style={{ color: colors.text }}>Choose Your Role</Title>
            <BodyText style={{ color: colors.textSecondary }}>
              Select your role to access the appropriate features and tools for
              your construction management needs.
            </BodyText>
          </Header>

          <RoleContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
              {roles.map((role) => (
                <RoleCard
                  key={role.id}
                  roleColor={role.color}
                  onPress={() => handleRoleSelect(role.route)}
                  activeOpacity={0.7}
                >
                  <View
                    style={{ alignItems: "center", marginBottom: spacing.md }}
                  >
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: role.color,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: spacing.md,
                      }}
                    >
                      <BodyText style={{ fontSize: 24 }}>{role.icon}</BodyText>
                    </View>
                  </View>

                  <RoleTitle roleColor={role.color}>{role.title}</RoleTitle>
                  <RoleDescription>{role.description}</RoleDescription>

                  <View
                    style={{
                      marginTop: spacing.lg,
                      paddingTop: spacing.md,
                      borderTopWidth: 1,
                      borderTopColor: colors.border,
                      alignItems: "center",
                    }}
                  >
                    <BodyText
                      style={{
                        color: role.color,
                        fontWeight: "600",
                        fontSize: 16,
                      }}
                    >
                      Continue as {role.title} →
                    </BodyText>
                  </View>
                </RoleCard>
              ))}
            </ScrollView>
          </RoleContainer>
        </Content>
      </LinearGradient>
    </Container>
  );
}
