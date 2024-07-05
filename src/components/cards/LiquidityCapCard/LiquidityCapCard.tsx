import { useTranslation } from 'react-i18next'
import { Card } from '../Card/Card'
import classNames from './LiquidityCapCard.module.pcss'
import { ProgressBar } from '../../layout/progressBar/ProgressBar'
import { useEffect, useState } from 'react'
import { getMaxCap } from './getLiquidityCap'
import { fetchLastFee } from '../../../api/concero/fetchFees'

export const LiquidityCapCard = () => {
	const [maxCap, setMaxCap] = useState<number>(0)
	const [poolLiquidity, setPoolLiquidity] = useState<number>(0)
	const { t } = useTranslation()

	const percentage = (poolLiquidity / maxCap) * 100 * 100

	const setCap = async () => {
		const cap = await getMaxCap()
		const lastFee = await fetchLastFee()

		setPoolLiquidity(Number(lastFee.poolLiquidity))
		setMaxCap(Number(cap))
	}

	useEffect(() => {
		setCap()
	}, [])

	return (
		<Card className={`${classNames.liquidityCapCard} cardConvex`}>
			<h4 className={classNames.title}>{t('liquidityCap.title')}</h4>
			<h2>
				${poolLiquidity} <span className={classNames.maxValue}>/ ${maxCap}</span>
			</h2>
			<ProgressBar percentage={percentage || 0} />
		</Card>
	)
}
