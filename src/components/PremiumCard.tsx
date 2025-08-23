import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../constants/Colors';
import ShadowWrapper from './ShadowWrapper';

interface PremiumCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'success' | 'primary';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function PremiumCard({ 
  children, 
  style, 
  variant = 'default',
  padding = 'lg' 
}: PremiumCardProps) {


  const getPaddingStyle = () => {
    switch (padding) {
      case 'sm': return spacing.md;
      case 'md': return spacing.lg;
      case 'lg': return spacing[8];
      case 'xl': return spacing.xl;
      default: return spacing.lg;
    }
  };

  return (
        <ShadowWrapper variant="medium" style={{ borderRadius: 20 }}>
      <View style={[
        styles.card,
        { padding: getPaddingStyle() },
        { maxWidth: '100%' },
        style
      ]}>
        {children}
      </View>
    </ShadowWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface[0],
    borderRadius: borderRadius['2xl'],
    borderWidth: 0,
    borderColor: 'transparent',
  },
});
