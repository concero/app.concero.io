import { TUserSocial, TUserSocialType } from './response'

export namespace UserApi {
	export namespace AcceptTerms {
		export type RequestBody = {
			address: string
		}
		export type ResponseBody = {
			terms_of_use_signed_version: string | null
		}
	}

	export namespace GetUserVolume {
		export type RequestBody = {
			address?: string
			from: number
			to: number
			isCrossChain?: boolean
			isTestnet?: boolean
			toChainIds?: number[]
			fromChainIds?: number[]
		}
		export type ResponsePayload = {
			volumeUSD: number
		}
	}
	export namespace GetUserCountTx {
		export type RequestBody = {
			address?: string
			from: number
			to: number
			isCrossChain?: boolean
			isTestnet?: boolean
			toChainIds?: number[]
			fromChainIds?: number[]
		}
		export type ResponsePayload = {
			count: number
		}
	}

	export namespace Socials {
		export namespace FindMany {
			export type RequestBody = {
				address?: string
			}
			export type ResponsePayload = {
				socials: TUserSocial[]
			}
		}
		export namespace ConnectDiscord {
			export type RequestParams = {
				address?: string
			}
			export type RequestBody = {
				token: string
			}
			export type ResponsePayload = { message: string; success: boolean; username: string }
		}
		export namespace ConnectX {
			export type RequestParams = {
				address?: string
			}
			export type RequestBody = {
				token: string
				verifier: string
			}
			export type ResponsePayload = { message: string; success: boolean; username: string }
		}
		export namespace DisconnectSocial {
			export type RequestParams = {
				address?: string
				socialType: TUserSocialType
			}
			export type ResponsePayload = { disconnected: boolean }
		}
	}
}
