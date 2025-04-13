/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        stix:[ "STIX Two Text"],
        stix2:["Knewave"]
        // font-optical-sizing: auto;
        // font-weight: <weight>;
        // font-style: normal;
      },
      backgroundColor:{
        gray: '#565555'
      }
      
  },
  plugins: [],
}
}
