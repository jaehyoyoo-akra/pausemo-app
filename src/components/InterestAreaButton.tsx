import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ShadowWrapper } from './index';

interface InterestAreaButtonProps {
  onPress: () => void;
  style?: any;
}

export default function InterestAreaButton({ onPress, style }: InterestAreaButtonProps) {
  return (
    <ShadowWrapper variant="medium" style={{ borderRadius: 25 }}>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={onPress}
        accessible={true}
        accessibilityLabel="관심 영역 선택하기"
      >
        <LinearGradient
          colors={['#8b5cf6', '#3b82f6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>관심 영역 선택하기</Text>
          <Text style={styles.buttonArrow}>→</Text>
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
