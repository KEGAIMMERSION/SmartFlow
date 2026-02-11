import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute, PublicRoute } from '../shared/ui/ProtectedRoute/ProtectedRoute'
import { Layout } from '../widgets/Layout/Layout'
import { LoadingSpinner } from '../shared/ui/LoadingSpinner/LoadingSpinner'

const AuthPage = React.lazy(() => import('../pages/AuthPage/AuthPage'))
const DashboardPage = React.lazy(() => import('../pages/DashboardPage/DashboardPage'))
const HabitsPage = React.lazy(() => import('../pages/HabitsPage/HabitsPage'))
const TasksPage = React.lazy(() => import('../pages/TasksPage/TasksPage'))
const NotesPage = React.lazy(() => import('../pages/NotesPage/NotesPage'))
const AnalyticsPage = React.lazy(() => import('../pages/AnalyticsPage/AnalyticsPage'))
const SettingsPage = React.lazy(() => import('../pages/SettingsPage/SettingsPage'))

export const AppRouter: React.FC = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route
                    path="/auth"
                    element={
                        <PublicRoute>
                            <AuthPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="/dashboard" />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="habits" element={<HabitsPage />} />
                    <Route path="tasks" element={<TasksPage />} />
                    <Route path="notes" element={<NotesPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </Suspense>
    )
}