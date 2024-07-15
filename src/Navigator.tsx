import { Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './constants/routes'
import { FullScreenLoader } from './components/layout/FullScreenLoader/FullScreenLoader'
import { useAccount } from 'wagmi'
import posthog from 'posthog-js'

const Redirect = () => {
	useEffect(() => {
		window.location.replace('https://lanca.io/')
	}, [])

	return <div></div>
}

export const Navigator = () => {
	const { address } = useAccount()

	useEffect(() => {
		if (!address) return
		posthog.identify(address)
	}, [address])

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={routes.root}
					element={
						<Suspense fallback={<FullScreenLoader />}>
							<Redirect />
						</Suspense>
					}
				/>
				<Route path={'/*'} element={<Navigate to={routes.root} />} />
			</Routes>
		</BrowserRouter>
	)
}
