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
      sm: "360px",
      md: "768px",
      lg: "1280px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)"],
        heading: ["var(--font-raleway)"],
      },
      fontSize: {
        "display-xl": [
          "5rem",
          {
            lineHeight: "5rem",
            letterSpacing: "-0.05rem",
            fontWeight: "700",
          },
        ],
        "display-l": [
          "4rem",
          {
            lineHeight: "4rem",
            letterSpacing: "-0.05rem",
            fontWeight: "700",
          },
        ],
        "display-l-trial": [
          "40px",
          {
            lineHeight: "1.75rem",
            letterSpacing: "-0.05rem",
            fontWeight: "700",
          },
        ],
        "display-m": [
          "3.5rem",
          {
            lineHeight: "4rem",
            letterSpacing: "-0.05rem",
            fontWeight: "700",
          },
        ],
        "display-s": [
          "3rem",
          {
            lineHeight: "3.5rem",
            letterSpacing: "-0.031rem",
            fontWeight: "700",
          },
        ],
        "display-xs": [
          "2.25rem",
          {
            lineHeight: "2.5rem",
            letterSpacing: "-0.031rem",
            fontWeight: "700",
          },
        ],
        "display-xxs": [
          "1.75rem",
          {
            lineHeight: "2rem",
            letterSpacing: "-0.031rem",
            fontWeight: "700",
          },
        ],
        "heading-xxl-semibold": [
          "3rem",
          {
            lineHeight: "3rem",
            letterSpacing: "-0.063rem",
            fontWeight: "600",
          },
        ],
        "heading-xxl-medium": [
          "3rem",
          {
            lineHeight: "3rem",
            letterSpacing: "-0.063rem",
            fontWeight: "500",
          },
        ],
        "heading-xl-semibold": [
          "2.25rem",
          {
            lineHeight: "2.5rem",
            letterSpacing: "-0.063rem",
            fontWeight: "600",
          },
        ],
        "heading-xl-medium": [
          "2.25rem",
          {
            lineHeight: "2.5rem",
            letterSpacing: "-0.063rem",
            fontWeight: "500",
          },
        ],
        "heading-l-semibold": [
          "1.5rem",
          {
            lineHeight: "2rem",
            letterSpacing: "-0.05rem",
            fontWeight: "600",
          },
        ],
        "heading-l-medium": [
          "1.5rem",
          {
            lineHeight: "2rem",
            letterSpacing: "-0.05rem",
            fontWeight: "500",
          },
        ],
        "heading-m-semibold": [
          "1.25rem",
          {
            lineHeight: "1.75rem",
            letterSpacing: "-0.031rem",
            fontWeight: "600",
          },
        ],
        "heading-m-medium": [
          "1.25rem",
          {
            lineHeight: "1.75rem",
            letterSpacing: "-0.031rem",
            fontWeight: "500",
          },
        ],
        "heading-s-semibold": [
          "1rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "-0.016rem",
            fontWeight: "600",
          },
        ],
        "heading-s-medium": [
          "1rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "-0.016rem",
            fontWeight: "500",
          },
        ],
        "body-xl-light": [
          "1.25rem",
          {
            lineHeight: "2rem",
            letterSpacing: "-0.063rem",
            fontWeight: "300",
          },
        ],
        "body-xl-medium": [
          "1.25rem",
          {
            lineHeight: "2rem",
            letterSpacing: "-0.016rem",
            fontWeight: "500",
          },
        ],
        "body-xl-semibold": [
          "1.25rem",
          {
            lineHeight: "2rem",
            letterSpacing: "-0.016rem",
            fontWeight: "600",
          },
        ],
        "body-lg-light": [
          "1rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "-0.031rem",
            fontWeight: "300",
          },
        ],
        "body-lg-medium": [
          "1rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "-0.031rem",
            fontWeight: "500",
          },
        ],
        "body-lg-semibold": [
          "1rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "-0.031rem",
            fontWeight: "600",
          },
        ],
        "body-md-light": [
          "1rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "-0.016rem",
            fontWeight: "300",
          },
        ],
        "body-md-medium": [
          "0.875rem",
          {
            lineHeight: "1rem",
            letterSpacing: "-0.016rem",
            fontWeight: "500",
          },
        ],
        "body-md-semibold": [
          "0.875rem",
          {
            lineHeight: "1rem",
            letterSpacing: "-0.016rem",
            fontWeight: "600",
          },
        ],
        "body-sm-light": [
          "0.875rem",
          {
            lineHeight: "1rem",
            letterSpacing: "-0.016rem",
            fontWeight: "300",
          },
        ],
        "body-sm-medium": [
          "0.75rem",
          {
            lineHeight: "0.875rem",
            letterSpacing: "-0.016rem",
            fontWeight: "500",
          },
        ],
        "body-sm-semibold": [
          "0.75rem",
          {
            lineHeight: "0.875rem",
            letterSpacing: "-0.016rem",
            fontWeight: "600",
          },
        ],
        "body-xs-light": [
          "0.75rem",
          {
            lineHeight: "0.875rem",
            letterSpacing: "-0.00rem",
            fontWeight: "300",
          },
        ],
        "body-xs-medium": [
          "0.5rem",
          {
            lineHeight: "0.875rem",
            letterSpacing: "-0.00rem",
            fontWeight: "500",
          },
        ],
        "body-xs-semibold": [
          "0.5rem",
          {
            lineHeight: "0.875rem",
            letterSpacing: "-0.00rem",
            fontWeight: "600",
          },
        ],
        "body-xxs-light": [
          "0.5rem",
          {
            lineHeight: "0.875rem",
            letterSpacing: "-0.00rem",
            fontWeight: "300",
          },
        ],
        "caption-lg-regular": [
          "0.875rem",
          {
            lineHeight: "1rem",
            letterSpacing: "-0.016rem",
            fontWeight: "400",
          },
        ],
        "caption-lg-semibold": [
          "0.875rem",
          {
            lineHeight: "1rem",
            letterSpacing: "-0.016rem",
            fontWeight: "600",
          },
        ],
        "caption-md-regular": [
          "0.75rem",
          {
            lineHeight: "0.875rem",
            letterSpacing: "0rem",
            fontWeight: "400",
          },
        ],
        "caption-md-semibold": [
          "0.75rem",
          {
            lineHeight: "0.875rem",
            letterSpacing: "-0.016rem",
            fontWeight: "600",
          },
        ],
        "caption-sm-regular": [
          "0.5rem",
          {
            lineHeight: "1rem",
            letterSpacing: "0rem",
            fontWeight: "400",
          },
        ],
        "caption-sm-semibold": [
          "0.5rem",
          {
            lineHeight: "1rem",
            letterSpacing: "0rem",
            fontWeight: "600",
          },
        ],
        "link-lg-regular": [
          "1rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "-0.031rem",
            fontWeight: "400",
          },
        ],
        "link-lg-semibold": [
          "1rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "-0.031rem",
            fontWeight: "600",
          },
        ],
        "link-md-regular": [
          "0.875rem",
          {
            lineHeight: "1rem",
            letterSpacing: "-0.016rem",
            fontWeight: "400",
          },
        ],
        "link-md-semibold": [
          "0.875rem",
          {
            lineHeight: "1rem",
            letterSpacing: "-0.016rem",
            fontWeight: "600",
          },
        ],
        "link-sm-regular": [
          "0.75rem",
          {
            lineHeight: "0.875rem",
            letterSpacing: "0rem",
            fontWeight: "400",
          },
        ],
        "link-sm-semibold": [
          "0.75rem",
          {
            lineHeight: "0.875rem",
            letterSpacing: "0rem",
            fontWeight: "600",
          },
        ],
      },
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
        "purple-101": "rgb(var(--purple-101))",
        "yellow-101": "rgb(var(--yellow-101))",
        "black-201": "rgb(var(--black-201))",
        "white-301": "rgb(var(--white-301))",
        "green-501": "rgb(var(--green-501))",
        "light-purple-511": "rgb(var(--light-purple-511))",
        "pink-521": "rgb(var(--pink-521))",
        "light-pink-531": "rgb(var(--light-pink-531))",
        "sea-green-541": "rgb(var(--sea-green-541))",
        "yellow-561": "rgb(var(--yellow-561))",
        "light-orange-571": "rgb(var(--light-orange-571))",
        "red-591": "rgb(var(--red-591))",
        "orange-601": "rgb(var(--orange-601))",
        "dark-blue-611": "rgb(var(--dark-blue-611))",
        "dark-green-621": "rgb(var(--dark-green-621))",
        "maroon-631": "rgb(var(--maroon-631))",
        "brown-641": "rgb(var(--brown-641))",
        "dark-black-651": "rgb(var(--dark-black-651))",
        success: "rgb(var(--success))",
        warning: "rgb(var(--warning))",
        alert: "rgb(var(--alert))",
        link: "rgb(var(--link))",
        blue: {
          "580": "rgb(var(--blue-580))",
          "581": "rgb(var(--blue-581))",
          "582": "rgb(var(--blue-582))",
          "583": "rgb(var(--blue-583))",
          "584": "rgb(var(--blue-584))",
          "585": "rgb(var(--blue-585))",
          "586": "rgb(var(--blue-586))",
          "587": "rgb(var(--blue-587))",
          "588": "rgb(var(--blue-588))",
        },
        gray: {
          "551": "rgb(var(--gray-551))",
          "552": "rgb(var(--gray-552))",
          "553": "rgb(var(--gray-553))",
          "554": "rgb(var(--gray-554))",
          "555": "rgb(var(--gray-555))",
          "556": "rgb(var(--gray-556))",
          "557": "rgb(var(--gray-557))",
          "558": "rgb(var(--gray-558))",
          "559": "rgb(var(--gray-559))",
        },
        sb: {
          white: "rgb(var(--white-301))",
          black: "rgb(var(--black-201))",
          yellow: "rgb(var(--yellow-101))",
          gray: {
            "553": "rgb(var(--gray-553))",
            "554": "rgb(var(--gray-554))",
            "555": "rgb(var(--gray-555))",
            "556": "rgb(var(--gray-556))",
            "557": "rgb(var(--gray-557))",
            "558": "rgb(var(--gray-558))",
            "559": "rgb(var(--gray-559))",
          },
          "blue-580": "rgb(var(--blue-580))",
        },
        bc: {
          "primary-white": "rgb(var(--white-301))",
          "primary-black": "rgb(var(--black-201))",
          yellow: "rgb(var(--warning))",
          focus: "rgb(var(--warning))",
          grey: "rgb(var(--gray-555))",
          black: {
            hover: "rgb(var(--gray-558))",
            disabled: "rgb(var(--gray-556))",
            active: "rgb(var(--gray-559))",
          },
        },
        bb: {
          primary: {
            "default-gray": "rgb(var(--gray-553))",
            "black-active": "rgb(var(--black-201))",
            "black-hover": "rgb(var(--gray-554))",
            "black-disabled": "rgb(var(--gray-556))",
            white: "rgb(var(--white-201))",
            yellow: "rgb(var(--yellow-101))",
          },
          transparent: "rgb(var(--black-201)/0)",
        },
        overlay: {
          "50": "rgb(var(--black-201)/0.5)",
          "12": "rgb(var(--black-201)/0.12)",
          "8": "rgb(var(--black-201)/0.08)",
          "0": "rgb(var(--black-201)/0)",
        },
        "alert-state": "rgb(var(--alert)/0.6)",
        "focus-blue-shadow": "rgb(var(--blue-580)/0.20)",
        "focus-yellow-shadow": "rgb(var(--yellow-101)/0.20)",
        "focus-border-color": "rgb(var(--warning)/0.80)",
        tc: {
          primary: {
            white: "rgb(var(--white-301))",
            default: "rgb(var(--black-201))",
          },
          black: {
            hover: "rgb(var(--gray-558))",
            active: "rgb(var(--black-201))",
            focus: "rgb(var(--black-201))",
            disabled: "rgb(var(--gray-556))",
          },
          "body-grey": "rgb(var(--gray-557))",
          ic: {
            white: "rgb(var(--white-301))",
            black: {
              default: "rgb(var(--black-201))",
              hover: "rgb(var(--gray-558))",
              active: "rgb(var(--black-201))",
              focus: "rgb(var(--black-201))",
              disabled: "rgb(var(--gray-556))",
            },
          },
        },
      },
      backgroundImage: theme => ({
        "gradient-1": `linear-gradient(to right, #FF12DC, #FFB912)`,
        "gradient-2": `linear-gradient(to right, #9403FD, #00ADFE)`,
        "about-us-image": "url('/assets/about/bg_image.webp')",
      }),
      dropShadow: {
        "y-elevation-xs": "0 1px 2px rgba(0, 0, 0, 0.04)",
        "y-elevation-sm": "0 2px 4px rgba(0, 0, 0, 0.08)",
        "y-elevation-md": "0 4px 6px rgba(0, 0, 0, 0.04)",
        "y-elevation-lg": "0 4px 8px rgba(0, 0, 0, 0.12)",
        "y-elevation-xl": "0 6px 10px rgba(0, 0, 0, 0.12)",
        "y-elevation-2xl": "0 8px 12px rgba(0, 0, 0, 0.12)",
        "x-elevation-xs": "2px 1px 2px rgba(0, 0, 0, 0.04)",
        "x-elevation-sm": "4px 2px 8px rgba(0, 0, 0, 0.08)",
        "x-elevation-md": "8px 4px 12px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        first: "moveVertical 30s ease infinite",
        sixth: "moveVertical 30s reverse infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
      },
      scrollbar: {
        width: "4px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
} satisfies Config;

export default config;
