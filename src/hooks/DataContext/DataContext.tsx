import { createContext, FC, ReactNode, useState } from 'react'
import { fetchTokensByChainId } from '../../api/concero/fetchTokensByChainId'
import { fetchChains } from '../../api/concero/fetchChains'

interface DataProviderProps {
  children: ReactNode
}

export const DataContext = createContext(null)

export const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const [tokens, setTokens] = useState({})
  const [chains, setChains] = useState([])

  const getTokens = async (chainId) => {
    if (tokens[chainId]) return tokens[chainId]
    const response = await fetchTokensByChainId(chainId)
    setTokens((prevTokens) => {
      return { ...prevTokens, [chainId]: response }
    })
    return response
  }

  const getChains = async () => {
    if (chains.length) return chains
    const response = await fetchChains()
    setChains(response)
    return response
  }

  return <DataContext.Provider value={{ getTokens, getChains }}>{children}</DataContext.Provider>
}
