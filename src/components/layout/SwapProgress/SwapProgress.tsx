import { FC } from 'react'
import { IconArrowLeft } from '@tabler/icons-react'
import classNames from './SwapProgress.module.pcss'
import { TokenInfo } from './TokenInfo'
import { TransactionStep } from './TransactionStep'
import { Button } from '../../buttons/Button/Button'
import { IStep } from '../../cards/StakingHeaderCard/ManageModal/useManageReducer/types'
import { colors } from '../../../constants/colors'

interface SwapProgressProps {
	swapState: any
	handleGoBack: () => void
}

export const SwapProgress: FC<SwapProgressProps> = ({ swapState, handleGoBack }) => {
	const { from, to, steps, status } = swapState

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
			{status === 'failure' || status === 'success' ? (
				<Button leftIcon={<IconArrowLeft size={20} color={colors.primary.main} />} onClick={() => handleGoBack()} variant="secondary">
					Go back
				</Button>
			) : null}
		</div>
	)
}
