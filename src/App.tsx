import './styles/App.css'

import { WagmiProvider } from 'wagmi'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiTest } from './components/screens/WagmiTest'
import { config } from './web3/wagmi'

// const WalletConnectModal = lazy(
// 	async () => await import('./web3/WalletConnectModal').then(module => ({ default: module.WalletConnectModal })),
// )

function App() {
	// useEffect(() => {
	// 	initPosthog()
	// 	bigNumberSettings()
	// }, [])

	// 0. Setup queryClient
	const queryClient = new QueryClient()

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<WagmiTest />
			</QueryClientProvider>
		</WagmiProvider>
	)
}
export default App
