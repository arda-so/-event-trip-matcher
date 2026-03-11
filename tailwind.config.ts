import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        sand: "#f2eadf",
        moss: "#53624c",
        rust: "#8f412d",
        cloud: "#f9f7f2"
      }
    }
  },
  plugins: []
};

export default config;

