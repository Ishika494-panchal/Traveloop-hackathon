/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        traveloop: {
          bg: '#0B0F1A',
          slate: '#384959',
          steel: '#6A89A7',
          ice: '#BDDDFC',
          sky: '#88BDF2',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-text': 'linear-gradient(135deg, #BDDDFC 0%, #88BDF2 45%, #6A89A7 100%)',
        'cta-primary': 'linear-gradient(135deg, #88BDF2 0%, #6A89A7 55%, #384959 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(136, 189, 242, 0.35)',
        'glow-sm': '0 0 20px rgba(136, 189, 242, 0.25)',
        'inner-glow': 'inset 0 0 30px rgba(136, 189, 242, 0.12)',
      },
      animation: {
        'border-pulse': 'border-pulse 2.2s ease-in-out infinite',
      },
      keyframes: {
        'border-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 1px rgba(136, 189, 242, 0.35), 0 0 12px rgba(136, 189, 242, 0.15)' },
          '50%': { boxShadow: '0 0 0 1px rgba(189, 221, 252, 0.65), 0 0 28px rgba(136, 189, 242, 0.35)' },
        },
      },
    },
  },
  plugins: [],
}
