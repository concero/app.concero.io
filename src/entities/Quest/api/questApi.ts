import { useMutation, useQuery } from '@tanstack/react-query'
import { TGetAllQuestsResponse, TUserQuestResponse } from '../model/types/response'
import { createApiHandler, TApiResponse } from '@/shared/types/api'
import { get, post } from '@/shared/api/axiosClient'
import { TClaimQuest, TFindManyUserQuest, TStartQuest, TVerifyQuest, TVerifyQuestStep } from '../model/types/api'
import { queryClient } from '@/shared/api/tanstackClient'
const questService = {
	getAllQuests: async () => {
		const url = `${process.env.CONCERO_API_URL}/quest`
		const { payload } = await get<TApiResponse<TGetAllQuestsResponse>>(url, { skip: 0, take: 50 })
		return payload
	},
	getUserQuests: async ({
		address,
		quest_instance_ids,
		skip,
		take,
	}: TFindManyUserQuest.RequestBody & TFindManyUserQuest.RequestQuery) => {
		const url = `${process.env.CONCERO_API_URL}/users/quest?skip=${skip}&take=${take}`
		return createApiHandler(() => post<TApiResponse<TUserQuestResponse>>(url, { address, quest_instance_ids }))
	},

	startQuest: async (body: TStartQuest.RequestBody) => {
		const url = `${process.env.CONCERO_API_URL}/users/quest/start`
		return createApiHandler(() => post<TApiResponse<TStartQuest.ResponsePayload>>(url, body))
	},
	verifyQuestStep: async (body: TVerifyQuestStep.RequestBody) => {
		const url = `${process.env.CONCERO_API_URL}/users/quest/step/verify`
		return createApiHandler(() => post<TApiResponse<TVerifyQuestStep.ResponsePayload>>(url, body))
	},

	verifyQuest: async (body: TVerifyQuest.RequestBody) => {
		const url = `${process.env.CONCERO_API_URL}/users/quest/verify`
		return createApiHandler(() => post<TApiResponse<TVerifyQuest.ResponsePayload>>(url, body))
	},
	claimQuest: async (body: TClaimQuest.RequestBody) => {
		const url = `${process.env.CONCERO_API_URL}/users/quest/claim`
		return createApiHandler(() => post<TApiResponse<TClaimQuest.ResponsePayload>>(url, body))
	},
}

const tagInvalidation = 'quests'
const tagInvalidationUserQuest = 'user_quests'

export const useAllQuests = () => {
	return useQuery({ queryKey: [tagInvalidation, 'all_quests'], queryFn: questService.getAllQuests })
}
export const useUserQuests = (params: Partial<TFindManyUserQuest.RequestBody> & TFindManyUserQuest.RequestQuery) => {
	return useQuery({
		queryKey: [
			tagInvalidationUserQuest,
			'user_quests',
			params.address,
			params.quest_instance_ids,
			params.skip,
			params.take,
		],
		queryFn: () => {
			if (!params.address || !params.quest_instance_ids || !params.quest_instance_ids.length)
				throw new Error('Address and quest_ids is required')
			return questService.getUserQuests(
				params as TFindManyUserQuest.RequestBody & TFindManyUserQuest.RequestQuery,
			)
		},
		enabled: !!params.address,
	})
}

export const useStartQuestMutation = () => {
	return useMutation({
		mutationFn: questService.startQuest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidationUserQuest] })
		},
	})
}

export const useVerifyQuestMutation = () => {
	return useMutation({
		mutationFn: questService.verifyQuest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidationUserQuest] })
		},
	})
}
export const useVerifyQuestStepMutation = () => {
	return useMutation({
		mutationFn: questService.verifyQuestStep,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidationUserQuest] })
		},
	})
}

export const useClaimQuestMutation = () => {
	return useMutation({
		mutationFn: questService.claimQuest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidationUserQuest] })
		},
	})
}

export const invalidationTagQuest = tagInvalidation
