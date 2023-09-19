import { ModalType, SwapType } from '../constants'
import { ManageState } from './types'
import { config } from '../../../../../constants/config'

export const manageInitialState: ManageState = {
  from: {
    amount: '',
    amount_usd: '',
    token: {
      name: 'Ethereum',
      symbol: 'ETH',
      logoURI: 'https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png',
      address: config.NULL_ADDRESS,
      decimals: 18,
    },
    chain: {
      name: 'Ethereum',
      symbol: 'ETH',
      logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg',
      id: 1,
    },
  },
  to: {
    amount: '',
    amount_usd: '',
    token: {
      name: '',
      symbol: '',
      logoURI: '',
      address: '',
      decimals: null,
    },
    chain: {
      name: '',
      symbol: '',
      logoURI: '',
      id: null,
    },
  },
  snake: false,
  modalType: ModalType.input,
  direction: 'from',
  swapType: SwapType.stake,
  route: null,
}
