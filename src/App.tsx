import './styles/App.css'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './web3/wagmi'
import { PostHogProvider } from 'posthog-js/react'
import { I18Provider } from './i18n/I18nextProvider'
import { DataProvider } from './hooks/DataContext/DataContext'
import { SelectionProvider } from './hooks/SelectionContext'
import { ThemeProvider } from './hooks/themeContext'
import { NotificationsProvider } from './hooks/notificationsContext'
import { Notifications } from './components/overlays/Notifications/Notifications'
import { Navigator } from './Navigator'
import { useEffect } from 'react'
import { initPosthog } from './utils/initPosthog'
import { bigNumberSettings } from './utils/bigNumberSettings'

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
						<DataProvider>
							<SelectionProvider>
								<ThemeProvider>
									<NotificationsProvider>
										<Notifications />
										<Navigator />
									</NotificationsProvider>
								</ThemeProvider>
							</SelectionProvider>
						</DataProvider>
					</QueryClientProvider>
				</WagmiProvider>
			</I18Provider>
		</PostHogProvider>
	)
}
export default App
