/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--content-primary)',
        'secondary': 'var(--content-secondary)',
        'bg-card': 'var(--surface-elevation1)',
        'bg-card-disabled': 'var(--surface-disabled)',
        'btn-primary': 'var(--surface-primary)',
        'btn-secondary': 'var(--surface-secondary)',
        'border-base': 'var(--border-base)'
      },
      fontFamily: {
        sans: ['Pretendard Variable', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
