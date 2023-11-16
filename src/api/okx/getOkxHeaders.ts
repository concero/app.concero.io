import CryptoJS from 'crypto-js'
import { config } from '../../constants/config'

export function getOKXHeaders(url: string, method: string): Record<string, string> {
	const now = new Date()
	const isoString = now.toISOString()
	const sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(isoString + method + url, config.OKX_SECRET_KEY))

	return {
		'OK-ACCESS-KEY': config.OKX_API_KEY,
		'OK-ACCESS-PASSPHRASE': config.OKX_PASSPHRASE,
		'OK-ACCESS-PROJECT': config.OKX_PROJECT_ID,
		'OK-ACCESS-SIGN': sign,
		'OK-ACCESS-TIMESTAMP': isoString,
	}
}
