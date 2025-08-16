import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Vibration,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, CardType, Quest } from '../types';

const { width, height } = Dimensions.get('window');

interface CardSessionProps {
  quest: Quest;
  onComplete: (sessionData: any) => void;
  onClose: () => void;
}

const CardSessionScreen: React.FC<CardSessionProps> = ({ quest, onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState<'observation' | 'gap' | 'reinforcement'>('observation');
  const [observationAnswer, setObservationAnswer] = useState<'Y' | 'N' | null>(null);
  const [gapCompleted, setGapCompleted] = useState(false);
  const [reinforcementAnswer, setReinforcementAnswer] = useState<'Y' | 'N' | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState<Date>(new Date());
  
  // 애니메이션 값들
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // 임시 카드 데이터 (나중에 API로 교체)
  const [cards] = useState({
    observation: {
      _id: '1',
      type: 'observation' as CardType,
      text: '지금 중요한 일을 피하고 있나요? 몸이 조금 긴장되었나요?',
      difficulty: 1,
      category: quest.category,
      userType: { primary: '성과-증명형' },
      isActive: true,
      efficiency: { responseRate: 0.8, completionRate: 0.7, lastUpdated: new Date().toISOString() },
      createdAt: new Date().toISOString()
    },
    gap: {
      _id: '2',
      type: 'gap' as CardType,
      text: '나는 지금 시작한다. 오늘의 첫 걸음이 나를 앞으로 이끈다.',
      difficulty: 1,
      category: quest.category,
      userType: { primary: '성과-증명형' },
      isActive: true,
      efficiency: { responseRate: 0.9, completionRate: 0.8, lastUpdated: new Date().toISOString() },
      createdAt: new Date().toISOString()
    },
    reinforcement: {
      _id: '3',
      type: 'reinforcement' as CardType,
      text: '30분간 시작하지 않겠습니까?',
      difficulty: 1,
      category: quest.category,
      userType: { primary: '성과-증명형' },
      isActive: true,
      efficiency: { responseRate: 0.7, completionRate: 0.6, lastUpdated: new Date().toISOString() },
      createdAt: new Date().toISOString()
    }
  });

  useEffect(() => {
    // 화면 진입 애니메이션
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleObservationAnswer = (answer: 'Y' | 'N') => {
    setObservationAnswer(answer);
    
    // 햅틱 피드백
    Vibration.vibrate(100);
    
    // 다음 단계로 이동
    setTimeout(() => {
      setCurrentStep('gap');
      startGapTimer();
    }, 500);
  };

  const startGapTimer = () => {
    // 3초 타이머 시작
    const timer = setInterval(() => {
      setGapCompleted(true);
      clearInterval(timer);
      
      // 강화 단계로 이동
      setTimeout(() => {
        setCurrentStep('reinforcement');
      }, 500);
    }, 3000);

    // 프로그레스 바 애니메이션
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  const handleReinforcementAnswer = (answer: 'Y' | 'N') => {
    setReinforcementAnswer(answer);
    
    // 햅틱 피드백
    Vibration.vibrate(100);
    
    // 완료 애니메이션
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // 세션 완료
    setTimeout(() => {
      completeSession();
    }, 1000);
  };

  const completeSession = () => {
    const sessionData = {
      questId: quest._id,
      observation: observationAnswer,
      gap: gapCompleted,
      reinforcement: reinforcementAnswer,
      responseTime: Math.floor((Date.now() - sessionStartTime.getTime()) / 1000),
      completed: true,
      timestamp: new Date().toISOString()
    };

    onComplete(sessionData);
  };

  const renderObservationCard = () => (
    <Animated.View 
      style={[
        styles.cardContainer,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardType}>관찰</Text>
        <Text style={styles.cardDifficulty}>D{cards.observation.difficulty}</Text>
      </View>
      
      <Text style={styles.cardText}>{cards.observation.text}</Text>
      
      <View style={styles.answerButtons}>
        <TouchableOpacity 
          style={[styles.answerButton, styles.yesButton]} 
          onPress={() => handleObservationAnswer('Y')}
        >
          <Text style={styles.answerButtonText}>예</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.answerButton, styles.noButton]} 
          onPress={() => handleObservationAnswer('N')}
        >
          <Text style={styles.answerButtonText}>아니오</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderGapCard = () => (
    <Animated.View 
      style={[
        styles.cardContainer,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardType}>틈</Text>
        <Text style={styles.cardDifficulty}>D{cards.gap.difficulty}</Text>
      </View>
      
      <Text style={styles.cardText}>{cards.gap.text}</Text>
      
      <View style={styles.gapTimer}>
        <View style={styles.progressBar}>
          <Animated.View 
            style={[
              styles.progressFill,
              { width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })}
            ]} 
          />
        </View>
        <Text style={styles.timerText}>3초 동안 문장을 읽어주세요</Text>
      </View>
      
      {gapCompleted && (
        <View style={styles.completedIndicator}>
          <Text style={styles.completedText}>✓ 완료</Text>
        </View>
      )}
    </Animated.View>
  );

  const renderReinforcementCard = () => (
    <Animated.View 
      style={[
        styles.cardContainer,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardType}>강화</Text>
        <Text style={styles.cardDifficulty}>D{cards.reinforcement.difficulty}</Text>
      </View>
      
      <Text style={styles.cardText}>{cards.reinforcement.text}</Text>
      
      <View style={styles.answerButtons}>
        <TouchableOpacity 
          style={[styles.answerButton, styles.yesButton]} 
          onPress={() => handleReinforcementAnswer('Y')}
        >
          <Text style={styles.answerButtonText}>약속한다</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.answerButton, styles.noButton]} 
          onPress={() => handleReinforcementAnswer('N')}
        >
          <Text style={styles.answerButtonText}>아직은</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderCurrentCard = () => {
    switch (currentStep) {
      case 'observation':
        return renderObservationCard();
      case 'gap':
        return renderGapCard();
      case 'reinforcement':
        return renderReinforcementCard();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={styles.questName}>{quest.name}</Text>
          <Text style={styles.questCategory}>{quest.category}</Text>
        </View>
        
        <View style={styles.progressIndicator}>
          <View style={styles.progressDot} />
          <View style={[styles.progressDot, currentStep !== 'observation' && styles.progressDotActive]} />
          <View style={[styles.progressDot, currentStep === 'reinforcement' && styles.progressDotActive]} />
        </View>
      </View>

      <View style={styles.content}>
        {renderCurrentCard()}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {currentStep === 'observation' && '패턴을 관찰하고 답해주세요'}
          {currentStep === 'gap' && '3초 동안 가치문장을 읽어주세요'}
          {currentStep === 'reinforcement' && '작은 약속으로 패턴을 강화하세요'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#7f8c8d',
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  questName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 2,
  },
  questCategory: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  progressIndicator: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e9ecef',
  },
  progressDotActive: {
    backgroundColor: '#3498db',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: width - 40,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 25,
  },
  cardType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3498db',
    backgroundColor: '#ebf3fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  cardDifficulty: {
    fontSize: 14,
    color: '#7f8c8d',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 40,
  },
  answerButtons: {
    flexDirection: 'row',
    gap: 20,
    width: '100%',
  },
  answerButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  yesButton: {
    backgroundColor: '#27ae60',
  },
  noButton: {
    backgroundColor: '#e74c3c',
  },
  answerButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  gapTimer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    marginBottom: 15,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  timerText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  completedIndicator: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  completedText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default CardSessionScreen;
