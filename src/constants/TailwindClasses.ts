// Tailwind CSS 클래스들을 React Native에서 사용할 수 있는 객체로 정의
// 새로운 디자인 시스템 기반
export const TailwindClasses = {
  // 배경색
  backgrounds: {
    'bg-background': 'bg-background',
    'bg-foreground': 'bg-foreground',
    'bg-card': 'bg-card',
    'bg-primary': 'bg-primary',
    'bg-secondary': 'bg-secondary',
    'bg-muted': 'bg-muted',
    'bg-accent': 'bg-accent',
    'bg-destructive': 'bg-destructive',
    'bg-border': 'bg-border',
    'bg-input': 'bg-input',
    
    // Pausemo 색상 (새로운 디자인 시스템)
    'bg-pause-blue': 'bg-pause-blue',           // #2563EB
    'bg-confirm-teal': 'bg-confirm-teal',       // #0891B2
    'bg-decline-gray': 'bg-decline-gray',       // #64748B
    'bg-pattern-detect': 'bg-pattern-detect',   // #DC2626
    'bg-growth-signal': 'bg-growth-signal',     // #059669
    'bg-neutral-state': 'bg-neutral-state',     // #94A3B8
    
    // Surface 시스템 (새로운 디자인 시스템)
    'bg-surface-0': 'bg-surface-0',             // #FFFFFF
    'bg-surface-1': 'bg-surface-1',             // #FAFAFA
    'bg-surface-2': 'bg-surface-2',             // #F4F4F5
    'bg-surface-3': 'bg-surface-3',             // #E4E4E7
  },

  // 텍스트 색상 (새로운 디자인 시스템)
  textColors: {
    'text-foreground': 'text-foreground',
    'text-primary': 'text-primary',
    'text-secondary': 'text-secondary',
    'text-muted': 'text-muted',
    'text-accent': 'text-accent',
    'text-destructive': 'text-destructive',
    'text-border': 'text-border',
    'text-input': 'text-input',
    'text-ring': 'text-ring',
    
    // Pausemo 텍스트 (새로운 디자인 시스템)
    'text-pause-blue': 'text-pause-blue',           // #2563EB
    'text-confirm-teal': 'text-confirm-teal',       // #0891B2
    'text-decline-gray': 'text-decline-gray',       // #64748B
    'text-pattern-detect': 'text-pattern-detect',   // #DC2626
    'text-growth-signal': 'text-growth-signal',     // #059669
    'text-neutral-state': 'text-neutral-state',     // #94A3B8
    
    // Text Hierarchy (새로운 디자인 시스템)
    'text-text-primary': 'text-text-primary',       // #0F172A
    'text-text-secondary': 'text-text-secondary',   // #475569
    'text-text-muted': 'text-text-muted',           // #94A3B8
    'text-text-emphasis': 'text-text-emphasis',     // #2563EB
  },

  // 테두리 색상
  borderColors: {
    'border-border': 'border-border',
    'border-input': 'border-input',
    'border-ring': 'border-ring',
    'border-primary': 'border-primary',
    'border-secondary': 'border-secondary',
    'border-muted': 'border-muted',
    'border-accent': 'border-accent',
    'border-destructive': 'border-destructive',
    
    // Pausemo 테두리
    'border-pause-blue': 'border-pause-blue',
    'border-confirm-teal': 'border-confirm-teal',
    'border-decline-gray': 'border-decline-gray',
    'border-pattern-detect': 'border-pattern-detect',
    'border-growth-signal': 'border-growth-signal',
    'border-neutral-state': 'border-neutral-state',
    
    // Surface 테두리
    'border-surface-0': 'border-surface-0',
    'border-surface-1': 'border-surface-1',
    'border-surface-2': 'border-surface-2',
    'border-surface-3': 'border-surface-3',
  },

  // 폰트 패밀리 (새로운 디자인 시스템)
  fontFamilies: {
    'font-primary': 'font-primary',           // Inter
    'font-display': 'font-display',           // Manrope
    'font-numeric': 'font-numeric',           // Inter
    'font-kr-primary': 'font-kr-primary',     // Pretendard
    'font-kr-declaration': 'font-kr-declaration', // Pretendard
  },

  // 폰트 크기
  fontSizes: {
    'text-xs': 'text-xs',
    'text-sm': 'text-sm',
    'text-base': 'text-base',
    'text-lg': 'text-lg',
    'text-xl': 'text-xl',
    'text-2xl': 'text-2xl',
    'text-3xl': 'text-3xl',
    'text-4xl': 'text-4xl',
    'text-5xl': 'text-5xl',
    'text-6xl': 'text-6xl',
    'text-7xl': 'text-7xl',
    'text-8xl': 'text-8xl',
    'text-9xl': 'text-9xl',
  },

  // 폰트 굵기
  fontWeights: {
    'font-thin': 'font-thin',
    'font-extralight': 'font-extralight',
    'font-light': 'font-light',
    'font-normal': 'font-normal',
    'font-medium': 'font-medium',
    'font-semibold': 'font-semibold',
    'font-bold': 'font-bold',
    'font-extrabold': 'font-extrabold',
    'font-black': 'font-black',
  },

  // 간격 (Padding, Margin)
  spacing: {
    'p-xs': 'p-1',
    'p-sm': 'p-2',
    'p-md': 'p-4',
    'p-lg': 'p-6',
    'p-xl': 'p-8',
    'p-2xl': 'p-12',
    'p-3xl': 'p-16',
    
    'px-xs': 'px-1',
    'px-sm': 'px-2',
    'px-md': 'px-4',
    'px-lg': 'px-6',
    'px-xl': 'px-8',
    'px-2xl': 'px-12',
    'px-3xl': 'px-16',
    
    'py-xs': 'py-1',
    'py-sm': 'py-2',
    'py-md': 'py-4',
    'py-lg': 'py-6',
    'py-xl': 'py-8',
    'py-2xl': 'py-12',
    'py-3xl': 'py-16',
    
    'm-xs': 'm-1',
    'm-sm': 'm-2',
    'm-md': 'm-4',
    'm-lg': 'm-6',
    'm-xl': 'm-8',
    'm-2xl': 'm-12',
    'm-3xl': 'm-16',
    
    'mx-xs': 'mx-1',
    'mx-sm': 'mx-2',
    'mx-md': 'mx-4',
    'mx-lg': 'mx-6',
    'mx-xl': 'mx-8',
    'mx-2xl': 'mx-12',
    'mx-3xl': 'mx-16',
    
    'my-xs': 'my-1',
    'my-sm': 'my-2',
    'my-md': 'my-4',
    'my-lg': 'my-6',
    'my-xl': 'my-8',
    'my-2xl': 'my-12',
    'my-3xl': 'my-16',
  },

  // 테두리 반경
  borderRadius: {
    'rounded-sm': 'rounded-sm',
    'rounded-md': 'rounded-md',
    'rounded-lg': 'rounded-lg',
    'rounded-xl': 'rounded-xl',
    'rounded-2xl': 'rounded-2xl',
    'rounded-3xl': 'rounded-3xl',
    'rounded-4xl': 'rounded-4xl',
    'rounded-5xl': 'rounded-5xl',
    'rounded-full': 'rounded-full',
  },

  // 그림자
  shadows: {
    'shadow-sm': 'shadow-sm',
    'shadow-md': 'shadow-md',
    'shadow-lg': 'shadow-lg',
    'shadow-xl': 'shadow-xl',
    'shadow-pattern': 'shadow-pattern',
  },

  // 애니메이션
  animations: {
    'animate-gentle-fade-in': 'animate-gentle-fade-in',
    'animate-premium-pulse': 'animate-premium-pulse',
    'animate-floating': 'animate-floating',
    'animate-shimmer': 'animate-shimmer',
  },

  // 전환 효과
  transitions: {
    'transition-instant': 'transition-instant',
    'transition-fast': 'transition-fast',
    'transition-normal': 'transition-normal',
    'transition-slow': 'transition-slow',
    'transition-dramatic': 'transition-dramatic',
    
    'ease-medical': 'ease-medical',
    'ease-gentle': 'ease-gentle',
    'ease-premium': 'ease-premium',
  },

  // 레이아웃
  layout: {
    'flex': 'flex',
    'flex-1': 'flex-1',
    'flex-row': 'flex-row',
    'flex-col': 'flex-col',
    'items-center': 'items-center',
    'items-start': 'items-start',
    'items-end': 'items-end',
    'justify-center': 'justify-center',
    'justify-start': 'justify-start',
    'justify-end': 'justify-end',
    'justify-between': 'justify-between',
    'justify-around': 'justify-around',
    'justify-evenly': 'justify-evenly',
  },

  // 위치
  positioning: {
    'absolute': 'absolute',
    'relative': 'relative',
    'top-0': 'top-0',
    'bottom-0': 'bottom-0',
    'left-0': 'left-0',
    'right-0': 'right-0',
    'inset-0': 'inset-0',
  },

  // 크기
  sizing: {
    'w-full': 'w-full',
    'w-screen': 'w-screen',
    'h-full': 'h-full',
    'h-screen': 'h-screen',
    'min-h-screen': 'min-h-screen',
    'max-w-full': 'max-w-full',
    'max-h-full': 'max-h-full',
  },

  // 오버플로우
  overflow: {
    'overflow-hidden': 'overflow-hidden',
    'overflow-scroll': 'overflow-scroll',
    'overflow-auto': 'overflow-auto',
  },

  // Z-인덱스
  zIndex: {
    'z-0': 'z-0',
    'z-10': 'z-10',
    'z-20': 'z-20',
    'z-30': 'z-30',
    'z-40': 'z-40',
    'z-50': 'z-50',
  },
};

