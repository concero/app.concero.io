import { createContext, useContext, ReactNode, useState } from 'react'

interface ModalContextType {
	opened: boolean
	open: () => void
	setOpen: (newState: boolean) => void
}

const CheckTermsModalContext = createContext<ModalContextType | undefined>(undefined)

interface CheckTermsModalProviderProps {
	children: ReactNode
}

export const CheckTermsModalProvider = ({ children }: CheckTermsModalProviderProps) => {
	const [opened, setOpen] = useState(false)
	const open = () => {
		setOpen(true)
	}

	return (
		<CheckTermsModalContext.Provider value={{ open, opened, setOpen }}>{children}</CheckTermsModalContext.Provider>
	)
}

export const useCheckTermsModal = (): ModalContextType => {
	const context = useContext(CheckTermsModalContext)

	if (!context) {
		throw new Error('useCheckTermsModal must be used within a CheckTermsModalProvider')
	}
	return context
}
