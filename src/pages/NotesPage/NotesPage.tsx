import React, { useState } from 'react'
import { Card } from '../../shared/ui/Card/Card'
import { Button } from '../../shared/ui/Button/Button'
import { Input } from '../../shared/ui/Input/Input'
import { Textarea } from '../../shared/ui/Textarea/Textarea'
import { Plus, Edit, Trash2, Search, Folder } from 'lucide-react'
import styles from './NotesPage.module.css'

interface Note {
    id: string
    title: string
    content: string
    category: string
    createdAt: string
    updatedAt: string
}

const NotesPage: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([
        {
            id: '1',
            title: 'Идеи для проекта',
            content: 'Создать умный органайзер с аналитикой...',
            category: 'Проекты',
            createdAt: '2024-01-15',
            updatedAt: '2024-01-16'
        },
        {
            id: '2',
            title: 'Покупки',
            content: 'Молоко, хлеб, фрукты, кофе',
            category: 'Личное',
            createdAt: '2024-01-17',
            updatedAt: '2024-01-17'
        },
    ])

    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('Все')
    const [isEditing, setIsEditing] = useState(false)
    const [currentNote, setCurrentNote] = useState<Partial<Note>>({
        title: '',
        content: '',
        category: 'Личное'
    })

    const categories = ['Все', 'Личное', 'Работа', 'Проекты', 'Идеи']

    const filteredNotes = notes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) ||
            note.content.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = selectedCategory === 'Все' || note.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    const handleSaveNote = () => {
        if (!currentNote.title?.trim() || !currentNote.content?.trim()) return

        const now = new Date().toISOString().split('T')[0]

        if (currentNote.id) {
            setNotes(notes.map(note =>
                note.id === currentNote.id
                    ? { ...note, ...currentNote, updatedAt: now } as Note
                    : note
            ))
        } else {
            const newNote: Note = {
                id: Date.now().toString(),
                title: currentNote.title,
                content: currentNote.content,
                category: currentNote.category || 'Личное',
                createdAt: now,
                updatedAt: now
            }
            setNotes([...notes, newNote])
        }

        setIsEditing(false)
        setCurrentNote({ title: '', content: '', category: 'Личное' })
    }

    const handleEditNote = (note: Note) => {
        setCurrentNote(note)
        setIsEditing(true)
    }

    const handleDeleteNote = (id: string) => {
        setNotes(notes.filter(note => note.id !== id))
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Заметки</h1>
                <p className={styles.subtitle}>Храните свои мысли и идеи</p>
            </div>

            <div className={styles.controls}>
                <div className={styles.search}>
                    <Search size={20} className={styles.searchIcon} />
                    <Input
                        placeholder="Поиск заметок..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.categories}>
                    {categories.map(category => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            {isEditing ? (
                <Card className={styles.editorCard}>
                    <div className={styles.editorHeader}>
                        <Input
                            placeholder="Заголовок заметки"
                            value={currentNote.title || ''}
                            onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                            className={styles.titleInput}
                        />
                        <div className={styles.categorySelect}>
                            <select
                                value={currentNote.category || 'Личное'}
                                onChange={(e) => setCurrentNote({ ...currentNote, category: e.target.value })}
                            >
                                {categories.filter(c => c !== 'Все').map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <Textarea
                        placeholder="Содержание заметки..."
                        value={currentNote.content || ''}
                        onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                        className={styles.contentTextarea}
                        rows={10}
                    />

                    <div className={styles.editorActions}>
                        <Button variant="primary" onClick={handleSaveNote}>
                            Сохранить
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Отмена
                        </Button>
                    </div>
                </Card>
            ) : (
                <>
                    <Button
                        variant="primary"
                        className={styles.addButton}
                        onClick={() => {
                            setCurrentNote({ title: '', content: '', category: 'Личное' })
                            setIsEditing(true)
                        }}
                    >
                        <Plus size={20} />
                        Новая заметка
                    </Button>

                    <div className={styles.notesGrid}>
                        {filteredNotes.map(note => (
                            <Card key={note.id} className={styles.noteCard}>
                                <div className={styles.noteHeader}>
                                    <div className={styles.noteCategory}>
                                        <Folder size={16} />
                                        {note.category}
                                    </div>
                                    <div className={styles.noteActions}>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEditNote(note)}
                                        >
                                            <Edit size={16} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteNote(note.id)}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>

                                <h4 className={styles.noteTitle}>{note.title}</h4>
                                <p className={styles.noteContent}>{note.content}</p>

                                <div className={styles.noteFooter}>
                  <span className={styles.noteDate}>
                    Обновлено: {note.updatedAt}
                  </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default NotesPage