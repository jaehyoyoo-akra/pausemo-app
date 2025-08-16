import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { CategoryType } from '../../types';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface CategorySelectionScreenProps {
  onCategorySelect: (category: CategoryType) => void;
}

interface CategoryInfo {
  type: CategoryType;
  title: string;
  description: string;
  examples: string[];
  icon: string;
}

const categories: CategoryInfo[] = [
  {
    type: '자기인식',
    title: '자기인식',
    description: '자존감, 비교, 인정욕구 등\\n나와의 관계 개선',
    examples: ['인정욕구 조절', '자존감 회복', '비교 중단'],
    icon: '🧘‍♀️',
  },
  {
    type: '업무/성과',
    title: '업무/성과',
    description: '미루기, 완벽주의, 번아웃 등\\n생산성과 성과 개선',
    examples: ['미루기 극복', '완벽주의 탈출', '번아웃 회복'],
    icon: '💼',
  },
  {
    type: '관계/소통',
    title: '관계/소통',
    description: '거절, 갈등, 경계설정 등\\n타인과의 관계 개선',
    examples: ['거절 못하기', '갈등 회피', '경계 설정'],
    icon: '👥',
  },
  {
    type: '감정/스트레스',
    title: '감정/스트레스',
    description: '불안, 분노, 우울감 등\\n감정 조절과 스트레스 관리',
    examples: ['불안 관리', '분노 조절', '우울감 완충'],
    icon: '💚',
  },
  {
    type: '습관/중독',
    title: '습관/중독',
    description: 'SNS, 야식, 충동구매 등\\n건강하지 않은 습관 개선',
    examples: ['SNS 과몰입', '야식/과식', '충동구매'],
    icon: '🔄',
  },
  {
    type: '성장/변화',
    title: '성장/변화',
    description: '목표회피, 변화저항 등\\n개인적 성장과 변화 추진',
    examples: ['목표 회피', '변화 저항', '실패 두려움'],
    icon: '🌱',
  },
];

export const CategorySelectionScreen: React.FC<CategorySelectionScreenProps> = ({
  onCategorySelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  const handleCategoryPress = (category: CategoryType) => {
    setSelectedCategory(category);
  };

  const handleContinue = () => {
    if (selectedCategory) {
      onCategorySelect(selectedCategory);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>어떤 패턴을 바꾸고 싶나요?</Text>
        <Text style={styles.subtitle}>
          가장 관심 있는 영역 하나를 선택해 주세요.\\n
          나중에 다른 영역도 추가할 수 있습니다.
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.type}
            onPress={() => handleCategoryPress(category.type)}
            activeOpacity={0.8}
          >
            <Card
              style={[
                styles.categoryCard,
                selectedCategory === category.type && styles.selectedCard,
              ]}
            >
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                </View>
              </View>
              
              <View style={styles.examplesContainer}>
                {category.examples.map((example, index) => (
                  <View key={index} style={styles.exampleTag}>
                    <Text style={styles.exampleText}>{example}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title=\"다음\"
          onPress={handleContinue}
          disabled={!selectedCategory}
          style={styles.continueButton}
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
  header: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body1,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
  },
  categoryCard: {
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight + '10',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: spacing.md,
    marginTop: 2,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    ...typography.h6,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  categoryDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  examplesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  exampleTag: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  exampleText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  footer: {
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.lg,
  },
  continueButton: {
    width: '100%',
  },
});

