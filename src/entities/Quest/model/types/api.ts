import { TPaginationParams } from '@/shared/types/api'

/**@deprecated */
export namespace TFindManyUserQuest {
	export type RequestQuery = TPaginationParams
	export type RequestBody = {
		address: string
		quest_instance_ids: string[]
	}
}
/**@deprecated */
export namespace TStartQuest {
	export type RequestBody = {
		address: string
		questId: string
	}
	export type ResponsePayload = {
		started: boolean
	}
}

/**@deprecated */
export namespace TVerifyQuestStep {
	export type RequestBody = {
		address: string
		user_step_id: string
	}
	export type ResponsePayload = {
		verified: boolean
	}
}
/**@deprecated */
export namespace TVerifyQuest {
	export type RequestBody = {
		address: string
		user_quest_id: string
	}
	export type ResponsePayload = {
		verified: boolean
	}
}

/**@deprecated */
export namespace TClaimQuest {
	export type RequestBody = {
		address: string
		user_quest_id: string
	}
	export type ResponsePayload = {
		claimed: boolean
	}
}

export const enum EUserQueueState {
	IN_QUEUE = 'in_queue',
	REJECTED = 'rejected',
	VERIFIED = 'verified',
	NOT_QUEUED = 'not_queued',
}

export namespace QuestApi {
	export namespace TFindManyUserQuest {
		export type RequestQuery = TPaginationParams
		export type RequestBody = {
			address: string
			quest_instance_ids: string[]
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
	export namespace TGetVerifyUserQueueStatus {
		export type RequestQuery = {
			userStepId: string
		}
		export type ResponsePayload = {
			status: EUserQueueState
		}
	}
	export namespace TResetVerifySocial {
		export type RequestQuery = {
			userStepId: string
		}
		export type ResponsePayload = {
			success: boolean
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
	export namespace CountUserQuest {
		export type RequestBody = {
			address: string
			filters: {
				isCompleted?: boolean
			}
		}
		export type ResponsePayload = {
			count: number
		}
	}
}
