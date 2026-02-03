import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '../shared/ui/ThemeProvider/ThemeProvider'
import { store } from './store'
import { AppRouter } from './router'
import styles from './App.module.css'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <BrowserRouter>
                    <div className={styles.app}>
                        <AppRouter />
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    )
}

export default App