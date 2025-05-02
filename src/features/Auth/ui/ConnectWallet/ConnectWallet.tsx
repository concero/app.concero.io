import { isAdminAddress } from '@/shared/lib/tests/isAdminAddress'
import { Button } from '@concero/ui-kit'
import { useAppKit } from '@reown/appkit/react'
import { useEffect } from 'react'
import { injected, useAccount, useConnect } from 'wagmi'

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
				connect({ connector: injected() })
			}}
		>
			Connect wallet
		</Button>
	)
}
