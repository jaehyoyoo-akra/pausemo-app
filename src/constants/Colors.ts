/**
 * Pausemo 디자인 시스템 - 의학적 정확성과 프리미엄 감성
 * 절제된 강조, 깊이감 있는 레이어링, 명확한 위계
 */

export const colors = {
  // Primary Colors - 절제된 강조
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE', 
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#2563EB', // pause-blue (메인)
    600: '#1D4ED8',
    700: '#1E40AF',
    800: '#1E3A8A',
    900: '#1E3A8A',
  },
  
  // Semantic Colors - 의학적 정확성
  semantic: {
    success: '#059669',    // growth-signal
    warning: '#D97706',
    error: '#DC2626',      // pattern-detect
    info: '#0891B2',       // confirm-teal
    neutral: '#64748B',    // decline-gray
  },
  
  // Surface System - 깊이감 있는 레이어링
  surface: {
    0: '#FFFFFF',          // 순백
    1: '#FAFAFA',          // 미세한 회색
    2: '#F4F4F5',          // 카드 배경
    3: '#E4E4E7',          // 구분선
    4: '#D4D4D8',          // 강한 구분선
  },
  
  // Text Hierarchy - 명확한 위계
  text: {
    primary: '#0F172A',    // 거의 검정 (95% 불투명)
    secondary: '#475569',  // 중간 회색 (70% 불투명)
    muted: '#94A3B8',      // 연한 회색 (50% 불투명)
    emphasis: '#2563EB',   // 강조 블루
    inverse: '#FFFFFF',    // 흰색 텍스트
  },
  
  // Border System
  border: {
    light: '#E2E8F0',
    medium: '#CBD5E1',
    strong: '#94A3B8',
  }
};

// 다크 모드 색상
export const darkColors = {
  surface: {
    0: '#09090B',
    1: '#18181B', 
    2: '#27272A',
    3: '#3F3F46',
    4: '#52525B',
  },
  text: {
    primary: '#FAFAFA',
    secondary: '#A1A1AA',
    muted: '#71717A',
    emphasis: '#60A5FA',
    inverse: '#0F172A',
  }
};

// Pausemo 전용 색상 (기존 호환성 유지)
export const PausemoColors = {
  primary: colors.primary[500],      // #2563EB
  secondary: colors.semantic.info,   // #0891B2
  background: darkColors.surface[0], // #09090B
  surface: darkColors.surface[1],    // #18181B
  awakening: '#f59e0b',              // 앰버 (깨어남)
  emerging: colors.semantic.success, // #059669 (성장)
  mastering: colors.primary[500],    // #2563EB (숙련)
  harmonizing: '#8b5cf6',            // 바이올렛 (조화)
  text: darkColors.text.primary,     // #FAFAFA
  textSecondary: darkColors.text.secondary, // #A1A1AA
  accent: colors.semantic.info,      // #0891B2
};

// 기존 호환성을 위한 Colors 객체
export const Colors = {
  light: {
    text: colors.text.primary,
    background: colors.surface[0],
    tint: colors.primary[500],
    icon: colors.text.secondary,
    tabIconDefault: colors.text.muted,
    tabIconSelected: colors.primary[500],
  },
  dark: {
    text: darkColors.text.primary,
    background: darkColors.surface[0],
    tint: darkColors.text.primary,
    icon: darkColors.text.secondary,
    tabIconDefault: darkColors.text.muted,
    tabIconSelected: darkColors.text.emphasis,
  },
};

