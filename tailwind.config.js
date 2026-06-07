/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Isibuwa Gold Glow
        primary: {
          50:  '#FAF5E4', // Ivory
          100: '#F0D080', // Gold Bright
          200: '#E7C676',
          300: '#DCB65B',
          400: '#D2A641',
          500: '#C9922A', // Gold Primary
          600: '#A67118', // Gold Deep
          700: '#865B13',
          800: '#66440D',
          900: '#472F07',
          950: '#241D13', // Surface 3
        },
        // Accent: Warm/Bright Golds
        accent: {
          50:  '#FAF5E4',
          100: '#F0D080',
          200: '#E7C676',
          300: '#DCB65B',
          400: '#D2A641',
          500: '#C9922A',
          600: '#A67118',
          700: '#865B13',
          800: '#66440D',
          900: '#472F07',
        },
        // Dark backgrounds (candlelight forest night)
        dark: {
          950: '#0C0A07', // Surface 1
          900: '#17130D', // Surface 2
          800: '#241D13', // Surface 3
          700: '#2E2519',
          600: '#392E20',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient':   'linear-gradient(135deg, #0C0A07 0%, #17130D 50%, #0C0A07 100%)',
      },
      animation: {
        'fade-in':     'fadeIn 0.5s ease-out',
        'slide-up':    'slideUp 0.6s ease-out',
        'pulse-slow':  'pulse 3s ease-in-out infinite',
        'float':       'float 6s ease-in-out infinite',
        'shimmer':     'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
