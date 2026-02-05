import React, { useState } from 'react'
import { Card } from '../../shared/ui/Card/Card'
import { Button } from '../../shared/ui/Button/Button'
import { Input } from '../../shared/ui/Input/Input'
import { Plus, Check, Calendar, ChevronDown } from 'lucide-react'
import styles from './TasksPage.module.css'

interface Task {
    id: string
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
    dueDate: string
    completed: boolean
}

const priorityOptions = [
    { value: 'low', label: 'Низкий', color: '#10B981' },
    { value: 'medium', label: 'Средний', color: '#F59E0B' },
    { value: 'high', label: 'Высокий', color: '#EF4444' },
]

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
    const [editingPriority, setEditingPriority] = useState<string | null>(null)

    const toggleTask = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ))
    }

    const updateTaskPriority = (id: string, newPriority: 'low' | 'medium' | 'high') => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, priority: newPriority } : task
        ))
        setEditingPriority(null)
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

    const getPriorityColor = (priority: string) => {
        const option = priorityOptions.find(opt => opt.value === priority)
        return option?.color || '#6B7280'
    }

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
                        size="md"
                        onClick={() => setFilter('all')}
                    >
                        Все
                    </Button>
                    <Button
                        variant={filter === 'active' ? 'primary' : 'outline'}
                        size="md"
                        onClick={() => setFilter('active')}
                    >
                        Активные
                    </Button>
                    <Button
                        variant={filter === 'completed' ? 'primary' : 'outline'}
                        size="md"
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

                    <div className={styles.prioritySelect}>
                        <label>Приоритет:</label>
                        <div className={styles.priorityOptions}>
                            {priorityOptions.map(option => (
                                <button
                                    key={option.value}
                                    className={`${styles.priorityOption} ${priority === option.value ? styles.selected : ''}`}
                                    onClick={() => setPriority(option.value as typeof priority)}
                                    style={{ borderColor: option.color }}
                                >
                                    <div
                                        className={styles.priorityDot}
                                        style={{ backgroundColor: option.color }}
                                    />
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button
                        onClick={addTask}
                        className={styles.addButton}
                        size="lg"
                        variant="primary"
                    >
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
                                {editingPriority === task.id ? (
                                    <div className={styles.priorityEditor}>
                                        {priorityOptions.map(option => (
                                            <button
                                                key={option.value}
                                                className={styles.priorityEditorOption}
                                                onClick={() => updateTaskPriority(task.id, option.value as typeof task.priority)}
                                                style={{ backgroundColor: option.color }}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                        <button
                                            className={styles.cancelEdit}
                                            onClick={() => setEditingPriority(null)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <div className={styles.priorityContainer}>
                                        <button
                                            className={styles.priorityDisplay}
                                            onClick={() => setEditingPriority(task.id)}
                                            style={{
                                                backgroundColor: getPriorityColor(task.priority) + '20',
                                                color: getPriorityColor(task.priority),
                                                borderColor: getPriorityColor(task.priority)
                                            }}
                                        >
                                            <div
                                                className={styles.priorityDot}
                                                style={{ backgroundColor: getPriorityColor(task.priority) }}
                                            />
                                            {priorityOptions.find(opt => opt.value === task.priority)?.label}
                                            <ChevronDown size={14} />
                                        </button>
                                    </div>
                                )}

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