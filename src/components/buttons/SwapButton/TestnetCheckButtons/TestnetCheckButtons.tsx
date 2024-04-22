import classNames from './TestnetCheckButtons.module.pcss'
import { Button } from '../../Button/Button'
import { type SwapState } from '../../../cards/SwapCard/swapReducer/types'
import { IconCheck } from '@tabler/icons-react'
import { ethers, type providers } from 'ethers'

interface TestnetCheckButtonsProps {
	swapState: SwapState
	testnetBalances: {
		linkBalanceSufficient: boolean
		bnmBalanceSufficient: boolean
	} | null
	switchChainHook: (requiredChainId: number) => Promise<providers.JsonRpcSigner>
}

export function TestnetCheckButtons({ swapState, testnetBalances, switchChainHook }: TestnetCheckButtonsProps) {
	const dripBnmToken = async () => {
		try {
			const signer = await switchChainHook(parseInt(swapState.from.chain.id))

			const bnmContract = new ethers.Contract(
				swapState.from.token.address,
				['function drip(address to) external'],
				signer,
			)

			await bnmContract.drip(swapState.from.address)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className={classNames.container}>
			<Button
				className={classNames.button}
				variant={'primary'}
				isDisabled={!!testnetBalances?.linkBalanceSufficient}
				leftIcon={testnetBalances?.linkBalanceSufficient ? <IconCheck size={17} /> : null}
				onClick={() => {
					window.open('https://faucets.chain.link/', '_blank')
				}}
			>
				Get testnet opETH & LINK
			</Button>
			<Button
				variant={'primary'}
				isDisabled={!!testnetBalances?.bnmBalanceSufficient}
				className={classNames.button}
				leftIcon={testnetBalances?.bnmBalanceSufficient ? <IconCheck size={17} /> : null}
				onClick={dripBnmToken}
			>
				Get CCIPBnM tokens
			</Button>
		</div>
	)
}
