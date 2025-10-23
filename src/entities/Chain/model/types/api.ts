import { Nullable } from '@/shared/types/utils'
export enum EDeploymentType {
	usdc_e = 'usdc_e',
	usdc = 'usdc',
	bridge_lbf = 'bridge_lbf',
	bridge_v2 = 'bridge_v2',
	message_v2 = 'message_v2',
	orchestrator = 'orchestrator',
	message_v1 = 'message_v1',
}
export type TChainDTO = {
	id: number

	is_testnet: boolean

	allow_usage: boolean

	name: string

	ccip_selector: Nullable<string>

	concero_selector: Nullable<string>

	native_currency_decimals: number

	native_currency_name: string

	native_currency_symbol: string

	rpcs: string[]
}
export type TChainDeploymentDTO = {
	type: EDeploymentType

	address: string
}

export type TChainConfigurationItem = {
	chain: TChainDTO
	deployments: TChainDeploymentDTO[]
}

export namespace ChainApi {
	export namespace GetChainConfiguration {
		export type ResponsePayload = {
			items: TChainConfigurationItem[]
		}
	}
}
