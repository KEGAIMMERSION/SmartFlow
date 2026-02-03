import React from 'react'
import classNames from 'classnames'
import styles from './Input.module.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    fullWidth?: boolean
}

export const Input: React.FC<InputProps> = ({label, error, fullWidth = false, className, ...props}) => {
    return (
        <div className={classNames(styles.container, { [styles.fullWidth]: fullWidth })}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                className={classNames(
                    styles.input,
                    { [styles.error]: error },
                    className
                )}
                {...props}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    )
}