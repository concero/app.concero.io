import { createContext, type ReactNode } from 'react'
import { useListModalReducer } from '../components/modals/Modal/listModalReducer'

export const ModalContext = createContext(null)

interface ModalContextProps {
	children: ReactNode
}

export function ModalProvider({ children }: ModalContextProps) {
	const [modalState, modalDispatch] = useListModalReducer()

	return (
		<ModalContext.Provider
			value={{
				modalState,
				modalDispatch,
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}
