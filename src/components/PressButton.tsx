import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ShadowWrapper } from './index';

interface PressButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'start' | 'next' | 'diagnosis' | 'interest';
  style?: any;
}

export default function PressButton({ 
  title, 
  onPress, 
  variant = 'start',
  style 
}: PressButtonProps) {
  const getColors = (): readonly [string, string, ...string[]] => {
    switch (variant) {
      case 'diagnosis':
        return ['#10b981', '#059669'] as const; // 초록색 (마음 능력치 진단 시작)
      case 'interest':
        return ['#8b5cf6', '#3b82f6'] as const; // 보라-파랑 (관심 영역 선택하기)
      case 'start':
      case 'next':
      default:
        return ['#4285f4', '#2563eb', '#1d4ed8'] as const; // Pausemo 고유 파란색 (시작/다음)
    }
  };

  return (
    <ShadowWrapper variant="medium" style={{ borderRadius: 25 }}>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={onPress}
        accessible={true}
        accessibilityLabel={title}
      >
        <LinearGradient
          colors={getColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>
            {title}
          </Text>
          <Text style={styles.buttonArrow}>
            →
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </ShadowWrapper>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },
  buttonArrow: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
});
