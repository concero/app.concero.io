import { render } from '@testing-library/react'
import { TokenArea } from '../../components/cards/SwapCard/TokenArea/TokenArea'
import { chains } from '../../constants/chains'
import { tokens } from '../../constants/tokens'

test('Renders TokenArea with each chain', () => {
  chains.forEach((chain) => {
    const direction = 'from'
    const selection = {
      chain: {
        name: chain.name,
        symbol: chain.symbol,
        id: chain.id,
        logoURI: chain.logoURI,
        providers: {
          ...(chain.providers.lifi && {
            lifi: { key: chain.providers.lifi.key },
          }),
          ...(chain.providers.rango && {
            rango: { key: chain.providers.rango.key },
          }),
        },
      },
      token: {
        name: tokens[chain.id][0].name,
        symbol: tokens[chain.id][0].symbol,
        address: tokens[chain.id][0].address,
        decimals: tokens[chain.id][0].decimals,
        logoURI: tokens[chain.id][0].logoURI,
      },
      amount: '',
      amount_usd: 0.0,
      address: '',
    }

    const balance = '100.0'
    const { queryAllByText } = render(<TokenArea direction={direction} selection={selection} balance={balance} />)
    const occurrences = queryAllByText(chain.name, { exact: false })

    expect(occurrences.length).toBeGreaterThanOrEqual(1)
    expect(occurrences.length).toBeLessThanOrEqual(3)
  })
})
