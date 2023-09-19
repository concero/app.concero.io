import { ModalType } from '../constants'

export const manageInitialState = {
  from: {
    amount: '',
    amount_usd: '',
    token: {
      name: 'BUSD',
      symbol: 'BUSD',
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xe9e7cea3dedca5984780bafc599bd69add087d56/logo.png',
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
      logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xe9e7cea3dedca5984780bafc599bd69add087d56/logo.png',
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
}
