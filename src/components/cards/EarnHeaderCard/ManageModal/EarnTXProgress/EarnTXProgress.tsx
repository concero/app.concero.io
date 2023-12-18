import { FC } from 'react'
import { IconArrowLeft } from '@tabler/icons-react'
import classNames from './EarnTXProgress.module.pcss'
import { TokenInfo } from './TokenInfo'
import { colors } from '../../../../../constants/colors'
import { Button } from '../../../../buttons/Button/Button'
import { IStep, ManageState } from '../useEarnReducer/types'
import { TransactionStep } from '../../../../layout/TransactionStep/TransactionStep'
import { useTranslation } from 'react-i18next'

interface SwapProgressProps {
	manageState: ManageState
	handleGoBack: () => void
}

export const EarnTXProgress: FC<SwapProgressProps> = ({ manageState, handleGoBack }) => {
	const { from, to, steps, status } = manageState
	const { t } = useTranslation()

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
			{status === 'failed' || status === 'success' ? (
				<Button leftIcon={<IconArrowLeft size={20} color={colors.primary.main} />} onClick={() => handleGoBack()} variant="secondary">
					{t('button.goBack')}
				</Button>
			) : null}
		</div>
	)
}
