/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        sourcemap: true,
    },
    test: {
        // Vitest configuration
        globals: true,
        environment: "node",
        include: ["**/*.test.?(c|m)[jt]s?(x)"],
        watch: false,
    },
})
