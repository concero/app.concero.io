import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { get, post } from '@/api/client'
import { TApiGetResponse, TApiResponse } from '@/shared/types/api'
import { Address } from 'viem'
import { invalidationTagUser } from '@/entities/User'
import { queryClient } from '@/shared/api/tanstackClient'

const socialService = {
	checkCersEidi: async ({ address }: { address: Address }) => {
		const url = `${process.env.CONCERO_API_URL}/rewards/checkCersEidiReward/${address}`
		const response = await get<TApiResponse<TApiGetResponse<boolean>>>(url)
		if (response.status !== 200) throw new Error('Something went wrong')
		if (response.data.success) {
			return response.data.data
		} else {
			return false
		}
	},

	claimCersEidi: async (props: { address: Address }) => {
		const { address } = props
		const url = `${process.env.CONCERO_API_URL}/rewards/claimCersEidiReward/${address}`
		const response = await post<TApiResponse>(url)
		if (response.status !== 200) throw new Error('Something went wrong')
		if (response.data.success) {
			return response.data.data
		} else {
			return false
		}
	},
}

const tagInvalidation = 'socials'

export const useCheckCersEidi = (args: { address?: Address }) => {
	return useQuery({
		queryKey: [tagInvalidation],
		queryFn: async () => {
			if (!args.address) throw new Error('Address is required')
			return socialService.checkCersEidi({ address: args.address })
		},
		enabled: !!args.address,
	})
}

export const useClaimCersEidiMutation = () => {
	return useMutation({
		mutationFn: ({ address }: { address: Address }) => socialService.claimCersEidi({ address }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
			queryClient.invalidateQueries({ queryKey: [invalidationTagUser] })
		},
	})
}

export const invalidationTagQuest = tagInvalidation
