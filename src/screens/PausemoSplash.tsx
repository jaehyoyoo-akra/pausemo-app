import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ShadowWrapper, PressButton } from '../components';
import { PausemoColors } from '../constants/Colors';
import { useOnboarding } from '../contexts/OnboardingContext';

const { width, height } = Dimensions.get('window');

export default function PausemoSplash() {
  const { nextStep } = useOnboarding();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const logoScaleAnim = useRef(new Animated.Value(0)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const cosmicRippleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 애니메이션 시퀀스 시작
    const startAnimation = () => {
      // 1. 배경 페이드인
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      // 2. 로고 스케일 애니메이션
      Animated.sequence([
        Animated.delay(500),
        Animated.spring(logoScaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      // 3. 텍스트 페이드인
      Animated.sequence([
        Animated.delay(1200),
        Animated.timing(textFadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();

      // 4. 전체 스케일 애니메이션
      Animated.sequence([
        Animated.delay(800),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      // 5. 버튼 페이드인
      Animated.sequence([
        Animated.delay(2000),
        Animated.timing(buttonFadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();

      // 6. 파동 애니메이션 시작
      Animated.loop(
        Animated.sequence([
          Animated.timing(rippleAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(rippleAnim, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // 7. 우주 파동 애니메이션 시작
      Animated.loop(
        Animated.sequence([
          Animated.timing(cosmicRippleAnim, {
            toValue: 1,
            duration: 6000,
            useNativeDriver: true,
          }),
          Animated.timing(cosmicRippleAnim, {
            toValue: 0,
            duration: 6000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();
  }, [fadeAnim, scaleAnim, logoScaleAnim, textFadeAnim, buttonFadeAnim]);

  const handleStartPress = () => {
    // 시작하기 버튼을 누르면 A1 화면으로 이동
    console.log('시작하기 버튼 클릭됨 - A0에서 A1로 이동');
    nextStep();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.background,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#1a1a2e', '#0f0f23']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
        
        {/* 우주공간 별들 */}
        <View style={styles.starsContainer}>
          {[...Array(15)].map((_, index) => (
            <ShadowWrapper key={index} variant="subtle" style={{ borderRadius: 1 }}>
              <View
                style={[
                  styles.star,
                  {
                    left: Math.random() * width,
                    top: Math.random() * height,
                    opacity: Math.random() * 0.6 + 0.2,
                    width: Math.random() * 2 + 1,
                    height: Math.random() * 2 + 1,
                  },
                ]}
              />
            </ShadowWrapper>
          ))}
        </View>

        {/* 나선형 동심원 효과 */}
        <View style={styles.rippleContainer}>
          {[...Array(3)].map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.ripple,
                {
                  borderColor: '#64748b',
                  opacity: 0.08 - index * 0.02,
                  transform: [{ rotate: `${index * 15}deg` }],
                },
              ]}
            />
          ))}
        </View>
        
        {/* 애니메이션 파동 효과 */}
        <Animated.View
          style={[
            styles.rippleContainer,
            {
              opacity: rippleAnim,
              transform: [{ scale: rippleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1.2],
              }) }],
            },
          ]}
        >
          <View style={[styles.ripple, { borderColor: '#94a3b8', opacity: 0.06 }]} />
        </Animated.View>
        
        {/* 추가 우주 파동 효과 */}
        <Animated.View
          style={[
            styles.cosmicRippleContainer,
            {
              opacity: cosmicRippleAnim,
              transform: [{ scale: cosmicRippleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1.1],
              }) }],
            },
          ]}
        >
          {[...Array(2)].map((_, index) => (
            <View
              key={`cosmic-${index}`}
              style={[
                styles.cosmicRipple,
                {
                  borderColor: '#94a3b8',
                  opacity: 0.04 - index * 0.015,
                },
              ]}
            />
          ))}
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* 로고 영역 */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: logoScaleAnim }],
            },
          ]}
        >
          <ShadowWrapper variant="medium" style={{ borderRadius: 24 }}>
            <View style={styles.logoSquare}>
              <LinearGradient
                colors={['#4285f4', '#2563eb', '#1d4ed8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoGradient}
              >
                <View style={styles.spiralContainer}>
                  <View style={styles.spiralOuter} />
                  <View style={styles.spiralMiddle} />
                  <View style={styles.spiralInner} />
                  <View style={styles.spiralCenter} />
                </View>
              </LinearGradient>
            </View>
          </ShadowWrapper>
        </Animated.View>

        {/* 앱 이름 */}
        <Animated.Text
          style={[
            styles.appName,
            {
              opacity: textFadeAnim,
            },
          ]}
        >
          Pausemo
        </Animated.Text>

        {/* 태그라인 */}
        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: textFadeAnim,
            },
          ]}
        >
          3초의 멈춤이 만드는{'\n'}평생의 변화
        </Animated.Text>

        {/* 부제목 */}
        <Animated.Text
          style={[
            styles.subtitle,
            {
              opacity: textFadeAnim,
            },
          ]}
        >
          나선형 성장 트레이너
        </Animated.Text>
      </Animated.View>

      {/* 시작하기 버튼 */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: buttonFadeAnim,
          },
        ]}
      >
        <PressButton
          title="시작하기"
          onPress={handleStartPress}
          variant="start"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
  },
  starsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  star: {
    position: 'absolute',
    width: 1,
    height: 1,
    backgroundColor: '#ffffff',
    borderRadius: 0.5,
    opacity: 0.6,
  },
  rippleContainer: {
    position: 'absolute',
    top: height / 2 - 100,
    left: width / 2 - 100,
    right: width / 2 - 100,
    bottom: height / 2 - 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ripple: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
  },
  cosmicRippleContainer: {
    position: 'absolute',
    top: height / 2 - 150,
    left: width / 2 - 150,
    right: width / 2 - 150,
    bottom: height / 2 - 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cosmicRipple: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    flex: 1,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoSquare: {
    width: 120,
    height: 120,
    borderRadius: 24,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spiralContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  spiralOuter: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderRadius: 24,
    transform: [{ rotate: '-45deg' }],
  },
  spiralMiddle: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRadius: 16,
    transform: [{ rotate: '45deg' }],
  },
  spiralInner: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderRadius: 8,
    transform: [{ rotate: '45deg' }],
  },
  spiralCenter: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Inter',
      android: 'Inter',
      default: 'System',
    }),
    // 텍스트 글로우 효과
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(59, 130, 246, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
      },
    }),
  },
  tagline: {
    fontSize: 20,
    color: PausemoColors.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: PausemoColors.textSecondary,
    textAlign: 'center',
    opacity: 0.8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 40,
    right: 40,
  },
  startButton: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
    fontFamily: Platform.select({
      ios: 'Inter',
      android: 'Inter',
      default: 'System',
    }),
  },
  startButtonArrow: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
});
