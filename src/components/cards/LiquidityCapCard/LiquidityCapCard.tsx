import { useTranslation } from 'react-i18next'
import { Card } from '../Card/Card'
import classNames from './LiquidityCapCard.module.pcss'
import { ProgressBar } from '../../layout/progressBar/ProgressBar'
import { useEffect, useState } from 'react'
import { getLiquidityCap } from './getLiquidityCap'

export interface LiquidityInfo {
	maxCapValue: string
}

const extractToNumber = (stringNum: string) => {
	const result = parseFloat(stringNum.replace(/[\s,]/g, ''))

	return result
}

export const LiquidityCapCard = ({ maxCapValue }: LiquidityInfo) => {
	const [liquidityCap, setLiquidityCap] = useState<number>(0)
	const { t } = useTranslation()

	const percentage = (liquidityCap / extractToNumber(maxCapValue)) * 100

	const setCap = async () => {
		const cap = await getLiquidityCap()
		setLiquidityCap(Number(cap))
	}

	useEffect(() => {
		setCap()
	}, [])

	return (
		<Card className={`${classNames.liquidityCapCard} cardConvex`}>
			<h4 className={classNames.title}>{t('liquidityCap.title')}</h4>
			<h2>
				${liquidityCap} <span className={classNames.maxValue}>/ ${maxCapValue}</span>
			</h2>
			<ProgressBar percentage={percentage} />
		</Card>
	)
}
