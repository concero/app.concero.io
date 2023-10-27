export const config = {
	baseURL: 'https://api.concero.io',
	headers: {
		'Content-Type': 'application/json',
	},
	CRYPTOPANIC_API_KEY: '2e93d03175aec18f5c9db115d800b16384db24b0',
	LIFI_INTEGRATOR: process.env.LIFI_INTEGRATOR,
	LIFI_FEES: process.env.LIFI_FEES,
	RANGO_API_KEY: process.env.RANGO_API_KEY,
	ENSO_API_KEY: process.env.ENSO_API_KEY,
	NULL_ADDRESS: '0x0000000000000000000000000000000000000000',
	NULL_E_ADDRESS: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
}
