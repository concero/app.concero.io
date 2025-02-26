import { Address } from 'viem'
import { AxiosResponse } from 'axios'
import { del, get, post } from '@/api/client'
import { TAcceptTerms, TUserVolumeArgs } from '../model/types/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TGetLeaderBoardReponse, TUpdateUserDiscord, TUpdateUserTwitter, TUserResponse } from '../model/types/response'
import { TApiResponse } from '@/types/api'

const tagInvalidation = 'user'
//--------------------------------Domain
export const createUser = async (address: Address): Promise<TUserResponse> => {
	const url = `${process.env.CONCERO_API_URL}/users`

	const response = await post<TApiResponse<TUserResponse>>(url, { address })
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
export const useCreateUserMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (address: Address) => createUser(address),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}

const getUserByAddress = async (address: Address) => {
	const url = `${process.env.CONCERO_API_URL}/users/${address}`

	const response = await get<TApiResponse<TUserResponse>>(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
export const useUserByAddress = (address?: Address) => {
	return useQuery({
		queryKey: [tagInvalidation, address],
		queryFn: () => getUserByAddress(address as Address),
		enabled: !!address,
		notifyOnChangeProps: ['data', 'isPending', 'error'],
	})
}

export const addQuestToProgress = async (address: string, questId: string) => {
	const url = `${process.env.CONCERO_API_URL}/users/${address}/quests-in-progress/${questId}`
	const response = await post<TApiResponse<string>>(url, {})
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.success
}

export const useAddQuestToProgressMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (payload: { address: string; questId: string }) =>
			addQuestToProgress(payload.address, payload.questId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}

export const removeQuestFromProgress = async (address: string, questId: string) => {
	const url = `${process.env.CONCERO_API_URL}/users/${address}/remove-quest-from-progress/${questId}`
	const response = await del<TApiResponse<string>>(url, {})
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.success
}

export const useRemoveQuestFromProgressMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (payload: { address: string; questId: string }) =>
			removeQuestFromProgress(payload.address, payload.questId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}

export const getUserVolume = async ({ address, startDate, endDate, isCrossChain, chainIds }: TUserVolumeArgs) => {
	const startDateValue = typeof startDate === 'object' ? Number(startDate.$numberDecimal) : startDate
	const endDateValue = typeof endDate === 'object' ? Number(endDate.$numberDecimal) : endDate

	const url = `${process.env.CONCERO_API_URL}/userVolume`

	const requestBody = {
		address,
		startDate: startDateValue,
		endDate: endDateValue,
		isCrossChain,
		chainIds,
	}
	const response = await post<TApiResponse<number>>(url, requestBody)
	if (response.status !== 200) throw new Error(response.statusText)
	return response.data.data
}

export const useUserVolume = (options?: TUserVolumeArgs) => {
	return useQuery({
		queryKey: ['userVolume', options],
		queryFn: () => getUserVolume(options as TUserVolumeArgs),
		enabled: !!options?.address && !!options?.startDate && !!options?.endDate,
		notifyOnChangeProps: ['data', 'isPending', 'error'],
	})
}

// ----------------------Socials
const updateUserDiscord = async (data: any) => {
	const url = `${process.env.CONCERO_API_URL}/connectNetwork/discord`

	const response = await post<TUpdateUserDiscord>(url, data)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data
}
export const useUpdateUserDiscordMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: TUpdateUserDiscord) => updateUserDiscord(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}

export const updateUserTwitter = async (data: any) => {
	const url = `${process.env.CONCERO_API_URL}/connectNetwork/twitter`

	const response = await post<TUpdateUserTwitter>(url, data)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data
}
export const useUpdateUserTwitterMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: TUpdateUserTwitter) => updateUserTwitter(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}

const acceptTerms = async (address: Address): Promise<AxiosResponse<void>> => {
	const url = `${process.env.CONCERO_API_URL}/users/accept_terms`

	const response = await post<void>(url, {
		address,
	})
	return response
}
export const useAcceptTermsMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (arg: TAcceptTerms) => acceptTerms(arg.address),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}

export const getLeaderboard = async (userAddress: string | undefined): Promise<TGetLeaderBoardReponse> => {
	const userAddressQuery = userAddress ? `userAddress=${userAddress}` : ''
	const url = `${process.env.CONCERO_API_URL}/usersLeaderboard?${userAddressQuery}`

	const response = await get<TApiResponse<TGetLeaderBoardReponse>>(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
export const useGetLeaderboard = (address?: string) => {
	return useQuery({
		queryKey: [tagInvalidation, address],
		queryFn: () => getLeaderboard(address),
		notifyOnChangeProps: ['data', 'isPending'],
	})
}
