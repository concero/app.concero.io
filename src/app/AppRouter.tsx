import { FullScreenLoader } from '@/components/layout/FullScreenLoader/FullScreenLoader'
import { routes } from '@/constants/routes'
import { TUserResponse } from '@/entities/User'
import { ProfilePage, ProfilePageError } from '@/pages/ProfilePage'
import { RewardPageError, RewardsPage } from '@/pages/RewardsPage'
import { Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ErrorBoundary from './providers/ErrorBoundary/ErrorBoundary'

type TProps = {
	user: TUserResponse | null
}

const RewardsRoute = ({ user }: { user: TUserResponse | null }) => {
	return (
		<ErrorBoundary fallback={<RewardPageError />}>
			<Suspense fallback={<FullScreenLoader />}>
				<RewardsPage user={user} />
			</Suspense>
		</ErrorBoundary>
	)
}

const ProfileRoute = ({ user }: { user: TUserResponse | null }) => {
	return (
		<ErrorBoundary fallback={<ProfilePageError />}>
			<Suspense fallback={<FullScreenLoader />}>
				<ProfilePage user={user} />
			</Suspense>
		</ErrorBoundary>
	)
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
			<Route path={routes.rewards} element={<RewardsRoute user={user} />} />
			<Route path={routes.profile} element={<ProfileRoute user={user} />} />
			<Route path={routes.root} element={<Navigate to={routes.rewards} />} />
			<Route path={'/*'} element={<Navigate to={routes.rewards} />} />
			<Route path={routes.pool} element={<ExternalRedirect url="https://app.lanca.io/pools" />} />
			<Route path={routes.poolUsdc} element={<ExternalRedirect url="https://app.lanca.io/pools/usdc" />} />
		</Routes>
	)
}
