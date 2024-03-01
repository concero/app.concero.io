import { useEffect, useState } from 'react'
import { fetchRoute, type fetchRouteParams } from '../../api/concero/fetchRoute'

export const EthersTest = () => {
	const [route, setRoute] = useState<any>()

	async function getRoute({
		fromToken,
		toToken,
		fromChainId,
		toChainId,
		amount,
		slippageTolerance,
	}: fetchRouteParams) {
		console.log('fetchRoute')
		const res = await fetchRoute({ fromToken, toToken, fromChainId, toChainId, amount, slippageTolerance })
		setRoute(res)
		return res
	}

	useEffect(() => {
		getRoute({
			fromToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
			toToken: '0x25559f0abbaf2a928239d2f419181147cc2dad74',
			fromChainId: 1,
			toChainId: 1,
			amount: '1000000000000000000',
			slippageTolerance: '0.5',
		})
	}, [])

	return <div>{JSON.stringify(route, null, 2)}</div>
}
