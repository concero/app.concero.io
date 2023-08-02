import { useReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOW_BALANCE':
      return {
        isDisabled: true,
        text: 'Insufficient balance',
        icon: 'Wallet',
        className: 'wrong',
      }
    case 'NO_AMOUNT': {
      return {
        isDisabled: true,
        text: 'Enter amount to swap',
        icon: '',
        className: 'disabled',
      }
    }
    case 'SWAP':
      return {
        isDisabled: false,
        text: 'Swap',
        icon: 'ArrowsUpDown',
        className: 'swap',
      }
    case 'DISCONNECTED':
      return {
        isDisabled: true,
        text: 'Connect Wallet',
        icon: '',
        className: 'disabled',
      }
    case 'LOADING':
      return {
        isDisabled: true,
        text: '',
        icon: '',
        className: 'loading',
      }
    case 'NO_ROUTE': {
      return {
        isDisabled: true,
        text: 'No route found',
        icon: '',
        className: 'disabled',
      }
    }
    case 'SUCCESS':
      return {
        isDisabled: true,
        text: 'Swap started successfully!',
        icon: 'ArrowsUpDown',
        className: 'success',
      }
    case 'WRONG':
      return {
        isDisabled: true,
        text: 'Something went wrong',
        icon: '',
        className: 'wrong',
      }
    case 'CANCELED':
      return {
        isDisabled: true,
        text: 'Cancelled by user',
        icon: '',
        className: 'wrong',
      }
    default:
      return state
  }
}

export const useButtonReducer = () => {
  const [buttonState, dispatch] = useReducer(reducer, {
    text: 'Enter amount to swap',
    isDisabled: true,
    icon: '',
    className: 'disabled',
  })

  return [buttonState, dispatch]
}
