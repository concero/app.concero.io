import { type FC } from 'react'
import { useAccount, useSwitchChain, useWalletClient } from 'wagmi'
import { TokenArea } from '../TokenArea/TokenArea'
import { SwapDetails } from '../SwapDetails/SwapDetails'
import classNames from './SwapInput.module.pcss'
import { type SwapInputProps } from './types'
import { IconArrowsUpDown } from '@tabler/icons-react'
import { SwapCardStage } from '../swapReducer/types'
import { executeConceroRoute } from '../swapExecution/executeConceroRoute'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'
import { PoolButton } from '../PoolButton/PoolButton'

export const SwapInput: FC<SwapInputProps> = ({ swapState, swapDispatch, isNewSwapCardMode, setTxInfo }) => {
	const { isConnected } = useAccount()
	const { poolMode } = swapState

	const walletClient = useWalletClient()
	const { switchChainAsync } = useSwitchChain()

	async function switchChainHook(requiredChainId: number) {
		if (!walletClient.data) {
			throw new Error('Wallet client data is not available')
		}

		const currentChainId = walletClient.data.chain.id

		if (currentChainId !== requiredChainId) {
			if (switchChainAsync) {
				const chain = await switchChainAsync({ chainId: requiredChainId })
				if (!chain) throw new Error('Failed to switch to the required network')
			} else {
				throw new Error('switchNetworkAsync is not available')
			}
		}
	}

	const handleSwapButtonClick = async () => {
		if (swapState.isTestnet) {
			void trackEvent({
				category: category.SwapCard,
				action: action.BeginSwap,
				label: 'concero_begin_swap',
				data: { isNewSwapCardMode, from: swapState.from, to: swapState.to },
			})
			const time = await executeConceroRoute(swapState, swapDispatch)
			setTxInfo(time)
		}
	}

	return (
		<div className={classNames.container}>
			<div className={classNames.tokenAreasContainer}>
				<TokenArea
					direction="from"
					selection={swapState.from}
					poolMode={swapState.poolMode}
					swapDispatch={swapDispatch}
					balance={swapState.balance}
					stage={swapState.stage}
					isTestnet={swapState.isTestnet}
				/>
				<TokenArea
					direction="to"
					selection={swapState.to}
					poolMode={swapState.poolMode}
					swapDispatch={swapDispatch}
					isLoading={swapState.isLoading}
					stage={swapState.stage}
					isTestnet={swapState.isTestnet}
				/>
				{swapState.stage === SwapCardStage.input ? (
					<div
						className={classNames.arrowsIcon}
						onClick={() => {
							swapDispatch({
								type: 'SWITCH_POOL_MODE',
								payload: poolMode === 'deposit' ? 'withdraw' : 'deposit',
							})
						}}
					>
						<IconArrowsUpDown size={18} />
					</div>
				) : null}
			</div>
			<SwapDetails swapState={swapState} swapDispatch={swapDispatch} />
			<PoolButton
				swapState={swapState}
				isConnected={isConnected}
				onClick={handleSwapButtonClick}
				switchChainHook={switchChainHook}
			/>
		</div>
	)
}
