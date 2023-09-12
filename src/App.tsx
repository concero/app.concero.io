import { useState } from 'react'
import './styles/App.css'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { WagmiConfig } from 'wagmi'
import { Navigator } from './Navigator'
import { wagmiConfig } from './web3/wagmi'
import { WalletConnectModal } from './web3/WalletConnectModal'
import { ThemeProvider } from './hooks/themeContext'
import { SelectionProvider } from './hooks/SelectionContext'
import { Notifications } from './components/overlays/Notifications/Notifications'
import { NotificationsProvider } from './hooks/notificationsContext'
import { DataProvider } from './hooks/DataContext/DataContext'
import { FullScreenLoader } from './components/layout/FullScreenLoader/FullScreenLoader'

// import { ModalProvider } from './hooks/ModalContext'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  if (!process.env.DEVELOPMENT) {
    posthog.init(process.env.REACT_APP_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
    })
  }

  return (
    <PostHogProvider>
      <DataProvider>
        <SelectionProvider setIsLoading={setIsLoading}>
          <ThemeProvider>
            <NotificationsProvider>
              <Notifications />
              <WagmiConfig config={wagmiConfig}>
                {isLoading ? <FullScreenLoader /> : <Navigator />}
                <WalletConnectModal />
              </WagmiConfig>
            </NotificationsProvider>
          </ThemeProvider>
        </SelectionProvider>
      </DataProvider>
    </PostHogProvider>
  )
}

export default App
