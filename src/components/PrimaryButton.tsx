import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import { colors, shadows, spacing, borderRadius, typography } from '../constants/Colors';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export default function PrimaryButton({ 
  title, 
  onPress, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  textStyle,
  icon
}: PrimaryButtonProps) {
  const getButtonStyle = () => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: borderRadius.full,
    };

    // 크기별 스타일
    switch (size) {
      case 'sm':
        baseStyle.paddingVertical = spacing.sm;
        baseStyle.paddingHorizontal = spacing.md;
        break;
      case 'md':
        baseStyle.paddingVertical = spacing.md;
        baseStyle.paddingHorizontal = spacing.lg;
        break;
      case 'lg':
        baseStyle.paddingVertical = spacing.lg;
        baseStyle.paddingHorizontal = spacing.xl;
        break;
    }

    // 변형별 스타일
    switch (variant) {
      case 'primary':
        baseStyle.backgroundColor = colors.primary[500];
        baseStyle.minHeight = 56;
        break;
      case 'secondary':
        baseStyle.backgroundColor = colors.surface[2];
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = colors.surface[3];
        baseStyle.minHeight = 56;
        break;
      case 'success':
        baseStyle.backgroundColor = colors.semantic.success;
        baseStyle.minHeight = 56;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1.5;
        baseStyle.borderColor = colors.primary[500];
        baseStyle.minHeight = 56;
        break;
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseTextStyle: TextStyle = {
      fontSize: typography.sizes.base,
      fontWeight: '600',
      textAlign: 'center',
    };

    // 변형별 텍스트 색상
    switch (variant) {
      case 'primary':
      case 'success':
        baseTextStyle.color = colors.text.inverse;
        break;
      case 'secondary':
        baseTextStyle.color = colors.text.secondary;
        break;
      case 'outline':
        baseTextStyle.color = colors.primary[500];
        break;
    }

    return [baseTextStyle, textStyle];
  };

  const getShadowStyle = () => {
    if (disabled) return {};
    
    return Platform.select({
      ios: shadows.button,
      android: { 
        shadowColor: shadows.button.shadowColor,
        shadowOffset: shadows.button.shadowOffset,
        shadowOpacity: shadows.button.shadowOpacity,
        shadowRadius: shadows.button.shadowRadius,
        elevation: shadows.button.elevation 
      },
    });
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        getShadowStyle(),
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && (
        <Text style={[getTextStyle(), styles.iconMargin]}>
          {icon}
        </Text>
      )}
      <Text style={getTextStyle()}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  iconMargin: {
    marginRight: spacing.sm,
  },
});
