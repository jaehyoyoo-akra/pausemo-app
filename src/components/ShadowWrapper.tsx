import React from 'react';
import { ViewStyle } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

interface ShadowWrapperProps {
  children: React.ReactNode;
  variant?: 'default' | 'subtle' | 'medium' | 'strong' | 'glow';
  style?: ViewStyle;
}

export default function ShadowWrapper({ 
  children, 
  variant = 'default',
  style 
}: ShadowWrapperProps) {
  const getShadowProps = () => {
    switch (variant) {
      case 'subtle':
        return {
          distance: 5,
          startColor: "#00000003",
          endColor: "#00000000",
          stretch: true
        };
      case 'medium':
        return {
          distance: 10,
          startColor: "#00000005",
          endColor: "#00000000",
          stretch: true
        };
      case 'strong':
        return {
          distance: 15,
          startColor: "#00000008",
          endColor: "#00000000",
          stretch: true
        };
      case 'glow':
        return {
          distance: 20,
          startColor: "#00000010",
          endColor: "#00000000",
          stretch: true
        };
      default:
        return {
          distance: 10,
          startColor: "#00000005",
          endColor: "#00000000",
          stretch: true
        };
    }
  };

  return (
    <Shadow {...getShadowProps()} style={style}>
      {children}
    </Shadow>
  );
}
