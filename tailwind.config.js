/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        "2xl": "1920px",
      },
    },

    extend: {
      screens: {
        xs: "320px",
        xsm: "375px",
        smd: "425px",
        "3xl": "2560px",
      },

      fontFamily: {
        heading: [
          "SF Pro Display",
          "Inter",
          "sans-serif",
        ],
        body: [
          "SF Pro Text",
          "Inter",
          "sans-serif",
        ],
        apple: [
          "Inter",
          "sans-serif",
        ],
      },

      colors: {
        background: "#000000",
        surface: "#0A0A0A",
        card: "#111111",
        border: "#262626",

        text: {
          primary: "#FFFFFF",
          secondary: "#A1A1AA",
          muted: "#71717A",
        },

        apple: {
          blue: "#0071E3",
          light: "#2997FF",
          gray: "#86868B",
          silver: "#F5F5F7",
        },
      },

      boxShadow: {
        glow: "0 0 40px rgba(0,113,227,0.35)",
        card: "0 10px 40px rgba(0,0,0,0.35)",
        soft: "0 5px 30px rgba(255,255,255,0.05)",
      },

      borderRadius: {
        apple: "28px",
      },

      backgroundImage: {
        aurora:
          "radial-gradient(circle at top left, rgba(0,113,227,.2), transparent 40%), radial-gradient(circle at bottom right, rgba(41,151,255,.15), transparent 40%)",
      },

      keyframes: {
        float: {
          "0%,100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },

        glow: {
          "0%,100%": {
            opacity: "0.6",
          },
          "50%": {
            opacity: "1",
          },
        },

        marquee: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },

        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },

        zoom: {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1.05)",
          },
        },

        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        pulseRing: {
          "0%": {
            transform: "scale(.8)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1.8)",
            opacity: "0",
          },
        },
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        marquee: "marquee 20s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        zoom: "zoom .5s ease forwards",
        fadeUp: "fadeUp .8s ease forwards",
        pulseRing: "pulseRing 2s linear infinite",
      },
    },
  },
  plugins: [],
};