import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { login, register, clearError } from '../../features/auth/authSlice'
import { Button } from '../../shared/ui/Button/Button'
import { Input } from '../../shared/ui/Input/Input'
import styles from './AuthPage.module.css'

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { isLoading, error, isAuthenticated } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard')
        }
    }, [isAuthenticated, navigate])

    useEffect(() => {
        dispatch(clearError())
    }, [isLogin, dispatch])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.email) {
            newErrors.email = 'Email обязателен'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Некорректный email'
        }

        if (!formData.password) {
            newErrors.password = 'Пароль обязателен'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен быть не менее 6 символов'
        }

        if (!isLogin) {
            if (!formData.name) {
                newErrors.name = 'Имя обязательно'
            }

            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Подтвердите пароль'
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Пароли не совпадают'
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        if (isLogin) {
            await dispatch(login({
                email: formData.email,
                password: formData.password
            }))
        } else {
            await dispatch(register({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                confirmPassword: formData.confirmPassword
            }))
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }))
        }
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
                    {!isLogin && (
                        <Input
                            label="Имя"
                            placeholder="Ваше имя"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            error={errors.name}
                            required
                        />
                    )}

                    <Input
                        label="Email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        error={errors.email}
                        required
                    />

                    <Input
                        label="Пароль"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        error={errors.password}
                        required
                    />

                    {!isLogin && (
                        <Input
                            label="Подтвердите пароль"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            error={errors.confirmPassword}
                            required
                        />
                    )}

                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={isLoading}
                        className={styles.submitButton}
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

                    <div className={styles.demoCredentials}>
                        <p>Демо доступ:</p>
                        <p>Email: test@example.com</p>
                        <p>Пароль: password</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage