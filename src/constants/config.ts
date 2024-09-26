import { type Address } from 'viem'

const isPoolTestnet = false

const parentPoolTestnet = 'Ox' as Address
const childPoolArbitrumTestnet = 'Ox' as Address
const childPoolPolygonTestnet = 'Ox' as Address
const childPoolAvalancheTestnet = 'Ox' as Address
const lpTokenBaseTestnet = 'Ox' as Address
const automationsTestnet = 'Ox' as Address

export const config = {
	baseURL: process.env.CONCERO_API_URL!,
	assetsURI: process.env.CONCERO_ASSETS_URI,
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
	AUTOMATION_ADDRESS: isPoolTestnet ? automationsTestnet : '0xf60a6c3a791fb4783ce6f86f56da66d06c95b971',
	LPTOKEN: isPoolTestnet ? lpTokenBaseTestnet : ('0x7419f60B8f50BB7F9E612998140b79A810a340C3' as Address),
	PARENT_POOL_CONTRACT: isPoolTestnet ? parentPoolTestnet : ('0x0AE1B2730066AD46481ab0a5fd2B5893f8aBa323' as Address),
	CHILD_POOL_ARBITRUM: isPoolTestnet
		? childPoolArbitrumTestnet
		: ('0x164c20A4E11cBE0d8B5e23F5EE35675890BE280d' as Address),
	CHILD_POOL_POLYGON: isPoolTestnet
		? childPoolPolygonTestnet
		: ('0x164c20A4E11cBE0d8B5e23F5EE35675890BE280d' as Address),
	CHILD_POOL_AVALANCHE: isPoolTestnet
		? childPoolAvalancheTestnet
		: ('0x164c20A4E11cBE0d8B5e23F5EE35675890BE280d' as Address),
}
