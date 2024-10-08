/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },

      colors: {
        peach: "#E16259",
        coral: "#cc5049",
        greyish: "#666665",
      },

      screens: {
        sm: "500px",
        md: "600px",
        lg: "1000px",
        xl: "1320px",
      },
    },
  },
  plugins: [],
};

