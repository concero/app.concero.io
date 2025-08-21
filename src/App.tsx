import './styles/App.css'
import { PostHogProvider } from 'posthog-js/react'
import { WagmiProvider } from 'wagmi'
import { Navigator } from './Navigator'
import { useEffect } from 'react'
import { initPosthog } from './utils/initPosthog'
import { bigNumberSettings } from './utils/bigNumberSettings'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './shared/api/tanstackClient'
import { I18Provider } from './shared/i18n/I18nextProvider'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from '@/app/providers/ErrorBoundary/ErrorBoundary'
import { ThemeProvider } from '@concero/ui-kit'
import { config } from './shared/api/wagmi'

function App() {
	useEffect(() => {
		initPosthog()
		bigNumberSettings()
	}, [])

	return (
		<ErrorBoundary>
			<PostHogProvider>
				<I18Provider>
					<WagmiProvider config={config}>
						<QueryClientProvider client={queryClient}>
							<BrowserRouter
								future={{
									v7_startTransition: true,
									v7_relativeSplatPath: true,
								}}
							>
								<ThemeProvider useSystemTheme storageSettings={{ persist: true }}>
									<Navigator />
								</ThemeProvider>
							</BrowserRouter>
						</QueryClientProvider>
					</WagmiProvider>
				</I18Provider>
			</PostHogProvider>
		</ErrorBoundary>
	)
}

export default App
