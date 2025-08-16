import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/common/Button';
import { AuthService } from '../../services/auth';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const { width: screenWidth } = Dimensions.get('window');

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await AuthService.signInWithGoogle();
      onLoginSuccess();
    } catch (error: any) {
      Alert.alert('로그인 실패', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* 로고 영역 */}
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>Pausemo</Text>
          </View>
          <Text style={styles.tagline}>패턴을 멈추는 결정적 순간</Text>
        </View>

        {/* 메인 메시지 */}
        <View style={styles.messageContainer}>
          <Text style={styles.mainMessage}>간단해 보이는 3초가{\"\\n\"}인생을 바꾼다</Text>
          <Text style={styles.subMessage}>
            매일 반복되는 복잡한 패턴들을{\"\\n\"}
            3초간 멈추고 새로운 선택을 하세요
          </Text>
        </View>

        {/* 로그인 버튼들 */}
        <View style={styles.buttonContainer}>
          <Button
            title=\"구글로 계속하기\"
            onPress={handleGoogleLogin}
            loading={loading}
            style={styles.googleButton}
            textStyle={styles.googleButtonText}
          />
          
          <Text style={styles.termsText}>
            계속하면 이용약관 및 개인정보처리방침에 동의하는 것으로 간주됩니다.
          </Text>
        </View>

        {/* 하단 설명 */}
        <View style={styles.bottomInfo}>
          <Text style={styles.infoText}>
            • 하루 10초, 2-3회의 간단한 개입{\"\\n\"}
            • 개인화된 패턴 분석과 맞춤 카드{\"\\n\"}
            • 타인과의 비교 없이 나만의 성장
          </Text>
        </View>
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
    flexGrow: 1,
    paddingHorizontal: spacing.screenPadding,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: spacing.xxxl,
    marginBottom: spacing.xl,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  logoText: {
    ...typography.h2,
    color: colors.textInverse,
    fontWeight: '700',
  },
  tagline: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  mainMessage: {
    ...typography.h3,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: 32,
  },
  subMessage: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: spacing.xl,
  },
  googleButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  googleButtonText: {
    color: colors.textPrimary,
  },
  termsText: {
    ...typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: 16,
  },
  bottomInfo: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: spacing.lg,
  },
  infoText: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

