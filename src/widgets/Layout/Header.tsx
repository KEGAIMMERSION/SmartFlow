import React, {useState} from 'react'
import { Search } from 'lucide-react'
import { Input } from '../../shared/ui/Input/Input'
import {Notifications} from "../../features/notifications/Notifications.tsx";
import styles from './Header.module.css'

export const Header: React.FC = () => {
    const [search, setSearch] = useState('')

    return (
        <header className={styles.header}>
            <div className={styles.search}>
                <Input
                    placeholder="Поиск задач, заметок..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    icon={<Search size={20} />}
                    className={styles.searchInput}
                />
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