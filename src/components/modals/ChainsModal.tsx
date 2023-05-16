//todo: remove when api connected
import { CryptoSymbol } from '../tags/CryptoSymbol/CryptoSymbol.tsx'
import { CryptoSymbolType } from '../../types/CryptoSymbol.ts'
import { colors } from '../../constants/colors.ts'
import { useState } from 'react'
import { TextInput } from '../input/TextInput.tsx'
import { Table } from '../layout/Table/Table.tsx'
import { Modal } from './Modal/Modal.tsx'

const chains = [
  { name: 'BinanceSmartChain', symbol: 'BSC' },
  { name: 'Ethereum', symbol: 'ETH' },
  { name: 'Polygon', symbol: 'MATIC' },
  { name: 'Avalanche', symbol: 'AVAX' },
  { name: 'Fantom', symbol: 'FTM' },
  { name: 'Harmony', symbol: 'ONE' },
  { name: 'Kucoin', symbol: 'KCS' },
  { name: 'Solana', symbol: 'SOL' },
  { name: 'Tron', symbol: 'TRX' },
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

export function ChainsModal({ show, setShow }) {
  const [filteredChains, setFilteredChains] = useState<any[]>(chains)

  function filterChains(name) {
    const filteredChains = chains.filter((chain) => {
      return chain.name.toLowerCase().includes(name.toLowerCase())
    })
    setFilteredChains(filteredChains)
  }

  return (
    <>
      <Modal title={'Select chain'} show={show} setShow={setShow} size={{ width: 400, height: 400 }}>
        <TextInput
          iconName={'Search'}
          value={''}
          placeholder={'Search chain'}
          onChangeText={(val) => filterChains(val)}
        />
        <Table columns={chainsColumns} data={filteredChains} />
      </Modal>
    </>
  )
}
