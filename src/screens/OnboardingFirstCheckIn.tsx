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
import { PausemoColors } from '../constants/Colors';
import { PressButton, PremiumCard } from '../components';
import { useOnboarding } from '../contexts/OnboardingContext';

const { width, height } = Dimensions.get('window');

export default function OnboardingFirstCheckIn() {
  const { nextStep, previousStep } = useOnboarding();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  // 6가지 능력치 게이지 애니메이션
  const gaugeAnim1 = useRef(new Animated.Value(0)).current;
  const gaugeAnim2 = useRef(new Animated.Value(0)).current;
  const gaugeAnim3 = useRef(new Animated.Value(0)).current;
  const gaugeAnim4 = useRef(new Animated.Value(0)).current;
  const gaugeAnim5 = useRef(new Animated.Value(0)).current;
  const gaugeAnim6 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 메인 콘텐츠 애니메이션
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // 1초 후 게이지 애니메이션 시작
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(gaugeAnim1, {
          toValue: 73,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(gaugeAnim2, {
          toValue: 72,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(gaugeAnim3, {
          toValue: 52,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(gaugeAnim4, {
          toValue: 53,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(gaugeAnim5, {
          toValue: 59,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(gaugeAnim6, {
          toValue: 56,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]).start();
    }, 1000);
  }, [fadeAnim, slideAnim, gaugeAnim1, gaugeAnim2, gaugeAnim3, gaugeAnim4, gaugeAnim5, gaugeAnim6]);

  const handleNextPress = () => {
    nextStep();
  };

  return (
    <View style={styles.container}>
      {/* 배경 - 보라색에서 흰색으로 그라데이션 */}
      <Animated.View
        style={[
          styles.background,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <LinearGradient
          colors={['#f3e8ff', '#ffffff']}
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
        {/* 프리미엄 카드 */}
        <PremiumCard variant="primary" padding="lg" style={styles.premiumCardStyle}>
          {/* 상단 아이콘 - 고급스러운 체크마크 심볼 */}
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <LinearGradient
                colors={['#8b5cf6', '#7c3aed']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconGradient}
              >
                <View style={styles.iconInner}>
                  <View style={styles.checkmarkSymbol}>
                    <View style={styles.checkmarkLine1} />
                    <View style={styles.checkmarkLine2} />
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>
          
          {/* 메인 제목 */}
          <Text style={styles.mainTitle}>
            6가지 마음 능력치 시각화
          </Text>
          
          {/* 부제목 */}
          <Text style={styles.subtitle}>
            과학적으로 분류한 심리적 역량을{'\n'}직관적으로 확인하고 성장시킵니다
          </Text>
          
          {/* 6가지 능력치 카드 (2x3 그리드) */}
          <View style={styles.abilitiesGrid}>
            {/* 1행 */}
            <View style={styles.abilityRow}>
              {/* 자기조절력 */}
              <View style={styles.abilityCard}>
                <Text style={[styles.abilityScore, { color: '#8b5cf6' }]}>73</Text>
                <Text style={styles.abilityName}>자기조절력</Text>
                <View style={styles.gaugeContainer}>
                  <View style={styles.gaugeBackground} />
                  <Animated.View 
                    style={[
                      styles.gaugeFill,
                      { 
                        backgroundColor: '#8b5cf6',
                        width: gaugeAnim1.interpolate({
                          inputRange: [0, 73],
                          outputRange: ['0%', '73%'],
                        })
                      }
                    ]} 
                  />
                </View>
              </View>
              
              {/* 독립심 */}
              <View style={styles.abilityCard}>
                <Text style={[styles.abilityScore, { color: '#06b6d4' }]}>72</Text>
                <Text style={styles.abilityName}>독립심</Text>
                <View style={styles.gaugeContainer}>
                  <View style={styles.gaugeBackground} />
                  <Animated.View 
                    style={[
                      styles.gaugeFill,
                      { 
                        backgroundColor: '#06b6d4',
                        width: gaugeAnim2.interpolate({
                          inputRange: [0, 72],
                          outputRange: ['0%', '72%'],
                        })
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
            
            {/* 2행 */}
            <View style={styles.abilityRow}>
              {/* 일관성 */}
              <View style={styles.abilityCard}>
                <Text style={[styles.abilityScore, { color: '#10b981' }]}>52</Text>
                <Text style={styles.abilityName}>일관성</Text>
                <View style={styles.gaugeContainer}>
                  <View style={styles.gaugeBackground} />
                  <Animated.View 
                    style={[
                      styles.gaugeFill,
                      { 
                        backgroundColor: '#10b981',
                        width: gaugeAnim3.interpolate({
                          inputRange: [0, 52],
                          outputRange: ['0%', '52%'],
                        })
                      }
                    ]} 
                  />
                </View>
              </View>
              
              {/* 자존감 */}
              <View style={styles.abilityCard}>
                <Text style={[styles.abilityScore, { color: '#f59e0b' }]}>53</Text>
                <Text style={styles.abilityName}>자존감</Text>
                <View style={styles.gaugeContainer}>
                  <View style={styles.gaugeBackground} />
                  <Animated.View 
                    style={[
                      styles.gaugeFill,
                      { 
                        backgroundColor: '#f59e0b',
                        width: gaugeAnim4.interpolate({
                          inputRange: [0, 53],
                          outputRange: ['0%', '53%'],
                        })
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
            
            {/* 3행 */}
            <View style={styles.abilityRow}>
              {/* 회복력 */}
              <View style={styles.abilityCard}>
                <Text style={[styles.abilityScore, { color: '#ef4444' }]}>59</Text>
                <Text style={styles.abilityName}>회복력</Text>
                <View style={styles.gaugeContainer}>
                  <View style={styles.gaugeBackground} />
                  <Animated.View 
                    style={[
                      styles.gaugeFill,
                      { 
                        backgroundColor: '#ef4444',
                        width: gaugeAnim5.interpolate({
                          inputRange: [0, 59],
                          outputRange: ['0%', '59%'],
                        })
                      }
                    ]} 
                  />
                </View>
              </View>
              
              {/* 관계력 */}
              <View style={styles.abilityCard}>
                <Text style={[styles.abilityScore, { color: '#3b82f6' }]}>56</Text>
                <Text style={styles.abilityName}>관계력</Text>
                <View style={styles.gaugeContainer}>
                  <View style={styles.gaugeBackground} />
                  <Animated.View 
                    style={[
                      styles.gaugeFill,
                      { 
                        backgroundColor: '#3b82f6',
                        width: gaugeAnim6.interpolate({
                          inputRange: [0, 56],
                          outputRange: ['0%', '56%'],
                        })
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
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
    paddingHorizontal: 45,
    flex: 1,
    paddingTop: 60,
    paddingBottom: 100,
  },
  premiumCardStyle: {
    width: width - 90,
    maxWidth: width - 90,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 14,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 6,
    overflow: 'hidden',
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  checkInSymbol: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  checkInCircle: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 18,
  },
  checkInCheck: {
    position: 'absolute',
    width: 16,
    height: 8,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderRadius: 1,
    top: 12,
    left: 8,
    transform: [{ rotate: '-45deg' }],
  },
  checkInLine: {
    position: 'absolute',
    width: 20,
    height: 2,
    backgroundColor: '#ffffff',
    borderRadius: 1,
    top: 20,
    left: 10,
  },
  checkInDots: {
    position: 'absolute',
    width: 12,
    height: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 26,
    left: 14,
  },
  checkInDot: {
    width: 2,
    height: 2,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  iconInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkSymbol: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  checkmarkLine1: {
    position: 'absolute',
    width: 20,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    top: 18,
    left: 8,
    transform: [{ rotate: '45deg' }],
  },
  checkmarkLine2: {
    position: 'absolute',
    width: 12,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    top: 22,
    left: 8,
    transform: [{ rotate: '-45deg' }],
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  abilitiesGrid: {
    gap: 12,
  },
  abilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  abilityCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems: 'center',
  },
  abilityScore: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  abilityName: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 10,
    textAlign: 'center',
  },
  gaugeContainer: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  gaugeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
  },
  gaugeFill: {
    height: '100%',
    borderRadius: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 40,
    right: 40,
  },
  nextButton: {
    backgroundColor: PausemoColors.primary,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: PausemoColors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },
  nextButtonArrow: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
});
