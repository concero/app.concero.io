import { type Dispatch } from 'react'
import { type SwapAction } from '../components/cards/SwapCard/swapReducer/types'
import { TokenAmount } from './TokenAmount'
import { createPublicClient, erc20Abi, getContract } from 'viem'
import { baseSepolia } from 'wagmi/chains'
import { http } from 'wagmi'

interface HandleBalanceProps {
	dispatch: Dispatch<SwapAction>
	from: {
		chain: {
			id: string
			providers: Array<{
				name: string
				symbol: string
			}>
		}
		token: {
			address: string
			symbol: string
			decimals: number
		}
	}
	address: string | null | undefined
}

const publicClient = createPublicClient({
	chain: baseSepolia, // TODO change to mainnet
	transport: http(),
})

const handleError = (dispatch: Dispatch<SwapAction>) => {
	dispatch({ type: 'SET_BALANCE', payload: null })
}

export async function getBalance({ dispatch, from, address }: HandleBalanceProps) {
	if (!from || !address) {
		handleError(dispatch)
		return
	}

	try {
		const tokenFromContract = getContract({
			address: from.token.address as `0x${string}`,
			abi: erc20Abi,
			client: publicClient,
		})

		const userBalanceAmount = await tokenFromContract.read.balanceOf([address])

		dispatch({
			type: 'SET_BALANCE',
			payload: {
				amount: new TokenAmount(String(userBalanceAmount), from.token.decimals),
				symbol: from.token.symbol,
			},
		})
	} catch (err) {
		handleError(dispatch)
	}
}
