/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Wordmark and the identity lockup only.
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        // Giant display headlines.
        display: ['"Barlow Condensed"', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        basalt: '#0C0C0D',
        bisque: '#F3F0E8',
        clay: '#B0623F',
        glaze: '#2E8199',
        stone: '#DEDCD7',
        rule: '#DCD8CD',
        muted: '#8A8780',
        ink: '#4B4943',
        dim: '#6E6C66',
        'on-dark': '#A8A59C',
      },
    },
  },
  plugins: [],
}
