import { Button } from '@concero/ui-kit'
import { useAppKit } from '@reown/appkit/react'
import { injected, useConnect } from 'wagmi'

export const ConnectWallet = () => {
	// const { open } = useAppKit()
	const { connect } = useConnect()
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
