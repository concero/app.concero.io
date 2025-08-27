import { useEffect } from 'react'
import { AppScreen } from './components/screens/AppScreen/AppScreen'
import posthog from 'posthog-js'
import { useUserByAddress } from '@/entities/User'
import cls from './Navigator.module.pcss'
import { Address } from 'viem'
import { Header } from '@/widgets/Header'
import { AppRouter } from '@/app/AppRouter'
import { useAccount } from 'wagmi'
import { CheckTermsOfUseDecorator } from './features/Auth'
import { Footer } from './widgets/Footer/ui/Footer'

export const Navigator = () => {
	const { address } = useAccount()

	const { data: user } = useUserByAddress(address ? (address as Address) : undefined)

	useEffect(() => {
		if (address) {
			posthog.identify(address)
		}
	}, [address])

	const userToUse = user?.payload ?? null

	return (
		<AppScreen>
			<CheckTermsOfUseDecorator>
				<Header user={userToUse} isWalletConnected={!!address} />
				<div className={cls.wrap_page}>
					<AppRouter user={userToUse} />
					<Footer />
				</div>
			</CheckTermsOfUseDecorator>
		</AppScreen>
	)
}
