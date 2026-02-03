import React from 'react'
import { LoadingSpinner } from '../ui/LoadingSpinner/LoadingSpinner'

export function createLazyPage(importFunc: () => Promise<any>) {
    const LazyComponent = React.lazy(importFunc)

    const LazyPage: React.FC = () => {
        return (
            <React.Suspense fallback={<LoadingSpinner />}>
                <LazyComponent />
            </React.Suspense>
        )
    }

    return LazyPage
}