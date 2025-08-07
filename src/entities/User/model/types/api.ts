export namespace UserApi {
	export namespace AcceptTerms {
		export type RequestBody = {
			address: string
		}
	}

	export namespace GetUserVolume {
		export type RequestBody = {
			address?: string
			/** Timestamp seconds */
			startDate: number
			/** Timestamp seconds */
			endDate: number
			isCrossChain?: boolean
			chainIds?: number[]
		}
		export type ResponsePayload = {
			volumeUSD: number
		}
	}
}
