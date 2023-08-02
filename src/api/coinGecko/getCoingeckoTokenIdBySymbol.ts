import { coinGeckoTokens } from '../../constants/coinGeckoTokens'

export const getCoingeckoTokenIdBySymbol = (symbol: string): string | undefined => {
  const token = coinGeckoTokens.find((token) => token.symbol === symbol.toLowerCase())
  return token?.id
}
