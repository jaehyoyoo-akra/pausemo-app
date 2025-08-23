import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme, getThemeColor, getComponentStyle } from '../constants/Theme';
import { PremiumCard } from '../components';
import { useOnboarding } from '../contexts/OnboardingContext';

const { width, height } = Dimensions.get('window');

export default function DiagnosticTest() {
  const { nextStep, previousStep } = useOnboarding();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
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

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    
    // 답변 저장
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
    
    // 즉시 다음 질문으로 이동 (딜레이 없음)
    if (currentQuestion < 8) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      // 마지막 질문이면 다음 단계로
      console.log('진단 테스트 완료! 답변:', answers);
      nextStep();
    }
  };

  const handleBackPress = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(null);
    } else {
      previousStep();
    }
  };

  // 이전 질문으로 돌아갈 때 이전 답변 표시
  useEffect(() => {
    if (answers[currentQuestion]) {
      setSelectedAnswer(answers[currentQuestion]);
    } else {
      setSelectedAnswer(null);
    }
  }, [currentQuestion, answers]);

  // 전체 8개 질문 데이터
  const allQuestions = [
    {
      id: 1,
      question: "압박 상황에 놓였을 때 나는 보통...",
      options: [
        {
          id: 'A',
          text: "언어나 행동으로 즉시 드러난다",
          description: "상황 중에 감정이나 의견을 바로 표현하는 편이다",
          color: Theme.colors.pauseBlue
        },
        {
          id: 'B',
          text: "겉으로는 드러나지 않고 나중에 혼자 처리한다",
          description: "상황에서는 참았다가 이후에 정리하는 편이다",
          color: Theme.colors.neutralState
        }
      ]
    },
    {
      id: 2,
      question: "중요한 결정을 할 때, 나에게 먼저 영향을 주는 것은...",
      options: [
        {
          id: 'A',
          text: "주변 사람들의 평가나 기대",
          description: "'이 선택이 다른 사람에게 어떻게 보일까?'가 먼저 떠오른다",
          color: Theme.colors.pauseBlue
        },
        {
          id: 'B',
          text: "나 자신의 선호나 기준",
          description: "'이 선택이 내 상황과 가치에 맞는가?'를 먼저 확인한다",
          color: Theme.colors.neutralState
        }
      ]
    },
    {
      id: 3,
      question: "성과를 달성했는데 주변 반응이 없으면...",
      options: [
        {
          id: 'A',
          text: "만족감이 줄거나 허전하다",
          description: "외부 피드백이 성취감에 큰 영향을 준다",
          color: Theme.colors.pauseBlue
        },
        {
          id: 'B',
          text: "자기 평가와 목표 달성이 충분하다",
          description: "외부 반응은 있으면 좋은 보조적 요소다",
          color: Theme.colors.neutralState
        }
      ]
    },
    {
      id: 4,
      question: "다른 사람이 내 방식에 의견을 제시하면 나는...",
      options: [
        {
          id: 'A',
          text: "거부감이 먼저 올라온다",
          description: "자율성이 침해됐다고 느낀다",
          color: Theme.colors.pauseBlue
        },
        {
          id: 'B',
          text: "하나의 정보로 참고할 수 있다",
          description: "필요하면 활용할 수 있다고 본다",
          color: Theme.colors.neutralState
        }
      ]
    },
    {
      id: 5,
      question: "부담되는 부탁을 받았을 때 나는...",
      options: [
        {
          id: 'A',
          text: "거절이 어렵고 대신 다른 방법을 제시한다",
          description: "직접 거절보다 우회적 방식을 택한다",
          color: Theme.colors.pauseBlue
        },
        {
          id: 'B',
          text: "이유를 설명하고 거절할 수 있다",
          description: "자기 입장을 명확히 표현한다",
          color: Theme.colors.neutralState
        }
      ]
    },
    {
      id: 6,
      question: "새로운 일을 시작할 때 나는...",
      options: [
        {
          id: 'A',
          text: "계획과 절차를 먼저 세운다",
          description: "준비가 갖춰져야 마음이 놓인다",
          color: Theme.colors.pauseBlue
        },
        {
          id: 'B',
          text: "큰 틀만 잡고 바로 시작한다",
          description: "진행 중 보완하면서 나아간다",
          color: Theme.colors.neutralState
        }
      ]
    },
    {
      id: 7,
      question: "스트레스가 극대화될 때 내 반응은 주로...",
      options: [
        {
          id: 'A',
          text: "외부에서 관찰 가능한 반응이 나타난다",
          description: "목소리 크기 변화, 표정 경직, 손 움직임 증가 등",
          color: Theme.colors.pauseBlue
        },
        {
          id: 'B',
          text: "내적인 긴장 반응이 중심이다",
          description: "생각이 반복되거나 불안이 오래 지속되지만 겉으로는 티가 적다",
          color: Theme.colors.neutralState
        }
      ]
    },
    {
      id: 8,
      question: "강한 감정이나 생각이 생겼을 때 나는...",
      options: [
        {
          id: 'A',
          text: "며칠간 지속되며 반복적으로 떠오른다",
          description: "수면·집중에 영향을 줄 정도다",
          color: Theme.colors.pauseBlue
        },
        {
          id: 'B',
          text: "비교적 단기간 내에 완화된다",
          description: "하루 이틀 지나면 대부분 사라진다",
          color: Theme.colors.neutralState
        }
      ]
    }
  ];

  // 현재 질문 데이터
  const currentQuestionData = allQuestions[currentQuestion - 1];

  return (
    <View style={styles.container}>
      {/* 배경 - 의료적 느낌의 라이트 그레이 */}
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
        
        {/* 미묘한 배경 패턴 */}
        <View style={styles.backgroundPattern}>
          {[...Array(8)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.patternDot,
                {
                  top: Math.random() * height,
                  left: Math.random() * width,
                  opacity: Math.random() * 0.1 + 0.05,
                },
              ]}
            />
          ))}
        </View>
      </Animated.View>

      {/* 헤더 */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          accessible={true}
          accessibilityLabel="이전으로 돌아가기"
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>
          나만의 성장 패턴 찾기
        </Text>
      </Animated.View>

      {/* 메인 콘텐츠 */}
      <View style={styles.content}>
        {/* 질문 카드 */}
        <PremiumCard variant="elevated" style={styles.questionCard}>
          <Text style={styles.questionText}>
            {currentQuestionData.question}
          </Text>
          
          {/* 답변 옵션들 */}
          <View style={styles.optionsContainer}>
            {currentQuestionData.options.map((option) => (
              <View key={option.id} style={styles.optionWrapper}>
                <PremiumCard 
                  variant={selectedAnswer === option.id ? "elevated" : "default"}
                  style={selectedAnswer === option.id ? styles.selectedOptionCard : styles.optionCard}
                >
                  <TouchableOpacity
                    style={styles.optionTouchable}
                    onPress={() => handleAnswerSelect(option.id)}
                    accessible={true}
                    accessibilityLabel={`옵션 ${option.id} 선택`}
                  >
                    <View style={[styles.optionIcon, { backgroundColor: option.color }]}>
                      <Text style={styles.optionLetter}>{option.id}</Text>
                    </View>
                    
                    <View style={styles.optionContent}>
                      <Text style={styles.optionText}>
                        {option.text}
                      </Text>
                      <Text style={styles.optionDescription}>
                        {option.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </PremiumCard>
              </View>
            ))}
          </View>
        </PremiumCard>
      </View>

      {/* 하단 정보 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          직감적으로 선택해주세요. 정답은 없습니다.
        </Text>
        {/* 진행률 바 */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(Object.keys(answers).length / 8) * 100}%` }
              ]} 
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
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
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  patternDot: {
    position: 'absolute',
    width: 3,
    height: 3,
    backgroundColor: Theme.colors.pauseBlue,
    borderRadius: 1.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.surface1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  backArrow: {
    fontSize: 20,
    color: Theme.colors.textSecondary,
    fontWeight: '600',
  },
  headerTitle: {
    ...Theme.typography.h3,
    color: Theme.colors.textPrimary,
    flex: 1,
    textAlign: 'center',
    marginRight: 56,
    fontWeight: '600' as const,
  },
  content: {
    flex: 1,
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionCard: {
    width: width - 60,
    padding: Theme.spacing.lg,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  optionWrapper: {
    marginBottom: Theme.spacing.md,
  },
  optionTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
  },
  questionText: {
    ...Theme.typography.h2,
    color: Theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
    letterSpacing: -0.5,
    fontWeight: '600' as const,
  },
  optionsContainer: {
    gap: Theme.spacing.sm,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    backgroundColor: Theme.colors.surface1,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    ...Theme.shadows.sm,
  },
  selectedOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
    backgroundColor: Theme.colors.surface0,
    borderWidth: 2,
    borderColor: Theme.colors.pauseBlue,
    ...Theme.shadows.md,
  },
  selectedOption: {
    borderColor: Theme.colors.pauseBlue,
    backgroundColor: Theme.colors.surface0,
    ...Theme.shadows.md,
  },
  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.lg,
  },
  optionLetter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.background,
  },
  optionContent: {
    flex: 1,
  },
  optionText: {
    ...Theme.typography.body,
    fontWeight: '600',
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.sm,
    letterSpacing: -0.3,
  },
  optionDescription: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    letterSpacing: -0.2,
  },
  footer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: 30,
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: Theme.spacing.md,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: Theme.colors.surface3,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Theme.colors.pauseBlue,
    borderRadius: 3,
  },
  footerText: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.sm,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
});
