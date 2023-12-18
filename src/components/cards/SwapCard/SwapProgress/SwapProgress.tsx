import { Dispatch, FC } from 'react'
import { IconArrowLeft, IconUser } from '@tabler/icons-react'
import classNames from './SwapProgress.module.pcss'
import { TokenInfo } from './TokenInfo'
import { TransactionStep } from '../../../layout/TransactionStep/TransactionStep'
import { SwapAction, SwapCardStage, SwapState } from '../swapReducer/types'
import { Button } from '../../../buttons/Button/Button'
import { IStep } from '../../EarnHeaderCard/ManageModal/useEarnReducer/types'
import { useTranslation } from 'react-i18next'

interface SwapProgressProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	handleGoBack: () => void
}

export const SwapProgress: FC<SwapProgressProps> = ({ swapState, handleGoBack, swapDispatch }) => {
	const { from, to, steps, stage } = swapState
	const { t } = useTranslation()

	function handleContactSupportButtonClick() {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.contactSupport })
	}

	const renderButtons: { [key: string]: JSX.Element } | { [key: string]: null } = {
		[SwapCardStage.failed]: (
			<div className={classNames.buttonsContainer}>
				<Button leftIcon={<IconArrowLeft size={20} color={'var(--color-primary-400)'} />} onClick={() => handleGoBack()} variant="secondary">
					{t('button.goBack')}
				</Button>
				<Button
					variant={'primary'}
					className={classNames.button}
					onClick={handleContactSupportButtonClick}
					leftIcon={<IconUser color={'var(--color-button-text-primary)'} size={18} />}
				>
					{t('contactSupportCard.contractSupport')}
				</Button>
			</div>
		),
		[SwapCardStage.success]: (
			<Button leftIcon={<IconArrowLeft size={20} color={'var(--color-primary-400)'} />} onClick={() => handleGoBack()} variant="secondary">
				{t('button.goBack')}
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
