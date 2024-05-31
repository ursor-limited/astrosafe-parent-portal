/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: { lg: ["18px", "21.6px"], xl: ["20px", "24px"] },
      spacing: {
        lg: "12px",
        xl: "16px",
        "3xl": "24px",
      },
      padding: {
        lg: "12px",
        "3xl": "24px",
      },
      borderRadius: {
        full: "100%",
        xs: "4px",
      },
      colors: {
        transparent: "transparent",
        darkTeal: {
          0: "#000F10",
          1: "#001718",
          2: "#001E20",
          3: "#002C2F",
          4: '#003F42',
          5: "#00474B",
        },
        lightTeal: {
          0: "#0E656B",
          1: "#147C83",
          2: "#46ADB4",
          3: "#86D3D9",
          4: "#A9E8EC",
          5: "#CCF1F1",
        },
        yellow: {
          0: "#695200",
          1: "#E2B000",
          2: "#FFDB5D",
          3: "#FFF8B8",
          4: "#FFFCDE",
        },
        background: {
          primary: "#F8F8F8",
        },
        greyscale: {
          white: "#FFFFFF",
          1: "#F8F8F8",
          2: "#F0F1F1",
          3: "#EAF4F4",
          4: "#D8EAEA",
          5: "#CCDDDD",
          6: "#B6C6C6",
          7: "#ACC6C5",
          black: "#000000",
        },
        buttons: {
          border: "#147C83",
          primary: {
            bg: "#147C83",
            text: "#F8F8F8",
          },
          secondary: { bg: "transparent", text: "#147C83" },
          disabled: { bg: "#EFF4F4", text: "#ACC6C5" },
        },
        fields: {
          bg: "#F0F1F1",
          text: {
            pressed: "#00474B",
            filling: "#001E20",
            placeholder: "rgba(0, 30, 32, 0.4)",
          },
          checkbox: {
            default: "#0E656B",
            selected: "#E2B000",
          },
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
