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

// import { ModalProvider } from './hooks/ModalContext'

function App() {
  if (!process.env.DEVELOPMENT) {
    posthog.init(process.env.REACT_APP_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
    })
  }

  return (
    <PostHogProvider>
      <ThemeProvider>
        <SelectionProvider>
          {/* <ModalProvider> */}
          <NotificationsProvider>
            <Notifications />
            <WagmiConfig config={wagmiConfig}>
              <Navigator />
              <WalletConnectModal />
            </WagmiConfig>
          </NotificationsProvider>
          {/* </ModalProvider> */}
        </SelectionProvider>
      </ThemeProvider>
    </PostHogProvider>
  )
}

export default App
