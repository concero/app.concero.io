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
import cls from './Navigator.module.pcss'
import { ProfilePage } from '@/pages/ProfilePage'
import { isAdminAddress } from './shared/lib/tests/isAdminAddress'
const RewardsScreen = lazy(
	async () =>
		await import('./components/screens/RewardsScreen/RewardsScreen').then(module => ({
			default: module.RewardsScreen,
		})),
)

export const Navigator = () => {
	const { address, isConnected } = useAccount()
	const { data: user, isPending } = useUserByAddress(isConnected ? address : undefined)
	let isAdmin = isAdminAddress(address)
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
		<BrowserRouter
			future={{
				v7_startTransition: true,
				v7_relativeSplatPath: true,
			}}
		>
			<AppScreen>
				<Header user={userToUse} isWalletConnected={isConnected} />
				<div className={cls.wrap_page}>
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
						{isAdmin ? (
							<Route
								path={routes.profile}
								element={
									<Suspense fallback={<FullScreenLoader />}>
										<CheckTermsOfUseDecorator>
											<ProfilePage user={userToUse} />
										</CheckTermsOfUseDecorator>
									</Suspense>
								}
							/>
						) : null}
						<Route path={routes.root} element={<Navigate to={routes.rewards} />} />
						<Route path={'/*'} element={<Navigate to={routes.rewards} />} />
						<Route path={routes.pool} element={<ExternalRedirect url="https://app.lanca.io/pools" />} />
						<Route
							path={routes.poolUsdc}
							element={<ExternalRedirect url="https://app.lanca.io/pools/usdc" />}
						/>
					</Routes>
				</div>
				<Footer />
			</AppScreen>
		</BrowserRouter>
	)
}
