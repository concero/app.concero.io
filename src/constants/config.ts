import { base, baseSepolia } from 'wagmi/chains'
import {
	automationsBaseSepolia,
	childPoolArbitrumSepolia,
	childPoolAvalancheFuji,
	lpTokenBaseSepolia,
	parentPoolBaseSepolia,
} from './poolTestnetAddresses'
import {
	automationsBase,
	childPoolArbitrum,
	childPoolAvalanche,
	childPoolPolygon,
	lpTokenBase,
	parentPoolBase,
} from './poolMainnetAddresses'

export const IS_POOL_TESTNET = false
export const PARENT_POOL_CHAIN_ID = IS_POOL_TESTNET ? baseSepolia.id : base.id

export const config = {
	baseURL: process.env.CONCERO_API_URL!,
	headers: { 'Content-Type': 'application/json' },
	CRYPTOPANIC_API_KEY: process.env.CRYPTOPANIC_API_KEY!,
	LIFI_INTEGRATOR: process.env.LIFI_INTEGRATOR!,
	LIFI_FEES: process.env.LIFI_FEES!,
	RANGO_API_KEY: process.env.RANGO_API_KEY!,
	ENSO_API_KEY: process.env.ENSO_API_KEY!,
	POSTHOG_API_KEY: process.env.POSTHOG_API_KEY!,
	POSTHOG_HOST: process.env.POSTHOG_HOST!,
	NULL_ADDRESS: '0x0000000000000000000000000000000000000000',
	NULL_E_ADDRESS: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
	WEB3_MODAL_PROJECT_ID: process.env.WEB3_MODAL_PROJECT_ID!,
	CONCERO_ASSETS_URI: process.env.CONCERO_ASSETS_URI!,
	CONCERO_DOMAIN_URL: process.env.CONCERO_DOMAIN_URL!,

	// POOLS & LP
	AUTOMATION_ADDRESS: IS_POOL_TESTNET ? automationsBaseSepolia : automationsBase,
	LPTOKEN: IS_POOL_TESTNET ? lpTokenBaseSepolia : lpTokenBase,
	PARENT_POOL_CONTRACT: IS_POOL_TESTNET ? parentPoolBaseSepolia : parentPoolBase,
	CHILD_POOL_ARBITRUM: IS_POOL_TESTNET ? childPoolArbitrumSepolia : childPoolArbitrum,
	CHILD_POOL_POLYGON: childPoolPolygon,
	CHILD_POOL_AVALANCHE: IS_POOL_TESTNET ? childPoolAvalancheFuji : childPoolAvalanche,
}
