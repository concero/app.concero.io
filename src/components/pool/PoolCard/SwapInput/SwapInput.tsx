import { TokenArea } from '../TokenArea/TokenArea'
import classNames from './SwapInput.module.pcss'
import { type SwapInputProps } from './types'
import { startWithdrawal } from '../poolExecution/requestWithdraw'
import { executeDeposit } from '../poolExecution/executeDeposit'
import { getWalletClient } from '@wagmi/core'
import { config } from '../../../../utils/web3/wagmi'
import { Separator } from '../../../layout/Separator/Separator'
import { SwapDetails } from '../SwapDetails/SwapDetails'
import { SwapButton } from '../SwapButton/SwapButton'
import { IconButton } from '../../../buttons/IconButton/IconButton'
import { TrailArrowLeftIcon } from '../../../../assets/icons/TrailArrowLeftIcon'
import { ErrorType } from '../SwapButton/constants'
import { FeeDetailsDropdown } from '../SwapDetails/FeeDetailsDropdown/FeeDetailsDropdown'

export const SwapInput = ({ swapState, swapDispatch, onClose }: SwapInputProps) => {
	const { inputError, from, poolMode } = swapState
	const amountIsAvailable = Number(from.amount) >= 100

	const isDeposit = poolMode === 'deposit'

	const handleStartTx = async () => {
		const walletClient = await getWalletClient(config, { chainId: Number(swapState.from.chain.id) })

		if (swapState.from.amount.length === 0) {
			swapDispatch({ type: 'SET_INPUT_ERROR', payload: ErrorType.ENTER_AMOUNT })
			return
		}

		if (isDeposit) {
			await executeDeposit(swapState, swapDispatch, walletClient)
		} else {
			await startWithdrawal(swapState, swapDispatch, walletClient)
		}
	}

	const tokenArea = (
		<div className={classNames.tokenAreasContainer}>
			<TokenArea
				isLoading={swapState.isLoading}
				direction="from"
				selection={swapState.from}
				swapDispatch={swapDispatch}
				balance={swapState.balance}
				stage={swapState.stage}
				error={swapState.inputError}
			/>
			<Separator />

			<TokenArea
				direction="to"
				selection={swapState.to}
				swapDispatch={swapDispatch}
				isLoading={swapState.isLoading}
				stage={swapState.stage}
			/>
			<Separator />
		</div>
	)

	return (
		<div>
			<div className={classNames.header}>
				<IconButton onClick={onClose} className={classNames.close} variant="secondary" size="sm">
					<TrailArrowLeftIcon />
				</IconButton>
				<h4>{swapState.poolMode === 'deposit' ? 'Deposit' : 'Withdrawal'}</h4>
			</div>

			{tokenArea}

			<SwapDetails swapState={swapState} swapDispatch={swapDispatch} />

			<SwapButton
				isDeposit={isDeposit}
				isLoading={swapState.isLoading}
				error={swapState.inputError}
				onClick={handleStartTx}
			/>

			{inputError && amountIsAvailable && (
				<div className={classNames.feeDetails}>
					<FeeDetailsDropdown />
				</div>
			)}
		</div>
	)
}
