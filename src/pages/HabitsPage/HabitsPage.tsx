import React, { useState } from 'react'
import { Card } from '../../shared/ui/Card/Card'
import { Button } from '../../shared/ui/Button/Button'
import { Input } from '../../shared/ui/Input/Input'
import { Plus, Check, X, TrendingUp } from 'lucide-react'
import styles from './HabitsPage.module.css'

interface Habit{
    id: string
    title: string
    description: string
    streak: number
    frequency: 'daily' | 'weekly'
    completed: boolean
}

const HabitsPage: React.FC = () => {
    const [habits, setHabits] = useState<Habit[]>([
        { id: '1', title: 'Утренняя зарядка', description: '15 минут упражнений', streak: 21, frequency: 'daily', completed: true },
        { id: '2', title: 'Чтение', description: '30 минут чтения книги', streak: 14, frequency: 'daily', completed: true },
        { id: '3', title: 'Медитация', description: '10 минут медитации', streak: 7, frequency: 'daily', completed: false },
        { id: '4', title: 'Прогулка', description: 'Прогулка на свежем воздухе', streak: 30, frequency: 'daily', completed: false },
    ])

    const [newHabit, setNewHabit] = useState('')
    const [newDescription, setNewDescription] = useState('')

    const toggleHabit = (id: string) => {
        setHabits(habits.map(habit =>
            habit.id === id ? { ...habit, completed: !habit.completed, streak: habit.completed ? habit.streak : habit.streak + 1 } : habit
        ))
    }

    const addHabit = () => {
        if (!newHabit.trim()) return

        setHabits([
            ...habits,
            {
                id: Date.now().toString(),
                title: newHabit,
                description: newDescription,
                streak: 0,
                frequency: 'daily',
                completed: false
            }
        ])

        setNewHabit('')
        setNewDescription('')
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Привычки</h1>
                <p className={styles.subtitle}>Отслеживайте свои ежедневные ритуалы</p>
            </div>

            <div className={styles.stats}>
                <Card className={styles.statCard}>
                    <div className={styles.statContent}>
                        <TrendingUp size={24} />
                        <div>
                            <div className={styles.statNumber}>{habits.filter(h => h.completed).length}</div>
                            <div className={styles.statLabel}>Выполнено сегодня</div>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className={styles.addCard}>
                <h3 className={styles.cardTitle}>Добавить новую привычку</h3>
                <div className={styles.addForm}>
                    <Input
                        placeholder="Название привычки"
                        value={newHabit}
                        onChange={(e) => setNewHabit(e.target.value)}
                        className={styles.input}
                    />
                    <Input
                        placeholder="Описание"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className={styles.input}
                    />
                    <Button onClick={addHabit} className={styles.addButton}>
                        <Plus size={20} />
                        Добавить
                    </Button>
                </div>
            </Card>

            <div className={styles.habitsGrid}>
                {habits.map(habit => (
                    <Card key={habit.id} className={styles.habitCard}>
                        <div className={styles.habitHeader}>
                            <h4 className={styles.habitTitle}>{habit.title}</h4>
                            <Button
                                variant={habit.completed ? "primary" : "outline"}
                                size="sm"
                                onClick={() => toggleHabit(habit.id)}
                            >
                                {habit.completed ? <Check size={16} /> : <X size={16} />}
                                {habit.completed ? 'Выполнено' : 'Не выполнено'}
                            </Button>
                        </div>

                        <p className={styles.habitDescription}>{habit.description}</p>

                        <div className={styles.habitFooter}>
              <span className={styles.streak}>
                Серия: <strong>{habit.streak} дней</strong>
              </span>
                            <span className={styles.frequency}>
                {habit.frequency === 'daily' ? 'Ежедневно' : 'Еженедельно'}
              </span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default HabitsPage