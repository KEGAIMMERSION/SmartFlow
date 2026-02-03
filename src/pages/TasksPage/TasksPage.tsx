import React, { useState } from 'react'
import { Card } from '../../shared/ui/Card/Card'
import { Button } from '../../shared/ui/Button/Button'
import { Input } from '../../shared/ui/Input/Input'
import { Plus, Check, Calendar } from 'lucide-react'
import styles from './TasksPage.module.css'

interface Task {
    id: string
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
    dueDate: string
    completed: boolean
}

const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', title: 'Подготовить отчет', description: 'Еженедельный отчет по проекту', priority: 'high', dueDate: '2024-01-20', completed: false },
        { id: '2', title: 'Встреча с командой', description: 'Обсуждение планов на неделю', priority: 'medium', dueDate: '2024-01-18', completed: true },
        { id: '3', title: 'Изучить новые технологии', description: 'Изучить React 18 и новые фичи', priority: 'low', dueDate: '2024-01-25', completed: false },
        { id: '4', title: 'Обновить документацию', description: 'Дописать документацию к проекту', priority: 'medium', dueDate: '2024-01-22', completed: false },
    ])

    const [newTask, setNewTask] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

    const toggleTask = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }

    const addTask = () => {
        if (!newTask.trim()) return

        setTasks([
            ...tasks,
            {
                id: Date.now().toString(),
                title: newTask,
                description: newDescription,
                priority,
                dueDate: new Date().toISOString().split('T')[0],
                completed: false
            }
        ])

        setNewTask('')
        setNewDescription('')
        setPriority('medium')
    }

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed
        if (filter === 'completed') return task.completed
        return true
    })

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Задачи</h1>
                <p className={styles.subtitle}>Управляйте своими задачами и проектами</p>
            </div>

            <div className={styles.controls}>
                <div className={styles.filters}>
                    <Button
                        variant={filter === 'all' ? 'primary' : 'outline'}
                        onClick={() => setFilter('all')}
                    >
                        Все
                    </Button>
                    <Button
                        variant={filter === 'active' ? 'primary' : 'outline'}
                        onClick={() => setFilter('active')}
                    >
                        Активные
                    </Button>
                    <Button
                        variant={filter === 'completed' ? 'primary' : 'outline'}
                        onClick={() => setFilter('completed')}
                    >
                        Выполненные
                    </Button>
                </div>
            </div>

            <Card className={styles.addCard}>
                <h3 className={styles.cardTitle}>Добавить новую задачу</h3>
                <div className={styles.addForm}>
                    <Input
                        placeholder="Название задачи"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className={styles.input}
                    />
                    <Input
                        placeholder="Описание"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className={styles.input}
                    />
                    <div className={styles.selectContainer}>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as typeof priority)}
                            className={styles.select}
                        >
                            <option value="low">Низкий</option>
                            <option value="medium">Средний</option>
                            <option value="high">Высокий</option>
                        </select>
                    </div>

                    <Button onClick={addTask} className={styles.addButton}>
                        <Plus size={20} />
                        Добавить задачу
                    </Button>
                </div>
            </Card>

            <div className={styles.tasksList}>
                {filteredTasks.map(task => (
                    <Card key={task.id} className={`${styles.taskCard} ${task.completed ? styles.completed : ''}`}>
                        <div className={styles.taskHeader}>
                            <div className={styles.taskCheckbox} onClick={() => toggleTask(task.id)}>
                                {task.completed ? <Check size={20} /> : <div className={styles.checkbox} />}
                            </div>

                            <div className={styles.taskInfo}>
                                <h4 className={styles.taskTitle}>{task.title}</h4>
                                <p className={styles.taskDescription}>{task.description}</p>
                            </div>

                            <div className={styles.taskMeta}>
                <span className={`${styles.priority} ${styles[task.priority]}`}>
                  {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                </span>
                                <div className={styles.dueDate}>
                                    <Calendar size={16} />
                                    {task.dueDate}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default TasksPage