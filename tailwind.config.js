/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      display:['Poppins' ,'sans-serif']
    },
    
    extend: {
      colors:{
        primary:'#05b6d3',
        secondary:'#EF863E',
      },
      backgroundImage:{
        'login-bg-img':'url(./src/assets/images/login.jpg)',
        'signup-bg-img':'url(./src/assets/images/signup.jpg)',
        'about-bg-img':'url(./src/assets/images/about.jpg)',

      }

    },
  },
  plugins: [],
}