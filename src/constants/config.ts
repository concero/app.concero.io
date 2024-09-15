import { type Address } from 'viem'

export const IS_POOL_TESTNET = true

const parentPoolTestnet = '0x0fB1ef702a3fA805e221AAF653A853b34b23dd33' as Address
const childPoolArbitrumTestnet = '0xb0260E0A79cb31a196bB798005ff7b20E1E79E2F' as Address
const childPoolAvalancheTestnet = '0xDB338166e403495996c2E0C87729962E84204776' as Address
const lpTokenBaseTestnet = '0x68F5b6A4D229446E54F89e5E404A0F1DE4ebD7C5' as Address
const automationsTestnet = '0x50c10bC0B4d694837fa95b7c4b02D847B372c1cd' as Address

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
	AUTOMATION_ADDRESS: IS_POOL_TESTNET ? automationsTestnet : '0xf60a6c3a791fb4783ce6f86f56da66d06c95b971',
	LPTOKEN: IS_POOL_TESTNET ? lpTokenBaseTestnet : ('0x7419f60B8f50BB7F9E612998140b79A810a340C3' as Address),
	PARENT_POOL_CONTRACT: IS_POOL_TESTNET
		? parentPoolTestnet
		: ('0x0AE1B2730066AD46481ab0a5fd2B5893f8aBa323' as Address),
	CHILD_POOL_ARBITRUM: IS_POOL_TESTNET
		? childPoolArbitrumTestnet
		: ('0x164c20A4E11cBE0d8B5e23F5EE35675890BE280d' as Address),
	CHILD_POOL_POLYGON: '0x164c20A4E11cBE0d8B5e23F5EE35675890BE280d',
	CHILD_POOL_AVALANCHE: IS_POOL_TESTNET
		? childPoolAvalancheTestnet
		: ('0x164c20A4E11cBE0d8B5e23F5EE35675890BE280d' as Address),
}