// 새로운 디자인 시스템 추가 상수
export const typography = {
  // Font Families
  fonts: {
    primary: 'Inter',
    display: 'Manrope', 
    numeric: 'Inter',
    korean: 'Pretendard',
  },
  
  // Font Sizes - 의료기기 정밀도
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  
  // Font Weights
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Line Heights
  lineHeights: {
    tight: 1.2,
    snug: 1.3,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
  
  // Letter Spacing
  letterSpacing: {
    tighter: -0.025,
    tight: -0.02,
    normal: 0,
    wide: 0.025,
    wider: 0.05,
  }
};

export const shadows = {
  // React Native용 그림자 (iOS/Android 호환)
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1, // Android
  },
  md: {
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 6,
  },
  xl: {
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 12,
  },
  // 특별한 그림자
  pattern: {
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 8,
  },
  // 추가 그림자들
  premium: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.12,
    shadowRadius: 80,
    elevation: 16,
  },
  glow: {
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 10,
  },
  button: {
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  success: {
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.12,
    shadowRadius: 80,
    elevation: 16,
  },
  purple: {
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  // 숫자 키 추가 (TypeScript 호환성)
  2: 8,
  3: 16,
  4: 16,
  6: 24,
  8: 32,
};

export const borderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

export const animations = {
  // Timing - 200ms 이내 모든 반응
  timing: {
    instant: 0,
    fast: 150,
    normal: 200,
    slow: 300,
    dramatic: 800,
  },
  
  // Easing - 의료기기 정밀함
  easing: {
    medical: 'cubic-bezier(0.4, 0, 0.2, 1)',
    gentle: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    premium: 'cubic-bezier(0.23, 1, 0.32, 1)',
  },
  
  // Scale transforms
  scale: {
    hover: 1.02,
    active: 0.98,
    press: 0.95,
  },
  
  // Translation transforms
  translate: {
    hover: -2,
    active: 0,
  }
};

export const componentStyles = {
  // 카드 스타일
  card: {
    base: {
      backgroundColor: colors.surface[0],
      borderRadius: borderRadius.xl,
      borderWidth: 1,
      borderColor: colors.surface[3],
      ...shadows.sm,
    },
    elevated: {
      ...shadows.md,
      transform: [{ translateY: -2 }],
    },
    pressed: {
      transform: [{ scale: 0.99 }],
    }
  },
  
  // 버튼 스타일
  button: {
    base: {
      borderRadius: borderRadius.lg,
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[2],
      alignItems: 'center',
      justifyContent: 'center',
    },
    primary: {
      backgroundColor: colors.primary[500],
    },
    secondary: {
      backgroundColor: colors.surface[2],
      borderWidth: 1,
      borderColor: colors.surface[3],
    },
    choice: {
      minHeight: 56,
      borderRadius: 14,
      borderWidth: 1.5,
      paddingHorizontal: spacing[6],
      paddingVertical: spacing[3],
    }
  },
  
  // 입력 필드 스타일
  input: {
    base: {
      backgroundColor: colors.surface[2],
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: colors.border.light,
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[2],
    },
    focused: {
      borderColor: colors.primary[500],
      borderWidth: 2,
    }
  }
};

// 페이지별 배경색 시스템
export const pageBackgrounds = {
  // A0. 스플래시 화면
  splash: {
    background: colors.surface[0], // #FFFFFF (라이트) / #09090B (다크)
    accent1: colors.primary[300],  // #93C5FD (파티클)
    accent2: colors.primary[400],  // #60A5FA (링)
    accent3: colors.text.muted,    // #94A3B8 (라이트) / #71717A (다크)
  },
  
  // A1. 루프의 존재 인식
  intro1: {
    startColor: colors.primary[500],    // #2563EB
    endColor: colors.semantic.info,     // #0891B2
    cardBackground: colors.surface[1],  // #FAFAFA (라이트) / #18181B (다크)
    bulletPoint: colors.primary[500],   // #2563EB
    textColor: colors.text.secondary,   // #475569 (라이트) / #A1A1AA (다크)
  },
  
  // A2. 3초 멈춤의 힘
  intro2: {
    startColor: colors.semantic.info,   // #0891B2
    endColor: colors.primary[500],      // #2563EB
    cardBackground: colors.surface[2],  // #F4F4F5 (라이트) / #27272A (다크)
    accentBorder: colors.semantic.info, // #0891B2
    textColor: colors.text.primary,     // #0F172A (라이트) / #FAFAFA (다크)
  },
  
  // A3. 반복이 곧 나선
  intro3: {
    startColor: colors.semantic.success, // #059669
    endColor: colors.primary[500],       // #2563EB
    cardBackground: colors.surface[1],   // #FAFAFA (라이트) / #18181B (다크)
    bulletPoint: colors.semantic.success, // #059669
    textColor: colors.text.secondary,    // #475569 (라이트) / #A1A1AA (다크)
  },
  
  // A4. 능력치 소개
  intro4: {
    startColor: colors.primary[500],     // #2563EB
    endColor: colors.semantic.success,   // #059669
    cardBackground: colors.surface[0],   // #FFFFFF (라이트) / #09090B (다크)
    statColors: {
      primary: colors.primary[500],      // #2563EB
      secondary: colors.semantic.info,   // #0891B2
      success: colors.semantic.success,  // #059669
    }
  }
};
