import convert from "color-convert"

/**
 * Converts a hex color value to an RGB string format
 * @param hex the color in hex format (with or without leading "#")
 * @returns a formatted RGB string like "rgb(r, g, b)"
 * @throws Error for invalid hex color formats
 */
export const hexToRgb = (hex: string): string => {
    // Trim whitespace and handle potential leading #
    let cleanHex = hex.trim()

    // Remove the leading "#" if present
    if (cleanHex.startsWith("#")) {
        cleanHex = cleanHex.substring(1)
    }

    // Remove any trailing non-hex characters
    cleanHex = /^[0-9A-Fa-f]+/.exec(cleanHex)?.[0] ?? ""

    // Validate hex length (3 or 6 digits)
    if (cleanHex.length !== 3 && cleanHex.length !== 6) {
        throw new Error(`Invalid hex color format: ${hex}`)
    }

    try {
        // Convert the clean hex value to RGB and format as a string
        return `rgb(${convert.hex.rgb(cleanHex).join(", ")})`
    } catch (error) {
        throw new Error(`Failed to convert hex to RGB: ${hex}\n${error}`)
    }
}
