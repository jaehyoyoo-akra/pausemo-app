import { Platform } from 'react-native';
import { colors, darkColors, typography, shadows, spacing, borderRadius, animations } from './Colors';

// Pausemo 테마 시스템 - 새로운 디자인 시스템 적용
export const Theme = {
  // 기본 시스템 색상 (새로운 디자인 시스템 기반)
  colors: {
    background: colors.surface[0],
    foreground: colors.text.primary,
    card: colors.surface[0],
    cardForeground: colors.text.primary,
    popover: colors.surface[0],
    popoverForeground: colors.text.primary,
    primary: colors.primary[500],
    primaryForeground: colors.text.inverse,
    secondary: colors.surface[2],
    secondaryForeground: colors.text.secondary,
    muted: colors.surface[1],
    mutedForeground: colors.text.muted,
    accent: colors.surface[2],
    accentForeground: colors.text.primary,
    destructive: colors.semantic.error,
    destructiveForeground: colors.text.inverse,
    border: colors.border.light,
    input: colors.surface[2],
    inputBackground: colors.surface[2],
    ring: colors.primary[500],
    
    // Pausemo 정제된 색상 시스템 - 새로운 디자인 시스템
    pauseBlue: colors.primary[500],           // #2563EB
    confirmTeal: colors.semantic.info,        // #0891B2
    declineGray: colors.semantic.neutral,     // #64748B
    patternDetect: colors.semantic.error,     // #DC2626
    growthSignal: colors.semantic.success,    // #059669
    neutralState: colors.text.muted,          // #94A3B8
    
    // 그라데이션 백그라운드 색상
    gradientPrimary: `rgba(37, 99, 235, 0.05)`,    // primary[500]
    gradientSecondary: `rgba(8, 145, 178, 0.05)`,  // semantic.info
    
    // 글로우 효과 색상
    glowBlue: `rgba(37, 99, 235, 0.2)`,            // primary[500]
    glowCyan: `rgba(8, 145, 178, 0.2)`,            // semantic.info
    glowShadow: `rgba(71, 85, 105, 0.04)`,         // text.muted
    
    // Background System - 깊이감
    surface0: colors.surface[0],       // #FFFFFF
    surface1: colors.surface[1],       // #FAFAFA
    surface2: colors.surface[2],       // #F4F4F5
    surface3: colors.surface[3],       // #E4E4E7
    
    // Text Hierarchy - 명확한 위계
    textPrimary: colors.text.primary,    // #0F172A
    textSecondary: colors.text.secondary, // #475569
    textMuted: colors.text.muted,        // #94A3B8
    textEmphasis: colors.text.emphasis,  // #2563EB
  },

  // 다크 모드 색상 (새로운 디자인 시스템 기반)
  dark: {
    background: darkColors.surface[0],
    foreground: darkColors.text.primary,
    card: darkColors.surface[1],
    cardForeground: darkColors.text.primary,
    popover: darkColors.surface[1],
    popoverForeground: darkColors.text.primary,
    primary: colors.primary[400],
    primaryForeground: darkColors.text.inverse,
    secondary: darkColors.surface[2],
    secondaryForeground: darkColors.text.secondary,
    muted: darkColors.surface[1],
    mutedForeground: darkColors.text.muted,
    accent: darkColors.surface[2],
    accentForeground: darkColors.text.primary,
    destructive: colors.semantic.error,
    destructiveForeground: darkColors.text.inverse,
    border: darkColors.surface[3],
    input: darkColors.surface[1],
    ring: colors.primary[400],
    
    // 다크 모드 Surface
    surface0: darkColors.surface[0],
    surface1: darkColors.surface[1],
    surface2: darkColors.surface[2],
    surface3: darkColors.surface[3],
    
    // 다크 모드 Text
    textPrimary: darkColors.text.primary,
    textSecondary: darkColors.text.secondary,
    textMuted: darkColors.text.muted,
    textEmphasis: darkColors.text.emphasis,
  },

  // 폰트 시스템 (새로운 디자인 시스템 기반)
  fonts: {
    primary: Platform.select({
      ios: typography.fonts.primary,
      android: typography.fonts.primary,
      default: 'System',
    }),
    display: Platform.select({
      ios: typography.fonts.display,
      android: typography.fonts.display, 
      default: 'System',
    }),
    numeric: Platform.select({
      ios: typography.fonts.numeric,
      android: typography.fonts.numeric,
      default: 'Monaco',
    }),
    krPrimary: Platform.select({
      ios: typography.fonts.korean,
      android: typography.fonts.korean,
      default: 'System',
    }),
    krDeclaration: Platform.select({
      ios: typography.fonts.korean,
      android: typography.fonts.korean,
      default: 'System',
    }),
  },

  // 프리미엄 타이포그래피 스케일 (새로운 디자인 시스템 기반)
  typography: {
    h1: {
      fontSize: typography.sizes['4xl'],
      fontWeight: typography.weights.semibold,
      lineHeight: typography.sizes['4xl'] * typography.lineHeights.tight,
      letterSpacing: typography.letterSpacing.tight,
    },
    h2: {
      fontSize: typography.sizes['2xl'],
      fontWeight: typography.weights.semibold,
      lineHeight: typography.sizes['2xl'] * typography.lineHeights.snug,
      letterSpacing: typography.letterSpacing.tight,
    },
    h3: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.semibold,
      lineHeight: typography.sizes.xl * typography.lineHeights.normal,
    },
    body: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.medium,
      lineHeight: typography.sizes.base * typography.lineHeights.normal,
    },
    bodySecondary: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.normal,
      lineHeight: typography.sizes.sm * typography.lineHeights.normal,
      color: colors.text.secondary,
    },
    caption: {
      fontSize: typography.sizes.sm,
      lineHeight: typography.sizes.sm * typography.lineHeights.normal,
    },
    small: {
      fontSize: typography.sizes.xs,
      lineHeight: typography.sizes.xs * typography.lineHeights.tight,
    },
    emphasis: {
      fontSize: typography.sizes.base,
      fontWeight: typography.weights.semibold,
      lineHeight: typography.sizes.base * typography.lineHeights.normal,
      color: colors.primary[500],
    },
  },

  // 간격 시스템 (새로운 디자인 시스템 기반)
  spacing: spacing,

  // 테두리 반경 (새로운 디자인 시스템 기반)
  borderRadius: borderRadius,

  // 프리미엄 그림자 시스템 (새로운 디자인 시스템 기반)
  shadows: {
    sm: Platform.select({
      ios: shadows.sm,
      android: { 
        shadowColor: shadows.sm.shadowColor,
        shadowOffset: shadows.sm.shadowOffset,
        shadowOpacity: shadows.sm.shadowOpacity,
        shadowRadius: shadows.sm.shadowRadius,
        elevation: shadows.sm.elevation 
      },
    }),
    
    // 카드용 깊이감 그림자 (푸른빛 큰 그림자 + 회색 작은 그림자)
    cardFloat: Platform.select({
      ios: {
        shadowColor: colors.primary[500],
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.08,
        shadowRadius: 64,
      },
      android: {
        shadowColor: colors.primary[500],
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.08,
        shadowRadius: 64,
        elevation: 8,
      },
    }),
    
    // 버튼 강조 그림자
    buttonElevation: Platform.select({
      ios: {
        shadowColor: colors.primary[500],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: {
        shadowColor: colors.primary[500],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 6,
      },
    }),
    
    // 아이콘 글로우 효과
    iconGlow: Platform.select({
      ios: {
        shadowColor: colors.primary[500],
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 40,
      },
      android: {
        shadowColor: colors.primary[500],
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 40,
        elevation: 10,
      },
    }),
    
    md: Platform.select({
      ios: shadows.md,
      android: { 
        shadowColor: shadows.md.shadowColor,
        shadowOffset: shadows.md.shadowOffset,
        shadowOpacity: shadows.md.shadowOpacity,
        shadowRadius: shadows.md.shadowRadius,
        elevation: shadows.md.elevation 
      },
    }),
    lg: Platform.select({
      ios: shadows.lg,
      android: { 
        shadowColor: shadows.lg.shadowColor,
        shadowOffset: shadows.lg.shadowOffset,
        shadowOpacity: shadows.lg.shadowOpacity,
        shadowRadius: shadows.lg.shadowRadius,
        elevation: shadows.lg.elevation 
      },
    }),
    xl: Platform.select({
      ios: shadows.xl,
      android: { 
        shadowColor: shadows.xl.shadowColor,
        shadowOffset: shadows.xl.shadowOffset,
        shadowOpacity: shadows.xl.shadowOpacity,
        shadowRadius: shadows.xl.shadowRadius,
        elevation: shadows.xl.elevation 
      },
    }),
    pattern: Platform.select({
      ios: shadows.pattern,
      android: { 
        shadowColor: shadows.pattern.shadowColor,
        shadowOffset: shadows.pattern.shadowOffset,
        shadowOpacity: shadows.pattern.shadowOpacity,
        shadowRadius: shadows.pattern.shadowRadius,
        elevation: shadows.pattern.elevation 
      },
    }),
  },

  // 애니메이션 타이밍 (새로운 디자인 시스템 기반)
  timing: animations.timing,

  // 컴포넌트별 스타일
  components: {
    // Y/N 버튼 - 프리미엄 의료기기 느낌
    choiceButton: {
      backgroundColor: colors.surface[1],
      borderWidth: 1.5,
      borderColor: colors.surface[3],
      minHeight: 56,
      borderRadius: 14,
      paddingHorizontal: spacing[6],
      paddingVertical: spacing[4],
      ...Platform.select({
        ios: shadows.sm,
        android: { 
          shadowColor: shadows.sm.shadowColor,
          shadowOffset: shadows.sm.shadowOffset,
          shadowOpacity: shadows.sm.shadowOpacity,
          shadowRadius: shadows.sm.shadowRadius,
          elevation: shadows.sm.elevation 
        },
      }),
    },
    
    // 3초 카운트다운 - 프리미엄 정밀도
    pauseCountdown: {
      fontSize: 72,
      fontWeight: '200',
      color: colors.primary[500],
      textAlign: 'center',
      padding: spacing[6],
      borderRadius: borderRadius['2xl'],
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      ...Platform.select({
        ios: shadows.xl,
        android: { 
          shadowColor: shadows.xl.shadowColor,
          shadowOffset: shadows.xl.shadowOffset,
          shadowOpacity: shadows.xl.shadowOpacity,
          shadowRadius: shadows.xl.shadowRadius,
          elevation: shadows.xl.elevation 
        },
      }),
    },
    
    // 선언문 - 더욱 아름다운 타이포그래피
    declarationText: {
      fontSize: 22,
      lineHeight: 40,
      fontWeight: '500',
      textAlign: 'center',
      letterSpacing: -0.11,
      color: colors.text.primary,
    },
    
    // 개입 카드 - 프리미엄 깊이감 (새로운 디자인 시스템)
    interventionCard: {
      backgroundColor: colors.surface[0],
      borderRadius: borderRadius['2xl'],            // rounded-2xl
      padding: spacing[8],                         // p-8
      borderWidth: 0,                              // 테두리 제거
      borderColor: 'transparent',
      ...Platform.select({
        ios: {
          // 메인 카드 그림자: 푸른빛 큰 그림자 + 회색 작은 그림자
          shadowColor: colors.primary[500],
          shadowOffset: { width: 0, height: 20 },
          shadowOpacity: 0.08,
          shadowRadius: 64,
        },
        android: {
          shadowColor: colors.primary[500],
          shadowOffset: { width: 0, height: 20 },
          shadowOpacity: 0.08,
          shadowRadius: 64,
          elevation: 12,
        },
      }),
    },
    
    // 배경 그라데이션 카드
    gradientCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: borderRadius['2xl'],
      padding: spacing[8],
      borderWidth: 0,
      ...Platform.select({
        ios: {
          shadowColor: colors.text.muted,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.04,
          shadowRadius: 32,
        },
        android: {
          shadowColor: colors.text.muted,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.04,
          shadowRadius: 32,
          elevation: 8,
        },
      }),
    },
    
    // 패턴 알림 - 더욱 세련된 스타일
    patternAlert: {
      backgroundColor: colors.surface[0],
      borderLeftWidth: 3,
      borderLeftColor: colors.semantic.error,
      borderRadius: borderRadius.md,
      padding: 18,
      ...Platform.select({
        ios: shadows.pattern,
        android: { 
          shadowColor: shadows.pattern.shadowColor,
          shadowOffset: shadows.pattern.shadowOffset,
          shadowOpacity: shadows.pattern.shadowOpacity,
          shadowRadius: shadows.pattern.shadowRadius,
          elevation: shadows.pattern.elevation 
        },
      }),
    },
    
    // 능력치 카드 - Apple 스타일
    statsCard: {
      backgroundColor: colors.surface[0],
      borderRadius: borderRadius.lg,
      padding: spacing[6],
      borderWidth: 1,
      borderColor: colors.surface[3],
      ...Platform.select({
        ios: shadows.sm,
        android: { 
          shadowColor: shadows.sm.shadowColor,
          shadowOffset: shadows.sm.shadowOffset,
          shadowOpacity: shadows.sm.shadowOpacity,
          shadowRadius: shadows.sm.shadowRadius,
          elevation: shadows.sm.elevation 
        },
      }),
    },
  },
};

// 유틸리티 함수
export const getThemeColor = (colorKey: keyof typeof Theme.colors, isDark = false) => {
  if (isDark && Theme.dark[colorKey as keyof typeof Theme.dark]) {
    return Theme.dark[colorKey as keyof typeof Theme.dark];
  }
  return Theme.colors[colorKey];
};

export const getComponentStyle = (componentKey: keyof typeof Theme.components) => {
  return Theme.components[componentKey];
};
