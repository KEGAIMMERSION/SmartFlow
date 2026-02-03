import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { createLazyPage } from '../shared/lib/createLazyPage'
import { Layout } from '../widgets/Layout/Layout'

const AuthPage = createLazyPage(() => import('../pages/AuthPage/AuthPage'))
const DashboardPage = createLazyPage(() => import('../pages/DashboardPage/DashboardPage'))
const HabitsPage = createLazyPage(() => import('../pages/HabitsPage/HabitsPage'))
const TasksPage = createLazyPage(() => import('../pages/TasksPage/TasksPage'))
const NotesPage = createLazyPage(() => import('../pages/NotesPage/NotesPage'))
const AnalyticsPage = createLazyPage(() => import('../pages/AnalyticsPage/AnalyticsPage'))
const SettingsPage = createLazyPage(() => import('../pages/SettingsPage/SettingsPage'))

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/auth" element={<AuthPage />} />

            <Route path="/" element={<Layout />}>
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
    )
}