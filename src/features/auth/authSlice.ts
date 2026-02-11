import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, User, LoginCredentials, RegisterData } from './types'

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'),
}

const mockApi = {
    login: async (credentials: LoginCredentials): Promise<{user: User; token: string}> => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
            return {
                user: {
                    id: '1',
                    email: 'credentials.email',
                    name: 'Тестовый пользователь',
                    subscription: 'pro'
                },
                token: 'mock-jwt-token'
            }
        }
        throw new Error('Неверные учетные данные')
    },

    register: async (data: RegisterData): Promise<{ user: User; token: string }> => {
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (data.password !== data.confirmPassword) {
            throw new Error('Пароли не совпадают')
        }

        return {
            user: {
                id: Date.now().toString(),
                email: data.email,
                name: data.name,
                subscription: 'free'
            },
            token: 'mock-jwt-token-new'
        }
    },

    logout: async (): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 1000))
    }
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await mockApi.login(credentials)
            localStorage.setItem('token', response.token)
            return response
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Ошибка авторизации')
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (data: RegisterData, { rejectWithValue }) => {
        try {
            const response = await mockApi.register(data)
            localStorage.setItem('token', response.token)
            return response
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Ошибка регистрации')
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await mockApi.logout()
            localStorage.removeItem('token')
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Ошибка выхода')
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
                state.isLoading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuthenticated = true
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
                state.isLoading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuthenticated = true
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
                state.token = null
                state.isAuthenticated = false
            })
    },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer