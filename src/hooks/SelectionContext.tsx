import { createContext, type ReactNode, useContext, useReducer } from 'react'
import { DataContext } from './DataContext/DataContext'
import { type Chain, type Token } from '../api/concero/types'

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

const selectedTokens = ({
	fromTokens,
	toTokens,
	chains,
}: {
	fromTokens: Token[]
	toTokens: Token[]
	chains: Chain[]
}) => {
	return {
		from: {
			chain: chains[0],
			token: fromTokens[0],
		},
		to: {
			chain: chains[1],
			token: toTokens[0],
		},
	}
}

const initArgs = ({ fromTokens, toTokens, chains }: { fromTokens: Token[]; toTokens: Token[]; chains: Chain[] }) => {
	return {
		swapCard: selectedTokens({ fromTokens, toTokens, chains }),
		historyCard: selectedTokens({ fromTokens, toTokens, chains }),
		newsCard: selectedTokens({ fromTokens, toTokens, chains }),
	}
}

export const SelectionContext = createContext(null)

export function SelectionProvider({ children }: SelectionProviderProps) {
	const { tokens, chains } = useContext(DataContext)
	const [selection, selectionDispatch] = useReducer(
		reducer,
		initArgs({ fromTokens: tokens['1'], toTokens: tokens['137'], chains }),
	)

	// useEffect(() => {
	// 	selectionDispatch({
	// 		type: 'SET_SELECTION',
	// 		payload: initArgs({ fromTokens: tokens['1'], toTokens: tokens['137'], chains }),
	// 	})
	// }, [tokens])

	return <SelectionContext.Provider value={{ selection, selectionDispatch }}>{children}</SelectionContext.Provider>
}
