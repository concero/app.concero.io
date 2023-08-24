import { createContext, FC, ReactNode } from 'react'

interface SwapCardProviderProps {
  children: ReactNode
  toggleInsurance: (id: string) => void
}

export const InsuranceContext = createContext(null)

export const InsuranceProvider: FC<SwapCardProviderProps> = ({ children, toggleInsurance }) => {
  return (
    <InsuranceContext.Provider
      value={{
        toggleInsurance,
      }}
    >
      {children}
    </InsuranceContext.Provider>
  )
}