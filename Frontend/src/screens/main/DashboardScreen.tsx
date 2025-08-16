import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Quest, User } from '../../types';
import { questAPI, responseAPI, userAPI } from '../../services/api';
import { AuthService } from '../../services/auth';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const { width: screenWidth } = Dimensions.get('window');

interface DashboardScreenProps {
  onStartIntervention: (questId: string) => void;
  onOpenSettings: () => void;
}

interface TodayStats {
  responseRate: number;
  consecutiveDays: number;
  totalPoints: number;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onStartIntervention,
  onOpenSettings,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [todayStats, setTodayStats] = useState<TodayStats>({
    responseRate: 0,
    consecutiveDays: 0,
    totalPoints: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // 병렬로 데이터 로드
      const [currentUser, quests, stats] = await Promise.all([
        AuthService.getCurrentUser(),
        questAPI.getActiveQuests(),
        responseAPI.getTodayStats(),
      ]);

      setUser(currentUser);
      setActiveQuests(quests);
      setTodayStats(stats);
    } catch (error) {
      console.error('대시보드 데이터 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.greeting}>
          안녕하세요, {user?.name || '사용자'}님
        </Text>
        <Text style={styles.subtitle}>
          오늘도 패턴을 바꿔보세요
        </Text>
      </View>
      <TouchableOpacity onPress={onOpenSettings} style={styles.settingsButton}>
        <Text style={styles.settingsIcon}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTodayStats = () => (
    <Card style={styles.statsCard}>
      <Text style={styles.statsTitle}>오늘의 기록</Text>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{Math.round(todayStats.responseRate * 100)}%</Text>
          <Text style={styles.statLabel}>응답률</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{todayStats.consecutiveDays}일</Text>
          <Text style={styles.statLabel}>연속 기록</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{todayStats.totalPoints}P</Text>
          <Text style={styles.statLabel}>누적 포인트</Text>
        </View>
      </View>
    </Card>
  );

  const renderActiveQuests = () => (
    <View style={styles.questsSection}>
      <Text style={styles.sectionTitle}>진행 중인 퀘스트</Text>
      {activeQuests.length === 0 ? (
        <Card style={styles.emptyQuestCard}>
          <Text style={styles.emptyQuestText}>
            아직 시작한 퀘스트가 없습니다.{\"\\n\"}
            새로운 패턴 개선을 시작해보세요.
          </Text>
          <Button
            title=\"퀘스트 시작하기\"
            onPress={() => {/* 온보딩으로 이동 */}}
            style={styles.startQuestButton}
          />
        </Card>
      ) : (
        activeQuests.map((quest) => (
          <Card key={quest._id} style={styles.questCard}>
            <View style={styles.questHeader}>
              <View style={styles.questInfo}>
                <Text style={styles.questName}>{quest.name}</Text>
                <Text style={styles.questCategory}>{quest.category}</Text>
              </View>
              <View style={styles.questProgress}>
                <Text style={styles.questDays}>D+{quest.daysActive}</Text>
              </View>
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${(quest.progress / 5) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {quest.progress}/5 단계
              </Text>
            </View>

            <View style={styles.questActions}>
              <View style={styles.questStatus}>
                {quest.todayResponse ? (
                  <Text style={styles.completedText}>✓ 오늘 완료</Text>
                ) : (
                  <Text style={styles.pendingText}>• 대기 중</Text>
                )}
              </View>
              
              {!quest.todayResponse && (
                <Button
                  title=\"시작하기\"
                  onPress={() => onStartIntervention(quest._id)}
                  size=\"small\"
                  style={styles.startButton}
                />
              )}
            </View>
          </Card>
        ))
      )}
    </View>
  );

  const renderAbilityStats = () => {
    if (!user?.stats) return null;

    const abilities = [
      { name: '자기조절력', value: user.stats.selfControl, color: colors.primary },
      { name: '독립심', value: user.stats.independence, color: colors.accent },
      { name: '회복력', value: user.stats.resilience, color: colors.warning },
      { name: '자존감', value: user.stats.selfEsteem, color: colors.info },
      { name: '일관성', value: user.stats.consistency, color: colors.pause },
      { name: '관계력', value: user.stats.relationship, color: colors.moment },
    ];

    return (
      <Card style={styles.abilityCard}>
        <Text style={styles.sectionTitle}>능력치</Text>
        <View style={styles.abilityContainer}>
          {abilities.map((ability, index) => (
            <View key={index} style={styles.abilityItem}>
              <Text style={styles.abilityName}>{ability.name}</Text>
              <View style={styles.abilityBarBackground}>
                <View 
                  style={[
                    styles.abilityBar,
                    { 
                      width: `${ability.value}%`,
                      backgroundColor: ability.color,
                    }
                  ]} 
                />
              </View>
              <Text style={styles.abilityValue}>{ability.value}</Text>
            </View>
          ))}
        </View>
      </Card>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>대시보드 로딩 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}
        {renderTodayStats()}
        {renderActiveQuests()}
        {renderAbilityStats()}
        
        <View style={styles.bottomPadding} />
      </ScrollView>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body1,
    color: colors.textSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  settingsButton: {
    padding: spacing.sm,
  },
  settingsIcon: {
    fontSize: 24,
  },
  statsCard: {
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing.lg,
    backgroundColor: colors.primaryLight + '10',
    borderColor: colors.primary + '20',
  },
  statsTitle: {
    ...typography.h6,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h4,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  questsSection: {
    paddingHorizontal: spacing.screenPadding,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h6,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  emptyQuestCard: {
    alignItems: 'center',
    padding: spacing.sectionPadding,
  },
  emptyQuestText: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  startQuestButton: {
    width: '80%',
  },
  questCard: {
    marginBottom: spacing.md,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  questInfo: {
    flex: 1,
  },
  questName: {
    ...typography.h6,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  questCategory: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  questProgress: {
    alignItems: 'flex-end',
  },
  questDays: {
    ...typography.label,
    color: colors.primary,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 3,
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  questActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questStatus: {
    flex: 1,
  },
  completedText: {
    ...typography.label,
    color: colors.success,
  },
  pendingText: {
    ...typography.label,
    color: colors.warning,
  },
  startButton: {
    paddingHorizontal: spacing.lg,
  },
  abilityCard: {
    marginHorizontal: spacing.screenPadding,
    marginBottom: spacing.lg,
  },
  abilityContainer: {
    gap: spacing.md,
  },
  abilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  abilityName: {
    ...typography.body2,
    color: colors.textPrimary,
    width: 80,
  },
  abilityBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  abilityBar: {
    height: '100%',
    borderRadius: 4,
  },
  abilityValue: {
    ...typography.caption,
    color: colors.textSecondary,
    width: 30,
    textAlign: 'right',
  },
  bottomPadding: {
    height: spacing.xl,
  },
});

