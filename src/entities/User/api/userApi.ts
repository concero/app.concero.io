import { Address } from 'viem'
import { TUpdateNicknameArgs } from '../model/types/request'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import {
	NicknameError,
	TGetLeaderBoardReponse,
	TUserActionResponse,
	TUserNicknameCheckResponse,
	TUserResponse,
	TUserSocialType,
	UserEarnings,
} from '../model/types/response'
import { ApiSuccess, createApiHandler, Http, TApiResponse, TPaginationParams } from '@/shared/types/api'
import { queryClient } from '@/shared/api/tanstackClient'
import { del, get, patch, post } from '@/shared/api/axiosClient'
import { UserApi } from '../model/types/api'
import { configEnvs } from '@/shared/consts/config/config'
import { UserSocialType } from '../model/validations/validations'

//--------------------------------Domain
export const userAuthServiceApi = {
	/** Request to get a nonce */
	authorize: async (address: Address) => {
		const url = `${process.env.CONCERO_API_URL}/auth/authorize`
		let response: TApiResponse<{ nonce: string }>
		try {
			response = await post<TApiResponse<{ nonce: string }>>(url, { walletAddress: address })
		} catch (error) {
			throw {
				code: Http.Code.Enum.UNHANDLED_ERROR,
				payload: null,
				message: Http.Code.Enum.UNHANDLED_ERROR,
			} satisfies TApiResponse<any, string>
		}
		if (!response?.code) {
			throw {
				code: Http.Code.Enum.UNHANDLED_ERROR,
				message: Http.Code.Enum.UNHANDLED_ERROR,
				payload: null,
			} satisfies TApiResponse<null, string>
		}
		if (response.code !== Http.Code.Enum.OK) {
			throw response satisfies TApiResponse<any, string>
		}
		return response.payload.nonce
	},

	/** Verify user nonce */
	verify: async ({ address, signature }: { address: Address; signature: string }): Promise<string | null> => {
		const url = `${process.env.CONCERO_API_URL}/auth/verify`
		const response = await post<TApiResponse<{ token: string }>>(url, { walletAddress: address, signature })
		if (response.code !== 'ok') {
			console.error('Request verify executed with error, response:', response)
			return null
		}
		return response.payload.token
	},
}
export function isSuccessResponse<TData>(response: TApiResponse<TData, any>): response is ApiSuccess<TData> {
	return response.code === Http.Code.Enum.OK
}
export const userServiceApi = {
	findUserByAddress: async (address: Address) => {
		const url = `${process.env.CONCERO_API_URL}/users/${address}`
		return createApiHandler(() => get<TApiResponse<TUserResponse | null>>(url))
	},
	acceptTerms: async (arg: UserApi.AcceptTerms.RequestBody) => {
		const url = `${process.env.CONCERO_API_URL}/users/acceptTerms`
		return createApiHandler(() => patch<TApiResponse<UserApi.AcceptTerms.RequestBody>>(url, arg))
	},

	updateNickname: async (args: TUpdateNicknameArgs) => {
		const url = `${process.env.CONCERO_API_URL}/users/${args.address}/nickname/${args.newNickname}`

		return createApiHandler(
			() => get<TApiResponse<TUserNicknameCheckResponse, NicknameError>>(url),
			NicknameError.Error,
		)
	},

	getUserVolume: async (requestBody: UserApi.GetUserVolume.RequestBody) => {
		const url = `${process.env.CONCERO_API_URL}/users/volume`

		return createApiHandler(() => post<TApiResponse<UserApi.GetUserVolume.ResponsePayload>>(url, requestBody))
	},

	getLeaderboard: async ({ limit, userAddress }: { userAddress: string | undefined; limit?: number }) => {
		const url = new URL(`${process.env.CONCERO_API_URL}/users/leaderboard`)

		if (userAddress) url.searchParams.append('address', userAddress)
		url.searchParams.append('limit', limit?.toString() ?? '5')
		const response = await get<TApiResponse<TGetLeaderBoardReponse>>(url.toString())
		return response.payload
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
		const url = `${process.env.CONCERO_API_URL}/users/${address}/actions`

		return createApiHandler(() => get<TApiResponse<TUserActionResponse | null>>(url, params))
	},
}

