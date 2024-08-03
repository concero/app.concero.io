import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppScreen } from './components/screens/AppScreen/AppScreen'
import { Header } from './components/layout/Header/Header/Header'
import { routes } from './constants/routes'
import { FullScreenLoader } from './components/layout/FullScreenLoader/FullScreenLoader'
import { useAccount } from 'wagmi'
import posthog from 'posthog-js'

const PoolScreen = lazy(
	async () =>
		await import('./components/screens/PoolScreen/PoolScreen').then(module => ({ default: module.PoolScreen })),
)

export const Navigator = () => {
	const { address } = useAccount()
	const [isNewSwapCardMode, setIsNewSwapCardMode] = useState(true)

	useEffect(() => {
		if (!address) return
		posthog.identify(address)
	}, [address])

	return (
		<BrowserRouter>
			<AppScreen>
				<Header isNewSwapCardMode={isNewSwapCardMode} setIsNewSwapCardMode={setIsNewSwapCardMode} />
				<Routes>
					<Route
						path={routes.pool}
						element={
							<Suspense fallback={<FullScreenLoader />}>
								<PoolScreen />
							</Suspense>
						}
					/>
					<Route path={routes.root} element={<Navigate to={routes.pool} />} />
					<Route path={'/*'} element={<Navigate to={routes.pool} />} />
				</Routes>
			</AppScreen>
		</BrowserRouter>
	)
}
