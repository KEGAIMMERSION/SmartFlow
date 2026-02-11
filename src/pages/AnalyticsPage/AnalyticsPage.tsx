import React, { useState } from 'react'
import { Card } from '../../shared/ui/Card/Card'
import { Button } from '../../shared/ui/Button/Button'
import {
    BarChart3,
    Target,
    PieChart,
    Activity,
    Download,
    LineChart
} from 'lucide-react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart as RePieChart,
    Pie,
    Cell,
    LineChart as ReLineChart,
    Line,
    ResponsiveContainer
} from 'recharts'
import styles from './AnalyticsPage.module.css'

const AnalyticsPage: React.FC = () => {
    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week')

    const productivityData = [
        { day: 'Пн', продуктивность: 65, привычки: 80 },
        { day: 'Вт', продуктивность: 78, привычки: 85 },
        { day: 'Ср', продуктивность: 45, привычки: 60 },
        { day: 'Чт', продуктивность: 82, привычки: 90 },
        { day: 'Пт', продуктивность: 56, привычки: 75 },
        { day: 'Сб', продуктивность: 90, привычки: 95 },
        { day: 'Вс', продуктивность: 70, привычки: 80 },
    ]

    const timeDistributionData = [
        { name: 'Работа', value: 40, color: '#10B981' },
        { name: 'Обучение', value: 25, color: '#3B82F6' },
        { name: 'Отдых', value: 20, color: '#8B5CF6' },
        { name: 'Спорт', value: 15, color: '#F59E0B' },
    ]

    const trendData = [
        { month: 'Янв', продуктивность: 65, задачи: 45 },
        { month: 'Фев', продуктивность: 70, задачи: 50 },
        { month: 'Мар', продуктивность: 75, задачи: 55 },
        { month: 'Апр', продуктивность: 68, задачи: 60 },
        { month: 'Май', продуктивность: 82, задачи: 65 },
        { month: 'Июн', продуктивность: 78, задачи: 70 },
        { month: 'Июл', продуктивность: 85, задачи: 75 },
    ]

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

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles.customTooltip}>
                    <p className={styles.tooltipLabel}>{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }}>
                            {entry.name}: {entry.value}%
                        </p>
                    ))}
                </div>
            )
        }
        return null
    }

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

            <div className={styles.chartsGrid}>
                <Card className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <BarChart3 size={20} />
                        <h3>Продуктивность по дням</h3>
                    </div>
                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={productivityData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar dataKey="продуктивность" fill="#4f46e5" name="Продуктивность" />
                                <Bar dataKey="привычки" fill="#10b981" name="Выполнение привычек" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <PieChart size={20} />
                        <h3>Распределение времени</h3>
                    </div>
                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height={300}>
                            <RePieChart>
                                <Pie
                                    data={timeDistributionData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => `${entry.name}: ${entry.value}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {timeDistributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </RePieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <LineChart size={20} />
                        <h3>Динамика за полгода</h3>
                    </div>
                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height={300}>
                            <ReLineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="продуктивность"
                                    stroke="#4f46e5"
                                    strokeWidth={2}
                                    name="Продуктивность"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="задачи"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    name="Выполненные задачи"
                                />
                            </ReLineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className={styles.chartCard}>
                    <div className={styles.chartHeader}>
                        <Target size={20} />
                        <h3>Выполнение привычек</h3>
                    </div>
                    <div className={styles.habitsProgress}>
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

            <Card className={styles.aiCard}>
                <div className={styles.aiHeader}>
                    <h3>AI рекомендации</h3>
                    <Activity size={20} />
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
                    <Button variant="ghost">Показать подробный отчет</Button>
                </div>
            </Card>
        </div>
    )
}

export default AnalyticsPage