import { useTranslation } from 'react-i18next'
import { Card } from '../Card/Card'
import classNames from './LiquidityCapCard.module.pcss'
import { ProgressBar } from '../../layout/progressBar/ProgressBar'
import { useEffect, useState } from 'react'
import { getMaxCap } from './getLiquidityCap'
import { getPoolLiquidity } from '../../../api/concero/getPoolLiquidity'

export const LiquidityCapCard = () => {
	const [maxCap, setMaxCap] = useState<number>(0)
	const [poolLiquidity, setPoolLiquidity] = useState<number>(0)
	const { t } = useTranslation()

	const percentage = (poolLiquidity / maxCap) * 100

	const setCap = async () => {
		const cap = await getMaxCap()
		const newPoolLiquidity = await getPoolLiquidity()

		setPoolLiquidity(Number(newPoolLiquidity))
		setMaxCap(Number(cap))
	}

	useEffect(() => {
		setCap()
	}, [])

	return (
		<Card className={`${classNames.liquidityCapCard} cardConvex`}>
			<h4 className="body4">{t('liquidityCap.title')}</h4>
			<h2>
				${poolLiquidity.toFixed(0)} <span className={classNames.maxValue}>/ ${maxCap}</span>
			</h2>
			<ProgressBar percentage={percentage || 0} />
		</Card>
	)
}
