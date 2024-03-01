import './styles/App.css'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from './web3/wagmi'
import { lazy, useEffect } from 'react'
import { initPosthog } from './utils/initPosthog'
import { bigNumberSettings } from './utils/bigNumberSettings'
import { EthersTest } from './components/screens/EthersTest'

const WalletConnectModal = lazy(
	async () => await import('./web3/WalletConnectModal').then(module => ({ default: module.WalletConnectModal })),
)

function App() {
	useEffect(() => {
		initPosthog()
		bigNumberSettings()
	}, [])

	return (
		<WagmiConfig config={wagmiConfig}>
			<EthersTest />
		</WagmiConfig>
	)
}

export default App
