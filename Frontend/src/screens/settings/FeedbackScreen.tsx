import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { feedbackAPI } from '../../services/api';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface FeedbackScreenProps {
  onClose: () => void;
}

type FeedbackType = 'consultation' | 'suggestion' | 'bug' | 'other';

interface FeedbackTypeOption {
  type: FeedbackType;
  title: string;
  description: string;
  icon: string;
  placeholder: string;
}

const feedbackTypes: FeedbackTypeOption[] = [
  {
    type: 'consultation',
    title: '상담/문의',
    description: '사용법이나 기능에 대해 궁금한 점이 있으시나요?',
    icon: '💬',
    placeholder: '궁금한 점을 자세히 알려주세요...\\n\\n예시:\\n- 패턴 진단 결과가 맞지 않는 것 같아요\\n- 카드가 너무 어려워요\\n- 사용법을 더 자세히 알고 싶어요',
  },
  {
    type: 'suggestion',
    title: '개선 제안',
    description: 'Pausemo를 더 좋게 만들 아이디어가 있으시나요?',
    icon: '💡',
    placeholder: '개선 아이디어를 공유해주세요...\\n\\n예시:\\n- 이런 기능이 있으면 좋겠어요\\n- 카드 내용을 이렇게 바꿔주세요\\n- UI/UX 개선 제안',
  },
  {
    type: 'bug',
    title: '버그 신고',
    description: '앱에서 문제가 발생했나요?',
    icon: '🐛',
    placeholder: '발생한 문제를 자세히 설명해주세요...\\n\\n포함해주세요:\\n- 언제 문제가 발생했는지\\n- 어떤 상황에서 발생했는지\\n- 기대했던 동작과 실제 동작\\n- 스크린샷 (가능하다면)',
  },
  {
    type: 'other',
    title: '기타',
    description: '위 카테고리에 해당하지 않는 의견이 있으시나요?',
    icon: '📝',
    placeholder: '자유롭게 의견을 공유해주세요...',
  },
];

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ onClose }) => {
  const [selectedType, setSelectedType] = useState<FeedbackType>('consultation');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedOption = feedbackTypes.find(option => option.type === selectedType)!;

  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert('입력 오류', '내용을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      
      await feedbackAPI.sendFeedback(
        selectedOption.title,
        content.trim()
      );

      Alert.alert(
        '전송 완료',
        '소중한 의견 감사합니다!\\n빠른 시일 내에 검토하여 반영하겠습니다.',
        [{ text: '확인', onPress: onClose }]
      );
    } catch (error) {
      Alert.alert('전송 실패', '네트워크 연결을 확인하고 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const renderTypeSelector = () => (
    <Card style={styles.typeSelectorCard}>
      <Text style={styles.sectionTitle}>문의 유형</Text>
      <View style={styles.typeGrid}>
        {feedbackTypes.map((option) => (
          <TouchableOpacity
            key={option.type}
            style={[
              styles.typeOption,
              selectedType === option.type && styles.selectedType,
            ]}
            onPress={() => setSelectedType(option.type)}
          >
            <Text style={styles.typeIcon}>{option.icon}</Text>
            <Text style={[
              styles.typeTitle,
              selectedType === option.type && styles.selectedTypeText,
            ]}>
              {option.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );

  const renderContentInput = () => (
    <Card style={styles.contentCard}>
      <Text style={styles.sectionTitle}>{selectedOption.title}</Text>
      <Text style={styles.sectionDescription}>
        {selectedOption.description}
      </Text>
      
      <TextInput
        style={styles.textInput}
        value={content}
        onChangeText={setContent}
        placeholder={selectedOption.placeholder}
        placeholderTextColor={colors.textTertiary}
        multiline
        numberOfLines={8}
        textAlignVertical=\"top\"
        maxLength={1000}
      />
      
      <Text style={styles.characterCount}>
        {content.length}/1000
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>피드백</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps=\"handled\"
        >
          <View style={styles.intro}>
            <Text style={styles.introTitle}>의견을 들려주세요</Text>
            <Text style={styles.introDescription}>
              여러분의 소중한 피드백으로 Pausemo가 더 나아집니다.{\"\\n\"}
              어떤 작은 의견이라도 환영합니다.
            </Text>
          </View>

          {renderTypeSelector()}
          {renderContentInput()}

          <View style={styles.submitSection}>
            <Button
              title=\"전송하기\"
              onPress={handleSubmit}
              loading={loading}
              disabled={!content.trim()}
              style={styles.submitButton}
            />
            
            <Text style={styles.privacyNote}>
              전송된 피드백은 서비스 개선 목적으로만 사용되며,{\"\\n\"}
              개인정보는 안전하게 보호됩니다.
            </Text>
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenPadding,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  closeButton: {
    padding: spacing.sm,
  },
  closeButtonText: {
    ...typography.h5,
    color: colors.textSecondary,
  },
  headerTitle: {
    ...typography.h5,
    color: colors.textPrimary,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
  },
  intro: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  introTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  introDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  typeSelectorCard: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h6,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  sectionDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  typeOption: {
    width: '48%',
    aspectRatio: 2,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: spacing.buttonRadius,
    borderWidth: 2,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
  },
  selectedType: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight + '10',
  },
  typeIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  typeTitle: {
    ...typography.label,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  selectedTypeText: {
    color: colors.primary,
  },
  contentCard: {
    marginBottom: spacing.lg,
  },
  textInput: {
    ...typography.body1,
    color: colors.textPrimary,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: spacing.buttonRadius,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    minHeight: 160,
    marginBottom: spacing.xs,
  },
  characterCount: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'right',
  },
  submitSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  submitButton: {
    width: '100%',
    marginBottom: spacing.md,
  },
  privacyNote: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 16,
  },
  bottomPadding: {
    height: spacing.xl,
  },
});

