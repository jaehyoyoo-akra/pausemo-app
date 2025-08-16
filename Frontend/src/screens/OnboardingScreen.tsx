import React, { useState } from 'react';
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
import { QuestCategory, UserType, OnboardingData } from '../types';

const { width } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<QuestCategory[]>([]);
  const [selectedQuests, setSelectedQuests] = useState<string[]>([]);
  const [userType, setUserType] = useState<UserType[]>([]);
  const [fatigueLevel, setFatigueLevel] = useState<1 | 2 | 3 | 4>(2);
  const [preferredTime, setPreferredTime] = useState<string[]>(['오전', '저녁']);

  const categories: { category: QuestCategory; name: string; description: string }[] = [
    {
      category: '업무/성과',
      name: '업무/성과',
      description: '미루기 극복, 완벽주의 탈출, 번아웃 회복'
    },
    {
      category: '관계/소통',
      name: '관계/소통',
      description: '거절 못하기, 갈등 회피, 과도한 책임감'
    },
    {
      category: '감정/스트레스',
      name: '감정/스트레스',
      description: '불안 관리, 분노 조절, 우울감 완충'
    },
    {
      category: '습관/중독',
      name: '습관/중독',
      description: 'SNS 과몰입, 야식/과식, 충동구매'
    },
    {
      category: '자기인식',
      name: '자기인식',
      description: '자존감 회복, 비교 중단, 자기비난 완화'
    },
    {
      category: '성장/변화',
      name: '성장/변화',
      description: '목표 회피, 변화 저항, 실패 두려움'
    }
  ];

  const userTypes: { type: UserType; name: string; description: string }[] = [
    {
      type: '성과-증명형',
      name: '성과-증명형',
      description: '끊임없이 성취로 가치 증명'
    },
    {
      type: '관계-의존형',
      name: '관계-의존형',
      description: '타인의 반응으로 자기 확인'
    },
    {
      type: '완벽-가면형',
      name: '완벽-가면형',
      description: '완벽한 모습만 보여주려 함'
    },
    {
      type: '희생-헌신형',
      name: '희생-헌신형',
      description: '남을 위해 자신을 소진'
    },
    {
      type: '반항-차별형',
      name: '반항-차별형',
      description: '독특함으로 인정받으려 함'
    },
    {
      type: '침묵-관찰형',
      name: '침묵-관찰형',
      description: '인정받지 못할까봐 숨음'
    },
    {
      type: '과시-표현형',
      name: '과시-표현형',
      description: '끊임없이 자신을 어필'
    },
    {
      type: '변동-불안형',
      name: '변동-불안형',
      description: '인정 신호에 극도로 민감'
    }
  ];

  const fatigueLevels = [
    { level: 1, name: 'L1 (최소)', description: '1회/일, 사용자 요청 시' },
    { level: 2, name: 'L2 (표준)', description: '2회/일, 오전/저녁' },
    { level: 3, name: 'L3 (적극)', description: '3회/일, 오전/오후/저녁' },
    { level: 4, name: 'L4 (집중)', description: '4회/일 + 트리거 감지 시' }
  ];

  const timeOptions = [
    { value: '오전', label: '오전 (6-12시)' },
    { value: '오후', label: '오후 (12-18시)' },
    { value: '저녁', label: '저녁 (18-24시)' }
  ];

  const handleCategoryToggle = (category: QuestCategory) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      Alert.alert('알림', '최대 3개 카테고리까지 선택할 수 있습니다.');
    }
  };

  const handleUserTypeToggle = (type: UserType) => {
    if (userType.includes(type)) {
      setUserType(userType.filter(t => t !== type));
    } else if (userType.length < 2) {
      setUserType([...userType, type]);
    } else {
      Alert.alert('알림', '최대 2개 유형까지 선택할 수 있습니다.');
    }
  };

  const handleTimeToggle = (time: string) => {
    if (preferredTime.includes(time)) {
      setPreferredTime(preferredTime.filter(t => t !== time));
    } else {
      setPreferredTime([...preferredTime, time]);
    }
  };

  const handleNext = () => {
    if (currentStep === 0 && selectedCategories.length === 0) {
      Alert.alert('알림', '최소 1개 카테고리를 선택해주세요.');
      return;
    }
    if (currentStep === 1 && userType.length === 0) {
      Alert.alert('알림', '최소 1개 유형을 선택해주세요.');
      return;
    }
    if (currentStep === 2 && preferredTime.length === 0) {
      Alert.alert('알림', '최소 1개 시간대를 선택해주세요.');
      return;
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // 온보딩 완료 처리
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = async () => {
    try {
      const onboardingData: OnboardingData = {
        selectedCategories,
        selectedQuests,
        userType,
        fatigueLevel,
        preferredTime
      };

      // TODO: API 호출하여 온보딩 데이터 저장
      console.log('온보딩 완료:', onboardingData);
      
      // 메인 화면으로 이동
      // navigation.replace('Main');
    } catch (error) {
      Alert.alert('오류', '온보딩 저장에 실패했습니다.');
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>어떤 영역에서 도움이 필요하신가요?</Text>
      <Text style={styles.stepDescription}>
        최대 3개까지 선택할 수 있습니다. 가장 중요하다고 생각하는 영역을 선택해주세요.
      </Text>
      
      <View style={styles.categoriesContainer}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.category}
            style={[
              styles.categoryCard,
              selectedCategories.includes(item.category) && styles.selectedCategoryCard
            ]}
            onPress={() => handleCategoryToggle(item.category)}
          >
            <Text style={[
              styles.categoryName,
              selectedCategories.includes(item.category) && styles.selectedCategoryName
            ]}>
              {item.name}
            </Text>
            <Text style={[
              styles.categoryDescription,
              selectedCategories.includes(item.category) && styles.selectedCategoryDescription
            ]}>
              {item.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>당신의 패턴을 파악해보겠습니다</Text>
      <Text style={styles.stepDescription}>
        다음 중 당신에게 가장 잘 맞는 유형을 선택해주세요. (최대 2개)
      </Text>
      
      <View style={styles.userTypesContainer}>
        {userTypes.map((item) => (
          <TouchableOpacity
            key={item.type}
            style={[
              styles.userTypeCard,
              userType.includes(item.type) && styles.selectedUserTypeCard
            ]}
            onPress={() => handleUserTypeToggle(item.type)}
          >
            <Text style={[
              styles.userTypeName,
              userType.includes(item.type) && styles.selectedUserTypeName
            ]}>
              {item.name}
            </Text>
            <Text style={[
              styles.userTypeDescription,
              userType.includes(item.type) && styles.selectedUserTypeDescription
            ]}>
              {item.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>개입 빈도와 시간을 설정해주세요</Text>
      <Text style={styles.stepDescription}>
        당신의 생활 패턴에 맞는 설정을 선택해주세요.
      </Text>
      
      <View style={styles.settingsContainer}>
        <Text style={styles.settingTitle}>개입 빈도</Text>
        <View style={styles.fatigueLevelContainer}>
          {fatigueLevels.map((item) => (
            <TouchableOpacity
              key={item.level}
              style={[
                styles.fatigueLevelCard,
                fatigueLevel === item.level && styles.selectedFatigueLevelCard
              ]}
              onPress={() => setFatigueLevel(item.level)}
            >
              <Text style={[
                styles.fatigueLevelName,
                fatigueLevel === item.level && styles.selectedFatigueLevelName
              ]}>
                {item.name}
              </Text>
              <Text style={[
                styles.fatigueLevelDescription,
                fatigueLevel === item.level && styles.selectedFatigueLevelDescription
              ]}>
                {item.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.settingTitle}>선호 시간대</Text>
        <View style={styles.timeContainer}>
          {timeOptions.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.timeCard,
                preferredTime.includes(item.value) && styles.selectedTimeCard
              ]}
              onPress={() => handleTimeToggle(item.value)}
            >
              <Text style={[
                styles.timeLabel,
                preferredTime.includes(item.value) && styles.selectedTimeLabel
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>온보딩이 완료되었습니다!</Text>
      <Text style={styles.stepDescription}>
        이제 Pausemo와 함께 패턴을 발견하고 변화를 시작해보세요.
      </Text>
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>설정 요약</Text>
        <Text style={styles.summaryText}>선택된 카테고리: {selectedCategories.join(', ')}</Text>
        <Text style={styles.summaryText}>사용자 유형: {userType.join(', ')}</Text>
        <Text style={styles.summaryText}>개입 빈도: L{fatigueLevel}</Text>
        <Text style={styles.summaryText}>선호 시간: {preferredTime.join(', ')}</Text>
      </View>
    </View>
  );

  const steps = [
    { title: '카테고리 선택', render: renderStep1 },
    { title: '패턴 진단', render: renderStep2 },
    { title: '개입 설정', render: renderStep3 },
    { title: '완료', render: renderStep4 }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pausemo</Text>
        <Text style={styles.headerSubtitle}>패턴을 멈추는 결정적 순간</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((currentStep + 1) / 4) * 100}%` }]} />
      </View>

      <View style={styles.stepIndicator}>
        <Text style={styles.stepText}>
          {currentStep + 1} / 4 - {steps[currentStep].title}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {steps[currentStep].render()}
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>이전</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[
            styles.nextButton,
            (currentStep === 3) && styles.completeButton
          ]} 
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === 3 ? '시작하기' : '다음'}
          </Text>
        </TouchableOpacity>
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
    alignItems: 'center',
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
    fontStyle: 'italic',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e9ecef',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
  },
  stepIndicator: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  stepText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    paddingVertical: 30,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  categoriesContainer: {
    gap: 15,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCategoryCard: {
    borderColor: '#3498db',
    backgroundColor: '#ebf3fd',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  selectedCategoryName: {
    color: '#3498db',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  selectedCategoryDescription: {
    color: '#5dade2',
  },
  userTypesContainer: {
    gap: 15,
  },
  userTypeCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedUserTypeCard: {
    borderColor: '#3498db',
    backgroundColor: '#ebf3fd',
  },
  userTypeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  selectedUserTypeName: {
    color: '#3498db',
  },
  userTypeDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  selectedUserTypeDescription: {
    color: '#5dade2',
  },
  settingsContainer: {
    gap: 25,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  fatigueLevelContainer: {
    gap: 12,
  },
  fatigueLevelCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  selectedFatigueLevelCard: {
    borderColor: '#3498db',
    backgroundColor: '#ebf3fd',
  },
  fatigueLevelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  selectedFatigueLevelName: {
    color: '#3498db',
  },
  fatigueLevelDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  selectedFatigueLevelDescription: {
    color: '#5dade2',
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  timeCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e9ecef',
    alignItems: 'center',
  },
  selectedTimeCard: {
    borderColor: '#3498db',
    backgroundColor: '#ebf3fd',
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
  selectedTimeLabel: {
    color: '#3498db',
  },
  summaryContainer: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  summaryText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 10,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    gap: 15,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#95a5a6',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#27ae60',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen;