export const socialsService = {
	findUserSocials: async ({ address }: UserApi.Socials.FindMany.RequestBody) => {
		const url = `${process.env.CONCERO_API_URL}/users/${address}/socials`
		return createApiHandler(() => get<TApiResponse<UserApi.Socials.FindMany.ResponsePayload>>(url))
	},

	connectDiscord: async ({
		body,
		params,
	}: {
		body: UserApi.Socials.ConnectDiscord.RequestBody
		params: UserApi.Socials.ConnectDiscord.RequestParams
	}) => {
		const url = `${process.env.CONCERO_API_URL}/users/${params.address}/socials/discord`
		return createApiHandler(() => post<TApiResponse<UserApi.Socials.ConnectDiscord.ResponsePayload>>(url, body))
	},
	connectX: async ({
		body,
		params,
	}: {
		body: UserApi.Socials.ConnectX.RequestBody
		params: UserApi.Socials.ConnectX.RequestParams
	}) => {
		const url = `${process.env.CONCERO_API_URL}/users/${params.address}/socials/x`
		return createApiHandler(() => post<TApiResponse<UserApi.Socials.ConnectX.ResponsePayload>>(url, body))
	},
	getRequestToken: async () => {
		const request = await get<{ data: string; success: boolean }>(`${configEnvs.baseURL}/twitterToken`)
		return request.data
	},
	disconnectNetwork: async ({ socialType, address }: UserApi.Socials.DisconnectSocial.RequestParams) => {
		const url = `${process.env.CONCERO_API_URL}/users/${address}/socials/${socialType}`
		return createApiHandler(() =>
			del<TApiResponse<UserApi.Socials.DisconnectSocial.ResponsePayload>>(url, {
				address,
			}),
		)
	},
	disconnectEmail: async (address: string): Promise<boolean> => {
		const url = `${process.env.CONCERO_API_URL}/disconnectEmail/${address}`

		const response = await post(url, {
			address,
		})
		// @ts-expect-error TODO: Improve type
		return response.data.data
	},
	sendEmail: async (address: string, email: string) => {
		const url = `${process.env.CONCERO_API_URL}/users/${address}/register-email`

		const response = await post<any>(url, {
			email,
		})
		if (response.code == 'ok') {
			return true
		} else {
			throw new Error(response.message)
		}
	},
	verifyOTP: async (address: string, otp: string): Promise<boolean> => {
		const url = `${process.env.CONCERO_API_URL}/users/${address}/verify-email`

		const response = await post<any>(url, {
			otp,
		})
		if (response.code == 'ok') {
			return true
		} else {
			throw new Error(response.message)
		}
	},
}
const tagInvalidation = 'user'

export const useUserByAddress = (address?: Address) => {
	return useQuery<TApiResponse<TUserResponse | null>, TApiResponse<any, string>>({
		queryKey: [tagInvalidation, 'useUserByAddress', address],
		queryFn: () => userServiceApi.findUserByAddress(address as Address),
		enabled: !!address,
		notifyOnChangeProps: ['data', 'isPending', 'error'],
	})
}

export const useUserAction = ({ address, take }: { address: string; take: number }) => {
	return useInfiniteQuery({
		refetchOnMount: false,
		retry: 2,
		queryKey: ['userActions', address],
		queryFn: ({ pageParam = 0 }) => userActionsService.fetchUserActions(address, { take, skip: pageParam * take }),
		initialPageParam: 0,
		getNextPageParam: (lastPage, _, lastPageParam) => {
			if (lastPage && lastPage.payload) {
				return lastPage.payload.pagination.count >= lastPage.payload.pagination.take
					? lastPageParam + 1
					: undefined
			} else return undefined
		},
	})
}

export const useUpdateNicknameMutation = () => {
	return useMutation<TApiResponse<TUserNicknameCheckResponse>, TApiResponse<any, NicknameError>, TUpdateNicknameArgs>(
		{
			mutationFn: (payload: TUpdateNicknameArgs) => userServiceApi.updateNickname(payload),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
			},
		},
	)
}

export const useUserVolume = (options?: UserApi.GetUserVolume.RequestBody) => {
	return useQuery({
		queryKey: ['userVolume', options],
		queryFn: () => userServiceApi.getUserVolume(options as UserApi.GetUserVolume.RequestBody),
		enabled: !!options?.address && !!options?.from && !!options?.to,
		notifyOnChangeProps: ['data', 'isPending', 'error'],
	})
}

export const useAcceptTermsMutation = () => {
	return useMutation({
		mutationFn: (arg: UserApi.AcceptTerms.RequestBody) => userServiceApi.acceptTerms(arg),
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

//Socials

export const useSocials = (address?: string) => {
	return useQuery({
		queryKey: [tagInvalidation, 'useSocials', address],
		queryFn: async () => {
			if (!address) throw new Error('Address is required')
			return socialsService.findUserSocials({ address })
		},
		enabled: !!address,
	})
}
export const useConnectDiscordMutation = () => {
	return useMutation({
		mutationFn: ({
			token,
			address,
		}: UserApi.Socials.ConnectDiscord.RequestBody & UserApi.Socials.ConnectDiscord.RequestParams) =>
			socialsService.connectDiscord({
				body: {
					token: token,
				},
				params: {
					address: address,
				},
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}
export const useConnectXMutation = () => {
	return useMutation({
		mutationFn: ({
			token,
			verifier,
			address,
		}: UserApi.Socials.ConnectX.RequestBody & UserApi.Socials.ConnectX.RequestParams) =>
			socialsService.connectX({
				body: {
					token,
					verifier,
				},
				params: {
					address,
				},
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation] })
		},
	})
}
export const useDisconnectSocialNetworkMutation = (address?: string) => {
	return useMutation({
		mutationFn: (arg: { network: any }) => socialsService.disconnectNetwork(address ?? '', arg.network),
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
		queryKey: [tagInvalidation, address, 'useGetLeaderboard'],
		queryFn: async () => {
			if (!address) throw new Error('Address is required')
			return userServiceApi.getLeaderboard({ userAddress: address })
		},
		enabled: !!address,
		notifyOnChangeProps: ['data', 'isPending'],
	})
}
export const useGetUserEarnings = (address: Address | null | undefined) => {
	return useQuery({
		queryKey: [address, 'userEarnings'],
		queryFn: async () => {
			if (!address) throw new Error('Address is required')
			return userServiceApi.fetchUserEarnings(address)
		},
		enabled: !!address,
		notifyOnChangeProps: ['data', 'isPending', 'error', 'isError'],
	})
}

export const invalidationTagUser = tagInvalidation
