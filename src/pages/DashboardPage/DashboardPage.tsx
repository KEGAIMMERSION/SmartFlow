import React from 'react'
import { Card } from '../../shared/ui/Card/Card'
import { Button } from '../../shared/ui/Button/Button'
import { TrendingUp, CheckCircle, Clock, BarChart } from 'lucide-react'
import styles from './DashboardPage.module.css'

const DashboardPage: React.FC = () => {
    const stats = [
        { label: 'Активных привычек', value: '12', icon: <TrendingUp />, change: '+2' },
        { label: 'Выполнено задач', value: '45', icon: <CheckCircle />, change: '+5' },
        { label: 'Запланировано', value: '8', icon: <Clock />, change: '-1' },
        { label: 'Продуктивность', value: '78%', icon: <BarChart />, change: '+3%' },
    ]

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Дашборд</h1>
                <p className={styles.subtitle}>Обзор вашей продуктивности</p>
            </div>
            <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <Card key={index} className={styles.statCard}>
                        <div className={styles.statContent}>
                            <div className={styles.statIcon}>{stat.icon}</div>
                            <div>
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </div>
                            <div className={styles.statChange}>{stat.change}</div>
                        </div>
                    </Card>
                ))}
            </div>
            <div className={styles.contentGrid}>
                <Card className={styles.card}>
                    <h3 className={styles.cardTitle}>Быстрые действия</h3>
                    <div className={styles.actions}>
                        <Button variant="primary">Добавить задачу</Button>
                        <Button variant="outline">Создать заметку</Button>
                        <Button variant="outline">Запланировать</Button>
                    </div>
                </Card>

                <Card className={styles.card}>
                    <h3 className={styles.cardTitle}>Последние активность</h3>
                    <div className={styles.activityList}>
                        <div className={styles.activityItem}>
                            <span>Вы выполнили "Утренняя зарядка"</span>
                            <span className={styles.activityTime}>2 часа назад</span>
                        </div>
                        <div className={styles.activityItem}>
                            <span>Добавлена задача "Подготовить отчет"</span>
                            <span className={styles.activityTime}>Вчера</span>
                        </div>
                    </div>
                </Card>
            </div>
            <div className={styles.aiSection}>
                <Card className={styles.aiCard}>
                    <h3 className={styles.cardTitle}>AI рекомендации</h3>
                    <p className={styles.aiText}>
                        На основе вашей активности, рекомендуем увеличить время на утренние ритуалы.
                        Вы наиболее продуктивны с 9:00 до 12:00.
                    </p>
                    <Button variant="ghost">Показать больше</Button>
                </Card>
            </div>
        </div>
    )
}

export default DashboardPage