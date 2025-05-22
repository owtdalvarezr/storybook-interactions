/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect } from "vitest"
import { generateCssPrefix } from "./build-helpers"

describe("generateCssPrefix", () => {
    describe("Basic functionality", () => {
        it("should handle regular package names", () => {
            expect(generateCssPrefix("my-package")).toBe("my-package")
            expect(generateCssPrefix("react-components")).toBe(
                "react-components",
            )
            expect(generateCssPrefix("awesome_library")).toBe("awesome_library")
        })

        it("should remove @ symbol from the beginning only", () => {
            expect(generateCssPrefix("@company/package")).toBe(
                "company-package",
            )
            expect(generateCssPrefix("@scope/my-lib")).toBe("scope-my-lib")
            expect(generateCssPrefix("package@version")).toBe("packageversion") // @ not at start
        })

        it("should replace forward slashes with hyphens", () => {
            expect(generateCssPrefix("@company/package-name")).toBe(
                "company-package-name",
            )
            expect(generateCssPrefix("namespace/sub/package")).toBe(
                "namespace-sub-package",
            )
            expect(generateCssPrefix("@org/utils/helpers")).toBe(
                "org-utils-helpers",
            )
        })

        it("should convert to lowercase", () => {
            expect(generateCssPrefix("@MyCompany/UI-Components")).toBe(
                "mycompany-ui-components",
            )
            expect(generateCssPrefix("REACT-LIBRARY")).toBe("react-library")
            expect(generateCssPrefix("@SCOPE/Package")).toBe("scope-package")
        })
    })

    describe("Scoped packages", () => {
        it("should handle typical scoped packages", () => {
            expect(generateCssPrefix("@babel/core")).toBe("babel-core")
            expect(generateCssPrefix("@types/react")).toBe("types-react")
            expect(generateCssPrefix("@storybook/react")).toBe(
                "storybook-react",
            )
        })

        it("should handle complex scoped package names", () => {
            expect(generateCssPrefix("@awesome-ui/react-components")).toBe(
                "awesome-ui-react-components",
            )
            expect(generateCssPrefix("@my-company/design-system-v2")).toBe(
                "my-company-design-system-v2",
            )
            expect(generateCssPrefix("@org/multi-word-package-name")).toBe(
                "org-multi-word-package-name",
            )
        })

        it("should handle scoped packages with numbers", () => {
            expect(generateCssPrefix("@company/ui-v2")).toBe("company-ui-v2")
            expect(generateCssPrefix("@babel/plugin-transform-es2015")).toBe(
                "babel-plugin-transform-es2015",
            )
            expect(generateCssPrefix("@types/node16")).toBe("types-node16")
        })
    })

    describe("Special characters and sanitization", () => {
        it("should remove invalid CSS characters", () => {
            expect(generateCssPrefix("package!name")).toBe("packagename")
            expect(generateCssPrefix("my@pkg#with$symbols")).toBe(
                "mypkgwithsymbols",
            )
            expect(generateCssPrefix("@company/pkg.with.dots")).toBe(
                "company-pkgwithdots",
            )
        })

        it("should handle underscores (valid CSS character)", () => {
            expect(generateCssPrefix("my_package_name")).toBe("my_package_name")
            expect(generateCssPrefix("@company/ui_components")).toBe(
                "company-ui_components",
            )
        })

        it("should clean up multiple consecutive dashes", () => {
            expect(generateCssPrefix("package---name")).toBe("package-name")
            expect(generateCssPrefix("@company//package")).toBe(
                "company-package",
            )
            expect(generateCssPrefix("my--pkg--name")).toBe("my-pkg-name")
        })

        it("should remove leading and trailing dashes", () => {
            expect(generateCssPrefix("-package-name-")).toBe("package-name")
            expect(generateCssPrefix("---my-pkg---")).toBe("my-pkg")
            expect(generateCssPrefix("@-company-/package-")).toBe(
                "company-package",
            )
        })
    })

    describe("Edge cases", () => {
        it("should throw error for invalid inputs", () => {
            expect(() => generateCssPrefix("")).toThrow(
                "Package name must be a non-empty string",
            )
            expect(() => generateCssPrefix(null as any)).toThrow(
                "Package name must be a non-empty string",
            )
            expect(() => generateCssPrefix(undefined as any)).toThrow(
                "Package name must be a non-empty string",
            )
            expect(() => generateCssPrefix(123 as any)).toThrow(
                "Package name must be a non-empty string",
            )
        })

        it("should handle packages with only special characters", () => {
            expect(generateCssPrefix("!@#$%")).toBe("")
            expect(generateCssPrefix("@/")).toBe("")
            expect(generateCssPrefix("@!!!/###")).toBe("")
        })

        it("should handle very long package names", () => {
            const longName =
                "@very-long-company-name/extremely-long-package-name-with-many-words"
            const result = generateCssPrefix(longName)
            expect(result).toBe(
                "very-long-company-name-extremely-long-package-name-with-many-words",
            )
            expect(result.length).toBeLessThan(longName.length)
        })

        it("should handle single character package names", () => {
            expect(generateCssPrefix("a")).toBe("a")
            expect(generateCssPrefix("@a/b")).toBe("a-b")
            expect(generateCssPrefix("x")).toBe("x")
        })

        it("should handle packages with only @ symbol", () => {
            expect(generateCssPrefix("@")).toBe("")
            expect(generateCssPrefix("@@")).toBe("")
        })
    })

    describe("Real-world package names", () => {
        it("should handle popular npm packages", () => {
            expect(generateCssPrefix("@babel/preset-env")).toBe(
                "babel-preset-env",
            )
            expect(generateCssPrefix("@types/node")).toBe("types-node")
            expect(generateCssPrefix("@angular/core")).toBe("angular-core")
            expect(generateCssPrefix("@vue/cli")).toBe("vue-cli")
            expect(generateCssPrefix("@storybook/addon-essentials")).toBe(
                "storybook-addon-essentials",
            )
        })

        it("should handle design system packages", () => {
            expect(generateCssPrefix("@material-ui/core")).toBe(
                "material-ui-core",
            )
            expect(generateCssPrefix("@chakra-ui/react")).toBe(
                "chakra-ui-react",
            )
            expect(generateCssPrefix("@ant-design/icons")).toBe(
                "ant-design-icons",
            )
            expect(generateCssPrefix("@headlessui/react")).toBe(
                "headlessui-react",
            )
        })

        it("should handle company-specific packages", () => {
            expect(generateCssPrefix("@company/design-tokens")).toBe(
                "company-design-tokens",
            )
            expect(generateCssPrefix("@acme-corp/ui-library")).toBe(
                "acme-corp-ui-library",
            )
            expect(generateCssPrefix("@my-org/shared-components")).toBe(
                "my-org-shared-components",
            )
        })
    })

    describe("Unicode and international characters", () => {
        it("should handle packages with unicode characters", () => {
            expect(generateCssPrefix("@测试/package")).toBe("package") // Chinese characters removed
            expect(generateCssPrefix("café-utils")).toBe("caf-utils") // Accented characters removed
            expect(generateCssPrefix("@münchen/library")).toBe("mnchen-library") // German characters
        })

        it("should handle emoji in package names", () => {
            expect(generateCssPrefix("🚀rocket-lib")).toBe("rocket-lib")
            expect(generateCssPrefix("@company/ui-⚡")).toBe("company-ui")
        })
    })
})

