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
import { Theme, getThemeColor, getComponentStyle } from '../constants/Theme';
import { colors, darkColors, shadows, spacing, borderRadius, typography } from '../constants/Colors';
import { PremiumCard, PressButton, ThemedText, IconContainer } from '../components';
import { useOnboarding } from '../contexts/OnboardingContext';

const { width, height } = Dimensions.get('window');

export default function BrainIntro() {
  const { nextStep, previousStep } = useOnboarding();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    console.log('🧠 BrainIntro 컴포넌트 마운트됨!');
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
  }, [fadeAnim, slideAnim]);

  const handleNextPress = () => {
    nextStep();
  };

  return (
    <View style={styles.container}>
      {/* 배경 */}
      <Animated.View
        style={[
          styles.background,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <LinearGradient
          colors={[
            Theme.colors.surface0, 
            Theme.colors.surface1, 
            Theme.colors.surface2
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
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
          <PremiumCard variant="primary" padding="lg" style={styles.premiumCard}>
            {/* ⚛️ 과학 아이콘 - 고급스럽게 구현 */}
            <MotiView 
              style={styles.brainIconContainer}
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
                  colors={[colors.primary[500], colors.text.emphasis]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconGradient}
                >
                  <View style={styles.iconInner}>
                    <View style={styles.scienceSymbol}>
                      {/* 중앙 핵 (원자핵) */}
                      <View style={styles.scienceNucleus} />
                      {/* 궤도 1 (전자 궤도) */}
                      <View style={styles.scienceOrbit1} />
                      {/* 궤도 2 (전자 궤도) */}
                      <View style={styles.scienceOrbit2} />
                      {/* 전자들 */}
                      <View style={styles.scienceElectron1} />
                      <View style={styles.scienceElectron2} />
                      <View style={styles.scienceElectron3} />
                    </View>
                  </View>
                </LinearGradient>
              </IconContainer>
            </MotiView>
            
            {/* 메인 제목 */}
            <ThemedText variant="h3" color="primary" align="center" style={styles.mainTitle}>
              과학적 연구를 바탕으로{'\n'}설계된 마음 관리
            </ThemedText>
            
            {/* 부제목/설명 */}
            <ThemedText variant="bodySecondary" color="secondary" align="center" style={styles.subtitle}>
              다양한 연구 결과를 참고하여 개발된{'\n'}접근 방법론을 제공합니다
            </ThemedText>
            
            {/* 특징 목록 */}
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: colors.primary[500] }]} />
                <ThemedText variant="body" color="primary" style={styles.featureText}>
                  인지행동치료(CBT) 기반 패턴 분석
                </ThemedText>
              </View>
              
              <View style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: colors.text.emphasis }]} />
                <ThemedText variant="body" color="primary" style={styles.featureText}>
                  신경과학 연구 결과 반영한 설계
                </ThemedText>
              </View>
              
              <View style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: colors.semantic.info }]} />
                <ThemedText variant="body" color="primary" style={styles.featureText}>
                  임상 심리학 연구에 근거한 접근법
                </ThemedText>
              </View>
            </View>
          </PremiumCard>
        </View>
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
    paddingHorizontal: spacing.xl,
    flex: 1,
    paddingTop: 40,
    paddingBottom: 140,
  },
  cardContainer: {
    width: width - 64,
    maxWidth: width - 64,
  },
  premiumCard: {
    width: '100%',
    maxWidth: '100%',
  },
  brainIconContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    zIndex: 1,
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
  nextButton: {
    width: '100%',
  },
  scienceSymbol: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scienceNucleus: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.text.inverse,
    position: 'absolute',
    top: 14,
    left: 14,
  },
  scienceOrbit1: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    position: 'absolute',
    top: 4,
    left: 4,
  },
  scienceOrbit2: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    top: 8,
    left: 8,
  },
  scienceElectron1: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.text.inverse,
    position: 'absolute',
    top: 6,
    left: 20,
  },
  scienceElectron2: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.text.inverse,
    position: 'absolute',
    top: 20,
    left: 6,
  },
  scienceElectron3: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.text.inverse,
    position: 'absolute',
    top: 20,
    left: 34,
  },
});
