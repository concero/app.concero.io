import { useEffect, useState } from 'react'
import { getMaxCap } from '../../cards/LiquidityCapCard/getLiquidityCap'
import { getPoolLiquidity } from '../../../api/concero/pool/getPoolLiquidity'

export const useGetLiquidity = () => {
	const [maxCap, setMaxCap] = useState<number>(0)
	const [poolLiquidity, setPoolLiquidity] = useState<number>(0)
	const [isLoading, setIsLoading] = useState(true)

	const setLiquidityHandle = async () => {
		try {
			setIsLoading(true)
			const [cap, newPoolLiquidity] = await Promise.all([getMaxCap(), getPoolLiquidity()])

			setPoolLiquidity(Number(newPoolLiquidity))
			setMaxCap(Number(cap))
		} catch (e) {
			console.error(e)
		}

		setIsLoading(false)
	}

	useEffect(() => {
		void setLiquidityHandle()
	}, [])

	return { maxCap, poolLiquidity, isLoading }
}
