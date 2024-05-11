import { type Dispatch, type FC } from 'react'
import { IconArrowLeft, IconBrandTwitter, IconUser } from '@tabler/icons-react'
import classNames from './SwapProgress.module.pcss'
import { TokenInfo } from './TokenInfo'
import { TransactionStep } from '../../../layout/TransactionStep/TransactionStep'
import { type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import { Button } from '../../../buttons/Button/Button'
import { type IStep } from '../../EarnHeaderCard/ManageModal/useEarnReducer/types'
import { useTranslation } from 'react-i18next'

interface SwapProgressProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	handleGoBack: () => void
	txDuration: number | undefined
}

export const SwapProgress: FC<SwapProgressProps> = ({ swapState, handleGoBack, swapDispatch, txDuration }) => {
	const { from, to, steps, stage } = swapState
	const { t } = useTranslation()

	function handleContactSupportButtonClick() {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.contactSupport })
	}

	const renderButtons: Record<string, JSX.Element> | Record<string, null> = {
		[SwapCardStage.failed]: (
			<div className={classNames.buttonsContainer}>
				<Button
					leftIcon={<IconArrowLeft size={20} color={'var(--color-primary-400)'} />}
					onClick={handleGoBack}
					variant="secondary"
				>
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
			<div className={classNames.successButtonsContainer}>
				{swapState.isTestnet && txDuration !== undefined ? (
					<Button
						leftIcon={<IconBrandTwitter size={18} />}
						onClick={() => {
							window.open(
								`https://twitter.com/intent/tweet?text=Just%20swapped%2010%20USDT%20on%20%40concero_io%20from%20%40base%20to%20%40arbitrum%20in%20just%20${txDuration} sec!%0A%0ABreak%20my%20record%20👉%20app.concero.io&media=https%3A%2F%2Fexample.com%2Fimage.jpg`,
								'_blank',
							)
						}}
					>
						Share on Twitter
					</Button>
				) : null}
				<Button
					leftIcon={<IconArrowLeft size={20} color={'var(--color-primary-400)'} />}
					onClick={handleGoBack}
					variant="secondary"
				>
					{t('button.goBack')}
				</Button>
			</div>
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