describe("CSS class name generation integration", () => {
    it("should generate valid CSS class prefixes for vite config", () => {
        const testCases = [
            "@storybook/interactions",
            "@my-company/ui-components",
            "react-design-system",
            "@babel/preset-env",
        ]

        testCases.forEach((packageName) => {
            const prefix = generateCssPrefix(packageName)

            // Should not start with number
            expect(prefix).not.toMatch(/^[0-9]/)

            // Should only contain valid CSS identifier characters
            expect(prefix).toMatch(/^[a-zA-Z_-][a-zA-Z0-9_-]*$/)

            // Should not be empty
            expect(prefix.length).toBeGreaterThan(0)

            // Should be lowercase
            expect(prefix).toBe(prefix.toLowerCase())
        })
    })

    it("should create predictable class names for components", () => {
        const generateClassName = (
            packageName: string,
            component: string,
            className: string,
        ) => {
            const prefix = generateCssPrefix(packageName)
            return `${prefix}__${component}__${className}`
        }

        expect(
            generateClassName("@storybook/interactions", "Button", "primary"),
        ).toBe("storybook-interactions__Button__primary")

        expect(
            generateClassName("@my-company/ui-lib", "Card", "elevated"),
        ).toBe("my-company-ui-lib__Card__elevated")

        expect(
            generateClassName("design-tokens", "Typography", "heading"),
        ).toBe("design-tokens__Typography__heading")
    })
})
