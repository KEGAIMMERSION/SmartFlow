import React from 'react'
import classNames from 'classnames'
import styles from './Card.module.css'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>{
    children: React.ReactNode
    variant?: 'default' | 'elevated' | 'outlined'
}

export const Card: React.FC<CardProps> = ({children, variant = 'default', className, ...props}) => {
    return (
        <div
            className={classNames(
                styles.card,
                styles[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}