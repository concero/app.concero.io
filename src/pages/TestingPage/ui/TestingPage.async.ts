import { lazy } from 'react'

export const TestingPageAsync = lazy(
	async () =>
		await import('./TestingPage').then(module => ({
			default: module.TestingPage,
		})),
)
