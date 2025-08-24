import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { colors, spacing } from '../styles/theme';
import { Button, ButtonText, Title, BodyText } from '../components/StyledComponents';
import styled from '@emotion/native';

type VideoLoaderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VideoLoader'>;

interface Props {
  navigation: VideoLoaderScreenNavigationProp;
}

const Container = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${spacing.xl}px;
`;

const Logo = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${colors.surface};
  justify-content: center;
  align-items: center;
  margin-bottom: ${spacing.xl}px;
  shadow-color: #000;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.2;
  shadow-radius: 16px;
  elevation: 8;
`;

const LogoText = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${colors.primary};
`;

const AnimatedLogo = styled(Animated.View)`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${colors.surface};
  justify-content: center;
  align-items: center;
  margin-bottom: ${spacing.xl}px;
  shadow-color: #000;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.2;
  shadow-radius: 16px;
  elevation: 8;
`;

const AppTitle = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.surface};
  margin-bottom: ${spacing.md}px;
  text-align: center;
`;

const Tagline = styled.Text`
  font-size: 18px;
  color: ${colors.surface};
  text-align: center;
  margin-bottom: ${spacing.xxl}px;
  opacity: 0.9;
  line-height: 26px;
`;

const FeatureList = styled.View`
  margin-bottom: ${spacing.xxl}px;
`;

const FeatureItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${spacing.md}px;
`;

const FeatureIcon = styled.Text`
  font-size: 20px;
  margin-right: ${spacing.md}px;
`;

const FeatureText = styled.Text`
  font-size: 16px;
  color: ${colors.surface};
  flex: 1;
`;

export default function VideoLoaderScreen({ navigation }: Props) {
  const [animatedValue] = useState(new Animated.Value(0));
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Start animation
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Show content after animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const logoScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const logoRotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const contentOpacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const features = [
    { icon: '🏗️', text: 'Manage multiple construction projects' },
    { icon: '👷', text: 'Assign tasks to contractors efficiently' },
    { icon: '📋', text: 'Track progress and deadlines' },
    { icon: '✅', text: 'Approve work completions' },
    { icon: '📱', text: 'Real-time notifications and updates' },
  ];

  const handleGetStarted = () => {
    navigation.navigate('RoleSelection');
  };

  return (
    <Container>
      <LinearGradient
        colors={colors.gradient.primary}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Content>
          <AnimatedLogo
            style={{
              transform: [
                { scale: logoScale },
                { rotate: logoRotation }
              ],
            }}
          >
            <LogoText>CP</LogoText>
          </AnimatedLogo>

          <Animated.View style={{ opacity: contentOpacity, alignItems: 'center' }}>
            <AppTitle>ConstructPro</AppTitle>
            <Tagline>
              Streamline your construction projects with powerful project management tools
            </Tagline>

            {showContent && (
              <>
                <FeatureList>
                  {features.map((feature, index) => (
                    <FeatureItem key={index}>
                      <FeatureIcon>{feature.icon}</FeatureIcon>
                      <FeatureText>{feature.text}</FeatureText>
                    </FeatureItem>
                  ))}
                </FeatureList>

                <Button onPress={handleGetStarted}>
                  <ButtonText>Get Started</ButtonText>
                </Button>
              </>
            )}
          </Animated.View>
        </Content>
      </LinearGradient>
    </Container>
  );
}
