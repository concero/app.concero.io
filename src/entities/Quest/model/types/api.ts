import { TPaginationParams } from '@/shared/types/api'

export namespace TFindManyUserQuest {
	export type RequestQuery = TPaginationParams
	export type RequestBody = {
		address: string
		quest_ids: string[]
	}
}
export namespace TStartQuest {
	export type RequestBody = {
		address: string
		questId: string
	}
	export type ResponsePayload = {
		started: boolean
	}
}

export namespace TVerifyQuestStep {
	export type RequestBody = {
		address: string
		user_step_id: string
	}
	export type ResponsePayload = {
		verified: boolean
	}
}
export namespace TVerifyQuest {
	export type RequestBody = {
		address: string
		user_quest_id: string
	}
	export type ResponsePayload = {
		verified: boolean
	}
}

export namespace TClaimQuest {
	export type RequestBody = {
		address: string
		user_quest_id: string
	}
	export type ResponsePayload = {
		claimed: boolean
	}
}
