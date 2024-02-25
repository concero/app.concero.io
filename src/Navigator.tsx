import { type FC, lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppScreen } from './components/screens/AppScreen/AppScreen'
import { Header } from './components/layout/Header/Header/Header'
import { routes } from './constants/routes'
import { FullScreenLoader } from './components/layout/FullScreenLoader/FullScreenLoader'
import { useAccount } from 'wagmi'
import posthog from 'posthog-js'

const SwapScreen = lazy(
	async () =>
		await import('./components/screens/SwapScreen/SwapScreen').then(module => ({ default: module.SwapScreen })),
)
const PortfolioScreen = lazy(
	async () =>
		await import('./components/screens/PortfolioScreen/PortfolioScreen').then(module => ({
			default: module.PortfolioScreen,
		})),
)
const EarnScreen = lazy(
	async () =>
		await import('./components/screens/EarnScreen/EarnScreen').then(module => ({ default: module.EarnScreen })),
)

export interface NavigatorProps {}

export const Navigator: FC<NavigatorProps> = () => {
	const { address } = useAccount()

	useEffect(() => {
		if (!address) return
		posthog.identify(address)
	}, [address])

	return (
		<BrowserRouter>
			<AppScreen>
				<Header />
				<Routes>
					<Route
						path={routes.swap}
						element={
							<Suspense fallback={<FullScreenLoader />}>
								<SwapScreen />
							</Suspense>
						}
					/>
					<Route
						path={routes.portfolio}
						element={
							<Suspense fallback={<FullScreenLoader />}>
								<PortfolioScreen />
							</Suspense>
						}
					/>
					<Route
						path={routes.earn}
						element={
							<Suspense fallback={<FullScreenLoader />}>
								<EarnScreen />
							</Suspense>
						}
					/>
					<Route path={routes.root} element={<Navigate to={routes.swap} />} />
					<Route path={'/*'} element={<Navigate to={routes.swap} />} />
				</Routes>
			</AppScreen>
		</BrowserRouter>
	)
}
