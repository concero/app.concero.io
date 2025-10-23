import { createApiHandler, TApiResponse } from '@/shared/types/api'
import { useQuery } from '@tanstack/react-query'
import { ChainApi } from '../model/types/api'
import { get } from '@/shared/api/axiosClient'

export const chainApi = {
	getChains: async () => {
		const url = `${process.env.CONCERO_API_URL}/chains/configuration`
		return createApiHandler(() => get<TApiResponse<ChainApi.GetChainConfiguration.ResponsePayload>>(url))
	},
}

const QUERY_KEY_BASE = 'chains'

export const useChains = () => {
	return useQuery({
		queryKey: [QUERY_KEY_BASE],
		queryFn: () => chainApi.getChains(),
		staleTime: 5 * 60 * 1000, // 5 minutes — chains rarely change
		gcTime: 10 * 60 * 1000, // keep in cache for 10 minutes
	})
}
