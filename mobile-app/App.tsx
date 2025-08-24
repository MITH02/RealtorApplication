import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import VideoLoaderScreen from './src/screens/VideoLoaderScreen';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import SuperAdminInfoScreen from './src/screens/roles/SuperAdminInfoScreen';
import AdminInfoScreen from './src/screens/roles/AdminInfoScreen';
import ContractorInfoScreen from './src/screens/roles/ContractorInfoScreen';
import LoginScreen from './src/screens/LoginScreen';
import SuperAdminDashboard from './src/screens/dashboards/SuperAdminDashboard';
import AdminDashboard from './src/screens/dashboards/AdminDashboard';
import ContractorDashboard from './src/screens/dashboards/ContractorDashboard';

export type RootStackParamList = {
  VideoLoader: undefined;
  RoleSelection: undefined;
  SuperAdminInfo: undefined;
  AdminInfo: undefined;
  ContractorInfo: undefined;
  Login: { role: 'super_admin' | 'admin' | 'contractor' };
  SuperAdminDashboard: undefined;
  AdminDashboard: undefined;
  ContractorDashboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator 
          initialRouteName="VideoLoader"
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
          <Stack.Screen name="VideoLoader" component={VideoLoaderScreen} />
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
          <Stack.Screen name="SuperAdminInfo" component={SuperAdminInfoScreen} />
          <Stack.Screen name="AdminInfo" component={AdminInfoScreen} />
          <Stack.Screen name="ContractorInfo" component={ContractorInfoScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SuperAdminDashboard" component={SuperAdminDashboard} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="ContractorDashboard" component={ContractorDashboard} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </PaperProvider>
  );
}
