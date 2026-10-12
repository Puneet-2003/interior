import { lazy, Suspense } from 'react'
import { LandingPage } from './LandingPage'
import { CategoryGalleryPage } from './components/CategoryGalleryPage'
import { OwnerModeProvider } from './hooks/useOwnerMode'
import { useRoute } from './lib/navigation'

const OwnerPanel = lazy(() => import('./components/OwnerPanel').then((m) => ({ default: m.OwnerPanel })))

export default function App() {
  const route = useRoute()

  return (
    <OwnerModeProvider>
      {route.page === 'gallery' ? (
        <CategoryGalleryPage section={route.section} slug={route.slug} />
      ) : (
        <LandingPage />
      )}
      <Suspense fallback={null}>
        <OwnerPanel />
      </Suspense>
    </OwnerModeProvider>
  )
}
