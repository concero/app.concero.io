import { Address } from 'viem'
import { AxiosResponse } from 'axios'
import { del, get, patch, post } from '@/api/client'
import { TAcceptTerms, TUpdateNicknameArgs, TUserVolumeArgs } from '../model/types/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	IUserAction,
	NicknameError,
	TGetLeaderBoardReponse,
	TUpdateUserDiscord,
	TUpdateUserTwitter,
	TUserResponse,
} from '../model/types/response'
import { updateUserDiscord, updateUserTwitter } from '@/api/concero/user/updateUser'
import { config } from '@/constants/config'
import { TApiGetResponse, TApiResponse, TPaginationParams } from '@/shared/types/api'

//--------------------------------Domain
export const userServiceApi = {
	createUser: async (address: Address) => {
		const url = `${process.env.CONCERO_API_URL}/users`

		const response = await post<TApiResponse<TUserResponse>>(url, { address })
		if (response.status !== 200) throw new Error('Something went wrong')
		if (response.data.success) {
			return response.data.data
		}
	},

	getUserByAddress: async (address: Address) => {
		const url = `${process.env.CONCERO_API_URL}/users/${address}`

		const response = await get<TApiResponse<TUserResponse>>(url)
		if (response.status !== 200) throw new Error('Something went wrong')
		if (response.data.success) {
			return response.data.data
		}
	},

	addQuestToProgress: async (address: string, questId: string) => {
		const url = `${process.env.CONCERO_API_URL}/users/${address}/quests-in-progress/${questId}`
		const response = await post<TApiResponse<string>>(url, {})
		if (response.status !== 200) throw new Error('Something went wrong')
		return response.data.success
	},
	updateNickname: async (args: TUpdateNicknameArgs) => {
		const url = `${process.env.CONCERO_API_URL}/users/${args.address}/nickname`
		const response = await post<TApiResponse<void, NicknameError>>(url, args)
		if (!response.data.success) {
			throw new Error(response.data.error)
		}
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
		if (response.data.success) {
			return response.data.data
		}
	},

	acceptTerms: async (address: Address): Promise<AxiosResponse<void>> => {
		const url = `${process.env.CONCERO_API_URL}/users/accept_terms`

		const response = await post<void>(url, {
			address,
		})
		return response
	},

	getLeaderboard: async (userAddress: string | undefined) => {
		const userAddressQuery = userAddress ? `userAddress=${userAddress}` : ''
		const url = `${process.env.CONCERO_API_URL}/usersLeaderboard?${userAddressQuery}`

		const response = await get<TApiResponse<TGetLeaderBoardReponse>>(url)
		if (response.status !== 200) throw new Error('Something went wrong')
		if (response.data.success) {
			return response.data.data
		}
	},
}
export const userActionsService = {
	fetchUserActions: async (address: string, params: TPaginationParams) => {
		const url = `${process.env.CONCERO_API_URL}/v2/userActions/${address}`

		const response = await get<TApiGetResponse<IUserAction[]>>(url, params)
		if (response.status !== 200) throw new Error('Something went wrong')
		return response.data
	},
}
export const socialsService = {
	connectDiscord: async (code: string, user: TUserResponse): Promise<string> => {
		const response = await updateUserDiscord({
			_id: user._id,
			code,
		})
		// @ts-expect-error TODO: Improve type
		return response.username
	},
	connectTwitter: async (oauthToken: string, twitterVerifyCode: string, user: TUserResponse) => {
		// @ts-expect-error TODO: Improve type
		return (await updateUserTwitter({ _id: user._id, token: oauthToken, verifier: twitterVerifyCode })).screen_name
	},
	getRequestToken: async () => {
		const request = await get(`${config.baseURL}/twitterToken`)
		// @ts-expect-error TODO: Improve type
		const link = request.data.data

		window.location.href = link
	},
	disconnectNetwork: async (address: string, network: keyof TUserResponse['connectedSocials']): Promise<boolean> => {
		const url = `${process.env.CONCERO_API_URL}/disconnectNetwork/${network}`

		const response = await post(url, {
			address,
		})
		if (response.status !== 200) throw new Error('Something went wrong')
		// @ts-expect-error TODO: Improve type
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
export const useUpdateNicknameMutation = () => {
	const queryClient = useQueryClient()

	return useMutation<void, AxiosResponse<TApiResponse<void, NicknameError, false>>, TUpdateNicknameArgs>({
		mutationFn: (payload: TUpdateNicknameArgs) => userServiceApi.updateNickname(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
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
