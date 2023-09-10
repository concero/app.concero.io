import { tokens } from '../../../../constants/tokens'
import { toggleRouteInsurance } from './toggleRouteInsurance'
import { handleBeforeUnload } from '../../../../utils/leavingPageEvents'

export const swapActions = {
  /* ROUTE-RELATED ACTIONS */
  SET_ROUTES: (state, action) => ({ ...state, routes: action.payload }),
  POPULATE_ROUTES: (state, action) => {
    if (action.fromAmount !== state.from.amount) return state
    return { ...state, routes: action.payload, selectedRoute: action.payload[0] }
  },
  CLEAR_ROUTES: (state) => ({ ...state, isLoading: false, routes: [], selectedRoute: null }),
  SET_BALANCE: (state, action) => ({ ...state, balance: action.payload }),
  SET_LOADING: (state, action) => ({ ...state, isLoading: action.payload }),
  SET_SELECTED_ROUTE: (state, action) => ({ ...state, selectedRoute: action.payload }),
  SET_ORIGINAL_ROUTES: (state, action) => ({ ...state, originalRoutes: action.payload }),
  SET_TYPING_TIMEOUT: (state, action) => ({ ...state, typingTimeout: action.payload }),
  /* INPUT_RELATED ACTIONS */
  SET_CHAIN: (state, action) => {
    const { chain } = action.payload
    return { ...state, [action.direction]: { ...state[action.direction], chain, token: tokens[chain.id][0] } }
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
  SET_RESPONSE: (state, action) => ({ ...state, response: action.payload }),
  TOGGLE_INSURANCE: (state, action) => toggleRouteInsurance(state, action.payload),
  SET_SWAP_STAGE: (state, action) => {
    if (action.payload === 'progress') {
      window.addEventListener('beforeunload', handleBeforeUnload)
    } else {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
    return { ...state, stage: action.payload }
  },
  TOGGLE_SETTINGS_MODAL_OPEN: (state) => ({ ...state, settingsModalOpen: !state.settingsModalOpen }),
  SET_SETTINGS: (state, action) => ({ ...state, settings: { ...state.settings, ...action.payload } }),
  SET_SWAP_STEPS: (state, action) => ({ ...state, steps: action.payload }),
  SET_SWAP_STATUS: (state, action) => {
    if (action.payload === 'success' || action.payload === 'failure') {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
    return { ...state, status: action.payload }
  },
  APPEND_SWAP_STEP: (state, action) => ({ ...state, steps: [...state.steps, action.payload] }),
  SET_TO_ADDRESS: (state, action) => ({ ...state, to: { ...state.to, address: action.payload } }),
  UPSERT_SWAP_STEP: (state, action) => {
    const { title, ...rest } = action.payload
    const index = state.steps.findIndex((step) => step.title === title)
    if (index === -1) {
      return { ...state, steps: [...state.steps, { title, ...rest }] }
    }
    const newSteps = [...state.steps]
    newSteps[index] = { ...newSteps[index], ...rest }
    return { ...state, steps: newSteps }
  },
  SET_CHAINS: (state, action) => ({ ...state, chains: action.payload }),
  POPULATE_INIT_DATA: (state, action) => action.payload,
}
