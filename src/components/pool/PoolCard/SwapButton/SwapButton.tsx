import { type SwapButtonProps } from './types'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import { Button } from '../../../buttons/Button/Button'

export const SwapButton = ({ error, onClick, isLoading, isDeposit }: SwapButtonProps) => {
	const { isConnected } = useAccount()
	const { open } = useWeb3Modal()

	const actionText: string = isDeposit ? 'Request Deposit' : 'Request Withdrawal'

	return (
		<Button isFull size="lg" variant="primary" isLoading={isLoading} onClick={isConnected ? onClick : open}>
			{isConnected ? actionText : 'Connect Wallet'}
		</Button>
	)
}
