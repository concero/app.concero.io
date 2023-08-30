import { tokens } from '../../../../constants/tokens'
import { isFloatInput } from '../../../../utils/validation'

export const handleAreaClick = ({ inputRef }) => {
  if (inputRef.current) {
    inputRef.current.focus()
  }
}

export const handleMappedTokens = ({ selection, setMappedTokens }) => {
  setMappedTokens((prev) => [...prev, ...tokens[selection.chain.id].slice([prev].length, [prev].length + 50)])
}

export const handleAmountChange = ({ value, state, dispatch, direction }) => {
  if (value === '') {
    return dispatch({
      type: 'RESET_AMOUNTS',
      direction,
    })
  }

  if (!isFloatInput(value)) return

  dispatch({
    type: 'SET_AMOUNT',
    direction,
    payload: { amount: value, amount_usd: (state.currentTokenPriceUSD * parseFloat(value)).toFixed(2).toString() },
  })
}
