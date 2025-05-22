/// <reference types="vite/client" />
/// <reference types="vitest" />
import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"
import { generateCssPrefix } from "./build-helpers"
import packageJson from "./package.json"

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            exclude: ["**/*.(test|spec|stories).ts?(x)", "src/story-helpers/"],
        }),
    ],
    css: {
        modules: {
            // Generate predictable class names based on component and class
            generateScopedName: (name, filename) => {
                // Extract component name from file path
                const componentMatch = filename.match(/\/([^/]+)\.module\.css$/)
                const componentName = componentMatch
                    ? componentMatch[1]
                    : "unknown"

                const prefix = generateCssPrefix(packageJson.name)

                // Create predictable format: libraryPrefix__ComponentName__className
                return `${prefix}__${componentName}__${name}`
            },
        },
    },
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
        include: ["**/*.test.ts?(x)"],
        watch: false,
    },
})
