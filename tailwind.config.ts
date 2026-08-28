import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F5F8FB',
        surface: '#FFFFFF',
        navy: {
          DEFAULT: '#0A1424',
          950: '#060C16',
          900: '#0A1424',
          800: '#101F36',
          700: '#16283F',
        },
        ink: {
          DEFAULT: '#0F1D33',
          muted: '#5B6B80',
          faint: '#8A96A8',
        },
        line: {
          DEFAULT: '#E4EAF1',
          strong: '#D2DBE6',
          dark: 'rgba(255,255,255,0.12)',
        },
        onDark: {
          DEFAULT: '#EAF1FB',
          muted: '#90A4BE',
          faint: '#5C7191',
        },
        accent: {
          cyan: '#34E1EA',
          blue: '#2F6FED',
          light: '#4FC3F7',
          soft: '#EAF2FF',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"',
          'system-ui', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif',
        ],
        display: [
          'var(--font-sora)', 'var(--font-inter)', '-apple-system', 'system-ui', 'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display-lg': ['clamp(2.75rem, 5vw, 4.75rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2.25rem, 3.6vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.75rem, 2.4vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        content: '1240px',
      },
      backgroundImage: {
        'gradient-cta': 'linear-gradient(135deg, #2F6FED 0%, #4FC3F7 100%)',
        'gradient-band': 'linear-gradient(115deg, #0B1E3D 0%, #123655 55%, #1A6E7A 100%)',
        'gradient-mark': 'linear-gradient(135deg, #34E1EA 0%, #2F6FED 100%)',
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
