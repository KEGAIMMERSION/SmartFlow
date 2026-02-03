import React from 'react'
import { Button } from '../shared/ui/Button/Button'
import { useTheme } from '../shared/ui/ThemeProvider/ThemeProvider'
import styles from './HomePage.module.css'

const HomePage: React.FC = () => {
    const {theme, toggleTheme} = useTheme()

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>SmartFlow Organizer</h1>
            <p className={styles.description}>Умный органайзер с аналитикой</p>

            <div className={styles.actions}>
                <Button variant="primary">Начать использовать</Button>
                <Button variant="outline" onClick={toggleTheme}>
                    Переключить тему ({theme})
                </Button>
            </div>
        </div>
    )
}

export default HomePage