// 컴포넌트별 미리 정의된 클래스 조합 (새로운 디자인 시스템)
export const ComponentClasses = {
  // Y/N 버튼 - 새로운 디자인 시스템
  choiceButton: {
    base: 'bg-surface-1 border border-surface-3 text-text-secondary font-primary font-semibold text-lg min-h-[56px] rounded-xl px-6 py-4 shadow-sm',
    yes: 'border-confirm-teal text-confirm-teal',
    no: 'border-decline-gray text-decline-gray',
  },

  // 3초 카운트다운 - 새로운 디자인 시스템
  pauseCountdown: 'text-7xl font-numeric font-extralight text-pause-blue text-center p-6 rounded-3xl bg-white/95 shadow-xl',

  // 선언문 - 새로운 디자인 시스템
  declarationText: 'text-2xl font-kr-declaration font-medium text-text-primary text-center leading-[40px] tracking-[-0.11px]',

  // 개입 카드 - 새로운 디자인 시스템
  interventionCard: 'bg-surface-0 rounded-2xl p-8 border-0 shadow-xl',

  // 패턴 알림 - 새로운 디자인 시스템
  patternAlert: 'bg-surface-0 border-l-3 border-l-pattern-detect shadow-pattern rounded-xl p-4',

  // 능력치 카드 - 새로운 디자인 시스템
  statsCard: 'bg-surface-0 rounded-2xl p-6 border border-surface-3 shadow-sm',

  // 통계 숫자 - 새로운 디자인 시스템
  statNumber: 'font-numeric font-semibold text-pause-blue text-2xl',
  statLabel: 'text-xs text-text-muted font-medium uppercase tracking-wider mt-1',
};

// 유틸리티 함수
export const combineClasses = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const getComponentClass = (component: keyof typeof ComponentClasses, variant?: string): string => {
  const baseClass = ComponentClasses[component];
  if (typeof baseClass === 'string') {
    return baseClass;
  }
  
  if (variant && baseClass[variant as keyof typeof baseClass]) {
    return combineClasses(baseClass.base, baseClass[variant as keyof typeof baseClass]);
  }
  
  return baseClass.base || '';
};
