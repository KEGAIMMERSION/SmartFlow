import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner'

interface ProtectedRouteProps {
    children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAppSelector(state => state.auth)

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />
    }

    return <>{children}</>
}

interface PublicRouteProps {
    children: React.ReactNode
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAppSelector(state => state.auth)

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>
}