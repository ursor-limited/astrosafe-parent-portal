/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    padding: {
      lg: '12px'
    },
    borderRadius: {
      xs: '4px'
    },
    colors: {
      transparent: "transparent",
      background: {
        primary: "#F8F8F8",
      },
      greyscale: {
        white: "#FFFFFF",
        6: "#B6C6C6",
      },
      components: {
        fields: {
          fieldBg: "#F0F1F1",
        },
      },
    },
    extend: {},
  },
  plugins: [],
};
