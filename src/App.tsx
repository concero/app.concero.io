import './styles/App.css'
import { WagmiConfig } from 'wagmi'
import { Navigator } from './Navigator'
import { wagmiConfig } from './web3/wagmi'
import { WalletConnectModal } from './web3/WalletConnectModal'
import { ThemeProvider } from './hooks/themeContext'
import { SelectionProvider } from './hooks/SelectionContext'

function App() {
  return (
    <ThemeProvider>
      <SelectionProvider>
        <WagmiConfig config={wagmiConfig}>
          <Navigator />
          <WalletConnectModal />
        </WagmiConfig>
      </SelectionProvider>
    </ThemeProvider>
  )
}

export default App
