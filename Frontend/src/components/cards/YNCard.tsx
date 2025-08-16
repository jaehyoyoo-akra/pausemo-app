import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Card as CardType } from '../../types';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const { width: screenWidth } = Dimensions.get('window');

interface YNCardProps {
  card: CardType;
  onAnswer: (answer: 'Y' | 'N', responseTime: number) => void;
  onComplete: () => void;
}

export const YNCard: React.FC<YNCardProps> = ({
  card,
  onAnswer,
  onComplete,
}) => {
  const [startTime] = useState(Date.now());
  const [currentStep, setCurrentStep] = useState<'observation' | 'gap' | 'reinforcement'>('observation');
  const [gapProgress] = useState(new Animated.Value(0));
  const [userAnswer, setUserAnswer] = useState<'Y' | 'N' | null>(null);

  // 3초 애니메이션 효과
  useEffect(() => {
    if (currentStep === 'gap') {
      Animated.timing(gapProgress, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start(() => {
        if (userAnswer === 'Y') {
          setCurrentStep('reinforcement');
        } else {
          onComplete();
        }
      });
    }
  }, [currentStep, gapProgress, userAnswer, onComplete]);

  const handleAnswer = (answer: 'Y' | 'N') => {
    const responseTime = Date.now() - startTime;
    setUserAnswer(answer);
    onAnswer(answer, responseTime);
    
    if (answer === 'Y') {
      setCurrentStep('gap');
    } else {
      // N 응답 시 바로 완료
      onComplete();
    }
  };

  const handleReinforcementAnswer = (answer: 'Y' | 'N') => {
    // 강화 단계에서의 응답도 기록
    const responseTime = Date.now() - startTime;
    onAnswer(answer, responseTime);
    onComplete();
  };

  const renderObservationStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>관찰</Text>
        <Text style={styles.stepDescription}>지금 이 순간을 확인해보세요</Text>
      </View>
      
      <Card style={styles.questionCard}>
        <Text style={styles.questionText}>{card.text}</Text>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          title=\"예\"
          onPress={() => handleAnswer('Y')}
          style={[styles.answerButton, styles.yesButton]}
        />
        <Button
          title=\"아니오\"
          onPress={() => handleAnswer('N')}
          variant=\"outline\"
          style={[styles.answerButton, styles.noButton]}
        />
      </View>
    </View>
  );

  const renderGapStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>틈</Text>
        <Text style={styles.stepDescription}>3초간 새로운 선택을 만들어보세요</Text>
      </View>

      <Card style={styles.gapCard}>
        <Text style={styles.valueStatement}>
          내 가치는 변하지 않는다
        </Text>
        <Text style={styles.supportStatement}>
          어떤 상황에도 나는 충분하다
        </Text>
      </Card>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>잠시 멈춤</Text>
        <View style={styles.progressBar}>
          <Animated.View 
            style={[
              styles.progressFill,
              {
                width: gapProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );

  const renderReinforcementStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>강화</Text>
        <Text style={styles.stepDescription}>작은 약속으로 새로운 길을 만들어보세요</Text>
      </View>

      <Card style={styles.reinforcementCard}>
        <Text style={styles.reinforcementText}>
          다음 5분 동안 이 상태를 유지하겠습니까?
        </Text>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          title=\"약속한다\"
          onPress={() => handleReinforcementAnswer('Y')}
          style={[styles.answerButton, styles.promiseButton]}
        />
        <Button
          title=\"아직은\"
          onPress={() => handleReinforcementAnswer('N')}
          variant=\"outline\"
          style={[styles.answerButton, styles.notYetButton]}
        />
      </View>

      <Text style={styles.reinforcementNote}>
        작은 약속이 큰 변화를 만듭니다
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {currentStep === 'observation' && renderObservationStep()}
      {currentStep === 'gap' && renderGapStep()}
      {currentStep === 'reinforcement' && renderReinforcementStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  stepTitle: {
    ...typography.h4,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  stepDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  questionCard: {
    marginBottom: spacing.xl,
    padding: spacing.sectionPadding,
    minHeight: 120,
    justifyContent: 'center',
  },
  questionText: {
    ...typography.h5,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 28,
  },
  gapCard: {
    marginBottom: spacing.xl,
    padding: spacing.sectionPadding,
    backgroundColor: colors.pause + '10',
    borderColor: colors.pause + '30',
    alignItems: 'center',
    minHeight: 160,
    justifyContent: 'center',
  },
  valueStatement: {
    ...typography.valueStatement,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  supportStatement: {
    ...typography.supportStatement,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  reinforcementCard: {
    marginBottom: spacing.xl,
    padding: spacing.sectionPadding,
    backgroundColor: colors.accent + '10',
    borderColor: colors.accent + '30',
    minHeight: 100,
    justifyContent: 'center',
  },
  reinforcementText: {
    ...typography.h6,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  answerButton: {
    width: '100%',
    height: 56,
  },
  yesButton: {
    backgroundColor: colors.primary,
  },
  noButton: {
    borderColor: colors.secondary,
  },
  promiseButton: {
    backgroundColor: colors.accent,
  },
  notYetButton: {
    borderColor: colors.secondary,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  progressText: {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  progressBar: {
    width: screenWidth * 0.6,
    height: 4,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.pause,
  },
  reinforcementNote: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
  },
});

