import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { Platform } from 'react-native';
import ShadowWrapper from './ShadowWrapper';
import { colors, shadows, spacing, borderRadius } from '../constants/Colors';

interface IconContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'glow' | 'elevated' | 'success' | 'primary';
  style?: ViewStyle;
}

export default function IconContainer({ 
  children, 
  size = 'md',
  variant = 'default',
  style 
}: IconContainerProps) {
  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return { width: 60, height: 60 };
      case 'md':
        return { width: 80, height: 80 };
      case 'lg':
        return { width: 100, height: 100 };
      case 'xl':
        return { width: 120, height: 120 };
      default:
        return { width: 80, height: 80 };
    }
  };

  const getBorderRadiusStyle = () => {
    switch (size) {
      case 'sm':
        return borderRadius.lg;
      case 'md':
        return borderRadius.xl;
      case 'lg':
        return borderRadius['2xl'];
      case 'xl':
        return borderRadius['3xl'];
      default:
        return borderRadius.xl;
    }
  };





  return (
    <ShadowWrapper variant="medium" style={{ borderRadius: getBorderRadiusStyle() }}>
      <View style={[
        styles.container,
        getSizeStyle(),
        { borderRadius: getBorderRadiusStyle() },
        style
      ]}>
        {children}
      </View>
    </ShadowWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
