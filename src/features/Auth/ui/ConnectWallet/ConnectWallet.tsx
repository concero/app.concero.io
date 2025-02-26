import { Button } from '@/components/buttons/Button/Button'
import { useAppKit } from '@reown/appkit/react'

export const ConnectWallet = () => {
	const { open } = useAppKit()
	return (
		<Button
			size="lg"
			onClick={async () => {
				await open()
			}}
		>
			Connect wallet
		</Button>
	)
}
