import { type Address } from 'viem'

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

	// POOLS TESTNET
	LPTOKEN: process.env.CONCERO_LPTOKEN_BASE_SEPOLIA! as Address,
	PARENT_POOL_CONTRACT: process.env.CONCERO_PARENT_POOL_SEPOLIA! as Address,
	CHILD_POOL_ARBITRUM: process.env.CONCERO_CHILD_POOL_ARBITRUM_SEPOLIA! as Address,
	CHILD_POOL_OPTIMISM: process.env.CONCERO_CHILD_POOL_OPTIMISM_SEPOLIA! as Address,
}
