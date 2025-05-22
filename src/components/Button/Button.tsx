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
    children: string
    disabled?: boolean
    /** Optional click handler */
    onClick?: () => void
} & React.JSX.IntrinsicElements["button"]

export const Button = (props: ButtonProps) => {
    const {
        children,
        primary = false,
        size = "medium",
        disabled = false,
        className,
        ...restProps
    } = props
    const modeClass = primary ? styles.primary : styles.secondary
    const sizeClass = styles[size]

    const classname = classnames(styles.button, modeClass, sizeClass, className)

    return (
        <button
            type="button"
            disabled={disabled}
            className={classname}
            {...restProps}
        >
            {children}
        </button>
    )
}
