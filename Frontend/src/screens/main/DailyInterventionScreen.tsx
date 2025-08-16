import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { YNCard } from '../../components/cards/YNCard';
import { Button } from '../../components/common/Button';
import { Card, Response } from '../../types';
import { cardAPI, responseAPI } from '../../services/api';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface DailyInterventionScreenProps {
  questId: string;
  onComplete: () => void;
  onSkip: () => void;
}

export const DailyInterventionScreen: React.FC<DailyInterventionScreenProps> = ({
  questId,
  onComplete,
  onSkip,
}) => {
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRandomCard();
    
    // 뒤로가기 버튼 처리
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleSkip();
      return true;
    });

    return () => backHandler.remove();
  }, []);

  const loadRandomCard = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 관찰 카드를 우선으로 가져오기
      const randomCard = await cardAPI.getRandomCard(questId, 'observation');
      setCard(randomCard);
    } catch (error: any) {
      console.error('카드 로딩 실패:', error);
      setError('카드를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (answer: 'Y' | 'N', responseTime: number) => {
    if (!card) return;

    try {
      // 응답 저장
      const responseData: Omit<Response, '_id'> = {
        userId: '', // AuthService에서 가져올 예정
        cardId: card._id,
        questId,
        answer,
        responseTime: Math.floor(responseTime / 1000), // 초 단위로 변환
        completed: answer === 'Y', // Y 응답시 완전한 플로우로 간주
        context: {
          timeOfDay: getTimeOfDay(),
          location: '앱',
          mood: 'neutral',
        },
      };

      await responseAPI.saveResponse(responseData);
    } catch (error) {
      console.error('응답 저장 실패:', error);
      // 저장 실패해도 플로우는 계속 진행
    }
  };

  const handleCardComplete = () => {
    // 완료 피드백 표시
    Alert.alert(
      '패턴 개입 완료',
      '3초의 멈춤이 새로운 선택을 만들었습니다. +2P',
      [{ text: '확인', onPress: onComplete }]
    );
  };

  const handleSkip = () => {
    Alert.alert(
      '개입 건너뛰기',
      '지금은 쉬어도 괜찮습니다. 언제든 돌아올 수 있어요.',
      [
        { text: '취소', style: 'cancel' },
        { text: '건너뛰기', onPress: onSkip },
      ]
    );
  };

  const getTimeOfDay = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return '오전';
    if (hour < 18) return '오후';
    return '저녁';
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>패턴 개입 준비 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !card) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error || '카드를 불러올 수 없습니다'}
          </Text>
          <Button
            title=\"다시 시도\"
            onPress={loadRandomCard}
            style={styles.retryButton}
          />
          <Button
            title=\"나중에 하기\"
            onPress={onSkip}
            variant=\"outline\"
            style={styles.skipButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>패턴 개입</Text>
        <Button
          title=\"건너뛰기\"
          onPress={handleSkip}
          variant=\"ghost\"
          size=\"small\"
          style={styles.skipHeaderButton}
        />
      </View>

      <YNCard
        card={card}
        onAnswer={handleAnswer}
        onComplete={handleCardComplete}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          • 이 순간을 선택합니다{\"\\n\"}
          • 패턴을 바꾸는 3초
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerTitle: {
    ...typography.h6,
    color: colors.textPrimary,
  },
  skipHeaderButton: {
    paddingHorizontal: spacing.sm,
    height: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
  },
  loadingText: {
    ...typography.body1,
    color: colors.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenPadding,
  },
  errorText: {
    ...typography.body1,
    color: colors.error,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  retryButton: {
    width: '100%',
    marginBottom: spacing.md,
  },
  skipButton: {
    width: '100%',
  },
  footer: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 16,
  },
});

