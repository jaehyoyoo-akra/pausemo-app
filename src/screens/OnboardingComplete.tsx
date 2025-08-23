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
import { ShadowWrapper, PressButton } from '../components';
import { Theme, getThemeColor, getComponentStyle } from '../constants/Theme';
import { colors, darkColors, shadows, spacing, borderRadius, typography } from '../constants/Colors';
import { PremiumCard, PrimaryButton, ThemedText, IconContainer } from '../components';
import { useOnboarding } from '../contexts/OnboardingContext';

const { width, height } = Dimensions.get('window');

export default function OnboardingComplete() {
  const { nextStep, previousStep } = useOnboarding();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const starAnim = useRef(new Animated.Value(1)).current;

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

    // 별 아이콘 반짝임 애니메이션
    const startStarAnimation = () => {
      Animated.sequence([
        Animated.timing(starAnim, {
          toValue: 1.2,
          duration: Theme.timing.slow,
          useNativeDriver: true,
        }),
        Animated.timing(starAnim, {
          toValue: 1,
          duration: Theme.timing.slow,
          useNativeDriver: true,
        }),
      ]).start();
    };

    startStarAnimation();
    const interval = setInterval(startStarAnimation, 3000);
    return () => clearInterval(interval);
  }, [fadeAnim, slideAnim, starAnim]);

  const handleStartPress = () => {
    nextStep();
  };

  return (
    <View style={styles.container}>
      {/* 배경 - 연한 녹색 그라데이션 */}
      <Animated.View
        style={[
          styles.background,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <LinearGradient
          colors={[colors.surface[1], colors.surface[0]]}
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
        <View style={styles.cardContainer}>
          <PremiumCard variant="success" padding="lg" style={styles.premiumCardStyle}>
            {/* 상단 아이콘 - 녹색 배경에 고급스러운 방패 */}
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
              <IconContainer size="md" variant="glow">
                <LinearGradient
                  colors={[colors.semantic.success, colors.semantic.info]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconGradient}
                >
                  <View style={styles.iconInner}>
                    <View style={styles.shieldSymbol}>
                      <View style={styles.shieldBody} />
                      <View style={styles.shieldTop} />
                      <View style={styles.shieldCenter} />
                    </View>
                  </View>
                </LinearGradient>
              </IconContainer>
            </MotiView>
            
            {/* 메인 제목 */}
            <ThemedText variant="h3" color="primary" align="center" style={styles.mainTitle}>
              100% 로컬 저장
            </ThemedText>
            
            {/* 부제목/설명 */}
            <ThemedText variant="bodySecondary" color="secondary" align="center" style={styles.subtitle}>
              모든 데이터는 기기에만 저장되어{'\n'}완전한 프라이버시를 보장합니다
            </ThemedText>
            
            {/* 특징 목록 */}
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: colors.semantic.success }]} />
                <ThemedText variant="body" color="primary" style={styles.featureText}>
                  ✓ 외부 서버로 데이터 전송 없음
                </ThemedText>
              </View>
              
              <View style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: colors.primary[500] }]} />
                <ThemedText variant="body" color="primary" style={styles.featureText}>
                  ✓ 개인정보 수집하지 않음
                </ThemedText>
              </View>
              
              <View style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: colors.text.emphasis }]} />
                <ThemedText variant="body" color="primary" style={styles.featureText}>
                  ✓ 완전한 익명성 보장
                </ThemedText>
              </View>
              
              <View style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: colors.semantic.error }]} />
                <ThemedText variant="body" color="primary" style={styles.featureText}>
                  ✓ 언제든 데이터 완전 삭제 가능
                </ThemedText>
              </View>
            </View>
          </PremiumCard>
        </View>
      </Animated.View>

      {/* 마음 능력치 진단 시작 버튼 */}
      <View style={styles.buttonContainer}>
        <PressButton
          title="마음 능력치 진단 시작"
          onPress={handleStartPress}
          variant="diagnosis"
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
    paddingHorizontal: spacing.xl,
    flex: 1,
    paddingTop: 40,
    paddingBottom: 140,
  },
  cardContainer: {
    width: width - 64,
    maxWidth: width - 64,
  },
  premiumCardStyle: {
    width: '100%',
    maxWidth: '100%',
  },
  premiumCard: {
    width: width - 64,
    backgroundColor: colors.surface[0],  // 새로운 디자인 시스템 색상
    borderRadius: borderRadius['2xl'],
    padding: spacing[8],
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    zIndex: 1,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.xl,
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
  shieldSymbol: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  shieldBody: {
    position: 'absolute',
    width: 32,
    height: 36,
    backgroundColor: colors.text.inverse,
    borderRadius: 16,
    top: 2,
    left: 4,
  },
  shieldTop: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: colors.text.inverse,
    borderRadius: 4,
    top: 0,
    left: 16,
  },
  shieldCenter: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: colors.semantic.success,
    borderRadius: 2,
    top: 18,
    left: 18,
  },
  mainTitle: {
    marginBottom: spacing.md,
    zIndex: 1,
  },
  subtitle: {
    marginBottom: spacing.xl,
    zIndex: 1,
  },
  featuresList: {
    gap: spacing.lg,
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    width: '100%',
  },
  featureDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    flexShrink: 0,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: colors.text.primary,
    zIndex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 40,
    right: 40,
  },
  startButton: {
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    ...Theme.typography.body,
    color: Theme.colors.background,
    fontWeight: '600',
    marginRight: Theme.spacing.sm,
  },
  startButtonText: {
    ...Theme.typography.body,
    color: Theme.colors.background,
    fontWeight: '600',
    marginRight: Theme.spacing.sm,
  },
  starIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  starText: {
    fontSize: 16,
    color: Theme.colors.patternDetect,
  },
});