import React from 'react'
import classNames from 'classnames'
import styles from './Select.module.css'

export interface SelectOption {
    value: string
    label: string
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    options: SelectOption[]
    value: string
    onChange: (value: string) => void
    error?: string
}

export const Select: React.FC<SelectProps> = ({options, value, onChange, error, className, id, disabled, required, ...props}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value)
    }

    return (
        <div className={styles.container}>
            <select
                className={classNames(
                    styles.select,
                    { [styles.error]: error },
                    className
                )}
                value={value}
                onChange={handleChange}
                id={id}
                disabled={disabled}
                required={required}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    )
}