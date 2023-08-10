const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  // experimental: {
  //   optimizeUniversalDefaults: true
  // },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...colors,
        body: 'rgb(var(--color-body) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        light: 'rgb(var(--color-light) / <alpha-value>)',
        white: 'rgb(var(--color-white) / <alpha-value>)',
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
        black: 'rgb(var(--color-black) / <alpha-value>)',
        gray: {
          50: 'rgb(var(--color-gray-50) / <alpha-value>)',
          100: 'rgb(var(--color-gray-100) / <alpha-value>)',
          200: 'rgb(var(--color-gray-200) / <alpha-value>)',
          300: 'rgb(var(--color-gray-300) / <alpha-value>)',
          400: 'rgb(var(--color-gray-400) / <alpha-value>)',
          500: 'rgb(var(--color-gray-500) / <alpha-value>)',
          600: 'rgb(var(--color-gray-600) / <alpha-value>)',
          700: 'rgb(var(--color-gray-700) / <alpha-value>)',
          800: 'rgb(var(--color-gray-800) / <alpha-value>)',
          900: 'rgb(var(--color-gray-900) / <alpha-value>)',
          950: 'rgb(var(--color-gray-950) / <alpha-value>)'
        }
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            'code::after': {
              content: ''
            },
            'h1:first-of-type': {
              marginTop: '1rem'
            },
            h2: {
              marginTop: '1.25em'
            },
            'code::before': {
              content: ''
            },
            code: {
              fontWeight: theme('fontWeight.medium'),
              fontVariantLigatures: 'none',
              display: 'inline',
              backgroundColor: 'rgb(var(--color-gray-200))',
              padding: '2px 4px',
              borderRadius: '0.35rem'
            },

            '--tw-prose-body': 'rgb(var(--color-gray-700))',
            '--tw-prose-headings': 'rgb(var(--color-gray-700))',
            '--tw-prose-lead': 'rgb(var(--color-gray-700))',
            '--tw-prose-links': 'rgb(var(--color-gray-700))',
            '--tw-prose-bold': 'rgb(var(--color-gray-700))',
            '--tw-prose-counters': 'rgb(var(--color-gray-700))',
            '--tw-prose-bullets': 'rgb(var(--color-gray-400))',
            '--tw-prose-hr': 'rgb(var(--color-gray-300))',
            '--tw-prose-quotes': 'rgb(var(--color-gray-700))',
            '--tw-prose-quote-borders': 'rgb(var(--color-gray-300))',
            '--tw-prose-captions': 'rgb(var(--color-gray-700))',
            '--tw-prose-code': 'rgb(var(--color-gray-700))',
            '--tw-prose-pre-code': 'rgb(var(--color-gray-700))',
            '--tw-prose-pre-bg': 'rgb(var(--color-gray-200))',
            '--tw-prose-th-borders': 'rgb(var(--color-gray-100))',
            '--tw-prose-td-borders': 'rgb(var(--color-gray-200))'
          }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
}
