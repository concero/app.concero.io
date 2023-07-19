import { chains } from '../constants/chains'

export const getChainLogoURIById = (id: number): string | undefined => chains.find((chain) => chain.id === id)?.logoURI
