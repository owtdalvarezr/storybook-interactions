import styles from "./button.module.css"
import React from "react"
import classnames from "classnames"

export type ButtonProps = {
    /** Is this the principal call to action on the page? */
    primary?: boolean
    /** What background color to use */
    backgroundColor?: string
    /** How large should the button be? */
    size?: "small" | "medium" | "large"
    /** Button contents */
    label: string
    disabled?: boolean
    /** Optional click handler */
    onClick?: () => void
} & React.JSX.IntrinsicElements["button"]

/** Primary UI component for user interaction */
export const Button = ({
    primary = false,
    size = "medium",
    backgroundColor,
    label,
    disabled = false,
    ...props
}: ButtonProps) => {
    const modeClass = primary ? styles.primary : styles.secondary
    const sizeClass = styles[size]

    const className = classnames(
        styles.button,
        modeClass,
        sizeClass,
    )

    return (
        <button
            type="button"
            disabled={disabled}
            className={className}
            style={{ backgroundColor }}
            {...props}
        >
            {label}
        </button>
    )
}
