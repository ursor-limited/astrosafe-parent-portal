/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    spacing: {
      1: "4px",
  
      xl: "32px",
    },
    padding: {
      lg: "12px",
      "3xl": '24px',
    },
    borderRadius: {
      full: "100%",
      xs: "4px",
    },
    colors: {
      transparent: "transparent",
      darkTeal: {
        0: '#0E656B',
        2: "#001E20",
        3: '#002C2F',
        5: "#00474B",
      },
      background: {
        primary: "#F8F8F8",
      },
      greyscale: {
        white: "#FFFFFF",
        6: "#B6C6C6",
      },
      buttons: {
        border: "#147C83",
        primary: {
          bg: "#147C83",
          text: "#F8F8F8",
        },
        secondary: { bg: "transparent", text: "#147C83" },
        disabled: { bg: "#EFF4F4", text: '#ACC6C5' }
      },
      fields: {
        bg: "#F0F1F1",
        text: {
          pressed: "#00474B",
          placeholder: "rgba(0, 30, 32, 0.4)",
        },
        checkbox: {
          default: "#0E656B",
          selected: "#E2B000",
        },
      },
    },
    extend: {},
  },
  plugins: [],
};
