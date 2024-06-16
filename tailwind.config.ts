import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      mobile: "0px",
      tablet: "320px",
      laptop: "768px",
      desktop: "1440px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "purple-101": "#8800FF",
        "green-501": "#7DEDAA",
        "light-purple-511": "#CEB4FF",
        "pink-521": "#FD81B1",
        "light-pink-531": "#FFCDD2",
        "sea-green-541": "#A1C13D1",
        "yellow-561": "#FFD830",
        "light-orange-571": "#F4E7D7",
        "red-591": "#D5001F",
        "orange-601": "#FD6541",
        "dark-blue-611": "#0D2481",
        "dark-green-621": "#006350",
        "maroon-631": "#61082B",
        "brown-641": "#AD780D",
        success: "#63bb61",
        warning: "#f9a455",
        alert: "#f61732",
        link: "#106bda",
        blue: {
          "580": "#F4F6F9",
          "581": "#0A70F5",
          "582": "#22194D",
          "583": "#daeafe",
          "584": "#b3d3fc",
          "585": "#0965dd",
          "586": "#085ac4",
          "587": "#064393",
          "588": "#042756",
        },
        gray: {
          "551": "#D0D0D3",
          "552": "FAFAFB",
          "553": "#F8F8F8",
          "554": "#F0F0F1",
          "555": "#D0D0D3",
          "556": "#BBBBBE",
          "557": "#7D7D7F",
          "558": "#5E5E5F",
          "559": "#49494A",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
