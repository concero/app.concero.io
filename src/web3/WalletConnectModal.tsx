import { useContext } from 'react'
import { Web3Modal } from '@web3modal/react'
import { ethereumClient, projectId } from './wagmi'
import walletLogoDark from '../assets/branding/walletConnectLogoDark.png'
import walletLogoLight from '../assets/branding/walletConnectLogoLight.png'
import { ThemeContext } from '../hooks/themeContext'

export function WalletConnectModal() {
	const { theme, colors } = useContext(ThemeContext)

	return (
		<Web3Modal
			themeMode={theme}
			themeVariables={{
				'--w3m-accent-color': colors.primary.main,
				'--w3m-background-color': theme === 'light' ? 'rgb(255,255,255)' : colors.grey.darkest,
				'--w3m-logo-image-url': theme === 'light' ? walletLogoLight : walletLogoDark,
				'--w3m-overlay-backdrop-filter': 'blur(10px)',
				'--w3m-color-overlay': 'transparent',
			}}
			projectId={projectId!}
			ethereumClient={ethereumClient}
		/>
	)
}
