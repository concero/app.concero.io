import { toggleRouteInsurance } from './toggleRouteInsurance'
import { handleBeforeUnload } from '../../../../utils/leavingPageEvents'
import { type SwapAction, type SwapState } from './types'
// import { StageStep } from '../../EarnHeaderCard/ManageModal/SwapProgress/TransactionStep'
import { trackEvent } from '../../../../hooks/useTracking'
import { action as trackingAction, category as trackingCategory } from '../../../../constants/tracking'

export const swapActions: SwapAction = {
	/* ROUTE-RELATED ACTIONS */
	POPULATE_ROUTES: (state, action) => {
		if (action.fromAmount !== state.from.amount) return state
		return { ...state, routes: action.payload, selectedRoute: action.payload[0] }
	},
	CLEAR_ROUTES: state => ({ ...state, isLoading: false, routes: [], selectedRoute: null }),
	SET_BALANCE: (state, action) => ({ ...state, balance: action.payload }),
	SET_LOADING: (state, action) => ({ ...state, isLoading: action.payload }),
	SET_SELECTED_ROUTE: (state, action) => ({ ...state, selectedRoute: action.payload }),
	/* INPUT_RELATED ACTIONS */
	SET_CHAIN: (state, action) => {
		const { chain } = action.payload
		return { ...state, [action.direction]: { ...state[action.direction], chain, token: action.tokens[0] } }
	},
	SET_TOKEN: (state, action) => ({
		...state,
		[action.direction]: { ...state[action.direction], token: action.payload.token },
	}),
	SET_AMOUNT: (state, action) => ({
		...state,
		[action.direction]: {
			...state[action.direction],
			...(action.payload.amount !== undefined && action.payload.amount !== null && { amount: action.payload.amount }),
			...(action.payload.amount_usd !== undefined && action.payload.amount_usd !== null && { amount_usd: action.payload.amount_usd }),
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
	// SET_RESPONSE: (state, action: SwapAction) => ({ ...state, response: action.payload }),
	TOGGLE_INSURANCE: (state, action) => {
		trackEvent({ category: trackingCategory.SwapCard, action: trackingAction.ToggleInsurance, label: 'toggle_insurance' })
		return toggleRouteInsurance(state, action.payload)
	},
	SET_SWAP_STAGE: (state, action) => {
		if (action.payload === 'progress') {
			window.addEventListener('beforeunload', handleBeforeUnload)
		} else {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
		return { ...state, stage: action.payload }
	},
	TOGGLE_SETTINGS_MODAL_OPEN: state => {
		trackEvent({ category: trackingCategory.SwapCard, action: trackingAction.ToggleSettingsModal, label: 'toggle_settings_modal_open', data: { isOpen: !state.settingsModalOpen } })
		return { ...state, settingsModalOpen: !state.settingsModalOpen }
	},
	SET_SETTINGS: (state, action) => {
		trackEvent({ category: trackingCategory.SwapCard, action: trackingAction.ToggleSettingsModal, label: 'set_settings', data: state.settings })
		return { ...state, settings: { ...state.settings, ...action.payload } }
	},

	SET_SWAP_STEPS: (state, action) => ({ ...state, steps: action.payload }),
	APPEND_SWAP_STEP: (state, action) => ({ ...state, steps: [...state.steps, action.payload] }),
	SET_TO_ADDRESS: (state, action) => ({ ...state, to: { ...state.to, address: action.payload } }),
	UPSERT_SWAP_STEP: (state, action) => {
		const { title, ...rest } = action.payload
		const index = state.steps.findIndex(step => step.title === title)
		if (index === -1) {
			return { ...state, steps: [...state.steps, { title, ...rest }] }
		}
		const newSteps = [...state.steps]
		newSteps[index] = { ...newSteps[index], ...rest }
		return { ...state, steps: newSteps }
	},
	UPDATE_LAST_SWAP_STEP: updateLastSwapState,
	// UPDATE_PREV_RANGO_STEPS: (state: SwapState, action: SwapAction): SwapState => {
	// 	if (!state.steps.length) return state
	// 	if (action.currentTransactionStatus === 'failed') {
	// 		return updateLastSwapState(state)
	// 	} else {
	// 		const newStatuses = state.steps.map((step: StageStep): StageStep => {
	// 			if (step.title === 'Bridging transaction') {
	// 				return { ...step, status: 'success' }
	// 			} else if (step.title === 'Action required') {
	// 				return { ...step, status: 'success', title: 'Transaction approved', body: 'Your transaction has been successfully approved.' }
	// 			}
	// 			return step
	// 		})
	// 		return { ...state, steps: newStatuses }
	// 	}
	// },
	SET_WALLET_BALANCES: (state: SwapState, action: SwapAction) => ({ ...state, walletBalances: action.balances }),
	SET_IS_NO_ROUTES: (state: SwapState, action: SwapAction) => ({ ...state, isNoRoutes: action.status }),
}

function updateLastSwapState(state: SwapState): SwapState {
	const lastStep = state.steps[state.steps.length - 1]
	if (lastStep?.status === 'pending' || lastStep?.status === 'await') {
		return { ...state, steps: [...state.steps.slice(0, state.steps.length - 1)] }
	}
	return state
}
