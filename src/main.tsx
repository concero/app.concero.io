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

ReactDOM.createRoot(document.getElementById('root')!).render(
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
								<App />
							</ThemeProvider>
						</BrowserRouter>
					</QueryClientProvider>
				</WagmiProvider>
			</I18Provider>
		</PostHogProvider>
	</ErrorBoundary>,
)
