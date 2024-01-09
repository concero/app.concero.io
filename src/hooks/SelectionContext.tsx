import { createContext, type ReactNode, useContext, useReducer } from 'react'
import { DataContext } from './DataContext/DataContext'

interface SelectionProviderProps {
	children: ReactNode
	setIsLoading: (isLoading: boolean) => void
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_HISTORY_CARD':
			return { ...state, historyCard: action.payload }
		case 'SET_SWAP_CARD':
			return { ...state, swapCard: action.payload }
		case 'SET_SELECTION':
			return { ...state, ...action.payload }
		default:
			return state
	}
}

const selectedTokens = ({ fromTokens, toTokens, chains }) => {
	return {
		from: {
			chain: {
				id: chains[0].id,
				name: chains[0].name,
				symbol: chains[0].symbol,
				logoURI: chains[0].logoURI,
				providers: chains[0].providers,
			},
			token: {
				symbol: fromTokens[0].symbol,
				address: fromTokens[0].address,
				decimals: fromTokens[0].decimals,
				logoURI: fromTokens[0].logoURI,
				coinGeckoId: fromTokens[0].coinGeckoId,
			},
		},
		to: {
			chain: {
				id: chains[1].id,
				name: chains[1].name,
				symbol: chains[1].symbol,
				logoURI: chains[1].logoURI,
				providers: chains[1].providers,
			},
			token: {
				symbol: toTokens[0].symbol,
				address: toTokens[0].address,
				decimals: toTokens[0].decimals,
				logoURI: toTokens[0].logoURI,
				coinGeckoId: toTokens[0].coinGeckoId,
			},
		},
	}
}

const initArgs = ({ fromTokens, toTokens, chains }) => ({
	swapCard: selectedTokens({ fromTokens, toTokens, chains }),
	historyCard: selectedTokens({ fromTokens, toTokens, chains }),
	newsCard: selectedTokens({ fromTokens, toTokens, chains }),
})

export const SelectionContext = createContext(null)

export function SelectionProvider({ children }: SelectionProviderProps) {
	const { tokens, chains } = useContext(DataContext)
	const [selection, dispatch] = useReducer(reducer, initArgs({ fromTokens: tokens['1'], toTokens: tokens['137'], chains }))

	return <SelectionContext.Provider value={{ selection, dispatch }}>{children}</SelectionContext.Provider>
}
