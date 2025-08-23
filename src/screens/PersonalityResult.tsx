import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';
import { ShadowWrapper, PressButton } from '../components';
import { colors, darkColors, shadows, spacing, borderRadius, typography } from '../constants/Colors';
import { useOnboarding } from '../contexts/OnboardingContext';

const { width, height } = Dimensions.get('window');

export default function PersonalityResult() {
  const { nextStep } = useOnboarding();
  
  // 애니메이션 값들
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const iconScaleAnim = useRef(new Animated.Value(0.8)).current;
  const cardAnim1 = useRef(new Animated.Value(0)).current;
  const cardAnim2 = useRef(new Animated.Value(0)).current;
  const cardAnim3 = useRef(new Animated.Value(0)).current;
  const cardAnim4 = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimations();
  }, []);

  const startAnimations = () => {
    // 1. 메인 페이드인
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // 2. 아이콘 스케일 애니메이션
    Animated.spring(iconScaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // 3. 카드들 순차적 애니메이션
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(cardAnim1, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.delay(100),
      Animated.timing(cardAnim2, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.delay(100),
      Animated.timing(cardAnim3, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.delay(100),
      Animated.timing(cardAnim4, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.delay(200),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNextPress = () => {
    nextStep();
  };

  return (
    <View style={styles.container}>
      {/* 배경 그라데이션 */}
      <LinearGradient
        colors={[colors.surface[0], colors.surface[1], colors.surface[2]]}
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
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* 메인 아이콘 */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ scale: iconScaleAnim }],
            },
          ]}
        >
          <ShadowWrapper variant="medium" style={{ borderRadius: borderRadius.lg }}>
            <View style={styles.icon}>
              <LinearGradient
                colors={['#8b5cf6', '#3b82f6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconGradient}
              >
                <View style={styles.iconInner}>
                  <View style={styles.wave1} />
                  <View style={styles.wave2} />
                  <View style={styles.wave3} />
                </View>
              </LinearGradient>
                          </View>
            </ShadowWrapper>
          </Animated.View>

        {/* 메인 제목 */}
        <Text style={styles.mainTitle}>실수-공포 패턴</Text>
        
        {/* 부제목 */}
        <Text style={styles.subtitle}>
          "완성도 높은 결과를 추구하는 당신"
        </Text>

        {/* 정보 카드들 */}
        <View style={styles.cardsContainer}>
          {/* 카드 1: 특징 */}
          <ShadowWrapper variant="medium" style={{ borderRadius: borderRadius.md }}>
            <Animated.View
              style={[
                styles.card,
                {
                  opacity: cardAnim1,
                  transform: [{ translateY: cardAnim1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  })}],
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  <View style={styles.circleIcon} />
                </View>
                <Text style={styles.cardTitle}>특징</Text>
              </View>
              <Text style={styles.cardContent}>
                신중한 준비와 철저한 검토를 통해 최상의 결과를 만들어내며, 정확성과 완성도에서 만족을 찾는 성장형
              </Text>
            </Animated.View>
          </ShadowWrapper>

          {/* 카드 2: 트리거 */}
          <ShadowWrapper variant="medium" style={{ borderRadius: borderRadius.md }}>
            <Animated.View
              style={[
                styles.card,
                {
                  opacity: cardAnim2,
                  transform: [{ translateY: cardAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  })}],
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  <View style={styles.waveIcon}>
                    <View style={styles.waveIconLine1} />
                    <View style={styles.waveIconLine2} />
                    <View style={styles.waveIconLine3} />
                  </View>
                </View>
                <Text style={styles.cardTitle}>트리거</Text>
              </View>
              <Text style={styles.cardContent}>
                실수나 오류 가능성이 높을 때
              </Text>
            </Animated.View>
          </ShadowWrapper>

          {/* 카드 3: 핵심 두려움 */}
          <ShadowWrapper variant="medium" style={{ borderRadius: borderRadius.md }}>
            <Animated.View
              style={[
                styles.card,
                {
                  opacity: cardAnim3,
                  transform: [{ translateY: cardAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  })}],
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  <View style={styles.moonIcon} />
                </View>
                <Text style={styles.cardTitle}>핵심 두려움</Text>
              </View>
              <Text style={styles.cardContent}>
                "완벽하지 못해 비판받는 것"
              </Text>
            </Animated.View>
          </ShadowWrapper>

          {/* 카드 4: 개입 초점 */}
          <ShadowWrapper variant="medium" style={{ borderRadius: borderRadius.md }}>
            <Animated.View
              style={[
                styles.card,
                {
                  opacity: cardAnim4,
                  transform: [{ translateY: cardAnim4.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  })}],
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardIcon}>
                  <View style={styles.leafIcon} />
                </View>
                <Text style={styles.cardTitle}>개입 초점</Text>
              </View>
              <Text style={styles.cardContent}>
                적당함의 가치와 실수 수용
              </Text>
            </Animated.View>
          </ShadowWrapper>
        </View>
      </Animated.View>

      {/* 하단 버튼 */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: buttonAnim,
            transform: [{ translateY: buttonAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
            })}],
          },
        ]}
      >
        <PressButton
          title="관심 영역 선택하기"
          onPress={handleNextPress}
          variant="interest"
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
  content: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: 40,
    paddingBottom: 140,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: borderRadius.lg,
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
    borderRadius: 20,
  },
  iconInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave1: {
    position: 'absolute',
    width: 40,
    height: 3,
    backgroundColor: colors.text.inverse,
    borderRadius: 2,
    top: 25,
    left: 20,
  },
  wave2: {
    position: 'absolute',
    width: 35,
    height: 3,
    backgroundColor: colors.text.inverse,
    borderRadius: 2,
    top: 35,
    left: 22,
  },
  wave3: {
    position: 'absolute',
    width: 30,
    height: 3,
    backgroundColor: colors.text.inverse,
    borderRadius: 2,
    top: 45,
    left: 25,
  },
  mainTitle: {
    fontSize: typography.sizes['3xl'],
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.primary[500],
    textAlign: 'center',
    lineHeight: typography.sizes.base * typography.lineHeights.normal,
    marginBottom: spacing.xl,
    fontStyle: 'italic',
  },
  cardsContainer: {
    width: '100%',
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface[0],
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardIcon: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  circleIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  waveIcon: {
    width: 22,
    height: 14,
    justifyContent: 'space-between',
  },
  waveIconLine1: {
    width: 7,
    height: 2,
    backgroundColor: '#ef4444',
    borderRadius: 1,
  },
  waveIconLine2: {
    width: 9,
    height: 2,
    backgroundColor: '#ef4444',
    borderRadius: 1,
  },
  waveIconLine3: {
    width: 5,
    height: 2,
    backgroundColor: '#ef4444',
    borderRadius: 1,
  },
  moonIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#94a3b8',
    transform: [{ scaleX: 0.8 }],
  },
  leafIcon: {
    width: 18,
    height: 18,
    backgroundColor: '#10b981',
    borderRadius: 9,
    transform: [{ rotate: '45deg' }],
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  cardContent: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 40,
    right: 40,
  },
  nextButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 6,
  },
  nextButtonArrow: {
    fontSize: 17,
    color: '#ffffff',
    fontWeight: '600',
  },
});
