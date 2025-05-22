import { test, expect } from "@playwright/test"
import { theme } from "../../theme"
import { hexToRgb } from "../../story-helpers/hexToRgb.ts"

test.describe("Button Component", () => {
    test("changes background color on hover", async ({ page }) => {
        // Navigate to the Button story
        await page.goto(
            "http://localhost:6006/?path=/story/example-button--primary",
        )

        // Get button element using role
        const button = page
            .locator('iframe[title="storybook-preview-iframe"]')
            .contentFrame()
            .getByRole("button", { name: "Button" })

        // Get initial background color
        const initialBgColor = await button.evaluate((el) => {
            return window.getComputedStyle(el).backgroundColor
        })

        expect(initialBgColor).toBe(
            hexToRgb(theme.colors.button.primary.background),
        )

        // Hover over the button
        await button.hover()

        // Get hover state background color
        const hoverBgColor = await button.evaluate((el) => {
            return window.getComputedStyle(el).backgroundColor
        })

        // Assert colors are different
        expect(hoverBgColor).toBe(
            hexToRgb(theme.colors.button.primary["background-hover"]),
        )
    })
})
