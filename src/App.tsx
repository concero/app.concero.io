import './styles/App.css'
import { PostHogProvider } from 'posthog-js/react'
import { WagmiProvider } from 'wagmi'
import { Navigator } from './Navigator'
import { config } from './web3/wagmi'
import { Notifications } from './components/overlays/Notifications/Notifications'
import { NotificationsProvider } from './hooks/notificationsContext'
import { useEffect } from 'react'
import { I18Provider } from './i18n/I18nextProvider'
import { initPosthog } from './utils/initPosthog'
import { bigNumberSettings } from './utils/bigNumberSettings'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
	useEffect(() => {
		initPosthog()
		bigNumberSettings()
	}, [])

	const queryClient = new QueryClient()

	return (
		<PostHogProvider>
			<I18Provider>
				<WagmiProvider config={config}>
					<QueryClientProvider client={queryClient}>
						<NotificationsProvider>
							<Notifications />
							<Navigator />
						</NotificationsProvider>
					</QueryClientProvider>
				</WagmiProvider>
			</I18Provider>
		</PostHogProvider>
	)
}

export default App
