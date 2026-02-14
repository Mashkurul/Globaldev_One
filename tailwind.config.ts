// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#05070a", // Deep dark navy from screenshots
                brand: "#2dd4bf",      // Teal/Cyan accent color
                card: "#0f172a",       // Slightly lighter navy for cards
            },
        },
    },
    plugins: [],
};
export default config;