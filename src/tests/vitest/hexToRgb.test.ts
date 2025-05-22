// hexToRgb.test.ts
import { describe, it, expect } from "vitest"
import { hexToRgb } from "../../story-helpers/colorConverter.ts"

describe("hexToRgb", () => {
    it("converts standard hex colors with # prefix correctly", () => {
        expect(hexToRgb("#2563EB")).toBe("rgb(37, 99, 235)")
        expect(hexToRgb("#FF0000")).toBe("rgb(255, 0, 0)")
        expect(hexToRgb("#00FF00")).toBe("rgb(0, 255, 0)")
        expect(hexToRgb("#0000FF")).toBe("rgb(0, 0, 255)")
    })

    it("converts hex colors without # prefix correctly", () => {
        expect(hexToRgb("2563EB")).toBe("rgb(37, 99, 235)")
        expect(hexToRgb("FF0000")).toBe("rgb(255, 0, 0)")
        expect(hexToRgb("00FF00")).toBe("rgb(0, 255, 0)")
    })

    it("handles shorthand hex format (#RGB)", () => {
        expect(hexToRgb("#000")).toBe("rgb(0, 0, 0)")
        expect(hexToRgb("#FFF")).toBe("rgb(255, 255, 255)")
        expect(hexToRgb("#F00")).toBe("rgb(255, 0, 0)")
        expect(hexToRgb("#0F0")).toBe("rgb(0, 255, 0)")
        expect(hexToRgb("#00F")).toBe("rgb(0, 0, 255)")
        expect(hexToRgb("ABC")).toBe("rgb(170, 187, 204)")
    })

    it("handles case insensitivity", () => {
        expect(hexToRgb("#abc123")).toBe("rgb(171, 193, 35)")
        expect(hexToRgb("#ABC123")).toBe("rgb(171, 193, 35)")
        expect(hexToRgb("abc123")).toBe("rgb(171, 193, 35)")
        expect(hexToRgb("ABC123")).toBe("rgb(171, 193, 35)")
    })

    it("handles extreme values", () => {
        expect(hexToRgb("#000000")).toBe("rgb(0, 0, 0)") // Pure black
        expect(hexToRgb("#FFFFFF")).toBe("rgb(255, 255, 255)") // Pure white
        expect(hexToRgb("#FFFF00")).toBe("rgb(255, 255, 0)") // Yellow
        expect(hexToRgb("#00FFFF")).toBe("rgb(0, 255, 255)") // Cyan
        expect(hexToRgb("#FF00FF")).toBe("rgb(255, 0, 255)") // Magenta
    })

    it("handles whitespace in input", () => {
        expect(hexToRgb(" #FF0000 ")).toBe("rgb(255, 0, 0)")
        expect(hexToRgb("\t#FF0000\n")).toBe("rgb(255, 0, 0)")
    })

    it("handles input with extra characters", () => {
        expect(hexToRgb("FF0000;")).toBe("rgb(255, 0, 0)")
    })

    it("throws appropriate errors for invalid input", () => {
        expect(() => hexToRgb("")).toThrow()
        expect(() => hexToRgb("#XYZ")).toThrow()
        expect(() => hexToRgb("12345")).toThrow() // Incorrect length
        expect(() => hexToRgb("#12")).toThrow() // Too short
        expect(() => hexToRgb("rgb(255,0,0)")).toThrow() // Wrong format
    })
})
