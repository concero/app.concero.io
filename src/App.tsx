import './styles/App.css'
import { PostHogProvider } from 'posthog-js/react'
import { WagmiProvider } from 'wagmi'
import { Navigator } from './Navigator'
import { config } from './utils/web3/wagmi'
import { useEffect } from 'react'
import { I18Provider } from './i18n/I18nextProvider'
import { initPosthog } from './utils/initPosthog'
import { bigNumberSettings } from './utils/bigNumberSettings'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './shared/api/tanstackClient'

function App() {
	useEffect(() => {
		initPosthog()
		bigNumberSettings()
	}, [])

	return (
		<PostHogProvider>
			<I18Provider>
				<WagmiProvider config={config}>
					<QueryClientProvider client={queryClient}>
						<Navigator />
						<ReactQueryDevtools initialIsOpen={false} />
					</QueryClientProvider>
				</WagmiProvider>
			</I18Provider>
		</PostHogProvider>
	)
}

export default App
