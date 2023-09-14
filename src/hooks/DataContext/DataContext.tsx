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
    },
    {
      id: '137',
      name: 'Polygon',
      symbol: 'MATIC',
      addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
      logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/polygon.svg',
    },
  ],
}
export const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const [tokens, setTokens] = useState(initialState.tokens)
  const [chains, setChains] = useState(initialState.chains)

  const getTokens = async ({ chainId, offset, limit, search }) => {
    if (search) {
      console.log(`find tokens by search ${search}`)
      const response = await fetchTokens({ chainId, offset, limit, search })
      return response
    }
    // console.log('getTokens', chainId, offset, limit)
    if (tokens[chainId] && tokens[chainId].length >= offset + limit) {
      console.log('returning tokens from cache')
      // console.log(tokens[chainId].slice(offset, offset + limit))
      return tokens[chainId].slice(offset, offset + limit)
    }

    const response = await fetchTokens({ chainId, offset, limit, search })
    // Append new tokens to existing ones for the particular chainId
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
    setChains(response)
    return response
  }

  const initialFetch = async () => {
    // console.log('initialFetch')
    const [ethTokens, polygonTokens, chains] = await Promise.all([
      fetchTokens({ chainId: '1', offset: 0, limit: 15 }),
      fetchTokens({ chainId: '137', offset: 0, limit: 15 }),
      fetchChains({ offset: 0, limit: 15 }),
    ])
    setTokens({ 1: ethTokens, 137: polygonTokens })
    // console.log('tokens', ethTokens)
    setChains(chains)
  }

  useEffect(() => {
    initialFetch()
  }, [])

  return <DataContext.Provider value={{ getTokens, getChains, tokens, chains, setTokens, setChains }}>{children}</DataContext.Provider>
}
