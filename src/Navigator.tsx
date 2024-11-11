import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppScreen } from './components/screens/AppScreen/AppScreen'
import { Header } from './components/layout/Header/Header/Header'
import { routes } from './constants/routes'
import { FullScreenLoader } from './components/layout/FullScreenLoader/FullScreenLoader'
import { Footer } from './components/layout/Footer/Footer'

const PoolScreen = lazy(
	async () =>
		await import('./components/screens/PoolScreen/PoolScreen').then(module => ({ default: module.PoolScreen })),
)

const UsdcPoolScreen = lazy(
	async () =>
		await import('./components/screens/PoolScreen/UsdcPoolScreen').then(module => ({
			default: module.UsdcPoolScreen,
		})),
)

const RewardsScreen = lazy(
	async () =>
		await import('./components/screens/RewardsScreen/RewardsScreen').then(module => ({
			default: module.RewardsScreen,
		})),
)

const FeedbackScreen = lazy(
	async () =>
		await import('./components/screens/FeedbackScreen/FeedbackScreen').then(module => ({
			default: module.FeedbackScreen,
		})),
)

export const Navigator = () => {
	return (
		<BrowserRouter>
			<AppScreen>
				<Header />
				<Routes>
					<Route
						path={routes.pool}
						element={
							<Suspense fallback={<FullScreenLoader />}>
								<PoolScreen />
							</Suspense>
						}
					/>
					<Route
						path={routes.poolUsdc}
						element={
							<Suspense fallback={<FullScreenLoader />}>
								<UsdcPoolScreen />
							</Suspense>
						}
					/>
					<Route
						path={routes.pool}
						element={
							<Suspense fallback={<FullScreenLoader />}>
								<PoolScreen />
							</Suspense>
						}
					/>
					<Route
						path={routes.rewards}
						element={
							<Suspense fallback={<FullScreenLoader />}>
								<RewardsScreen />
							</Suspense>
						}
					/>
					<Route
						path={routes.feedback}
						element={
							<Suspense fallback={<FullScreenLoader />}>
								<FeedbackScreen />
							</Suspense>
						}
					/>
					<Route path={routes.root} element={<Navigate to={routes.pool} />} />
					<Route path={'/*'} element={<Navigate to={routes.pool} />} />
				</Routes>
				<Footer />
			</AppScreen>
		</BrowserRouter>
	)
}
