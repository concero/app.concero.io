import { ModalType, SwapType } from '../constants'
import { ManageState } from './types'

export const manageInitialState: ManageState = {
  from: {
    amount: '',
    amount_usd: '',
    token: {
      name: 'BUSD',
      symbol: 'BUSD',
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png',
      address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      decimals: 18,
    },
    chain: {
      name: 'Binance Smart Chain',
      symbol: 'BSC',
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png',
      id: 56,
    },
  },
  to: {
    amount: '',
    amount_usd: '',
    token: {
      name: 'BUSD',
      symbol: 'BUSD',
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png',
      address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      decimals: 18,
    },
    chain: {
      name: 'Binance Smart Chain',
      symbol: 'BSC',
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/info/logo.png',
      id: 56,
    },
  },
  snake: false,
  modalType: ModalType.input,
  direction: 'from',
  swapType: SwapType.stake,
  route: {
    fee_bps: 0,
    fee_in_from_token: 0,
    from_token_amount: '',
    is_supported: false,
    price: 34,
    expectedSlippage: 0.5,
    steps: [
      {
        chainId: 56,
        fromToken: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        functionName: 'swapExactTokensForTokens',
        protocol: 'pancakeswap',
        swapAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        toChainId: 137,
        toToken: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      },
      {
        chainId: 137,
        fromToken: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        functionName: 'swapExactTokensForTokens',
        protocol: 'quickswap',
        swapAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
        toChainId: 56,
        toToken: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      },
      {
        chainId: 56,
        fromToken: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        functionName: 'swapExactTokensForTokens',
        protocol: 'pancakeswap',
        swapAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        toChainId: 137,
        toToken: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      },
    ],
    to_token_amount: '',
    steps_count: 3,
  },
}
