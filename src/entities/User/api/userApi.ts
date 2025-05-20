import { Address } from 'viem'
import { AxiosResponse } from 'axios'
import { del, get, post } from '@/api/client'
import { TAcceptTerms, TUpdateNicknameArgs, TUserVolumeArgs } from '../model/types/request'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
	IUserAction,
	NicknameError,
	TGetLeaderBoardReponse,
	TUserResponse,
	TUserSocialNetworkType,
	UserEarnings,
} from '../model/types/response'
import { updateUserTwitter } from '@/api/concero/user/updateUser'
import { config } from '@/constants/config'
import { TApiGetResponse, TApiResponse, TPaginationParams } from '@/shared/types/api'
import { queryClient } from '@/shared/api/tanstackClient'
import { useCallback, useEffect, useState } from 'react'

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

	fetchUserEarnings: async (address: Address): Promise<UserEarnings | null> => {
		const url = `${process.env.CONCERO_API_URL}/userPoolEarnings?address=${address}`
		try {
			const response = await get(url)
		} catch (error) {
			return null
		}
		return null
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
	connectDiscord: async (code: string, user_id: TUserResponse['_id']): Promise<string> => {
		const url = `${process.env.CONCERO_API_URL}/connectNetwork/discord`
		const response = await post<{ message: string; success: boolean; username: string }>(url, {
			_id: user_id,
			code,
		})
		if (response.status !== 200) throw new Error('Something went wrong')
		return response.data.username
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
	disconnectNetwork: async (address: string, network: TUserSocialNetworkType): Promise<boolean> => {
		const url = `${process.env.CONCERO_API_URL}/disconnectNetwork/${network}`

		const response = await post(url, {
			address,
		})
		if (response.status !== 200) throw new Error('Something went wrong')
		// @ts-expect-error TODO: Improve type
		return response.data.data
	},
	disconnectEmail: async (address: string): Promise<boolean> => {
		const url = `${process.env.CONCERO_API_URL}/disconnectEmail/${address}`

		const response = await post(url, {
			address,
		})
		if (response.status !== 200) throw new Error('Something went wrong')
		// @ts-expect-error TODO: Improve type
		return response.data.data
	},
	sendEmail: async (address: string, email: string) => {
		const url = `${process.env.CONCERO_API_URL}/users/${address}/register-email`

		const { data } = await post<TApiResponse<void, string>>(url, {
			email,
		})
		if (data.success == true) {
			return true
		} else {
			throw new Error(data.error)
		}
	},
	verifyOTP: async (address: string, otp: string): Promise<boolean> => {
		const url = `${process.env.CONCERO_API_URL}/users/${address}/verify-email`

		const { data } = await post<TApiResponse<void, string>>(url, {
			otp,
		})
		if (data.success == true) {
			return true
		} else {
			throw new Error(data.error)
		}
	},
}
const tagInvalidation = 'user'

export const useCreateUserMutation = () => {
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
	return useMutation({
		mutationFn: (payload: { address: string; questId: string }) =>
			userServiceApi.addQuestToProgress(payload.address, payload.questId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}

export const useRemoveQuestFromProgressMutation = () => {
	return useMutation({
		mutationFn: (payload: { address: string; questId: string }) =>
			userServiceApi.removeQuestFromProgress(payload.address, payload.questId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}

export const useAddStepInProgressMutation = () => {
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
	return useMutation({
		mutationFn: (arg: TAcceptTerms) => userServiceApi.acceptTerms(arg.address),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}

export const useSendEmailMutation = () => {
	return useMutation({
		mutationFn: (arg: { address: Address; email: string }) => socialsService.sendEmail(arg.address, arg.email),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}
export const useVerifyOTPMutation = () => {
	return useMutation({
		mutationFn: (arg: { address: Address; otp: string }) => socialsService.verifyOTP(arg.address, arg.otp),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}
export const useConnectDiscordMutation = () => {
	return useMutation({
		mutationFn: (arg: { code: string; userId: TUserResponse['_id'] }) =>
			socialsService.connectDiscord(arg.code, arg.userId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}
export const useDisconnectSocialNetworkMutation = (address?: string) => {
	return useMutation({
		mutationFn: (arg: { network: TUserSocialNetworkType }) =>
			socialsService.disconnectNetwork(address ?? '', arg.network),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}
export const useDisconnectEmailMutation = () => {
	return useMutation({
		mutationFn: (arg: { address: Address }) => socialsService.disconnectEmail(arg.address),
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
export const useGetUserEarnings = (address: Address | null | undefined) => {
	return useQuery({
		queryKey: ['userEarnings', address],
		queryFn: async () => {
			if (!address) throw new Error('Address is required')
			return userServiceApi.fetchUserEarnings(address)
		},
		enabled: !!address,
		notifyOnChangeProps: ['data', 'isPending', 'error', 'isError'],
	})
}

export const invalidationTagUser = tagInvalidation
