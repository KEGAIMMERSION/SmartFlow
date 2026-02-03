import React from 'react'
import classNames from 'classnames'
import styles from './Textarea.module.css'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
    fullWidth?: boolean
}

export const Textarea: React.FC<TextareaProps> = ({label, error, fullWidth = false, className, ...props}) => {
    return (
        <div className={classNames(styles.container, { [styles.fullWidth]: fullWidth })}>
            {label && <label className={styles.label}>{label}</label>}
            <textarea
                className={classNames(
                    styles.textarea,
                    { [styles.error]: error },
                    className
                )}
                {...props}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    )
}