import { projectId } from '@/shared/api/wagmi'
import { isAdminAddress } from '@/shared/lib/tests/isAdminAddress'
import { Button } from '@concero/ui-kit'
import { useEffect } from 'react'
import { injected, useAccount, useConnect } from 'wagmi'
import { walletConnect } from 'wagmi/connectors'

export const ConnectWallet = () => {
	// const { open } = useAppKit()
	const { address } = useAccount()
	const { connect, error } = useConnect()
	useEffect(() => {
		if (address && isAdminAddress(address))
			console.log('@ConnectWallet:', {
				address,
				error,
			})
	}, [error])
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
