import classNames from './TestnetCheckButtons.module.pcss'
import { Button } from '../../Button/Button'
import { type SwapState } from '../../../cards/SwapCard/swapReducer/types'
import { IconCheck } from '@tabler/icons-react'
import { type providers } from 'ethers'
import { getWalletClient } from '@wagmi/core'
import { config } from '../../../../web3/wagmi'
import { parseAbi } from 'viem'
import { writeContract } from 'viem/actions'

interface TestnetCheckButtonsProps {
	swapState: SwapState
	testnetBalances: {
		linkBalanceSufficient: boolean
		bnmBalanceSufficient: boolean
	} | null
	switchChainHook: (requiredChainId: number) => Promise<providers.JsonRpcSigner>
}

const faucetChainsStrMap: Record<string, string> = {
	'421614': 'arbitrum-sepolia',
	'11155420': 'optimism-sepolia',
	'84532': 'base-sepolia',
}

export function TestnetCheckButtons({ swapState, testnetBalances, switchChainHook }: TestnetCheckButtonsProps) {
	const dripBnmToken = async () => {
		try {
			const walletClient = await getWalletClient(config, { chainId: Number(swapState.from.chain.id) })
			const bnmAbi = parseAbi(['function drip(address to) external'])

			await writeContract(walletClient, {
				abi: bnmAbi,
				address: swapState.from.token.address as `0x${string}`,
				functionName: 'drip',
				args: [swapState.from.address],
			})
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
					window.open(`https://faucets.chain.link/${faucetChainsStrMap[swapState.from.chain.id]}`, '_blank')
				}}
			>
				Get testnet ETH
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
