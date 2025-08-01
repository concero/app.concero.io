import { useCheckTermsModal } from '@/features/Auth/ui/TermsConditionModal/CheckTermsModalContext'
import { projectId } from '@/shared/api/wagmi'
import { Button } from '@concero/ui-kit'
import { injected, useAccount, useConnect } from 'wagmi'
import { walletConnect } from 'wagmi/connectors'

export const ConnectWallet = () => {
	const { connect } = useConnect()
	const { address } = useAccount()
	const { open: openTermsModal } = useCheckTermsModal()
	return (
		<Button
			size="l"
			onClick={async () => {
				if (address) {
					openTermsModal()
					return
				}
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
