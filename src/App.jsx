import { lazy, Suspense } from 'react'
import { LandingPage } from './LandingPage'
import { OwnerModeProvider } from './hooks/useOwnerMode'

const OwnerPanel = lazy(() => import('./components/OwnerPanel').then((m) => ({ default: m.OwnerPanel })))

export default function App() {
  return (
    <OwnerModeProvider>
      <LandingPage />
      <Suspense fallback={null}>
        <OwnerPanel />
      </Suspense>
    </OwnerModeProvider>
  )
}
