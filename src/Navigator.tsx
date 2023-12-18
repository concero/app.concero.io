import { FC, lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppScreen } from './components/screens/AppScreen/AppScreen'
import { Header } from './components/layout/Header/Header/Header'
import { routes } from './constants/routes'
import { FullScreenLoader } from './components/layout/FullScreenLoader/FullScreenLoader'

const SwapScreen = lazy(() => import('./components/screens/SwapScreen/SwapScreen').then(module => ({ default: module.SwapScreen })))
const PortfolioScreen = lazy(() => import('./components/screens/PortfolioScreen/PortfolioScreen').then(module => ({ default: module.PortfolioScreen })))
const EarnScreen = lazy(() => import('./components/screens/EarnScreen/EarnScreen').then(module => ({ default: module.EarnScreen })))

export interface NavigatorProps {}

export const Navigator: FC<NavigatorProps> = () => (
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
			</Routes>
		</AppScreen>
	</BrowserRouter>
)
