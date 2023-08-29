import { isFloatInput } from '../../../../utils/validation'

export const handleAreaClick = ({ inputRef }) => {
  if (inputRef.current) {
    inputRef.current.focus()
  }
}

export const handleAmountChange = ({ value, dispatch, setAmountUsd, direction }) => {
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
    payload: { amount: value },
  })

  setAmountUsd(value)
}
