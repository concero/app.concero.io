import { QueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: (failureCount, error) => {
				if ((error as AxiosError).response?.status === 401) {
					return false
				}
				return failureCount < 3
			},
			retryDelay: 0,
		},
	},
})
