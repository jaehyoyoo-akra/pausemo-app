import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { UserTypeEnum } from '../../types';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface DiagnosisResultScreenProps {
  userType: {
    primary: UserTypeEnum;
    secondary?: UserTypeEnum;
  };
  onStartJourney: () => void;
}

// 유형별 설명 데이터
const userTypeDescriptions: Record<UserTypeEnum, {
  title: string;
  description: string;
  patterns: string[];
  approach: string;
}> = {
  '성과-증명형': {
    title: '성과로 가치를 증명하는 당신',
    description: '끊임없는 성취를 통해 자신의 가치를 확인하려고 합니다. 결과가 좋지 않으면 자신을 의심하게 되죠.',
    patterns: [
      '성과가 나오지 않으면 불안해함',
      '완벽한 결과를 위해 과도하게 노력',
      '타인의 인정을 통해 안정감을 느김',
    ],
    approach: '결과보다 과정에 집중하고, 내재적 가치를 인식하는 연습을 합니다.',
  },
  '관계-의존형': {
    title: '타인의 반응으로 나를 확인하는 당신',
    description: '다른 사람들의 피드백과 반응으로 자신의 상태를 판단합니다. 관계에서 안정감을 찾으려고 하죠.',
    patterns: [
      '타인의 표정이나 말투에 민감하게 반응',
      '혼자 있을 때 불안하거나 공허함을 느김',
      '거절당하는 것에 대한 두려움이 큼',
    ],
    approach: '자기 자신과의 관계를 먼저 안정화하고, 내적 기준을 세워갑니다.',
  },
  '완벽-가면형': {
    title: '완벽한 모습만 보여주려는 당신',
    description: '실수나 약함을 드러내는 것을 극도로 꺼립니다. 항상 준비된, 완벽한 모습을 유지하려고 하죠.',
    patterns: [
      '실패할 가능성이 있으면 시도를 피함',
      '도움을 요청하는 것을 어려워함',
      '완벽하지 않은 상태로는 시작하지 못함',
    ],
    approach: '불완전함을 받아들이고, 과정 중심의 사고방식을 기릅니다.',
  },
  '희생-헌신형': {
    title: '자신을 희생하며 남을 돌보는 당신',
    description: '다른 사람들의 필요를 자신의 것보다 우선시합니다. 남을 돕는 것으로 자신의 가치를 확인하죠.',
    patterns: [
      '자신의 욕구나 필요를 뒤로 미룸',
      '\"아니다\"라고 말하기 어려워함',
      '혼자만의 시간을 갖는 것에 죄책감을 느김',
    ],
    approach: '자기 돌봄의 중요성을 인식하고, 건강한 경계를 설정하는 연습을 합니다.',
  },
  '반항-차별형': {
    title: '독특함으로 인정받으려는 당신',
    description: '일반적이거나 평범한 것을 거부하며, 특별함을 통해 존재감을 드러내려고 합니다.',
    patterns: [
      '남들과 다른 길을 가는 것을 고집',
      '평범하다고 느껴지면 불안해함',
      '규칙이나 일반적인 방식에 저항감을 느김',
    ],
    approach: '건설적인 독창성을 발휘하고, 소속감과 개별성의 균형을 찾습니다.',
  },
  '침묵-관찰형': {
    title: '안전한 거리에서 관찰하는 당신',
    description: '적극적으로 나서기보다는 뒤에서 관찰하는 것을 선호합니다. 실수할 위험을 최소화하려고 하죠.',
    patterns: [
      '먼저 나서는 것을 어려워함',
      '충분히 확신이 서기 전까지는 행동하지 않음',
      '주목받는 것을 불편해함',
    ],
    approach: '작은 도전부터 시작하여 점진적으로 참여도를 높여갑니다.',
  },
  '과시-표현형': {
    title: '끊임없이 자신을 어필하는 당신',
    description: '자신의 존재를 적극적으로 알리고 인정받으려고 합니다. 주목받지 못하면 불안해하죠.',
    patterns: [
      '대화에서 자신의 이야기를 많이 함',
      '성취나 경험을 자주 공유함',
      '조용한 상황을 불편해함',
    ],
    approach: '경청의 가치를 배우고, 내적 안정감을 기르는 연습을 합니다.',
  },
  '변동-불안형': {
    title: '인정 신호에 극도로 민감한 당신',
    description: '타인의 미세한 반응에도 크게 요동칩니다. 감정적 기복이 크고 예측하기 어려운 상태가 자주 발생하죠.',
    patterns: [
      '작은 신호에도 크게 반응함',
      '감정 변화가 빠르고 예측하기 어려움',
      '안정적인 상태를 유지하기 어려움',
    ],
    approach: '감정 조절 기술을 익히고, 일관된 자기 기준을 세워갑니다.',
  },
};

export const DiagnosisResultScreen: React.FC<DiagnosisResultScreenProps> = ({
  userType,
  onStartJourney,
}) => {
  const primaryType = userTypeDescriptions[userType.primary];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>당신의 패턴을 찾았습니다</Text>
          <Card style={styles.typeCard}>
            <Text style={styles.typeTitle}>{primaryType.title}</Text>
            <Text style={styles.typeDescription}>{primaryType.description}</Text>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>주요 패턴</Text>
          {primaryType.patterns.map((pattern, index) => (
            <View key={index} style={styles.patternItem}>
              <Text style={styles.patternBullet}>•</Text>
              <Text style={styles.patternText}>{pattern}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pausemo 접근법</Text>
          <Card style={styles.approachCard}>
            <Text style={styles.approachText}>{primaryType.approach}</Text>
          </Card>
        </View>

        <View style={styles.howItWorks}>
          <Text style={styles.sectionTitle}>이렇게 작동합니다</Text>
          <Card style={styles.workflowCard}>
            <View style={styles.workflowStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>관찰</Text>
                <Text style={styles.stepDescription}>패턴이 시작되는 순간을 포착합니다</Text>
              </View>
            </View>
            
            <View style={styles.workflowStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>틈</Text>
                <Text style={styles.stepDescription}>3초간 새로운 선택지를 제시합니다</Text>
              </View>
            </View>
            
            <View style={styles.workflowStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>강화</Text>
                <Text style={styles.stepDescription}>작은 약속으로 새로운 경로를 강화합니다</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title=\"여정 시작하기\"
          onPress={onStartJourney}
          style={styles.startButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
  },
  header: {
    paddingVertical: spacing.lg,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  typeCard: {
    backgroundColor: colors.primaryLight + '15',
    borderColor: colors.primary + '30',
  },
  typeTitle: {
    ...typography.h5,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  typeDescription: {
    ...typography.body1,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h6,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  patternItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  patternBullet: {
    ...typography.body1,
    color: colors.primary,
    marginRight: spacing.sm,
    marginTop: 2,
  },
  patternText: {
    ...typography.body1,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 22,
  },
  approachCard: {
    backgroundColor: colors.accent + '10',
    borderColor: colors.accent + '30',
  },
  approachText: {
    ...typography.body1,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  howItWorks: {
    marginBottom: spacing.xl,
  },
  workflowCard: {
    padding: spacing.cardPadding,
  },
  workflowStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stepNumberText: {
    ...typography.label,
    color: colors.textInverse,
    fontWeight: '700',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    ...typography.h6,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  stepDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
  },
  startButton: {
    width: '100%',
  },
});

