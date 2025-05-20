import { colors } from "./colors.ts"

export const theme = {
    colors: {
        button: {
            primary: {
                text: colors.white,
                background: colors["blue-600"],
                hover: colors["blue-700"],
                disabled: colors["blue-disabled"],
            },
            secondary: {
                text: colors["blue-600"],
                background: colors["white"],
                border: colors["blue-600"],
                hover: colors["white-100"],
                disabled: colors["white-200"],
            },
        },
    },
} as const
