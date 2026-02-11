export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    subscription: 'free' | 'pro' | 'premium'
}

export interface AuthState {
    user: User | null
    token: string | null
    isLoading: boolean
    error: string | null
    isAuthenticated: boolean
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterData extends LoginCredentials {
    name: string
    confirmPassword: string
}