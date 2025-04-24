import { FullScreenLoader } from '@/components/layout/FullScreenLoader/FullScreenLoader'
import { CheckTermsOfUseDecorator } from '@/components/modals/TermsConditionModal/CheckTermsOfUse'
import { routes } from '@/constants/routes'
import { TUserResponse } from '@/entities/User'
import { ProfilePage } from '@/pages/ProfilePage'
import { RewardsPage } from '@/pages/RewardsPage'
import { Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

type TProps = {
	user: TUserResponse | null
}
export const AppRouter = (props: TProps) => {
	const { user } = props
	const ExternalRedirect = ({ url }: { url: string }) => {
		useEffect(() => {
			window.location.href = url
		}, [url])
		return null
	}
	return (
		<Routes>
			<Route
				path={routes.rewards}
				element={
					<Suspense fallback={<FullScreenLoader />}>
						<CheckTermsOfUseDecorator>
							<RewardsPage user={user} />
						</CheckTermsOfUseDecorator>
					</Suspense>
				}
			/>
			(
			<Route
				path={routes.profile}
				element={
					<Suspense fallback={<FullScreenLoader />}>
						<CheckTermsOfUseDecorator>
							<ProfilePage user={user} />
						</CheckTermsOfUseDecorator>
					</Suspense>
				}
			/>
			)
			<Route path={routes.root} element={<Navigate to={routes.rewards} />} />
			<Route path={'/*'} element={<Navigate to={routes.rewards} />} />
			<Route path={routes.pool} element={<ExternalRedirect url="https://app.lanca.io/pools" />} />
			<Route path={routes.poolUsdc} element={<ExternalRedirect url="https://app.lanca.io/pools/usdc" />} />
		</Routes>
	)
}
