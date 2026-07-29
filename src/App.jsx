import { LandingPage } from './LandingPage'
import { OwnerModeProvider } from './hooks/useOwnerMode'
import { OwnerPanel } from './components/OwnerPanel'

export default function App() {
  return (
    <OwnerModeProvider>
      <LandingPage />
      <OwnerPanel />
    </OwnerModeProvider>
  )
}
