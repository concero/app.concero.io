import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppScreen } from './components/screens/AppScreen/AppScreen'
import { Header } from './components/layout/Header/Header/Header'
import { routes } from './constants/routes'
import { FullScreenLoader } from './components/layout/FullScreenLoader/FullScreenLoader'
import { Footer } from './components/layout/Footer/Footer'
import { useAccount } from 'wagmi'
import posthog from 'posthog-js'
import { CheckTermsOfUseDecorator } from './components/modals/TermsConditionModal/CheckTermsOfUse'
import { useUserByAddress } from '@/entities/User'

const RewardsScreen = lazy(
	async () =>
		await import('./components/screens/RewardsScreen/RewardsScreen').then(module => ({
			default: module.RewardsScreen,
		})),
)

export const Navigator = () => {
	const { address, isConnected } = useAccount()
	const { data: user, isPending } = useUserByAddress(isConnected ? address : undefined)
	useEffect(() => {
		if (isConnected && address) {
			posthog.identify(address)
		}
	}, [isConnected, address])
	const ExternalRedirect = ({ url }: { url: string }) => {
		useEffect(() => {
			window.location.href = url
		}, [url])
		return null
	}
	const userToUse = user ?? null

	return (
		<BrowserRouter>
			<AppScreen>
				<Header user={userToUse} isWalletConnected={isConnected} />
				<Routes>
					<Route
						path={routes.rewards}
						element={
							<Suspense fallback={<FullScreenLoader />}>
								<CheckTermsOfUseDecorator>
									<RewardsScreen loading={isPending} user={userToUse} />
								</CheckTermsOfUseDecorator>
							</Suspense>
						}
					/>
					<Route path={routes.root} element={<Navigate to={routes.rewards} />} />
					<Route path={'/*'} element={<Navigate to={routes.rewards} />} />
					<Route path={routes.pool} element={<ExternalRedirect url="https://app.lanca.io/pools" />} />
					<Route
						path={routes.poolUsdc}
						element={<ExternalRedirect url="https://app.lanca.io/pools/usdc" />}
					/>
				</Routes>
				<Footer />
			</AppScreen>
		</BrowserRouter>
	)
}
