import { createContext, useContext } from 'react'

type BurgerMenuContextType = {
	closeMenu: () => void
}

export const BurgerMenuContext = createContext<BurgerMenuContextType | null>(null)

export const useBurgerMenuContext = () => {
	const context = useContext(BurgerMenuContext)
	if (!context) throw new Error('useBurgerMenuContext must be used within BurgerButton')
	return context
}
