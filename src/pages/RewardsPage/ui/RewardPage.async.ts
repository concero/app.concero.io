import { lazy } from 'react'

export const RewardsPageAsync = lazy(
	async () =>
		await import('./RewardsPage').then(module => ({
			default: module.RewardsPage,
		})),
)
