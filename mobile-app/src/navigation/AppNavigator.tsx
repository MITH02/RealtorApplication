import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";

import { useAuth } from "../context/AuthContext";
import VideoLoaderScreen from "../screens/VideoLoaderScreen";
import RoleSelectionScreen from "../screens/RoleSelectionScreen";
import SuperAdminInfoScreen from "../screens/roles/SuperAdminInfoScreen";
import AdminInfoScreen from "../screens/roles/AdminInfoScreen";
import ContractorInfoScreen from "../screens/roles/ContractorInfoScreen";
import LoginScreen from "../screens/LoginScreen";
import SuperAdminDashboard from "../screens/dashboards/SuperAdminDashboard";
import AdminDashboard from "../screens/dashboards/AdminDashboard";
import ContractorDashboard from "../screens/dashboards/ContractorDashboard";
import { colors, spacing } from "../styles/theme";

export type RootStackParamList = {
  VideoLoader: undefined;
  RoleSelection: undefined;
  SuperAdminInfo: undefined;
  AdminInfo: undefined;
  ContractorInfo: undefined;
  Login: { role: "super_admin" | "admin" | "contractor" };
  SuperAdminDashboard: undefined;
  AdminDashboard: undefined;
  ContractorDashboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const LoadingScreen = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    }}
  >
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

export default function AppNavigator() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      {isAuthenticated ? (
        // User is authenticated, show appropriate dashboard
        <>
          {user?.role === "SUPER_ADMIN" && (
            <Stack.Screen
              name="SuperAdminDashboard"
              component={SuperAdminDashboard}
            />
          )}
          {user?.role === "ADMIN" && (
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          )}
          {user?.role === "CONTRACTOR" && (
            <Stack.Screen
              name="ContractorDashboard"
              component={ContractorDashboard}
            />
          )}
        </>
      ) : (
        // User is not authenticated, show auth flow
        <>
          <Stack.Screen name="VideoLoader" component={VideoLoaderScreen} />
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
          <Stack.Screen
            name="SuperAdminInfo"
            component={SuperAdminInfoScreen}
          />
          <Stack.Screen name="AdminInfo" component={AdminInfoScreen} />
          <Stack.Screen
            name="ContractorInfo"
            component={ContractorInfoScreen}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
