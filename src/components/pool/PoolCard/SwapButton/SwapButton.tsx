import { type SwapButtonProps } from './types'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import { Button } from '../../../buttons/Button/Button'

export const SwapButton = ({ error, onClick, isLoading }: SwapButtonProps) => {
	const { isConnected } = useAccount()
	const { open } = useWeb3Modal()

	return (
		<Button
			isDisabled={!!error}
			isFull
			size="lg"
			variant="primary"
			isLoading={isLoading}
			onClick={isConnected ? onClick : open}
		>
			{isConnected ? 'Begin Swap' : 'Connect Wallet'}
		</Button>
	)
}
