import { createContext, type FC, type ReactNode } from 'react'

interface SwapCardProviderProps {
	children: ReactNode
	toggleInsurance: (id: string) => void
}

export const InsuranceContext = createContext(null)

export const InsuranceProvider: FC<SwapCardProviderProps> = ({ children, toggleInsurance }) => (
	<InsuranceContext.Provider
		value={{
			toggleInsurance,
		}}
	>
		{children}
	</InsuranceContext.Provider>
)
