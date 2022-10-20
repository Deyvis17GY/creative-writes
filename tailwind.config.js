/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'Poppins'
      }
    },
    screens: {
      phone: {
        max: '640px'
      },
      sm: {
        min: '640px'
      },
      md: {
        min: '768px'
      },
      lg: {
        min: '1024px'
      },
      xl: {
        min: '1280px'
      }
    }
  },
  plugins: []
}
