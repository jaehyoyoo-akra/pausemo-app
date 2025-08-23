/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./contexts/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 기본 시스템 색상
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        'input-background': 'var(--input-background)',
        ring: 'var(--ring)',
        
        // Pausemo 정제된 색상 시스템
        'pause-blue': 'var(--pause-blue)',
        'confirm-teal': 'var(--confirm-teal)',
        'decline-gray': 'var(--decline-gray)',
        'pattern-detect': 'var(--pattern-detect)',
        'growth-signal': 'var(--growth-signal)',
        'neutral-state': 'var(--neutral-state)',
        
        // Surface 시스템
        'surface-0': 'var(--surface-0)',
        'surface-1': 'var(--surface-1)',
        'surface-2': 'var(--surface-2)',
        'surface-3': 'var(--surface-3)',
        
        // Text Hierarchy
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'text-emphasis': 'var(--text-emphasis)',
      },
      fontFamily: {
        'primary': ['var(--font-primary)', 'system-ui', 'sans-serif'],
        'display': ['var(--font-display)', 'system-ui', 'sans-serif'],
        'numeric': ['var(--font-numeric)', 'monospace'],
        'kr-primary': ['var(--font-kr-primary)', 'system-ui', 'sans-serif'],
        'kr-declaration': ['var(--font-kr-declaration)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'pattern': 'var(--shadow-pattern)',
        
        // 프리미엄 그림자 스타일
        'card-float': '0 20px 64px rgba(59, 130, 246, 0.08), 0 8px 32px rgba(71, 85, 105, 0.04)',
        'button-elevation': '0 4px 12px rgba(59, 130, 246, 0.2)',
        'icon-glow': '0 0 40px rgba(59, 130, 246, 0.2)',
        'subtle-glow': '0 0 20px rgba(34, 211, 238, 0.1)',
      },
      transitionDuration: {
        'instant': 'var(--timing-instant)',
        'fast': 'var(--timing-fast)',
        'normal': 'var(--timing-normal)',
        'slow': 'var(--timing-slow)',
        'dramatic': 'var(--timing-dramatic)',
      },
      transitionTimingFunction: {
        'medical': 'var(--ease-medical)',
        'gentle': 'var(--ease-gentle)',
        'premium': 'var(--ease-premium)',
      },
      animation: {
        'gentle-fade-in': 'gentle-fade-in var(--timing-dramatic) var(--ease-premium)',
        'premium-pulse': 'premium-pulse 2s var(--ease-premium) infinite',
        'floating': 'floating 3s var(--ease-gentle) ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        
        // 맥동 및 글로우 애니메이션
        'breathe': 'breathe 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'scale-in': 'scale-in 0.3s ease-out',
      },
      keyframes: {
        'gentle-fade-in': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(12px) scale(0.98)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0) scale(1)'
          }
        },
        'premium-pulse': {
          '0%, 100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.9',
            transform: 'scale(1.02)'
          }
        },
        'floating': {
          '0%, 100%': { 
            transform: 'translateY(0px)'
          },
          '50%': { 
            transform: 'translateY(-4px)'
          }
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        
        // 맥동 애니메이션 (호흡/심장 박동 느낌)
        'breathe': {
          '0%, 100%': { 
            transform: 'scale(1)',
            opacity: '1'
          },
          '50%': { 
            transform: 'scale(1.05)',
            opacity: '0.9'
          }
        },
        
        // 글로우 효과
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)'
          }
        },
        
        // 스케일 인 애니메이션
        'scale-in': {
          '0%': { 
            transform: 'scale(0.9)',
            opacity: '0'
          },
          '100%': { 
            transform: 'scale(1)',
            opacity: '1'
          }
        }
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
    },
  },
  plugins: [],
}

