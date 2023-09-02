import { tokens } from '../../../../constants/tokens'
import { toggleRouteInsurance } from './toggleRouteInsurance'

export const swapActions = {
  /* ROUTE-RELATED ACTIONS */
  SET_ROUTES: (state, action) => ({ ...state, routes: action.payload }),
  POPULATE_ROUTES: (state, action) => {
    if (action.fromAmount !== state.from.amount) return state
    return { ...state, isLoading: false, routes: action.payload, selectedRoute: action.payload[0] }
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
  SET_SWAP_STAGE: (state, action) => ({ ...state, stage: action.payload }),
  SET_SWAP_STEPS: (state, action) => ({ ...state, steps: action.payload }),
  SET_SWAP_STATUS: (state, action) => ({ ...state, status: action.payload }),
  APPEND_SWAP_STEP: (state, action) => ({ ...state, steps: [...state.steps, action.payload] }),
}
