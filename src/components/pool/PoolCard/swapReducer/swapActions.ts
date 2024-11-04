import { handleBeforeUnload } from '../../../../utils/leavingPageEvents'
import { type PoolMode, type SwapAction, type SwapState } from './types'
import { type ErrorType } from '../SwapButton/constants'

export const swapActions: SwapAction = {
	/* ROUTE-RELATED ACTIONS */
	SET_BALANCE: (state, action) => ({ ...state, balance: action.payload }),
	SET_LOADING: (state, action) => ({ ...state, isLoading: action.payload }),
	SET_TOKEN: (state, action) => ({
		...state,
		[action.direction]: { ...state[action.direction], token: action.payload.token },
	}),
	SET_AMOUNT: (state, action) => ({
		...state,
		[action.direction]: {
			...state[action.direction],
			...(action.payload.amount !== undefined &&
				action.payload.amount !== null && { amount: action.payload.amount }),
			...(action.payload.amount_usd !== undefined &&
				action.payload.amount_usd !== null && { amount_usd: action.payload.amount_usd }),
		},
	}),
	RESET_AMOUNTS: (state, action) => ({
		...state,
		[action.direction]: { ...state[action.direction], amount: '', amount_usd: 0.0 },
	}),
	SET_ADDRESS: (state, action) => ({
		...state,
		[action.direction]: { ...state[action.direction], address: action.payload },
	}),
	SET_SWAP_STAGE: (state, action) => {
		if (action.payload === 'progress') {
			window.addEventListener('beforeunload', handleBeforeUnload)
		} else {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
		return { ...state, stage: action.payload }
	},
	SET_SWAP_STEPS: (state, action) => ({ ...state, steps: action.payload }),
	APPEND_SWAP_STEP: (state, action) => ({ ...state, steps: [...state.steps, action.payload] }),
	SET_TO_ADDRESS: (state, action) => ({ ...state, to: { ...state.to, address: action.payload } }),
	UPSERT_SWAP_STEP: (state, action) => {
		const newStep = action.payload
		const { steps } = state

		if (steps.length === 0) {
			return []
		}

		steps.pop()
		steps.push(newStep)

		return { ...state, steps }
	},
	UPDATE_LAST_SWAP_STEP: updateLastSwapState,
	SET_WALLET_BALANCES: (state: SwapState, action: SwapAction) => ({ ...state, walletBalances: action.balances }),
	SWAP_DIRECTIONS: (state: SwapState) => {
		const { from, to } = state
		return { ...state, from: to, to: from }
	},
	SET_INPUT_ERROR: (state: SwapState, action: { payload: ErrorType | null }) => {
		const inputError = action.payload
		return { ...state, inputError }
	},
	TOGGLE_POOL_MODE: (state: SwapState, action: { payload: PoolMode }) => {
		const poolMode = action.payload
		const { from, to } = switchDirections(state, action)

		return { ...state, from, to, poolMode }
	},
}

const switchDirections = (state: SwapState, action: { payload: PoolMode }) => {
	const poolMode = action.payload
	const prevMode = state.poolMode

	if (poolMode === prevMode) return state

	return { ...state, from: state.to, to: state.from }
}

function updateLastSwapState(state: SwapState): SwapState {
	const lastStep = state.steps[state.steps.length - 1]
	if (lastStep?.status === 'pending' || lastStep?.status === 'await') {
		return { ...state, steps: [...state.steps.slice(0, state.steps.length - 1)] }
	}
	return state
}
