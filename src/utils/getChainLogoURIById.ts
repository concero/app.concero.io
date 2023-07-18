import { chains } from '../constants/chains'

export const getChainLogoURIById = (id: number): string | undefined => {
  return chains.find((chain) => chain.id === id)?.logoURI
}
