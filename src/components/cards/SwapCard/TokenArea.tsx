import { FC, useState } from 'react'
import classNames from './SwapCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { EntityListModal } from '../../modals/EntityListModal.tsx'
import { capitalize } from '../../../utils/formatting.ts'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol.tsx'
import { CryptoSymbolType } from '../../../types/CryptoSymbol.ts'
import { colors } from '../../../constants/colors.ts'

interface TokenAreaProps {
  direction: 'to' | 'from'

  selection: {
    chain: {
      name: string
      symbol: string
    }
    token: {
      name: string
      symbol: string
    }
  }
  dispatch: any
}

const chainsData = [
  { name: 'BinanceSmartChain', symbol: 'BSC' },
  { name: 'eth', symbol: 'ETH' },
  { name: 'matic', symbol: 'MATIC' },
  { name: 'avax', symbol: 'AVAX' },
  { name: 'miota', symbol: 'FTM' },
  { name: 'pot', symbol: 'ONE' },
  { name: 'Kucoin', symbol: 'KCS' },
  { name: 'Solana', symbol: 'SOL' },
  { name: 'trx', symbol: 'TRX' },
]
const chainsColumns = [
  {
    columnTitle: 'Symbol',
    cellComponent: (chain: { name: string; symbol: string }) => (
      <CryptoSymbol name={chain.name as CryptoSymbolType} symbol={chain.symbol} />
    ),
  },
  {
    columnTitle: 'Name',
    cellComponent: (chain: { name: string; symbol: string }) => (
      <p style={{ color: colors.grey.medium }}>{chain.name}</p>
    ),
  },
  {
    columnTitle: 'Balance',
    cellComponent: (chain: { name: string; symbol: string }) => <p style={{ color: colors.grey.medium }}>0.000</p>,
  },
]

const tokensData = [
  { name: 'ETH', symbol: 'ETH' },
  { name: 'BTC', symbol: 'BTC' },
  { name: 'USDT', symbol: 'USDT' },
  { name: 'BNB', symbol: 'BNB' },
  { name: 'ADA', symbol: 'ADA' },
  { name: 'XRP', symbol: 'XRP' },
  { name: 'USDC', symbol: 'USDC' },
  { name: 'DOT', symbol: 'DOT' },
]
const tokensColumns = [
  {
    columnTitle: 'Symbol',
    cellComponent: (token: { name: string; symbol: string }) => (
      <CryptoSymbol name={token.name as CryptoSymbolType} symbol={token.symbol} />
    ),
  },
  {
    columnTitle: 'Name',
    cellComponent: (token: { name: string; symbol: string }) => (
      <p style={{ color: colors.grey.medium }}>{token.name}</p>
    ),
  },
]
export const TokenArea: FC<TokenAreaProps> = ({ direction, selection, dispatch }) => {
  const [showChainsModal, setShowChainsModal] = useState<boolean>(false)
  const [showTokensModal, setShowTokensModal] = useState<boolean>(false)

  const setChain = (chain) => {
    console.log('setChain', direction, chain)
    dispatch({
      type: 'setChain',
      direction,
      payload: { name: chain.name, symbol: chain.symbol },
    })
  }

  const setToken = (token) => {
    console.log('setToken', direction, token)
    dispatch({
      type: 'setToken',
      direction,
      payload: { name: token.name, symbol: token.symbol },
    })
  }

  return (
    <>
      <div className={classNames.tokenContainer}>
        <div className={classNames.tokenRow}>
          <div className={classNames.tokenRowHeader}>
            <p>{capitalize(direction)}</p>
            <Button
              onClick={() => setShowChainsModal(true)}
              size="sm"
              variant="black"
              rightIcon={{ name: 'ChevronDown', iconProps: { size: 18 } }}
            >
              <CryptoSymbol name={selection.chain.name} symbol={selection.chain.symbol} />
            </Button>
          </div>
          <p>Max: 10</p>
        </div>
        <div className={classNames.tokenRow}>
          <div>
            <h3>40 BNB</h3>
            <h5>$4024</h5>
          </div>
          <Button
            onClick={() => setShowTokensModal(true)}
            size="sm"
            variant="black"
            rightIcon={{ name: 'ChevronDown', iconProps: { size: 18 } }}
          >
            <CryptoSymbol name={selection.token.name} symbol={selection.token.symbol} />
          </Button>
        </div>
      </div>
      <EntityListModal
        title="Select token"
        data={tokensData}
        columns={tokensColumns}
        show={showTokensModal}
        setShow={setShowTokensModal}
        onSelect={(token) => setToken(token)}
      />
      <EntityListModal
        title="Select chain"
        data={chainsData}
        columns={chainsColumns}
        show={showChainsModal}
        setShow={setShowChainsModal}
        onSelect={(chain) => setChain(chain)}
      />
    </>
  )
}
