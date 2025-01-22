import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppScreen } from './components/screens/AppScreen/AppScreen'
import { Header } from './components/layout/Header/Header/Header'
import { routes } from './constants/routes'
import { FullScreenLoader } from './components/layout/FullScreenLoader/FullScreenLoader'
import { Footer } from './components/layout/Footer/Footer'
import type { IUser } from './api/concero/user/userType'
import { useAccount } from 'wagmi'
import { handleFetchUser } from './utils/web3/handleFetchUser'
import posthog from 'posthog-js'
import { CheckTermsOfUseDecorator } from './components/modals/TermsConditionModal/CheckTermsOfUse'

const RewardsScreen = lazy(
	async () =>
		await import('./components/screens/RewardsScreen/RewardsScreen').then(module => ({
			default: module.RewardsScreen,
		})),
)

export const Navigator = () => {
	const { address, isConnected } = useAccount()
	const [loading, setIsLoading] = useState<boolean>(false)
	const [user, setUser] = useState<IUser | null>(null)

	const getUser = async () => {
		const user = await handleFetchUser(address!)
		if (user) {
			setUser(user)
		}
	}

	useEffect(() => {
		if (isConnected && address) {
			setIsLoading(true)
			void getUser()
				.catch(e => {
					console.error(e)
				})
				.finally(() => {
					setIsLoading(false)
				})
			posthog.identify(address)
		}
	}, [isConnected, address])
	const ExternalRedirect = ({ url }: { url: string }) => {
		useEffect(() => {
			window.location.href = url
		}, [url])
		return null
	}
	return (
		<BrowserRouter>
			<AppScreen>
				<Header user={user} isWalletConnected={isConnected} />
				<Routes>
					<Route
						path={routes.rewards}
						element={
							<Suspense fallback={<FullScreenLoader />}>
								<CheckTermsOfUseDecorator>
									<RewardsScreen loading={loading} user={user} />
								</CheckTermsOfUseDecorator>
							</Suspense>
						}
					/>
					<Route path={routes.root} element={<Navigate to={routes.rewards} />} />
					<Route path={'/*'} element={<Navigate to={routes.rewards} />} />
					<Route path={routes.pool} element={<ExternalRedirect url="https://lanca.io/pools" />} />
					<Route path={routes.poolUsdc} element={<ExternalRedirect url="https://lanca.io/pools/usdc" />} />
				</Routes>
				<Footer />
			</AppScreen>
		</BrowserRouter>
	)
}
