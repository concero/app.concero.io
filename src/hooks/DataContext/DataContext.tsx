import { createContext, FC, ReactNode, useEffect, useState } from 'react'
import { fetchTokens } from '../../api/concero/fetchTokens'
import { fetchChains } from '../../api/concero/fetchChains'
import { config } from '../../constants/config'

interface DataProviderProps {
  children: ReactNode
}

export const DataContext = createContext(null)

export const initialState = {
  tokens: {
    1: [
      {
        name: 'Ethereum',
        symbol: 'ETH',
        address: config.NULL_ADDRESS,
        logoURI: 'https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png',
        decimals: 18,
        coinGeckoId: 'ethereum',
        is_popular: true,
      },
    ],
    137: [
      {
        name: 'Matic',
        symbol: 'MATIC',
        address: config.NULL_ADDRESS,
        logoURI: 'https://static.debank.com/image/matic_token/logo_url/matic/6f5a6b6f0732a7a235131bd7804d357c.png',
        decimals: 18,
        coinGeckoId: 'matic-network',
        is_popular: true,
      },
    ],
  },
  chains: [
    {
      id: '1',
      name: 'Ethereum',
      symbol: 'ETH',
      addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
      logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg',
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
    {
      id: '137',
      name: 'Polygon',
      symbol: 'MATIC',
      addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
      logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/polygon.svg',
      providers: [
        {
          name: 'lifi',
          symbol: 'MATIC',
        },
        {
          name: 'rango',
          symbol: 'POLYGON',
        },
      ],
    },
  ],
}
export const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const [tokens, setTokens] = useState(initialState.tokens)
  const [chains, setChains] = useState(initialState.chains)

  const getTokens = async ({ chainId, offset, limit, search }) => {
    if (search) {
      const response = await fetchTokens({ chainId, offset, limit, search })
      return response
    }

    if (tokens[chainId]) {
      if (tokens[chainId].length >= offset + limit) {
        return tokens[chainId].slice(offset, offset + limit)
      }
      if (tokens[chainId].length < limit) {
        return tokens[chainId]
      }
    }

    const response = await fetchTokens({ chainId, offset, limit, search })
    setTokens((prevTokens) => {
      const existingTokens = prevTokens[chainId] || []
      return { ...prevTokens, [chainId]: [...existingTokens, ...response] }
    })
    return response
  }

  const getChains = async ({ chainId, offset, limit, search }) => {
    if (search) {
      const response = await fetchChains({ search })
      return response
    }
    if (chains.length >= offset + limit) {
      return chains.slice(offset, offset + limit)
    }

    const response = await fetchChains({ chainId, offset, limit })
    setChains((prevChains) => [...prevChains, ...response])
    return response
  }

  const initialFetch = async () => {
    const [ethTokens, polygonTokens, fetchedChains] = await Promise.all([
      fetchTokens({ chainId: '1', offset: 0, limit: 15 }),
      fetchTokens({ chainId: '137', offset: 0, limit: 15 }),
      fetchChains({ offset: 0, limit: 15 }),
    ])
    setTokens({ 1: ethTokens, 137: polygonTokens })

    setChains(fetchedChains)
  }

  useEffect(() => {
    initialFetch()
  }, [])

  return <DataContext.Provider value={{ getTokens, getChains, tokens, chains, setTokens, setChains }}>{children}</DataContext.Provider>
}
