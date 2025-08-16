import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { AuthService } from '../../services/auth';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface SettingsScreenProps {
  onLogout: () => void;
  onOpenFeedback: () => void;
  onClose: () => void;
}

interface SettingItem {
  title: string;
  description?: string;
  icon: string;
  onPress: () => void;
  style?: 'default' | 'danger';
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onLogout,
  onOpenFeedback,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await AuthService.signOut();
              onLogout();
            } catch (error) {
              Alert.alert('오류', '로그아웃 중 문제가 발생했습니다.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleFeedback = () => {
    onOpenFeedback();
  };

  const handleSupport = () => {
    Alert.alert(
      '고객 지원',
      '어떤 도움이 필요하신가요?',
      [
        { text: '취소', style: 'cancel' },
        { text: '문의하기', onPress: () => onOpenFeedback() },
        { text: '버그 신고', onPress: () => onOpenFeedback() },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'Pausemo에 대해',
      'Pausemo v1.0.0\\n\\n패턴을 멈추는 결정적 순간\\n\\n간단해 보이는 3초가 인생을 바꿉니다.',
      [{ text: '확인' }]
    );
  };

  const accountSettings: SettingItem[] = [
    {
      title: '프로필 설정',
      description: '이름, 사진 등 개인정보 수정',
      icon: '👤',
      onPress: () => Alert.alert('준비 중', '곧 이용하실 수 있습니다.'),
    },
    {
      title: '알림 설정',
      description: '푸시 알림, 개입 시간 설정',
      icon: '🔔',
      onPress: () => Alert.alert('준비 중', '곧 이용하실 수 있습니다.'),
    },
    {
      title: '피로도 조절',
      description: '개입 빈도와 강도 조절',
      icon: '⚡',
      onPress: () => Alert.alert('준비 중', '곧 이용하실 수 있습니다.'),
    },
  ];

  const supportSettings: SettingItem[] = [
    {
      title: '상담/문의',
      description: '궁금한 점이나 개선 사항을 알려주세요',
      icon: '💬',
      onPress: handleFeedback,
    },
    {
      title: '버그 리포트',
      description: '문제가 발생했다면 신고해주세요',
      icon: '🐛',
      onPress: handleSupport,
    },
    {
      title: '이용약관',
      description: '서비스 이용약관 확인',
      icon: '📋',
      onPress: () => Alert.alert('준비 중', '곧 이용하실 수 있습니다.'),
    },
    {
      title: '개인정보처리방침',
      description: '개인정보 처리 방침 확인',
      icon: '🔒',
      onPress: () => Alert.alert('준비 중', '곧 이용하실 수 있습니다.'),
    },
  ];

  const appSettings: SettingItem[] = [
    {
      title: 'Pausemo에 대해',
      description: '앱 정보 및 버전',
      icon: 'ℹ️',
      onPress: handleAbout,
    },
    {
      title: '로그아웃',
      description: '계정에서 로그아웃합니다',
      icon: '🚪',
      onPress: handleLogout,
      style: 'danger',
    },
  ];

  const renderSettingSection = (title: string, items: SettingItem[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Card style={styles.sectionCard}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.settingItem,
              index < items.length - 1 && styles.settingItemBorder,
            ]}
            onPress={item.onPress}
            disabled={loading}
          >
            <View style={styles.settingIcon}>
              <Text style={styles.settingIconText}>{item.icon}</Text>
            </View>
            <View style={styles.settingContent}>
              <Text style={[
                styles.settingTitle,
                item.style === 'danger' && styles.dangerText,
              ]}>
                {item.title}
              </Text>
              {item.description && (
                <Text style={styles.settingDescription}>
                  {item.description}
                </Text>
              )}
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </Card>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>설정</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderSettingSection('계정', accountSettings)}
        {renderSettingSection('지원', supportSettings)}
        {renderSettingSection('앱', appSettings)}

        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>
            Pausemo는 개인의 성장을 돕는 도구입니다.{\"\\n\"}
            의료적 진단이나 치료를 대체하지 않습니다.
          </Text>
        </View>

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
    width: 40, // closeButton과 동일한 너비
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.h6,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  sectionCard: {
    padding: 0,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.cardPadding,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingIconText: {
    fontSize: 20,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    ...typography.body1,
    color: colors.textPrimary,
    marginBottom: spacing.xs / 2,
  },
  settingDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  settingArrow: {
    ...typography.h5,
    color: colors.textTertiary,
  },
  dangerText: {
    color: colors.error,
  },
  footerInfo: {
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 16,
  },
  bottomPadding: {
    height: spacing.xl,
  },
});

