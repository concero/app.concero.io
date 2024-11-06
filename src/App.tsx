import './styles/App.css'
import { PostHogProvider } from 'posthog-js/react'
import { WagmiProvider } from 'wagmi'
import { Navigator } from './Navigator'
import { config } from './web3/wagmi'
import { ThemeProvider } from './hooks/themeContext'
import { SelectionProvider } from './hooks/SelectionContext'
import { Notifications } from './components/overlays/Notifications/Notifications'
import { NotificationsProvider } from './hooks/notificationsContext'
import { DataProvider } from './hooks/DataContext/DataContext'
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

	// todo: we don't need SelectionProvider and DataProvider in app.concero.io anymore, these have to be removed.
	// todo: the dark mode should be implemented via themeProvider later
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
