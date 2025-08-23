import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { colors, spacing } from '../constants/Colors';

interface ScreenLayoutProps {
  children: React.ReactNode;
  variant?: 'default' | 'centered' | 'padded' | 'fullscreen';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'surface' | 'gradient' | 'transparent';
  style?: ViewStyle;
}

export default function ScreenLayout({ 
  children, 
  variant = 'default',
  padding = 'lg',
  background = 'surface',
  style 
}: ScreenLayoutProps) {
  const getLayoutStyle = () => {
    const baseStyle: ViewStyle = {
      flex: 1,
    };

    // 변형별 스타일
    switch (variant) {
      case 'centered':
        baseStyle.justifyContent = 'center';
        baseStyle.alignItems = 'center';
        break;
      case 'padded':
        baseStyle.paddingHorizontal = spacing.xl;
        break;
      case 'fullscreen':
        baseStyle.paddingHorizontal = 0;
        break;
      default:
        baseStyle.paddingHorizontal = spacing.xl;
        break;
    }

    // 패딩별 스타일
    switch (padding) {
      case 'none':
        baseStyle.padding = 0;
        break;
      case 'sm':
        baseStyle.padding = spacing.md;
        break;
      case 'md':
        baseStyle.padding = spacing.lg;
        break;
      case 'lg':
        baseStyle.padding = spacing.xl;
        break;
      case 'xl':
        baseStyle.padding = spacing['2xl'];
        break;
    }

    return baseStyle;
  };

  const getBackgroundStyle = () => {
    switch (background) {
      case 'surface':
        return { backgroundColor: colors.surface[0] };
      case 'transparent':
        return { backgroundColor: 'transparent' };
      default:
        return { backgroundColor: colors.surface[0] };
    }
  };

  return (
    <View style={[
      styles.container,
      getLayoutStyle(),
      getBackgroundStyle(),
      style
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
