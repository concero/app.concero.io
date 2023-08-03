import { Web3Modal } from '@web3modal/react'
import { colors } from '../constants/colors'
import { ethereumClient, projectId } from './wagmi'

export function WalletConnectModal() {
  return (
    <Web3Modal
      themeMode="dark"
      themeVariables={{
        '--w3m-accent-color': colors.primary.main,
        '--w3m-background-color': colors.primary.main,
        '--w3m-logo-image-url': 'src/assets/branding/walletConnectLogo.png',
        '--w3m-overlay-backdrop-filter': 'blur(10px)',
      }}
      projectId={projectId}
      ethereumClient={ethereumClient}
    />
  )
}
