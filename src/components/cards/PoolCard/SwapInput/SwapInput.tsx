import { type FC, useEffect, useState } from 'react'
import { useAccount, useSwitchChain, useWalletClient } from 'wagmi'
import { TokenArea } from '../TokenArea/TokenArea'
import { SwapDetails } from '../SwapDetails/SwapDetails'
import classNames from './SwapInput.module.pcss'
import { type SwapInputProps } from './types'
import { IconArrowsUpDown, IconCoins } from '@tabler/icons-react'
import { SwapCardStage } from '../swapReducer/types'
import { executeDeposit } from '../swapExecution/executeDeposit'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'
import { PoolButton } from '../PoolButton/PoolButton'
import { completeWithdrawal, startWithdrawal, type WithdrawStatus } from '../swapExecution/requestWithdraw'
import { Button } from '../../../buttons/Button/Button'
import { getWithdrawStatus } from '../../../../api/concero/getUserActions'
import { getWalletClient } from '@wagmi/core'
import { config } from '../../../../web3/wagmi'
import { Card } from '../../Card/Card'
import { useSpring } from '@react-spring/web'
import { easeQuadInOut } from 'd3-ease'

export const SwapInput: FC<SwapInputProps> = ({ swapState, swapDispatch, isNewSwapCardMode }) => {
	const [withdrawStatus, setWithdrawStatus] = useState<WithdrawStatus>('startWithdraw')
	const { isConnected } = useAccount()
	const { poolMode } = swapState

	const walletClient = useWalletClient()
	const { switchChainAsync } = useSwitchChain()

	useEffect(() => {
		const handleGetWithdrawStatus = async () => {
			const withdrawStatus: WithdrawStatus = await getWithdrawStatus(swapState.from.address)
			setWithdrawStatus(withdrawStatus)
		}

		void handleGetWithdrawStatus()
	}, [])

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
		void trackEvent({
			category: category.SwapCard,
			action: action.BeginSwap,
			label: 'concero_begin_swap',
			data: { isNewSwapCardMode, from: swapState.from, to: swapState.to },
		})

		const walletClient = await getWalletClient(config, { chainId: Number(swapState.from.chain.id) })
		if (swapState.poolMode === 'deposit') {
			await executeDeposit(swapState, swapDispatch, walletClient)
		} else {
			await startWithdrawal(swapState, swapDispatch)
		}
	}

	if (swapState.poolMode === 'withdraw' && withdrawStatus === 'completeWithdrawal') {
		return (
			<div className={classNames.container}>
				<h4>You may withdraw your funds</h4>
				<Button
					onClick={async () => {
						await completeWithdrawal(swapState, swapDispatch)
					}}
				>
					Withdraw funds
				</Button>
			</div>
		)
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
			{swapState.from.amount && Number(swapState.from.amount) !== 0 ? (
				<Card className={classNames.warningCard}>
					<div className="row gap-sm">
						<IconCoins width={18} height={18} color={'var(--color-yellow-warning-text)'} />
						<p>Withdrawal limitations</p>
					</div>
					<p>Your funds will be available for withdrawal after 7 days</p>
				</Card>
			) : null}
			<PoolButton
				swapState={swapState}
				isConnected={isConnected}
				onClick={handleSwapButtonClick}
				switchChainHook={switchChainHook}
			/>
		</div>
	)
}
