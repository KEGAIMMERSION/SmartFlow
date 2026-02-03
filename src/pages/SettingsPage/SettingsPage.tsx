import React, { useState } from 'react'
import { Card } from '../../shared/ui/Card/Card'
import { Button } from '../../shared/ui/Button/Button'
import { Input } from '../../shared/ui/Input/Input'
import { useTheme } from '../../shared/ui/ThemeProvider/ThemeProvider'
import {
    User,
    Bell,
    Lock,
    Palette,
    Globe,
    Download,
    Moon,
    Sun
} from 'lucide-react'
import styles from './SettingsPage.module.css'

const SettingsPage: React.FC = () => {
    const { theme, toggleTheme } = useTheme()
    const [settings, setSettings] = useState({
        name: 'Пользователь',
        email: 'user@example.com',
        notifications: true,
        emailNotifications: true,
        language: 'ru',
        timezone: 'Europe/Moscow',
    })

    const handleChange = (field: string, value: any) => {
        setSettings(prev => ({ ...prev, [field]: value }))
    }

    const exportData = () => {
        const data = {
            habits: [],
            tasks: [],
            notes: [],
            analytics: {}
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'smartflow-backup.json'
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Настройки</h1>
                <p className={styles.subtitle}>Управление вашим аккаунтом и приложением</p>
            </div>

            <div className={styles.settingsGrid}>
                <Card className={styles.settingCard}>
                    <div className={styles.settingHeader}>
                        <User size={20} />
                        <h3>Профиль</h3>
                    </div>

                    <div className={styles.settingForm}>
                        <Input
                            label="Имя"
                            value={settings.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />

                        <Input
                            label="Email"
                            type="email"
                            value={settings.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />

                        <div className={styles.settingActions}>
                            <Button variant="primary">Сохранить изменения</Button>
                        </div>
                    </div>
                </Card>

                <Card className={styles.settingCard}>
                    <div className={styles.settingHeader}>
                        <Bell size={20} />
                        <h3>Уведомления</h3>
                    </div>

                    <div className={styles.settingOptions}>
                        <div className={styles.settingOption}>
                            <div>
                                <h4>Push-уведомления</h4>
                                <p>Получать уведомления в браузере</p>
                            </div>
                            <label className={styles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={settings.notifications}
                                    onChange={(e) => handleChange('notifications', e.target.checked)}
                                />
                                <span className={styles.toggleSlider}></span>
                            </label>
                        </div>

                        <div className={styles.settingOption}>
                            <div>
                                <h4>Email уведомления</h4>
                                <p>Получать уведомления на почту</p>
                            </div>
                            <label className={styles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                                />
                                <span className={styles.toggleSlider}></span>
                            </label>
                        </div>
                    </div>
                </Card>

                <Card className={styles.settingCard}>
                    <div className={styles.settingHeader}>
                        <Palette size={20} />
                        <h3>Внешний вид</h3>
                    </div>

                    <div className={styles.themeSettings}>
                        <div className={styles.themeOption}>
                            <Button
                                variant={theme === 'light' ? 'primary' : 'outline'}
                                onClick={toggleTheme}
                                className={styles.themeButton}
                            >
                                <Sun size={20} />
                                Светлая тема
                            </Button>

                            <Button
                                variant={theme === 'dark' ? 'primary' : 'outline'}
                                onClick={toggleTheme}
                                className={styles.themeButton}
                            >
                                <Moon size={20} />
                                Темная тема
                            </Button>
                        </div>
                    </div>
                </Card>

                <Card className={styles.settingCard}>
                    <div className={styles.settingHeader}>
                        <Globe size={20} />
                        <h3>Язык и время</h3>
                    </div>

                    <div className={styles.settingForm}>
                        <div className={styles.selectContainer}>
                            <label>Язык</label>
                            <select
                                value={settings.language}
                                onChange={(e) => handleChange('language', e.target.value)}
                                className={styles.select}
                            >
                                <option value="ru">Русский</option>
                                <option value="en">English</option>
                            </select>
                        </div>

                        <div className={styles.selectContainer}>
                            <label>Часовой пояс</label>
                            <select
                                value={settings.timezone}
                                onChange={(e) => handleChange('timezone', e.target.value)}
                                className={styles.select}
                            >
                                <option value="Europe/Moscow">Москва (UTC+3)</option>
                                <option value="Europe/London">Лондон (UTC+0)</option>
                                <option value="America/New_York">Нью-Йорк (UTC-5)</option>
                            </select>
                        </div>
                    </div>
                </Card>

                <Card className={styles.settingCard}>
                    <div className={styles.settingHeader}>
                        <Lock size={20} />
                        <h3>Безопасность</h3>
                    </div>

                    <div className={styles.securitySettings}>
                        <Button variant="outline" className={styles.securityButton}>
                            Сменить пароль
                        </Button>
                        <Button variant="outline" className={styles.securityButton}>
                            Двухфакторная аутентификация
                        </Button>
                    </div>
                </Card>

                <Card className={styles.settingCard}>
                    <div className={styles.settingHeader}>
                        <Download size={20} />
                        <h3>Данные</h3>
                    </div>

                    <div className={styles.dataSettings}>
                        <p className={styles.dataDescription}>
                            Вы можете экспортировать все свои данные для резервного копирования
                        </p>

                        <div className={styles.dataActions}>
                            <Button variant="outline" onClick={exportData}>
                                Экспорт данных
                            </Button>
                            <Button variant="ghost">
                                Удалить аккаунт
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default SettingsPage