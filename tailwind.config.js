/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        space: '#030712',
        deep: '#050816',
        panel: '#0B1026',
        cosmic: '#2563EB',
        nebula: '#22D3EE',
        violet: '#8B5CF6',
        star: '#F8FAFC',
        muted: '#94A3B8',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'glow-radial':
          'radial-gradient(ellipse at center, rgba(37,99,235,.18), transparent 65%)',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        'border-spin': {
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        scan: 'scan 2.4s linear infinite',
        'border-spin': 'border-spin 6s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}