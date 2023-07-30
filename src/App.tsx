import './styles/App.css'
import { WagmiConfig } from 'wagmi'
import { Navigator } from './Navigator'
import { wagmiConfig } from './web3/wagmi'
import { WalletConnectModal } from './web3/WalletConnectModal'
import { ThemeProvider } from './hooks/themeContext'
import { SelectionProvider } from './hooks/SelectionContext'
import { Notifications } from './components/overlays/Notifications/Notifications'
import { NotificationsProvider } from './hooks/notificationsContext'

function App() {
  return (
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
  )
}

export default App
