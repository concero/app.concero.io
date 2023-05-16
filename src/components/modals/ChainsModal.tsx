// todo: remove when api connected
import { useState } from 'react'
import { CryptoSymbol } from '../tags/CryptoSymbol/CryptoSymbol'
import { CryptoSymbolType } from '../../types/CryptoSymbol'
import { colors } from '../../constants/colors'
import { TextInput } from '../input/TextInput'
import { Table } from '../layout/Table/Table'
import { Modal } from './Modal/Modal'

const chains = [
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

export function ChainsModal({ show, setShow }) {
  const [filteredChains, setFilteredChains] = useState<any[]>(chains)

  function filterChains(name) {
    const newChains = chains.filter((chain) => chain.name.toLowerCase().includes(name.toLowerCase()))
    setFilteredChains(newChains)
  }

  return (
    <Modal title="Select chain" show={show} setShow={setShow} size={{ width: 400, height: 400 }}>
      <TextInput iconName="Search" value="" placeholder="Search chain" onChangeText={(val) => filterChains(val)} />
      <Table columns={chainsColumns} data={filteredChains} onClick={(item) => console.log(item)} />
    </Modal>
  )
}
