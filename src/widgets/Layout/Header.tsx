import React from 'react'
import { Search } from 'lucide-react'
import { Notifications } from '../../features/notifications/Notifications'
import styles from './Header.module.css'

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.searchContainer}>
                <div className={styles.searchWrapper}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Поиск задач, заметок, привычек..."
                        className={styles.searchInput}
                    />
                </div>
            </div>

            <div className={styles.actions}>
                <Notifications />

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