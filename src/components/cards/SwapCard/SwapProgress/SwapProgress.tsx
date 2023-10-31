import { Dispatch, FC } from 'react'
import { IconArrowLeft } from '@tabler/icons-react'
import classNames from './SwapProgress.module.pcss'
import { TokenInfo } from './TokenInfo'
import { TransactionStep } from '../../../layout/TransactionStep/TransactionStep'
import { SwapAction, SwapCardStage, SwapState } from '../swapReducer/types'
import { Button } from '../../../buttons/Button/Button'
import { colors } from '../../../../constants/colors'
import { IStep } from '../../StakingHeaderCard/ManageModal/useStakingReducer/types'

interface SwapProgressProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	handleGoBack: () => void
}

export const SwapProgress: FC<SwapProgressProps> = ({ swapState, handleGoBack, swapDispatch }) => {
	const { from, to, steps, stage } = swapState

	function handleContactSupportButtonClick() {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.contactSupport })
	}

	const renderButtons: { [key: string]: JSX.Element } | { [key: string]: null } = {
		[SwapCardStage.failed]: (
			<div className={classNames.buttonsContainer}>
				<Button leftIcon={<IconArrowLeft size={20} color={colors.primary.main} />} onClick={() => handleGoBack()} variant="secondary">
					Go back
				</Button>
				<Button variant={'primary'} className={classNames.button} onClick={handleContactSupportButtonClick}>
					Contact support
				</Button>
			</div>
		),
		[SwapCardStage.success]: (
			<Button leftIcon={<IconArrowLeft size={20} color={colors.primary.main} />} onClick={() => handleGoBack()} variant="secondary">
				Go back
			</Button>
		),
	}

	const button = renderButtons[stage] ?? null

	return (
		<div className={classNames.container}>
			<div className={classNames.tokensInfoContainer}>
				<TokenInfo direction={from} />
				<TokenInfo direction={to} />
			</div>
			<div className={classNames.progressContainer}>
				{steps.map((step: IStep, index: number) => (
					<TransactionStep key={index.toString()} step={step} />
				))}
			</div>
			{button}
		</div>
	)
}
