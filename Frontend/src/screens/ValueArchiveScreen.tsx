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

const { width } = Dimensions.get('window');

interface ValueSentence {
  id: string;
  mainText: string;
  secondaryText?: string;
  category: string;
  difficulty: number;
  savedAt: string;
  isFavorite: boolean;
  usageCount: number;
}

const ValueArchiveScreen: React.FC = () => {
  const [sentences, setSentences] = useState<ValueSentence[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSecondaryText, setShowSecondaryText] = useState(true);

  // 임시 데이터 (나중에 API로 교체)
  useEffect(() => {
    const mockSentences: ValueSentence[] = [
      {
        id: '1',
        mainText: '나는 지금 시작한다. 오늘의 첫 걸음이 나를 앞으로 이끈다.',
        secondaryText: '나는 손의 움직임을 느낀다 · 나는 한 줄 쓴다',
        category: '업무/성과',
        difficulty: 1,
        savedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        isFavorite: true,
        usageCount: 5
      },
      {
        id: '2',
        mainText: '나는 과정을 신뢰한다. 그 과정이 나를 완성시킨다.',
        secondaryText: '나는 숨을 깊게 쉰다 · 나는 지금 한 번 제출한다',
        category: '업무/성과',
        difficulty: 2,
        savedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        isFavorite: false,
        usageCount: 3
      },
      {
        id: '3',
        mainText: '내 가치는 변하지 않는다. 어떤 상황에도 나는 충분하다.',
        secondaryText: '나는 호흡을 느낀다 · 나는 거울을 본다',
        category: '자기인식',
        difficulty: 1,
        savedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        isFavorite: true,
        usageCount: 8
      },
      {
        id: '4',
        mainText: '나는 내 경계를 지킨다. 나의 경계는 나를 지켜준다.',
        secondaryText: '나는 목소리를 가다듬는다 · 나는 지금은 어렵다라고 말한다',
        category: '관계/소통',
        difficulty: 2,
        savedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        isFavorite: false,
        usageCount: 2
      },
      {
        id: '5',
        mainText: '나는 지금 안전하다. 내 숨과 함께 평안이 머문다.',
        secondaryText: '나는 호흡이 고른다 · 나는 숨을 세 번 쉰다',
        category: '감정/스트레스',
        difficulty: 1,
        savedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        isFavorite: true,
        usageCount: 6
      }
    ];

    setSentences(mockSentences);
  }, []);

  const categories = [
    { key: 'all', name: '전체' },
    { key: '업무/성과', name: '업무/성과' },
    { key: '관계/소통', name: '관계/소통' },
    { key: '감정/스트레스', name: '감정/스트레스' },
    { key: '습관/중독', name: '습관/중독' },
    { key: '자기인식', name: '자기인식' },
    { key: '성장/변화', name: '성장/변화' }
  ];

  const filteredSentences = selectedCategory === 'all' 
    ? sentences 
    : sentences.filter(s => s.category === selectedCategory);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleToggleFavorite = (sentenceId: string) => {
    setSentences(prev => prev.map(s => 
      s.id === sentenceId 
        ? { ...s, isFavorite: !s.isFavorite }
        : s
    ));
  };

  const handleUseSentence = (sentence: ValueSentence) => {
    Alert.alert(
      '가치문장 사용',
      '이 문장을 지금 사용하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '사용하기', 
          onPress: () => {
            // 사용 횟수 증가
            setSentences(prev => prev.map(s => 
              s.id === sentence.id 
                ? { ...s, usageCount: s.usageCount + 1 }
                : s
            ));
            
            // 카드 세션으로 이동하는 로직
            Alert.alert('사용 완료', '가치문장을 사용했습니다!');
          }
        }
      ]
    );
  };

  const handleDeleteSentence = (sentenceId: string) => {
    Alert.alert(
      '가치문장 삭제',
      '정말로 이 가치문장을 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '삭제', 
          style: 'destructive',
          onPress: () => {
            setSentences(prev => prev.filter(s => s.id !== sentenceId));
          }
        }
      ]
    );
  };

  const renderSentenceCard = (sentence: ValueSentence) => (
    <View key={sentence.id} style={styles.sentenceCard}>
      <View style={styles.cardHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{sentence.category}</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => handleToggleFavorite(sentence.id)}
          >
            <Text style={styles.favoriteIcon}>
              {sentence.isFavorite ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDeleteSentence(sentence.id)}
          >
            <Text style={styles.deleteIcon}>×</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.mainText}>{sentence.mainText}</Text>
      
      {showSecondaryText && sentence.secondaryText && (
        <Text style={styles.secondaryText}>{sentence.secondaryText}</Text>
      )}

      <View style={styles.cardFooter}>
        <View style={styles.metaInfo}>
          <Text style={styles.difficultyText}>D{sentence.difficulty}</Text>
          <Text style={styles.usageText}>사용 {sentence.usageCount}회</Text>
          <Text style={styles.dateText}>
            {new Date(sentence.savedAt).toLocaleDateString()}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.useButton}
          onPress={() => handleUseSentence(sentence)}
        >
          <Text style={styles.useButtonText}>사용하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>가치문장 보관함</Text>
        <Text style={styles.headerSubtitle}>
          내가 성장시킨 문장들 ({sentences.length}/7)
        </Text>
      </View>

      {/* 설정 토글 */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity 
          style={styles.settingToggle}
          onPress={() => setShowSecondaryText(!showSecondaryText)}
        >
          <Text style={styles.settingLabel}>보조 문장</Text>
          <View style={[styles.toggleSwitch, showSecondaryText && styles.toggleActive]}>
            <View style={[styles.toggleThumb, showSecondaryText && styles.toggleThumbActive]} />
          </View>
        </TouchableOpacity>
      </View>

      {/* 카테고리 필터 */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryFilter}
        contentContainerStyle={styles.categoryFilterContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryChip,
              selectedCategory === category.key && styles.selectedCategoryChip
            ]}
            onPress={() => handleCategorySelect(category.key)}
          >
            <Text style={[
              styles.categoryChipText,
              selectedCategory === category.key && styles.selectedCategoryChipText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 가치문장 목록 */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredSentences.length > 0 ? (
          <View style={styles.sentencesContainer}>
            {filteredSentences.map(renderSentenceCard)}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>저장된 가치문장이 없습니다</Text>
            <Text style={styles.emptyDescription}>
              카드 세션에서 마음에 드는 문장을 저장해보세요.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* 하단 액션 */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ 새 가치문장 추가</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 22,
  },
  settingsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  settingToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  toggleSwitch: {
    width: 50,
    height: 28,
    backgroundColor: '#e9ecef',
    borderRadius: 14,
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#3498db',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleThumbActive: {
    transform: [{ translateX: 22 }],
  },
  categoryFilter: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  categoryFilterContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedCategoryChip: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  selectedCategoryChipText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sentencesContainer: {
    paddingVertical: 20,
    gap: 20,
  },
  sentenceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryBadge: {
    backgroundColor: '#ebf3fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 18,
    color: '#f39c12',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    fontSize: 20,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    lineHeight: 26,
    marginBottom: 15,
    textAlign: 'center',
  },
  secondaryText: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaInfo: {
    gap: 5,
  },
  difficultyText: {
    fontSize: 12,
    color: '#7f8c8d',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  usageText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  dateText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  useButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  useButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7f8c8d',
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#95a5a6',
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ValueArchiveScreen;
