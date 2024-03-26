/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/components/**/*.tsx', 'index.html', './src/pages/**/*.tsx'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      gridTemplateColumns: {
        restaurantItem: '144px 1fr',
      },
      colors: {
        black: '#052136',
      },
    },
  },
  plugins: [],
};
