import React, { createContext, useContext, useEffect, useState } from 'react'
import styles from './ThemeProvider.module.css'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('smartflow-theme')
        return (saved as Theme) || 'light'
    })

    useEffect(() => {
        localStorage.setItem('smartflow-theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={`${styles.themeProvider} ${styles[theme]}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}