import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ShadowWrapper from '../components/ShadowWrapper';
import { useOnboarding } from '../contexts/OnboardingContext';

const { width, height } = Dimensions.get('window');

export default function PatternAnalysis() {
  const { nextStep } = useOnboarding();
  
  // 애니메이션 값들
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 5초 후 자동 전환
    const timer = setTimeout(() => {
      nextStep();
    }, 5000);

    // 분석 애니메이션 시작
    startAnalysisAnimations();

    return () => clearTimeout(timer);
  }, [nextStep]);

  const startAnalysisAnimations = () => {
    // 1. 메인 페이드인
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // 2. 진행률 애니메이션 (5초 동안)
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();

    // 3. 분석 맥동 - 더 역동적으로
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.98,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  return (
    <View style={styles.container}>
      {/* 배경 그라데이션 */}
      <LinearGradient
        colors={['#0f172a', '#1e293b']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />

      {/* 메인 콘텐츠 */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        {/* 메인 아이콘 - 심플한 원형 */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          <ShadowWrapper variant="medium" style={{ borderRadius: 50 }}>
            <View style={styles.icon}>
              <LinearGradient
                colors={['#3b82f6', '#1e40af']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconGradient}
              >
                <View style={styles.iconInner}>
                  <View style={styles.centerDot} />
                </View>
              </LinearGradient>
            </View>
                      </ShadowWrapper>
        </Animated.View>

        {/* 데이터 흐름 효과 - 분석 중인 느낌 */}
        <View style={styles.dataFlowContainer}>
          {[...Array(5)].map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.dataFlowDot,
                {
                  opacity: pulseAnim.interpolate({
                    inputRange: [1, 1.02],
                    outputRange: [0.3, 0.8],
                  }),
                  transform: [{ translateY: pulseAnim.interpolate({
                    inputRange: [1, 1.02],
                    outputRange: [0, -10],
                  })}],
                },
              ]}
            />
          ))}
        </View>

        {/* 메인 텍스트 */}
        <View style={styles.textContainer}>
          <Text style={styles.mainTitle}>패턴을 분석 중입니다...</Text>
          <Text style={styles.subtitle}>
            신경과학 기반 알고리즘이{'\n'}당신의 성장 패턴을 분석하고 있습니다
          </Text>
        </View>

        {/* 진행률 바 - 심플하고 우아하게 */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
            {/* 진행률 바 위에 분석 중인 느낌의 점들 */}
            <Animated.View
              style={[
                styles.progressIndicator,
                {
                  opacity: pulseAnim.interpolate({
                    inputRange: [1, 1.02],
                    outputRange: [0.6, 1],
                  }),
                },
              ]}
            />
          </View>
        </View>
      </Animated.View>

      {/* 배경 파티클 - 미묘하게 */}
      <View style={styles.particlesContainer}>
        {[...Array(6)].map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                left: `${15 + (index * 15)}%`,
                top: `${20 + (index * 12)}%`,
                opacity: pulseAnim.interpolate({
                  inputRange: [1, 1.02],
                  outputRange: [0.2, 0.4],
                }),
              },
            ]}
          />
        ))}
      </View>
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
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  iconInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerDot: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '300',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '300',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 50,
    width: '100%',
  },
  progressBackground: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  progressIndicator: {
    position: 'absolute',
    top: -3,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: '#3b82f6',
    borderRadius: 5,
    marginLeft: -5,
  },
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: '#60a5fa',
    borderRadius: 1,
  },
  dataFlowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
  },
  dataFlowDot: {
    width: 8,
    height: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 4,
    marginHorizontal: 2,
  },
});
