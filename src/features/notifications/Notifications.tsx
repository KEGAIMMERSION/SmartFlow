import React, { useState } from 'react'
import { Card } from '../../shared/ui/Card/Card'
import { Button } from '../../shared/ui/Button/Button'
import { Bell, Check, X, AlertCircle, Info } from 'lucide-react'
import styles from './Notifications.module.css'

interface Notification {
    id: string
    title: string
    message: string
    type: 'info' | 'warning' | 'success'
    time: string
    read: boolean
}

export const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: '1', title: 'Новая задача', message: 'Вам назначена новая задача "Подготовить отчет"', type: 'info', time: '10 минут назад', read: false },
        { id: '2', title: 'Привычка выполнена', message: 'Вы выполнили привычку "Утренняя зарядка"', type: 'success', time: '2 часа назад', read: false },
        { id: '3', title: 'Срок истекает', message: 'Задача "Встреча с командой" истекает завтра', type: 'warning', time: 'Вчера', read: true },
    ])
    const [isOpen, setIsOpen] = useState(false)

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
        ))
    }

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })))
    }

    const clearAll = () => {
        setNotifications([])
    }

    const unreadCount = notifications.filter(n => !n.read).length

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'info': return <Info size={16} />
            case 'warning': return <AlertCircle size={16} />
            case 'success': return <Check size={16} />
        }
    }

    return (
        <div className={styles.container}>
            <button
                className={styles.notificationButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className={styles.badge}>{unreadCount}</span>
                )}
            </button>

            {isOpen && (
                <Card className={styles.notificationsPanel}>
                    <div className={styles.panelHeader}>
                        <h3>Уведомления</h3>
                        <div className={styles.panelActions}>
                            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                                Прочитать все
                            </Button>
                            <Button variant="ghost" size="sm" onClick={clearAll}>
                                Очистить
                            </Button>
                            <button
                                className={styles.closeButton}
                                onClick={() => setIsOpen(false)}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    <div className={styles.notificationsList}>
                        {notifications.length === 0 ? (
                            <div className={styles.empty}>Нет уведомлений</div>
                        ) : (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    className={`${styles.notificationItem} ${notification.read ? styles.read : ''}`}
                                >
                                    <div className={`${styles.notificationIcon} ${styles[notification.type]}`}>
                                        {getIcon(notification.type)}
                                    </div>

                                    <div className={styles.notificationContent}>
                                        <h4 className={styles.notificationTitle}>{notification.title}</h4>
                                        <p className={styles.notificationMessage}>{notification.message}</p>
                                        <span className={styles.notificationTime}>{notification.time}</span>
                                    </div>

                                    {!notification.read && (
                                        <button
                                            className={styles.markReadButton}
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <Check size={14} />
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    <div className={styles.panelFooter}>
                        <Button variant="ghost" size="sm">
                            Показать все
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    )
}