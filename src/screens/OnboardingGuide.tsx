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
import { MotiView } from 'moti';
import { ShadowWrapper, PressButton, PremiumCard } from '../components';
import { Theme, getThemeColor, getComponentStyle } from '../constants/Theme';
import { colors, darkColors, shadows, spacing, borderRadius, typography } from '../constants/Colors';
import { useOnboarding } from '../contexts/OnboardingContext';

const { width, height } = Dimensions.get('window');

export default function OnboardingGuide() {
  const { nextStep, previousStep } = useOnboarding();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  // 3,2,1 원 애니메이션
  const circle3Anim = useRef(new Animated.Value(0)).current;
  const circle2Anim = useRef(new Animated.Value(0)).current;
  const circle1Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 메인 콘텐츠 애니메이션
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: Theme.timing.slow,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: Theme.timing.slow,
        useNativeDriver: true,
      }),
    ]).start();

    // 3,2,1 원 순차적 부드러운 점멸 애니메이션
    const startCountdown = () => {
      // 3초 후 시작
      setTimeout(() => {
        // 3번 원 부드러운 점멸
        Animated.sequence([
          Animated.timing(circle3Anim, {
            toValue: 1,
            duration: Theme.timing.slow,
            useNativeDriver: true,
          }),
          Animated.timing(circle3Anim, {
            toValue: 0,
            duration: Theme.timing.slow,
            useNativeDriver: true,
          }),
        ]).start();

        // 2초 후 2번 원 점멸
        setTimeout(() => {
          Animated.sequence([
            Animated.timing(circle2Anim, {
              toValue: 1,
              duration: Theme.timing.slow,
              useNativeDriver: true,
            }),
            Animated.timing(circle2Anim, {
              toValue: 0,
              duration: Theme.timing.slow,
              useNativeDriver: true,
            }),
          ]).start();

          // 1초 후 1번 원 점멸
          setTimeout(() => {
            Animated.sequence([
              Animated.timing(circle1Anim, {
                toValue: 1,
                duration: Theme.timing.slow,
                useNativeDriver: true,
              }),
              Animated.timing(circle1Anim, {
                toValue: 0,
                duration: Theme.timing.slow,
                useNativeDriver: true,
              }),
            ]).start();
          }, 1000);
        }, 1000);
      }, 3000);
    };

    startCountdown();

    // 8초마다 반복 (더 여유로운 타이밍)
    const interval = setInterval(startCountdown, 8000);

    return () => clearInterval(interval);
  }, [fadeAnim, slideAnim, circle3Anim, circle2Anim, circle1Anim]);

  const handleNextPress = () => {
    nextStep();
  };

  return (
    <View style={styles.container}>
      {/* 배경 - 파란색에서 흰색으로 그라데이션 */}
      <Animated.View
        style={[
          styles.background,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <LinearGradient
          colors={[Theme.colors.surface1, Theme.colors.surface0]}
          style={styles.gradient}
        />
      </Animated.View>

      {/* 콘텐츠 */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* 프리미엄 하얀 카드 */}
        <PremiumCard variant="primary" padding="lg" style={styles.premiumCardStyle}>
          
          {/* 상단 아이콘 - 글로우 효과가 있는 연꽃 심볼 */}
          <MotiView
            style={styles.iconContainer}
            from={{ scale: 1, opacity: 1 }}
            animate={{ scale: [1, 1.05, 1], opacity: [1, 0.9, 1] }}
            transition={{
              type: 'timing',
              duration: 3000,
              loop: true,
            }}
          >
            <ShadowWrapper variant="medium" style={{ borderRadius: borderRadius.xl }}>
              <MotiView 
                style={styles.icon}
                transition={{
                  type: 'timing',
                  duration: 2000,
                  loop: true,
                }}
              >
                <LinearGradient
                  colors={[Theme.colors.confirmTeal, Theme.colors.pauseBlue]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconGradient}
                >
                  <View style={styles.iconInner}>
                    <View style={styles.lotusSymbol}>
                      <View style={styles.lotusPetals}>
                        <View style={styles.lotusPetal1} />
                        <View style={styles.lotusPetal2} />
                        <View style={styles.lotusPetal3} />
                        <View style={styles.lotusPetal4} />
                      </View>
                      <View style={styles.lotusCenter} />
                    </View>
                  </View>
                </LinearGradient>
              </MotiView>
            </ShadowWrapper>
          </MotiView>
          
          {/* 주요 텍스트 */}
          <Text style={styles.mainTitle}>
            ✓/X 선택과 3초 멈춤
          </Text>
          
          <Text style={styles.subtitle}>
            간단한 선택과 잠깐의 멈춤만으로도{'\n'}강력한 변화를 만듭니다
          </Text>
          
          {/* 3,2,1 단계 표시 원 */}
          <View style={styles.stepCircles}>
            <Animated.View 
              style={[
                styles.stepCircle,
                styles.stepCircle3,
                {
                  opacity: circle3Anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                }
              ]}
            >
              <Text style={styles.stepCircleText}>3</Text>
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.stepCircle,
                styles.stepCircle2,
                {
                  opacity: circle2Anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                }
              ]}
            >
              <Text style={styles.stepCircleText}>2</Text>
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.stepCircle,
                styles.stepCircle1,
                {
                  opacity: circle1Anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                }
              ]}
            >
              <Text style={styles.stepCircleText}>1</Text>
            </Animated.View>
          </View>
          
          {/* 인용문 상자 */}
          <View style={styles.quoteBox}>
            <Text style={styles.quoteText}>
              "나는 감정을 느끼되, 반응은 선택한다"
            </Text>
          </View>
        </PremiumCard>
      </Animated.View>

      {/* 다음 버튼 */}
      <View style={styles.buttonContainer}>
        <PressButton
          title="다음"
          onPress={handleNextPress}
          variant="next"
        />
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
  gradient: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.xl,
    flex: 1,
    paddingTop: 60,
    paddingBottom: 100,
  },
  premiumCardStyle: {
    width: '100%',
    maxWidth: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    zIndex: 1, // 그라데이션 위에 표시
  },
  icon: {
    width: 80,           // 더 큰 아이콘
    height: 80,
    borderRadius: borderRadius.xl,    // 더 둥근 모서리
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
    borderRadius: borderRadius.lg,
  },
  iconInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lotusSymbol: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  lotusPetals: {
    position: 'absolute',
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lotusPetal1: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.text.inverse,
    top: 0,
    left: 0,
  },
  lotusPetal2: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.text.inverse,
    top: 0,
    right: 0,
  },
  lotusPetal3: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.text.inverse,
    bottom: 0,
    left: 0,
  },
  lotusPetal4: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Theme.colors.background,
    bottom: 0,
    right: 0,
  },
  lotusCenter: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Theme.colors.background,
  },
  mainTitle: {
    fontSize: 20,        // text-xl
    fontWeight: '600',   // font-semibold
    lineHeight: 28,
    color: '#0f172a',    // text-gray-900 (진중하고 선명)
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
    fontFamily: Platform.select({
      ios: 'Inter',
      android: 'Inter',
      default: 'System',
    }),
    zIndex: 1,
  },
  subtitle: {
    fontSize: 14,        // text-sm  
    fontWeight: '400',
    lineHeight: 20,
    color: '#64748b',    // text-gray-600 (중립적, 안정감)
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
    fontFamily: Platform.select({
      ios: 'Inter',
      android: 'Inter',
      default: 'System',
    }),
    zIndex: 1,
  },
  stepCircles: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },
  stepCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircle3: {
    backgroundColor: Theme.colors.surface0,
    borderWidth: 2,
    borderColor: Theme.colors.confirmTeal,
  },
  stepCircle2: {
    backgroundColor: Theme.colors.surface0,
    borderWidth: 2,
    borderColor: Theme.colors.confirmTeal,
  },
  stepCircle1: {
    backgroundColor: Theme.colors.surface0,
    borderWidth: 2,
    borderColor: Theme.colors.confirmTeal,
  },
  stepCircleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(59, 130, 246)', // 메인 블루로 통일
    fontFamily: Platform.select({
      ios: 'Inter',
      android: 'Inter',
      default: 'System',
    }),
  },
  quoteBox: {
    backgroundColor: Theme.colors.surface1,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    borderWidth: 1,
    borderColor: Theme.colors.surface3,
  },
  quoteText: {
    fontSize: 16,        // text-base
    fontWeight: '500',   // font-medium
    lineHeight: 24,
    fontStyle: 'italic',
    color: '#64748b',    // text-gray-600
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Inter',
      android: 'Inter',
      default: 'System',
    }),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 40,
    right: 40,
  },
  nextButton: {
    backgroundColor: 'rgb(59, 130, 246)', // 메인 블루
    paddingVertical: 18,     // 더 두꺼운 패딩
    paddingHorizontal: 32,
    borderRadius: 25,        // 완전한 둥근 모서리
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: Theme.spacing.sm,
    fontFamily: Platform.select({
      ios: 'Inter',
      android: 'Inter',
      default: 'System',
    }),
  },
  nextButtonArrow: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: Platform.select({
      ios: 'Inter',
      android: 'Inter',
      default: 'System',
    }),
  },
});
