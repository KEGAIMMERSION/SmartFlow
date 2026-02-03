import React from 'react'
import classNames from 'classnames'
import styles from './Button.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    loading?: boolean
}

export const Button: React.FC<ButtonProps> = ({variant = 'primary', size = 'md', fullWidth = false, loading = false, className, children, disabled, ...props}) => {
    return (
        <button
            className={classNames(
                styles.button,
                styles[variant],
                styles[size],
                {
                    [styles.fullWidth]: fullWidth,
                    [styles.loading]: loading,
                    [styles.disabled]: disabled,
                },
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <span className={styles.spinner} />}
            {children}
        </button>
    )
}