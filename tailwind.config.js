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
        restaurantInfo: '20px 1fr',
      },
      colors: {
        black: '#052136',
        green: '#7EEC96',
        yellow: '#FFC95F',
        red: '#F392BA',
        blue: '#74B3E1',
      },
      boxShadow: {
        button: '2px 2px 0px 0px #052136',
      },
    },
  },
  plugins: [],
};
