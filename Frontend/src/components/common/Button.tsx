import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyleCombined = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.textInverse : colors.primary}
        />
      ) : (
        <>
          {icon}
          <Text style={textStyleCombined}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing.buttonRadius,
    paddingHorizontal: spacing.md,
  },

  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // Sizes
  small: {
    height: 36,
    paddingHorizontal: spacing.sm,
  },
  medium: {
    height: spacing.buttonHeight,
  },
  large: {
    height: 56,
    paddingHorizontal: spacing.lg,
  },

  // States
  disabled: {
    opacity: 0.5,
  },

  // Text styles
  text: {
    textAlign: 'center',
  },
  primaryText: {
    color: colors.textInverse,
    ...typography.buttonMedium,
  },
  secondaryText: {
    color: colors.textInverse,
    ...typography.buttonMedium,
  },
  outlineText: {
    color: colors.primary,
    ...typography.buttonMedium,
  },
  ghostText: {
    color: colors.primary,
    ...typography.buttonMedium,
  },

  // Size text
  smallText: {
    ...typography.buttonSmall,
  },
  mediumText: {
    ...typography.buttonMedium,
  },
  largeText: {
    ...typography.buttonLarge,
  },

  disabledText: {
    opacity: 0.7,
  },
});

