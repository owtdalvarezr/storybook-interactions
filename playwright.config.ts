import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
    testDir: "./src",
    testMatch: ["**/*.playwright.ts?(x)"],
    webServer: {
        command: "npm run storybook",
        url: "http://localhost:6006",
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
    use: {
        baseURL: "http://localhost:6006",
        viewport: { width: 1280, height: 720 },
        screenshot: "only-on-failure",
        trace: "on-first-retry",
    },
    reporter: "html",
}

export default config
