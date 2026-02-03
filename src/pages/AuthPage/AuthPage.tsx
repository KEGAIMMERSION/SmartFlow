import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../shared/ui/Button/Button'
import { Input } from '../../shared/ui/Input/Input'
import styles from './AuthPage.module.css'


const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            navigate('/dashboard')
        }, 1000)
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>SmartFlow</h1>
                    <p className={styles.subtitle}>
                        {isLogin ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {!isLogin && (
                        <Input
                            type="password"
                            placeholder="Подтвердите пароль"
                            required
                        />
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={loading}
                        fullWidth
                    >
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                </form>

                <div className={styles.footer}>
                    <button
                        type="button"
                        className={styles.toggleButton}
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage