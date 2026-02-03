import React, { useState } from 'react'
import { Card } from '../../shared/ui/Card/Card'
import { Button } from '../../shared/ui/Button/Button'
import {
    BarChart3,
    TrendingUp,
    Calendar,
    Target,
    PieChart,
    Activity,
    Download
} from 'lucide-react'
import styles from './AnalyticsPage.module.css'

const AnalyticsPage: React.FC = () => {
    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week')

    const productivityData = {
        week: [65, 78, 45, 82, 56, 90, 70],
        month: [65, 78, 45, 82, 56, 90, 70, 65, 78, 45, 82, 56, 90, 70, 65, 78, 45, 82, 56, 90, 70, 65, 78, 45, 82, 56, 90, 70, 65, 78],
        year: [65, 78, 45, 82, 56, 90, 70, 65, 78, 45, 82, 56]
    }

    const habitStats = [
        { name: 'Утренняя зарядка', completion: 95, color: '#10B981' },
        { name: 'Чтение', completion: 80, color: '#3B82F6' },
        { name: 'Медитация', completion: 65, color: '#8B5CF6' },
        { name: 'Прогулка', completion: 75, color: '#F59E0B' },
    ]

    const aiRecommendations = [
        'Вы наиболее продуктивны в среду и четверг',
        'Попробуйте выполнять важные задачи до 12:00',
        'Делайте короткие перерывы каждые 45 минут',
        'Ваша продуктивность увеличилась на 15% за месяц'
    ]

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Аналитика</h1>
                    <p className={styles.subtitle}>Анализ вашей продуктивности и привычек</p>
                </div>
                <Button variant="outline">
                    <Download size={20} />
                    Экспорт данных
                </Button>
            </div>

            <div className={styles.timeControls}>
                <Button
                    variant={timeRange === 'week' ? 'primary' : 'outline'}
                    onClick={() => setTimeRange('week')}
                >
                    Неделя
                </Button>
                <Button
                    variant={timeRange === 'month' ? 'primary' : 'outline'}
                    onClick={() => setTimeRange('month')}
                >
                    Месяц
                </Button>
                <Button
                    variant={timeRange === 'year' ? 'primary' : 'outline'}
                    onClick={() => setTimeRange('year')}
                >
                    Год
                </Button>
            </div>

            <div className={styles.statsGrid}>
                <Card className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <Activity size={24} />
                        <h3>Продуктивность</h3>
                    </div>
                    <div className={styles.chartContainer}>
                        <div className={styles.barChart}>
                            {productivityData[timeRange].map((value, index) => (
                                <div key={index} className={styles.bar}>
                                    <div
                                        className={styles.barFill}
                                        style={{ height: `${value}%` }}
                                        title={`${value}%`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.statFooter}>
                        <span className={styles.statValue}>78%</span>
                        <span className={styles.statChange}>+5%</span>
                    </div>
                </Card>

                <Card className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <Target size={24} />
                        <h3>Выполнение привычек</h3>
                    </div>
                    <div className={styles.habitsChart}>
                        {habitStats.map((habit, index) => (
                            <div key={index} className={styles.habitBar}>
                                <div className={styles.habitInfo}>
                                    <span className={styles.habitName}>{habit.name}</span>
                                    <span className={styles.habitPercent}>{habit.completion}%</span>
                                </div>
                                <div className={styles.habitProgress}>
                                    <div
                                        className={styles.habitProgressFill}
                                        style={{
                                            width: `${habit.completion}%`,
                                            backgroundColor: habit.color
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className={styles.contentGrid}>
                <Card className={styles.card}>
                    <div className={styles.cardHeader}>
                        <BarChart3 size={20} />
                        <h3>Тенденции</h3>
                    </div>
                    <div className={styles.trendsList}>
                        <div className={styles.trendItem}>
                            <TrendingUp size={16} className={styles.trendUp} />
                            <span>Продуктивность увеличивается по утрам</span>
                        </div>
                        <div className={styles.trendItem}>
                            <TrendingUp size={16} className={styles.trendUp} />
                            <span>Лучший день недели: Четверг</span>
                        </div>
                        <div className={styles.trendItem}>
                            <TrendingUp size={16} className={styles.trendUp} />
                            <span>Привычки выполняются на 85%</span>
                        </div>
                    </div>
                </Card>

                <Card className={styles.card}>
                    <div className={styles.cardHeader}>
                        <PieChart size={20} />
                        <h3>Распределение времени</h3>
                    </div>
                    <div className={styles.timeDistribution}>
                        <div className={styles.distributionItem}>
                            <div className={styles.distributionColor} style={{ backgroundColor: '#10B981' }} />
                            <span>Работа: 40%</span>
                        </div>
                        <div className={styles.distributionItem}>
                            <div className={styles.distributionColor} style={{ backgroundColor: '#3B82F6' }} />
                            <span>Обучение: 25%</span>
                        </div>
                        <div className={styles.distributionItem}>
                            <div className={styles.distributionColor} style={{ backgroundColor: '#8B5CF6' }} />
                            <span>Отдых: 20%</span>
                        </div>
                        <div className={styles.distributionItem}>
                            <div className={styles.distributionColor} style={{ backgroundColor: '#F59E0B' }} />
                            <span>Спорт: 15%</span>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className={styles.aiCard}>
                <div className={styles.aiHeader}>
                    <h3>AI рекомендации</h3>
                    <Calendar size={20} />
                </div>
                <div className={styles.aiContent}>
                    {aiRecommendations.map((rec, index) => (
                        <div key={index} className={styles.aiRecommendation}>
                            <div className={styles.aiBullet} />
                            <p>{rec}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.aiFooter}>
                    <span className={styles.aiUpdate}>Обновлено сегодня в 9:00</span>
                    <Button variant="ghost">Подробнее</Button>
                </div>
            </Card>
        </div>
    )
}

export default AnalyticsPage