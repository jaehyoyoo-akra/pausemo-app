import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { colors, typography } from '../constants/Colors';

interface ThemedTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'bodySecondary' | 'caption' | 'small' | 'emphasis';
  color?: 'primary' | 'secondary' | 'muted' | 'emphasis' | 'inverse' | 'success' | 'error';
  align?: 'left' | 'center' | 'right';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  style?: TextStyle;
}

export default function ThemedText({ 
  children, 
  variant = 'body',
  color = 'primary',
  align = 'left',
  weight,
  style 
}: ThemedTextProps) {
  const getTextStyle = () => {
    const baseStyle: TextStyle = {
      textAlign: align,
    };

    // 변형별 기본 스타일
    switch (variant) {
      case 'h1':
        baseStyle.fontSize = typography.sizes['4xl'];
        baseStyle.fontWeight = weight || '600';
        baseStyle.lineHeight = typography.sizes['4xl'] * typography.lineHeights.tight;
        baseStyle.letterSpacing = typography.letterSpacing.tight;
        break;
      case 'h2':
        baseStyle.fontSize = typography.sizes['2xl'];
        baseStyle.fontWeight = weight || '600';
        baseStyle.lineHeight = typography.sizes['2xl'] * typography.lineHeights.snug;
        baseStyle.letterSpacing = typography.letterSpacing.tight;
        break;
      case 'h3':
        baseStyle.fontSize = typography.sizes.xl;
        baseStyle.fontWeight = weight || '600';
        baseStyle.lineHeight = typography.sizes.xl * typography.lineHeights.normal;
        break;
      case 'body':
        baseStyle.fontSize = typography.sizes.base;
        baseStyle.fontWeight = weight || '500';
        baseStyle.lineHeight = typography.sizes.base * typography.lineHeights.normal;
        break;
      case 'bodySecondary':
        baseStyle.fontSize = typography.sizes.sm;
        baseStyle.fontWeight = weight || '400';
        baseStyle.lineHeight = typography.sizes.sm * typography.lineHeights.normal;
        break;
      case 'caption':
        baseStyle.fontSize = typography.sizes.sm;
        baseStyle.fontWeight = weight || '400';
        baseStyle.lineHeight = typography.sizes.sm * typography.lineHeights.normal;
        break;
      case 'small':
        baseStyle.fontSize = typography.sizes.xs;
        baseStyle.fontWeight = weight || '400';
        baseStyle.lineHeight = typography.sizes.xs * typography.lineHeights.tight;
        break;
      case 'emphasis':
        baseStyle.fontSize = typography.sizes.base;
        baseStyle.fontWeight = weight || '600';
        baseStyle.lineHeight = typography.sizes.base * typography.lineHeights.normal;
        break;
    }

    // 색상별 스타일
    switch (color) {
      case 'primary':
        baseStyle.color = colors.text.primary;
        break;
      case 'secondary':
        baseStyle.color = colors.text.secondary;
        break;
      case 'muted':
        baseStyle.color = colors.text.muted;
        break;
      case 'emphasis':
        baseStyle.color = colors.text.emphasis;
        break;
      case 'inverse':
        baseStyle.color = colors.text.inverse;
        break;
      case 'success':
        baseStyle.color = colors.semantic.success;
        break;
      case 'error':
        baseStyle.color = colors.semantic.error;
        break;
    }

    return [baseStyle, style];
  };

  return (
    <Text style={getTextStyle()} numberOfLines={undefined}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  // 추가 스타일이 필요한 경우 여기에 정의
});
