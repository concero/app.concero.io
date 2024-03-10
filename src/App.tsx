import './styles/App.css'
import { PostHogProvider } from 'posthog-js/react'
import { WagmiConfig } from 'wagmi'
import { Navigator } from './Navigator'
import { wagmiConfig } from './web3/wagmi'
import { ThemeProvider } from './hooks/themeContext'
import { SelectionProvider } from './hooks/SelectionContext'
import { Notifications } from './components/overlays/Notifications/Notifications'
import { NotificationsProvider } from './hooks/notificationsContext'
import { DataProvider } from './hooks/DataContext/DataContext'
import { lazy, useEffect } from 'react'
import { I18Provider } from './i18n/I18nextProvider'
import { initPosthog } from './utils/initPosthog'
import { bigNumberSettings } from './utils/bigNumberSettings'
import { FeatureFlagProvider } from './hooks/FeatureFlagContext'

const WalletConnectModal = lazy(
	async () => await import('./web3/WalletConnectModal').then(module => ({ default: module.WalletConnectModal })),
)

function App() {
	useEffect(() => {
		initPosthog()
		bigNumberSettings()
	}, [])

	return (
		<PostHogProvider>
			<FeatureFlagProvider>
				<I18Provider>
					<WagmiConfig config={wagmiConfig}>
						<DataProvider>
							<SelectionProvider>
								<ThemeProvider>
									<NotificationsProvider>
										<Notifications />
										<Navigator />
										<WalletConnectModal />
									</NotificationsProvider>
								</ThemeProvider>
							</SelectionProvider>
						</DataProvider>
					</WagmiConfig>
				</I18Provider>
			</FeatureFlagProvider>
		</PostHogProvider>
	)
}

export default App
