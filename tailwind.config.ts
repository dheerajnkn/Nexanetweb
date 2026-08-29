import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#EEF5FA',
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#0A1D35',
          muted: '#5F7692',
          faint: '#98ACC0',
        },
        line: {
          DEFAULT: '#D6E3ED',
          strong: '#B8CCDF',
        },
        signal: {
          DEFAULT: '#20BCE6',
          ink: '#1485C8',
          soft: '#E2F8FD',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'system-ui',
          'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display-lg': ['clamp(2.9rem, 5.4vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.045em' }],
        'display-md': ['clamp(2.25rem, 3.6vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(1.8rem, 2.5vw, 2.35rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        content: '1200px',
      },
      transitionTimingFunction: {
        precise: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}

export default config
