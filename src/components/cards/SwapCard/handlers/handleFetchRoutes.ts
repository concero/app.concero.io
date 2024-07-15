import { type Dispatch, type MutableRefObject } from 'react'
import { type SwapAction, type SwapState } from '../swapReducer/types'
import { addingAmountDecimals, addingTokenDecimals } from '../../../../utils/formatting'
import { ethers } from 'ethers'
import { chainSelectorsMap, conceroAddressesMap } from '../swapExecution/executeConceroRoute'
import { getRoutes } from '../getRoutes/getRoutes'

const providerUrlsMap: Record<string, string> = {
	'421614': 'https://arbitrum-sepolia-rpc.publicnode.com', // arb
	'11155420': 'https://optimism-sepolia-rpc.publicnode.com', // opt
	'84532': 'https://base-sepolia-rpc.publicnode.com', // base
}

const getConceroRoute = async (swapState: SwapState, swapDispatch: Dispatch<SwapAction>) => {
	swapDispatch({ type: 'SET_LOADING', payload: true })

	try {
		const { from } = swapState
		if (!from.amount) return

		const provider = new ethers.providers.JsonRpcProvider(
			providerUrlsMap[swapState.from.chain.id],
			Number(swapState.from.chain.id),
		)

		const conceroContract = new ethers.Contract(
			conceroAddressesMap[swapState.from.chain.id],
			['function getSrcTotalFeeInUsdc(uint8, uint64, uint256) public view returns (uint256)'],
			provider,
		)

		const feeAmountInUsd = await conceroContract.getSrcTotalFeeInUsdc(
			'0',
			chainSelectorsMap[swapState.to.chain.id],
			addingAmountDecimals(from.amount, 18),
		)

		let amount = BigInt(addingAmountDecimals(from.amount, from.token.decimals)!) - BigInt(feeAmountInUsd.toString())

		if (amount < BigInt(0)) {
			amount = BigInt(0)
		}

		swapDispatch({
			type: 'SET_AMOUNT',
			direction: 'to',
			payload: { amount: addingTokenDecimals(amount.toString(), 18)!, amount_usd: '' },
		})
	} catch (e) {
		console.error(e)
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}

export const handleFetchRoutes = async (
	swapState: SwapState,
	swapDispatch: Dispatch<SwapAction>,
	typingTimeoutRef: MutableRefObject<number | undefined>,
) => {
	try {
		const { from, to, settings, isTestnet } = swapState

		if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
		const typingTimeoutId = setTimeout(async () => {
			await getRoutes(from, to, settings, swapDispatch)
			if (swapState.isTestnet) {
				await getConceroRoute(swapState, swapDispatch)
			}
		}, 700)
		typingTimeoutRef.current = typingTimeoutId
	} catch (e) {
		console.error(e)
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
