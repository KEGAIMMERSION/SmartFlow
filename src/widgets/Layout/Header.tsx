import React from 'react'
import { Search, Bell } from 'lucide-react'
import { Input } from '../../shared/ui/Input/Input'
import styles from './Header.module.css'

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.search}>
                <Search size={20} className={styles.searchIcon} />
                <Input
                    placeholder="Поиск..."
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.actions}>
                <button className={styles.notificationButton}>
                    <Bell size={20} />
                    <span className={styles.badge}>3</span>
                </button>

                <div className={styles.user}>
                    <div className={styles.avatar}>
                        <span className={styles.avatarText}>U</span>
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>Пользователь</span>
                        <span className={styles.userEmail}>user@example.com</span>
                    </div>
                </div>
            </div>
        </header>
    )
}