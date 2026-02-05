import React from 'react'
import classNames from 'classnames'
import styles from './Input.module.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    fullWidth?: boolean
    icon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({label, error, fullWidth = false, icon, className, ...props}) => {
    return (
        <div className={classNames(styles.container, { [styles.fullWidth]: fullWidth })}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={styles.inputWrapper}>
                {icon && <div className={styles.inputIcon}>{icon}</div>}
                <input
                    className={classNames(
                        styles.input,
                        {
                            [styles.error]: error,
                            [styles.inputWithIcon]: icon
                        },
                        className
                    )}
                    {...props}
                />
            </div>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    )
}
