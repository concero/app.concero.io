import { apiRequest } from '../requests'
import { post } from '../client'
import { headers, url } from './config'

export async function getDexTrades({ network, limit, baseCurrency, quoteCurrency }) {
	// const network = 'ethereum'
	// const limit = 10
	// const baseCurrency = '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'
	// const quoteCurrency = '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce'

	const raw = JSON.stringify({
		query: `{
      ethereum(network: ${network}) {
        dexTrades(
          options: {desc: ["block.height", "tradeIndex"], limit: ${limit}}
          baseCurrency: {is: "${baseCurrency}"}
          quoteCurrency: {is: "${quoteCurrency}"}
          
        ) {
          quotePrice
          block {
            timestamp {
              unixtime
            }
            height
          }
          tradeIndex
          protocol
          exchange {
            fullName
          }
          smartContract {
            address {
              address
              annotation
            }
          }
          baseAmount
          baseCurrency {
            address
            symbol
          }
          quoteAmount
          quoteCurrency {
            address
            symbol
          }
          transaction {
            hash
          }
          buyCurrency {
            address
          }
        }
      }
    }`,
		variables: '{}',
	})

	const { res, ok, err } = await apiRequest(await post(url, raw, headers))
	return { res, ok, err }
}
