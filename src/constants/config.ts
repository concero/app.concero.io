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
}

export const config: IConfig = {
	baseURL: process.env.CONCERO_API_URL as string,
	headers: { 'Content-Type': 'application/json' },
	CRYPTOPANIC_API_KEY: process.env.CRYPTOPANIC_API_KEY as string,
	LIFI_INTEGRATOR: process.env.LIFI_INTEGRATOR as string,
	LIFI_FEES: process.env.LIFI_FEES as string,
	RANGO_API_KEY: process.env.RANGO_API_KEY as string,
	ENSO_API_KEY: process.env.ENSO_API_KEY as string,
	POSTHOG_API_KEY: process.env.POSTHOG_API_KEY as string,
	POSTHOG_HOST: process.env.POSTHOG_HOST as string,
	NULL_ADDRESS: '0x0000000000000000000000000000000000000000',
	NULL_E_ADDRESS: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
}
