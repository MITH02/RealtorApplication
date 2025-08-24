import styled from "@emotion/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  typography,
} from "../styles/theme";

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const Card = styled.View`
  background-color: ${colors.surface};
  border-radius: ${borderRadius.lg}px;
  padding: ${spacing.lg}px;
  margin-bottom: ${spacing.md}px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

export const Button = styled.TouchableOpacity<{
  variant?: "primary" | "secondary" | "outline";
}>`
  background-color: ${(props) =>
    props.variant === "secondary"
      ? colors.secondary
      : props.variant === "outline"
        ? "transparent"
        : colors.primary};
  border: ${(props) =>
    props.variant === "outline" ? `2px solid ${colors.primary}` : "none"};
  padding: ${spacing.md}px ${spacing.lg}px;
  border-radius: ${borderRadius.md}px;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  margin-vertical: ${spacing.xs}px;
`;

export const ButtonText = styled.Text<{
  variant?: "primary" | "secondary" | "outline";
}>`
  color: ${(props) =>
    props.variant === "outline" ? colors.primary : colors.surface};
  font-size: 16px;
  font-weight: 600;
`;

export const Title = styled.Text`
  ${typography.h1}
  color: ${colors.text};
  text-align: center;
  margin-bottom: ${spacing.lg}px;
`;

export const Subtitle = styled.Text`
  ${typography.h2}
  color: ${colors.text};
  margin-bottom: ${spacing.md}px;
`;

export const BodyText = styled.Text`
  ${typography.body}
  color: ${colors.textSecondary};
  text-align: center;
  line-height: 24px;
`;

export const Input = styled.TextInput`
  background-color: ${colors.surface};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.md}px;
  padding: ${spacing.md}px;
  font-size: 16px;
  color: ${colors.text};
  margin-bottom: ${spacing.md}px;
  min-height: 48px;
`;

export const GradientBackground = styled(LinearGradient)`
  flex: 1;
  padding: ${spacing.md}px;
`;

export const StatCard = styled.View`
  background-color: ${colors.surface};
  border-radius: ${borderRadius.lg}px;
  padding: ${spacing.lg}px;
  margin: ${spacing.xs}px;
  flex: 1;
  min-height: 100px;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2;
`;

export const StatValue = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: ${spacing.xs}px;
`;

export const StatLabel = styled.Text`
  font-size: 12px;
  color: ${colors.textSecondary};
  text-align: center;
`;

export const RoleCard = styled.TouchableOpacity<{ roleColor: string }>`
  background-color: ${colors.surface};
  border-radius: ${borderRadius.xl}px;
  padding: ${spacing.xl}px;
  margin: ${spacing.md}px;
  align-items: center;
  border: 2px solid ${(props) => props.roleColor};
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

export const RoleTitle = styled.Text<{ roleColor: string }>`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.roleColor};
  margin-bottom: ${spacing.sm}px;
`;

export const RoleDescription = styled.Text`
  ${typography.body}
  color: ${colors.textSecondary};
  text-align: center;
  line-height: 22px;
`;

export const Header = styled.View`
  background-color: ${colors.surface};
  padding: ${spacing.lg}px;
  padding-top: ${spacing.xxl}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2;
`;

export const HeaderTitle = styled.Text`
  ${typography.h2}
  color: ${colors.text};
  text-align: center;
`;

export const ActionCard = styled.TouchableOpacity`
  background-color: ${colors.surface};
  border-radius: ${borderRadius.md}px;
  padding: ${spacing.lg}px;
  margin-bottom: ${spacing.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
  elevation: 2;
`;

export const ActionText = styled.Text`
  ${typography.body}
  color: ${colors.text};
  font-weight: 500;
`;
