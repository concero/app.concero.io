import { fetchTokenBalance } from '../../../../api/rango/fetchTokenBalance'
import { addingTokenDecimals } from '../../../../utils/formatting'

interface HandleBalanceProps {
  setBalance: (balance: string) => void
  from: {
    chain: {
      providers: {
        rango: {
          key: string
        }
      }
    }
    token: {
      address: string
      symbol: string
      decimals: number
    }
  }
  address: string
}

export const handleBalance = async ({ setBalance, from, address }: HandleBalanceProps) => {
  const response = await fetchTokenBalance(
    from.chain.providers.rango.key,
    from.token.address,
    address,
    from.token.symbol,
  )

  const result = `${addingTokenDecimals(response.data, from.token.decimals)} ${from.token.symbol}`

  setBalance(result)
}
