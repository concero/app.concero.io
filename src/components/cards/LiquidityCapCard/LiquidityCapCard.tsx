import { useTranslation } from 'react-i18next'
import { Card } from '../Card/Card'
import classNames from './LiquidityCapCard.module.pcss'
import { ProgressBar } from '../../layout/progressBar/ProgressBar'

export interface LiquidityInfo {
	currentCapValue: string
	maxCapValue: string
}

const extractToNumber = (stringNum: string) => {
	const result = parseFloat(stringNum.replace(/[\s,]/g, ''))

	return result
}

export const LiquidityCapCard = ({ currentCapValue, maxCapValue }: LiquidityInfo) => {
	const { t } = useTranslation()
	const percentage = (extractToNumber(currentCapValue) / extractToNumber(maxCapValue)) * 100

	return (
		<Card className={`${classNames.liquidityCapCard} cardConvex`}>
			<h4 className={classNames.title}>{t('liquidityCap.title')}</h4>
			<h2>
				${currentCapValue} <span className={classNames.maxValue}>/ ${maxCapValue}</span>
			</h2>
			<ProgressBar percentage={percentage} />
		</Card>
	)
}
