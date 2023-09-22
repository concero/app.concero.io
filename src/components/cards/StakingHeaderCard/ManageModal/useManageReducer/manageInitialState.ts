import { ModalType, Status, SwapType } from '../constants'
import { config } from '../../../../../constants/config'
import { StakingState } from '../../../../screens/StakingScreen/stakingReducer/types'

export const manageInitialState = (stakingState: StakingState) => {
  const { selectedVault, address } = stakingState

  return {
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
        providers: [
          {
            name: 'lifi',
            symbol: 'ETH',
          },
          {
            name: 'rango',
            symbol: 'ETH',
          },
        ],
      },
    },
    to: {
      amount: '',
      amount_usd: '',
      token: {
        name: selectedVault.name,
        symbol: selectedVault.widoSymbol,
        logoURI: selectedVault.logoURI,
        address: selectedVault.widoAddress,
        decimals: null,
      },
      chain: {
        name: selectedVault.chain,
        symbol: selectedVault.widoSymbol,
        logoURI: selectedVault.logoURI,
        id: selectedVault.chainId,
      },
    },
    address: address,
    snake: false,
    modalType: ModalType.input,
    swapType: SwapType.stake,
    route: null,
    isLoading: false,
    status: Status.input,
    balance: null,
  }
}
