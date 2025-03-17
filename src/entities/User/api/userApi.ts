import { Address } from 'viem'
import { AxiosResponse } from 'axios'
import { del, get, post } from '@/api/client'
import { TAcceptTerms, TUserVolumeArgs } from '../model/types/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TGetLeaderBoardReponse, TUpdateUserDiscord, TUpdateUserTwitter, TUserResponse } from '../model/types/response'
import { TApiResponse } from '@/types/api'
import { updateUserDiscord, updateUserTwitter } from '@/api/concero/user/updateUser'
import { config } from '@/constants/config'

//--------------------------------Domain
export const userServiceApi = {
	createUser: async (address: Address): Promise<TUserResponse> => {
		const url = `${process.env.CONCERO_API_URL}/users`

		const response = await post<TApiResponse<TUserResponse>>(url, { address })
		if (response.status !== 200) throw new Error('Something went wrong')
		return response.data.data
	},

	getUserByAddress: async (address: Address) => {
		const url = `${process.env.CONCERO_API_URL}/users/${address}`

		const response = await get<TApiResponse<TUserResponse>>(url)
		if (response.status !== 200) throw new Error('Something went wrong')
		return response.data.data
	},

	addQuestToProgress: async (address: string, questId: string) => {
		const url = `${process.env.CONCERO_API_URL}/users/${address}/quests-in-progress/${questId}`
		const response = await post<TApiResponse<string>>(url, {})
		if (response.status !== 200) throw new Error('Something went wrong')
		return response.data.success
	},

	removeQuestFromProgress: async (address: string, questId: string) => {
		const url = `${process.env.CONCERO_API_URL}/users/${address}/remove-quest-from-progress/${questId}`
		const response = await del<TApiResponse<string>>(url, {})
		if (response.status !== 200) throw new Error('Something went wrong')
		return response.data.success
	},

	addStepInProgress: async (address: string, questId: string, stepId: string) => {
		const url = `${process.env.CONCERO_API_URL}/users/${address}/quests-in-progress/${questId}/steps`
		const response = await post<TApiResponse<string>>(url, { stepId })
		if (response.status !== 200) throw new Error('Something went wrong')
		return response.data.success
	},

	getUserVolume: async ({ address, startDate, endDate, isCrossChain, chainIds }: TUserVolumeArgs) => {
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
	},

	updateUserDiscord: async (data: any) => {
		const url = `${process.env.CONCERO_API_URL}/connectNetwork/discord`

		const response = await post<TUpdateUserDiscord>(url, data)
		if (response.status !== 200) throw new Error('Something went wrong')
		return response.data
	},

	updateUserTwitter: async (data: any) => {
		const url = `${process.env.CONCERO_API_URL}/connectNetwork/twitter`

		const response = await post<TUpdateUserTwitter>(url, data)
		if (response.status !== 200) throw new Error('Something went wrong')
		return response.data
	},

	acceptTerms: async (address: Address): Promise<AxiosResponse<void>> => {
		const url = `${process.env.CONCERO_API_URL}/users/accept_terms`

		const response = await post<void>(url, {
			address,
		})
		return response
	},

	getLeaderboard: async (userAddress: string | undefined): Promise<TGetLeaderBoardReponse> => {
		const userAddressQuery = userAddress ? `userAddress=${userAddress}` : ''
		const url = `${process.env.CONCERO_API_URL}/usersLeaderboard?${userAddressQuery}`

		const response = await get<TApiResponse<TGetLeaderBoardReponse>>(url)
		if (response.status !== 200) throw new Error('Something went wrong')
		return response.data.data
	},
}
export const socialsServive = {
	connectDiscord: async (code: string, user: TUserResponse): Promise<string> => {
		const response = await updateUserDiscord({
			_id: user._id,
			code,
		})

		return response.username
	},
	connectTwitter: async (oauthToken: string, twitterVerifyCode: string, user: TUserResponse) => {
		return (await updateUserTwitter({ _id: user._id, token: oauthToken, verifier: twitterVerifyCode })).screen_name
	},
	getRequestToken: async () => {
		const request = await get(`${config.baseURL}/twitterToken`)
		const link = request.data.data

		window.location.href = link
	},
	disconnectNetwork: async (address: string, network: keyof TUserResponse['connectedSocials']): Promise<boolean> => {
		const url = `${process.env.CONCERO_API_URL}/disconnectNetwork/${network}`

		const response = await post(url, {
			address,
		})
		if (response.status !== 200) throw new Error('Something went wrong')
		return response.data.data
	},
}
const tagInvalidation = 'user'

export const useCreateUserMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (address: Address) => userServiceApi.createUser(address),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}

export const useUserByAddress = (address?: Address) => {
	return useQuery({
		queryKey: [tagInvalidation, address],
		queryFn: () => userServiceApi.getUserByAddress(address as Address),
		enabled: !!address,
		notifyOnChangeProps: ['data', 'isPending', 'error'],
	})
}

export const useAddQuestToProgressMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (payload: { address: string; questId: string }) =>
			userServiceApi.addQuestToProgress(payload.address, payload.questId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}

export const useRemoveQuestFromProgressMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (payload: { address: string; questId: string }) =>
			userServiceApi.removeQuestFromProgress(payload.address, payload.questId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}

export const useAddStepInProgressMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (payload: { address: string; questId: string; stepId: string }) =>
			userServiceApi.addStepInProgress(payload.address, payload.questId, payload.stepId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
		onError: error => {
			console.error('Failed to add step to quest in progress:', error)
		},
	})
}

export const useUserVolume = (options?: TUserVolumeArgs) => {
	return useQuery({
		queryKey: ['userVolume', options],
		queryFn: () => userServiceApi.getUserVolume(options as TUserVolumeArgs),
		enabled: !!options?.address && !!options?.startDate && !!options?.endDate,
		notifyOnChangeProps: ['data', 'isPending', 'error'],
	})
}

export const useUpdateUserDiscordMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: TUpdateUserDiscord) => userServiceApi.updateUserDiscord(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}

export const useUpdateUserTwitterMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: TUpdateUserTwitter) => userServiceApi.updateUserTwitter(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}

export const useAcceptTermsMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (arg: TAcceptTerms) => userServiceApi.acceptTerms(arg.address),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}

export const useGetLeaderboard = (address?: string) => {
	return useQuery({
		queryKey: [tagInvalidation, address],
		queryFn: () => userServiceApi.getLeaderboard(address),
		notifyOnChangeProps: ['data', 'isPending'],
	})
}

export const invalidationTagUser = tagInvalidation
