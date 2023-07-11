import './styles/App.css'
import { WagmiConfig } from 'wagmi'
import { Navigator } from './Navigator'
import { wagmiConfig } from './web3/wagmi'
import { WalletConnectModal } from './web3/WalletConnectModal'
import { ThemeProvider } from './hooks/themeContext'

function App() {
  return (
    <ThemeProvider>
      <WagmiConfig config={wagmiConfig}>
        <Navigator />
        <WalletConnectModal />
      </WagmiConfig>
    </ThemeProvider>
  )
}

export default App
