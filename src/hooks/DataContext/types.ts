import { type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { type Chain, type Token } from '../../api/concero/types'

export interface DataProviderProps {
	children: ReactNode
}

export interface GetTokensParams {
	chainId: string
	offset: number
	limit: number
	search?: string
}

export interface GetChainsParams {
	chainId?: string
	offset?: number
	limit?: number
	search?: string
}

export type GetChainByProviderSymbolI = (providerSymbol: string) => Promise<Chain | null>

export interface DataContextValue {
	getTokens: (params?: GetTokensParams) => Promise<Token[]>
	getChains: (params?: GetChainsParams) => Promise<Chain[]>
	tokens: Record<string, Token[]>
	chains: Chain[]
	setTokens: Dispatch<SetStateAction<Record<string, Token[]>>>
	setChains: Dispatch<SetStateAction<Chain[]>>
	getChainByProviderSymbol: GetChainByProviderSymbolI
}
