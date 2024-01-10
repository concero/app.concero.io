interface IConfig {
	baseURL: string
	headers: {
		'Content-Type': string
	}
	CRYPTOPANIC_API_KEY: string
	LIFI_INTEGRATOR: string
	LIFI_FEES: string
	RANGO_API_KEY: string
	ENSO_API_KEY: string
	POSTHOG_API_KEY: string
	POSTHOG_HOST: string
	NULL_ADDRESS: string
	NULL_E_ADDRESS: string
	WEB3_MODAL_PROJECT_ID: string
}

export const config: IConfig = {
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
}
