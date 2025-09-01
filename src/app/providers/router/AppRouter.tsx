import { ProfilePage } from '@/pages/ProfilePage'
import { QuestsPage } from '@/pages/QuestsPage'
import { TestingPage } from '@/pages/TestingPage'
import { routes } from '@/shared/consts/routing/routes'
import { FullScreenLoader } from '@/shared/ui'
import { Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

export const AppRouter = () => {
	const ExternalRedirect = ({ url }: { url: string }) => {
		useEffect(() => {
			window.location.href = url
		}, [url])
		return null
	}
	return (
		<Routes>
			<Route
				path={routes.quests}
				element={
					<Suspense fallback={<FullScreenLoader />}>
						<QuestsPage />
					</Suspense>
				}
			/>
			<Route
				path={routes.testing}
				element={
					<Suspense fallback={<FullScreenLoader />}>
						<TestingPage />
					</Suspense>
				}
			/>
			(
			<Route
				path={routes.profile}
				element={
					<Suspense fallback={<FullScreenLoader />}>
						<ProfilePage />
					</Suspense>
				}
			/>
			)
			<Route path={routes.root} element={<Navigate to={routes.quests} />} />
			<Route path={'/*'} element={<Navigate to={routes.quests} />} />
			<Route path={routes.pools} element={<ExternalRedirect url="https://app.lanca.io/pools" />} />
		</Routes>
	)
}
