import '@concero/ui-kit/styles/concero/index.css'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@concero/ui-kit'
import { QueryClientProvider } from '@tanstack/react-query'
import { PostHogProvider } from 'posthog-js/react'
import { BrowserRouter } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'
import ErrorBoundary from './app/providers/ErrorBoundary/ErrorBoundary'
import { queryClient } from './shared/api/tanstackClient'
import { I18Provider } from './shared/i18n/I18nextProvider'
import { config } from './shared/api/wagmi'
import { App } from './app/App'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ErrorBoundary>
			<PostHogProvider
				options={{
					disable_session_recording: true,
				}}
			>
				<WagmiProvider config={config}>
					<I18Provider>
						<QueryClientProvider client={queryClient}>
							<BrowserRouter
								future={{
									v7_startTransition: true,
									v7_relativeSplatPath: true,
								}}
							>
								<ThemeProvider useSystemTheme storageSettings={{ persist: true }}>
									<App />
								</ThemeProvider>
							</BrowserRouter>
						</QueryClientProvider>
					</I18Provider>
				</WagmiProvider>
			</PostHogProvider>
		</ErrorBoundary>
	</StrictMode>,
)
