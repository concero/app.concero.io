import './App.css'
import { Navigator } from './Navigator'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from './web3/rainbowKit'
import { WalletConnectModal } from './web3/WalletConnectModal'

function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Navigator />
        <WalletConnectModal />
      </WagmiConfig>
    </>
  )
}

export default App
