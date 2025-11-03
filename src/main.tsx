import '@concero/ui-kit/styles/concero/index.css'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@concero/ui-kit'
import { QueryClientProvider } from '@tanstack/react-query'
import { PostHogProvider } from 'posthog-js/react'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './app/providers/ErrorBoundary/ErrorBoundary'
import { queryClient } from './shared/api/tanstackClient'
import { I18Provider } from './shared/i18n/I18nextProvider'
import { App } from './app/App'
import { StrictMode } from 'react'
import { Web3Provider } from './app/providers/Web3Provider/Web3Provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ErrorBoundary>
			<PostHogProvider
				options={{
					disable_session_recording: true,
				}}
			>
				<I18Provider>
					<QueryClientProvider client={queryClient}>
						<Web3Provider>
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
						</Web3Provider>
					</QueryClientProvider>
				</I18Provider>
			</PostHogProvider>
		</ErrorBoundary>
	</StrictMode>,
)
