/// <reference types="vite/client" />
/// <reference types="vitest" />
import { resolve } from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        libInjectCss(),
        dts({
            insertTypesEntry: true,
            include: ["src/components/**/*", "src/index.ts"],
            exclude: ["**/*.stories.tsx", "**/*.test.tsx"],
            tsconfigPath: "tsconfig.app.json",
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/main.ts"),
            formats: ["es"],
        },
        rollupOptions: {
            external: ["react", "react-dom", "react/jsx-runtime"],
            // input: Object.fromEntries(
            //     globSync(["src/components/**/index.tsx", "src/main.ts"]).map(
            //         (file) => {
            //             // This remove `src/` as well as the file extension from each
            //             // file, so e.g. src/nested/foo.js becomes nested/foo
            //             const entryName = path.relative(
            //                 "src",
            //                 file.slice(
            //                     0,
            //                     file.length - path.extname(file).length,
            //                 ),
            //             )
            //             // This expands the relative paths to absolute paths, so e.g.
            //             // src/nested/foo becomes /project/src/nested/foo.js
            //             const entryUrl = fileURLToPath(
            //                 new URL(file, import.meta.url),
            //             )
            //             return [entryName, entryUrl]
            //         },
            //     ),
            // ),
            output: {
                entryFileNames: "[name].js",
                assetFileNames: "assets/[name][extname]",
                globals: {
                    react: "React",
                    "react-dom": "React-dom",
                    "react/jsx-runtime": "react/jsx-runtime",
                },
            },
        },
    },

    test: {
        // Vitest configuration
        globals: true,
        environment: "node",
        include: ["**/*.test.?(c|m)[jt]s?(x)"],
        watch: false,
    },
})
