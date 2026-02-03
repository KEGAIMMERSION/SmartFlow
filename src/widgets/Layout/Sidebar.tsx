import React from 'react'
import { NavLink } from 'react-router-dom'
import {
    Home,
    BarChart3,
    CheckSquare,
    StickyNote,
    Target,
    Settings,
    LogOut
} from 'lucide-react'
import { useTheme } from '../../shared/ui/ThemeProvider/ThemeProvider'
import { Button } from '../../shared/ui/Button/Button'
import styles from './Sidebar.module.css'

const navItems = [
    { path: '/dashboard', icon: Home, label: 'Дашборд' },
    { path: '/habits', icon: Target, label: 'Привычки' },
    { path: '/tasks', icon: CheckSquare, label: 'Задачи' },
    { path: '/notes', icon: StickyNote, label: 'Заметки' },
    { path: '/analytics', icon: BarChart3, label: 'Аналитика' },
    { path: '/settings', icon: Settings, label: 'Настройки' },
]

export const Sidebar: React.FC = () => {
    const { toggleTheme } = useTheme()

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <span className={styles.logoText}>SmartFlow</span>
            </div>

            <nav className={styles.nav}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.active : ''}`
                        }
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className={styles.footer}>
                <Button variant="outline" onClick={toggleTheme} className={styles.themeButton}>
                    Сменить тему
                </Button>

                <button className={styles.logoutButton}>
                    <LogOut size={20} />
                    <span>Выйти</span>
                </button>
            </div>
        </aside>
    )
}