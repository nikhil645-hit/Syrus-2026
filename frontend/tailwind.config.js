/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep enterprise dark grays
        navy: {
          950: '#09090b', // Base background (zinc-950)
          900: '#121212', // Card background 1
          800: '#18181b', // Card background 2 (elevated)
          700: '#27272a', // Borders and subtle hover states
          600: '#3f3f46', // Stronger borders
        },
        slate: {
          850: '#1e1e1e', // Fallback elevated surface
        },
        // Muted accents
        cyan: {
          400: '#38bdf8', // Light blue/cyan for primary actions/links
          500: '#0ea5e9',
          600: '#0284c7',
        },
        accent: {
          green: '#10b981',
          red: '#ef4444',
          yellow: '#f59e0b',
          orange: '#f97316',
          purple: '#8b5cf6', // Added for AI-flavored accents
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
        heading: ['Inter', 'system-ui', 'sans-serif'], // Use Inter for cleaner, standard SaaS look instead of Syne
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'progress-fill': 'progressFill 1s ease-out',
        'typing': 'typing 1.4s infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
        typing: {
          '0%, 60%': { opacity: '1' },
          '30%': { opacity: '0.3' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 15px rgba(56, 189, 248, 0.1)',
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.15)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.1)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
