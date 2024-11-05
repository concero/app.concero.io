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
		// TODO: may be possible to use Promise.all
		const cap = await getMaxCap()
		const newPoolLiquidity = await getPoolLiquidity()

		// TODO: remove conversion to Number because it's already a number
		setPoolLiquidity(Number(newPoolLiquidity))
		setMaxCap(Number(cap))
	}

	useEffect(() => {
		// TODO: unhandled promise rejection! add .catch((er) => ...) to setCap
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
