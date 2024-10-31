import { TokenArea } from '../TokenArea/TokenArea'
import classNames from './SwapInput.module.pcss'
import { type SwapInputProps } from './types'
import { startWithdrawal } from '../poolExecution/requestWithdraw'
import { executeDeposit } from '../poolExecution/executeDeposit'
import { getWalletClient } from '@wagmi/core'
import { config } from '../../../../web3/wagmi'
import { Separator } from '../../../layout/Separator/Separator'
import { SwapDetails } from '../SwapDetails/SwapDetails'
import { SwapButton } from '../SwapButton/SwapButton'

export const SwapInput = ({ swapState, swapDispatch }: SwapInputProps) => {
	const handleStartTx = async () => {
		const walletClient = await getWalletClient(config, { chainId: Number(swapState.from.chain.id) })

		if (swapState.poolMode === 'deposit') {
			await executeDeposit(swapState, swapDispatch, walletClient)
		} else {
			await startWithdrawal(swapState, swapDispatch, walletClient)
		}
	}

	const tokenArea = (
		<div className={classNames.tokenAreasContainer}>
			<TokenArea
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
		<div className={classNames.container}>
			{tokenArea}

			<SwapDetails swapState={swapState} swapDispatch={swapDispatch} />

			<SwapButton isLoading={swapState.isLoading} error={swapState.inputError} onClick={handleStartTx} />

			{/* <div className={classNames.feeDetails}> */}
			{/* <FeeDetailsDropdown route={swapState.selectedRoute} /> */}
			{/* </div> */}
		</div>
	)
}
