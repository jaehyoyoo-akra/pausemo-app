import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { CategoryType, UserTypeEnum } from '../../types';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface DiagnosisQuestion {
  id: string;
  text: string;
  category: CategoryType;
}

interface PatternDiagnosisScreenProps {
  category: CategoryType;
  onDiagnosisComplete: (userType: { primary: UserTypeEnum; secondary?: UserTypeEnum }) => void;
}

// 자기인식 카테고리 진단 질문 (MVP에서는 이것만 구현)
const diagnosisQuestions: DiagnosisQuestion[] = [
  {
    id: '1',
    text: '다른 사람들이 나를 어떻게 생각하는지 자주 신경 쓰나요?',
    category: '자기인식',
  },
  {
    id: '2',
    text: '칭찬받지 못하면 내가 잘못한 것 같아 불안하나요?',
    category: '자기인식',
  },
  {
    id: '3',
    text: '완벽하지 않은 모습을 보이기 어려워하나요?',
    category: '자기인식',
  },
  {
    id: '4',
    text: '성과나 결과로 내 가치를 증명하려고 하나요?',
    category: '자기인식',
  },
  {
    id: '5',
    text: '다른 사람을 도우면서 내 욕구는 뒤로 미루나요?',
    category: '자기인식',
  },
  {
    id: '6',
    text: '혼자 있을 때 외로움이나 공허함을 자주 느끼나요?',
    category: '자기인식',
  },
];

// 유형 분석 로직 (간단화된 버전)
const analyzeUserType = (answers: boolean[]): { primary: UserTypeEnum; secondary?: UserTypeEnum } => {
  const yesCount = answers.filter(Boolean).length;
  
  // 간단한 분류 로직 (실제로는 더 복잡한 알고리즘 필요)
  if (answers[0] && answers[1]) {
    return { primary: '관계-의존형' };
  } else if (answers[2] && answers[3]) {
    return { primary: '성과-증명형' };
  } else if (answers[2]) {
    return { primary: '완벽-가면형' };
  } else if (answers[4]) {
    return { primary: '희생-헌신형' };
  } else if (yesCount >= 4) {
    return { primary: '변동-불안형' };
  } else {
    return { primary: '침묵-관찰형' };
  }
};

export const PatternDiagnosisScreen: React.FC<PatternDiagnosisScreenProps> = ({
  category,
  onDiagnosisComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isCompleting, setIsCompleting] = useState(false);

  const currentQuestion = diagnosisQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === diagnosisQuestions.length - 1;
  const progress = ((currentQuestionIndex + 1) / diagnosisQuestions.length) * 100;

  const handleAnswer = async (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      setIsCompleting(true);
      try {
        // 3초 동안 \"분석 중\" 표시
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const userType = analyzeUserType(newAnswers);
        onDiagnosisComplete(userType);
      } catch (error) {
        Alert.alert('오류', '진단 분석 중 오류가 발생했습니다.');
      } finally {
        setIsCompleting(false);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (isCompleting) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completingContainer}>
          <Text style={styles.completingTitle}>패턴 분석 중...</Text>
          <Text style={styles.completingSubtitle}>
            당신만의 고유한 패턴을{\"\\n\"}
            찾고 있습니다
          </Text>
          <View style={styles.loadingDots}>
            <Text style={styles.loadingText}>• • •</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1} / {diagnosisQuestions.length}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.questionCard}>
          <Text style={styles.questionNumber}>질문 {currentQuestionIndex + 1}</Text>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            title=\"예\"
            onPress={() => handleAnswer(true)}
            style={styles.answerButton}
          />
          <Button
            title=\"아니오\"
            onPress={() => handleAnswer(false)}
            variant=\"outline\"
            style={styles.answerButton}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            정답은 없습니다. 지금 이 순간의\\n
            솔직한 마음으로 답해주세요.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBackground: {
    width: '100%',
    height: 4,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 2,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
  },
  questionCard: {
    marginBottom: spacing.xl,
    padding: spacing.sectionPadding,
  },
  questionNumber: {
    ...typography.overline,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  questionText: {
    ...typography.h4,
    color: colors.textPrimary,
    lineHeight: 28,
  },
  buttonContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  answerButton: {
    width: '100%',
    height: 56,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  infoText: {
    ...typography.body2,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 20,
  },
  completingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
  },
  completingTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  completingSubtitle: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xxl,
  },
  loadingDots: {
    marginTop: spacing.lg,
  },
  loadingText: {
    ...typography.h2,
    color: colors.primary,
    letterSpacing: 8,
  },
});

