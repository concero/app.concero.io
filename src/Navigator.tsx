import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppScreen } from './components/screens/AppScreen/AppScreen'
import { Footer } from './components/layout/Footer/Footer'
import posthog from 'posthog-js'
import { useUserByAddress } from '@/entities/User'
import cls from './Navigator.module.pcss'
import { useAppKitAccount } from '@reown/appkit/react'
import { Address } from 'viem'
import { Header } from '@/widgets/Header'
import { AppRouter } from '@/app/AppRouter'

export const Navigator = () => {
	const { address, isConnected } = useAppKitAccount()

	const { data: user } = useUserByAddress(isConnected && address ? (address as Address) : undefined)
	useEffect(() => {
		if (isConnected && address) {
			posthog.identify(address)
		}
	}, [isConnected, address])

	const userToUse = user ?? null

	return (
		<AppScreen>
			<Header user={userToUse} isWalletConnected={isConnected} />
			<div className={cls.wrap_page}>
				<AppRouter user={userToUse} />
				<Footer />
			</div>
		</AppScreen>
	)
}
