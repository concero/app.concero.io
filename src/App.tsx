import './styles/App.css'
import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'
import { WagmiConfig } from 'wagmi'
import { Navigator } from './Navigator'
import { wagmiConfig } from './web3/wagmi'
import { WalletConnectModal } from './web3/WalletConnectModal'
import { ThemeProvider } from './hooks/themeContext'
import { SelectionProvider } from './hooks/SelectionContext'
import { Notifications } from './components/overlays/Notifications/Notifications'
import { NotificationsProvider } from './hooks/notificationsContext'

function App() {
  posthog.init(process.env.REACT_APP_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
  })
  return (
    <PostHogProvider>
      <ThemeProvider>
        <SelectionProvider>
          <NotificationsProvider>
            <Notifications />
            <WagmiConfig config={wagmiConfig}>
              <Navigator />
              <WalletConnectModal />
            </WagmiConfig>
          </NotificationsProvider>
        </SelectionProvider>
      </ThemeProvider>
    </PostHogProvider>
  )
}

export default App
