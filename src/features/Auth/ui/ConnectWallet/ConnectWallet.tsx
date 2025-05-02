import { projectId } from '@/shared/api/wagmi'
import { Button } from '@concero/ui-kit'
import { injected, useAccount, useConnect } from 'wagmi'
import { walletConnect } from 'wagmi/connectors'

export const ConnectWallet = () => {
	const { connect } = useConnect()
	return (
		<Button
			size="l"
			onClick={async () => {
				if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
					connect({ connector: injected() })
				} else {
					connect({ connector: walletConnect({ projectId: projectId }) })
				}
			}}
		>
			Connect wallet
		</Button>
	)
}
