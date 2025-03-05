import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { get, post } from '@/api/client'
import { TApiResponse } from '@/types/api'
import { TClaimResponse, TGetQuestsResponse, TVerifyResponse } from '../model/types/response'
import { TClaimArgs, TVerifyArgs } from '../model/types/request'
import { invalidationTagUser } from '@/entities/User'

const tagInvalidation = 'quests'
// ------------------------------------------------------------------------get quests

const getQuests = async (): Promise<TGetQuestsResponse> => {
	const url = `${process.env.CONCERO_API_URL}/quests`

	const response = await get<TApiResponse<TGetQuestsResponse>>(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}

export const useQuests = () => {
	return useQuery({ queryKey: [tagInvalidation], queryFn: getQuests })
}
// ------------------------------------------------------------------------get testing  quests
const getTestingQuests = async (): Promise<TGetQuestsResponse> => {
	const url = `${process.env.CONCERO_API_URL}/quests/testing`
	const response = await get<TApiResponse<TGetQuestsResponse>>(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}

export const useTestingQuests = () => {
	return useQuery({ queryKey: ['testingQuests'], queryFn: getTestingQuests })
}
// ------------------------------------------------------------------------Verify

const verifyQuest = async (props: TVerifyArgs): Promise<TVerifyResponse> => {
	const { address, questId, stepId } = props
	const url = `${process.env.CONCERO_API_URL}/quests/verify`

	const response = await post<TVerifyResponse>(url, { address, questId, stepId })
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data
}

export const useVerifyQuestMutation = () =>
	useMutation({
		mutationFn: (args: TVerifyArgs) => verifyQuest(args),
	})
// ------------------------------------------------------------------------Claim

const claimQuestReward = async (props: TClaimArgs): Promise<TClaimResponse> => {
	const { address, questId } = props
	const url = `${process.env.CONCERO_API_URL}/quests/claimReward`

	const response = await post<TClaimResponse>(url, { address, questId })
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data
}

export const useClaimQuestMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (arg: TClaimArgs) => claimQuestReward(arg),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [tagInvalidation, invalidationTagUser] })
			queryClient.invalidateQueries({ queryKey: [invalidationTagUser] })
		},
		onError(error, variables, context) {
			console.log('@useClaimQuestMutation: ', {
				error,
				variables,
			})
		},
	})
}
export const invalidationTagQuest = tagInvalidation
