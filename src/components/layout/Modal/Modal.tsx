import { FC, useState } from 'react'
import classNames from './Modal.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { AnimatePresence, motion } from 'framer-motion'
import { TextInput } from '../../input/TextInput'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol.tsx'
import { Table } from '../Table/Table'
import { CryptoSymbolType } from '../../../types/CryptoSymbol'
import { colors } from '../../../constants/colors'

export interface ModalProps {
  title: string
  show: boolean
  setShow: (show: boolean) => void
  size: {
    width: number
    height: number
    maxWidth: number
    maxHeight: number
  }
}

const modalAnimation = {
  initial: { opacity: 0, translateY: 50 },
  animate: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: 50 },
}
const overlayAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

function ModalHeader(props: { title: string; onClick: () => void }) {
  return (
    <div className={classNames.header}>
      <h5>{props.title}</h5>
      <Button
        onClick={props.onClick}
        variant={'black'}
        size={'sq-xs'}
        leftIcon={{ name: 'X', iconProps: { size: 18 } }}
      />
    </div>
  )
}

//todo: remove when api connected
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

export const Modal: FC<ModalProps> = ({ title, show, setShow, size }) => {
  const [filteredChains, setFilteredChains] = useState<any[]>(chains)

  function filterChains(name) {
    const filteredChains = chains.filter((chain) => {
      return chain.name.toLowerCase().includes(name.toLowerCase())
    })
    setFilteredChains(filteredChains)
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div {...overlayAnimation} className={classNames.overlay}>
            <motion.div {...modalAnimation} className={classNames.container} style={{ ...size }}>
              <ModalHeader title={title} onClick={() => setShow(false)} />
              <TextInput
                iconName={'Search'}
                value={''}
                placeholder={'Search chain'}
                onChangeText={(value) => filterChains(value)}
              />
              <Table columns={chainsColumns} data={filteredChains} />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
