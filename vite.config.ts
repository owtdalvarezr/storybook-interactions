/// <reference types="vite/client" />
/// <reference types="vitest" />
import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            exclude: ["**/*.(test|spec|stories).ts?(x)", "src/story-helpers/"],
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["es"],
            fileName: "index",
            cssFileName: "index",
        },
        rollupOptions: {
            external: ["react", "react-dom", "react/jsx-runtime"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "React-dom",
                    "react/jsx-runtime": "react/jsx-runtime",
                },
            },
        },
        sourcemap: true,
        minify: false,
    },

    test: {
        // Vitest configuration
        globals: true,
        environment: "node",
        include: ["**/*.test.?(c|m)[jt]s?(x)"],
        watch: false,
    },
})
