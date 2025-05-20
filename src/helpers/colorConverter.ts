import convert from "color-convert"

/**
 * @param hex the color in hex format
 */
export const hexToRgb = (hex: string): string => {
    const cleanHex = hex.startsWith("#") ? hex.substring(1) : hex
    return `rgb(${convert.hex.rgb(cleanHex).join(", ")})`
}
