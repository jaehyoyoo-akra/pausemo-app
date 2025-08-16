import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Quest, User, UserStats } from '../types';

const { width } = Dimensions.get('window');

interface DashboardScreenProps {
  onStartSession: (quest: Quest) => void;
  onOpenValueArchive: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onStartSession, onOpenValueArchive }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeQuests, setActiveQuests] = useState<Quest[]>([]);
  const [todayStats, setTodayStats] = useState({
    responseRate: 0,
    totalResponses: 0,
    consecutiveDays: 0,
    points: 0
  });

  // 임시 데이터 (나중에 API로 교체)
  useEffect(() => {
    const mockUser: User = {
      _id: '1',
      email: 'user@example.com',
      name: '사용자',
      userType: {
        primary: '성과-증명형',
        secondary: '완벽-가면형'
      },
      fatigueLevel: 2,
      preferredTime: ['오전', '저녁'],
      stats: {
        selfControl: 65,
        independence: 45,
        resilience: 70,
        selfEsteem: 55,
        consistency: 60,
        relationship: 50
      },
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };

    const mockQuests: Quest[] = [
      {
        _id: '1',
        userId: '1',
        category: '업무/성과',
        name: '미루기 극복',
        state: 'active',
        progress: 3,
        daysActive: 7,
        todayResponse: true,
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        lastResponseDate: new Date().toISOString(),
        consecutiveDays: 3,
        totalResponses: 15,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        _id: '2',
        userId: '1',
        category: '자기인식',
        name: '자존감 회복',
        state: 'active',
        progress: 2,
        daysActive: 5,
        todayResponse: false,
        startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        lastResponseDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        consecutiveDays: 0,
        totalResponses: 8,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    setUser(mockUser);
    setActiveQuests(mockQuests);
    setTodayStats({
      responseRate: 75,
      totalResponses: 3,
      consecutiveDays: 3,
      points: 12
    });
  }, []);

  const renderQuestCard = (quest: Quest) => (
    <TouchableOpacity
      key={quest._id}
      style={styles.questCard}
      onPress={() => handleQuestPress(quest)}
    >
      <View style={styles.questHeader}>
        <Text style={styles.questCategory}>{quest.category}</Text>
        <Text style={styles.questName}>{quest.name}</Text>
      </View>
      
      <View style={styles.questProgress}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(quest.progress / 5) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{quest.progress}/5</Text>
      </View>
      
      <View style={styles.questStats}>
        <Text style={styles.questStat}>D+{quest.daysActive}</Text>
        <Text style={styles.questStat}>
          {quest.todayResponse ? '✅' : '⏰'} 오늘
        </Text>
        <Text style={styles.questStat}>연속 {quest.consecutiveDays}일</Text>
      </View>
    </TouchableOpacity>
  );

  const renderStatsRadar = (stats: UserStats) => {
    const statNames = [
      { key: 'selfControl', label: '자기조절력', color: '#3498db' },
      { key: 'independence', label: '독립심', color: '#e74c3c' },
      { key: 'resilience', label: '회복력', color: '#f39c12' },
      { key: 'selfEsteem', label: '자존감', color: '#9b59b6' },
      { key: 'consistency', label: '일관성', color: '#1abc9c' },
      { key: 'relationship', label: '관계력', color: '#e67e22' }
    ];

    return (
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>능력치 시각화</Text>
        <View style={styles.radarContainer}>
          <View style={styles.radarChart}>
            {statNames.map((stat, index) => {
              const value = stats[stat.key as keyof UserStats];
              const angle = (index * 60 - 90) * (Math.PI / 180);
              const radius = 80;
              const x = radius * Math.cos(angle) * (value / 100);
              const y = radius * Math.sin(angle) * (value / 100);
              
              return (
                <View key={stat.key} style={styles.statPoint}>
                  <View 
                    style={[
                      styles.statDot,
                      { 
                        backgroundColor: stat.color,
                        left: 100 + x,
                        top: 100 + y
                      }
                    ]} 
                  />
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              );
            })}
          </View>
        </View>
        
        <View style={styles.statsList}>
          {statNames.map((stat) => (
            <View key={stat.key} style={styles.statItem}>
              <View style={[styles.statColor, { backgroundColor: stat.color }]} />
              <Text style={styles.statName}>{stat.label}</Text>
              <Text style={styles.statValue}>{stats[stat.key as keyof UserStats]}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const handleQuestPress = (quest: Quest) => {
    // 퀘스트 상세 화면으로 이동
    Alert.alert('퀘스트', `${quest.name} 퀘스트를 시작하시겠습니까?`);
  };

  const handleStartSession = () => {
    // 첫 번째 활성 퀘스트로 카드 세션 시작
    if (activeQuests.length > 0) {
      onStartSession(activeQuests[0]);
    } else {
      Alert.alert('알림', '진행 중인 퀘스트가 없습니다.');
    }
  };

  const handleViewDetails = () => {
    // 상세 통계 화면으로 이동
    Alert.alert('상세보기', '상세 통계를 확인하시겠습니까?');
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>로딩 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pausemo</Text>
        <Text style={styles.headerSubtitle}>
          안녕하세요, {user.name}님! 오늘도 패턴을 발견해보세요.
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 활성 퀘스트 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>진행 중인 퀘스트</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.questsContainer}
          >
            {activeQuests.map(renderQuestCard)}
            {activeQuests.length < 3 && (
              <TouchableOpacity style={styles.addQuestCard}>
                <Text style={styles.addQuestText}>+ 새 퀘스트</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        {/* 능력치 시각화 */}
        {renderStatsRadar(user.stats)}

        {/* 오늘의 요약 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>오늘의 개입 요약</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>응답률</Text>
              <Text style={styles.summaryValue}>{todayStats.responseRate}%</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>총 응답</Text>
              <Text style={styles.summaryValue}>{todayStats.totalResponses}회</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>연속일</Text>
              <Text style={styles.summaryValue}>{todayStats.consecutiveDays}일째</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>획득 포인트</Text>
              <Text style={styles.summaryValue}>{todayStats.points}P</Text>
            </View>
            
            <TouchableOpacity style={styles.detailsButton} onPress={handleViewDetails}>
              <Text style={styles.detailsButtonText}>상세보기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 빠른 액션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>빠른 액션</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleStartSession}>
              <Text style={styles.actionButtonText}>패턴 체크 시작</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={onOpenValueArchive}>
              <Text style={styles.actionButtonText}>가치문장 보관함</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#7f8c8d',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  questsContainer: {
    paddingRight: 20,
  },
  questCard: {
    width: 280,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questHeader: {
    marginBottom: 15,
  },
  questCategory: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  questName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  questProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  questStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  questStat: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  addQuestCard: {
    width: 280,
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 15,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addQuestText: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  statsContainer: {
    marginTop: 25,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  radarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  radarChart: {
    width: 200,
    height: 200,
    position: 'relative',
  },
  statPoint: {
    position: 'absolute',
  },
  statDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
  },
  statLabel: {
    fontSize: 10,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 15,
  },
  statsList: {
    gap: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statName: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#2c3e50',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  detailsButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DashboardScreen;
