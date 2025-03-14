import { Button } from '@concero/ui-kit'
import { useAppKit } from '@reown/appkit/react'

export const ConnectWallet = () => {
	const { open } = useAppKit()
	return (
		<Button
			size="l"
			onClick={async () => {
				await open()
			}}
		>
			Connect wallet
		</Button>
	)
}
