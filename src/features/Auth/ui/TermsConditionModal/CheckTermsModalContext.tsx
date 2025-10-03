import { useGlobalEvent } from '@/shared/lib/store/globalState'
import { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react'

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
	const termsEvent = useGlobalEvent('SHOW_TERMS_MODAL')
	const [opened, setOpen] = useState(!!termsEvent)

	useEffect(() => {
		if (termsEvent) {
			setOpen(true)
		}
	}, [termsEvent])

	const open = () => {
		setOpen(true)
	}
	const contextValue = useMemo(
		() => ({
			open: () => setOpen(true),
			opened: opened,
			setOpen: setOpen,
		}),
		[opened],
	)

	return <CheckTermsModalContext.Provider value={contextValue}>{children}</CheckTermsModalContext.Provider>
}

export const useCheckTermsModal = (): ModalContextType => {
	const context = useContext(CheckTermsModalContext)

	if (!context) {
		throw new Error('useCheckTermsModal must be used within a CheckTermsModalProvider')
	}
	return context
}
