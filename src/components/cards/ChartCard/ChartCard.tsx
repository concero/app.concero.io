import { FC, useState } from 'react'
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets'
import { CardHeader } from '../CardHeader/CardHeader'
import { Button } from '../../buttons/Button/Button'
import classNames from './ChartCard.module.pcss'
import { Chart } from './Chart'
import { Beacon } from '../../layout/Beacon'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { EntityListModal } from '../../modals/EntityListModal/EntityListModal'

const chains = [
  {
    name: 'Binance Smart Chain',
    symbol: 'ETH',
    balance: '0.000',
  },
  {
    name: 'Binance Smart Chain',
    symbol: 'BTC',
    balance: '0.000',
  },
  {
    name: 'Binance Smart Chain',
    symbol: 'USDT',
    balance: '0.000',
  },
  {
    name: 'Binance Smart Chain',
    symbol: 'BNB',
    balance: '0.000',
  },
  {
    name: 'Binance Smart Chain',
    symbol: 'ADA',
    balance: '0.000',
  },
  {
    name: 'Binance Smart Chain',
    symbol: 'XRP',
    balance: '0.000',
  },
  {
    name: 'Binance Smart Chain',
    symbol: 'USDC',
    balance: '0.000',
  },
  {
    name: 'Binance Smart Chain',
    symbol: 'DOT',
    balance: '0.000',
  },
]

const columns = [
  {
    columnTitle: 'Symbol',
    cellComponent: (item) => <CryptoSymbol name={item.symbol} symbol={item.symbol} />,
  },
  {
    columnTitle: 'Name',
    cellComponent: (item) => <p className={'body1'}>{item.name}</p>,
  },
  {
    columnTitle: 'Balance',
    cellComponent: (item) => <p className={'body1'}>{item.balance}</p>,
  },
]

export interface ChartCardProps {}

export const ChartCard: FC<ChartCardProps> = () => {
  const [chartType, setChartType] = useState<'chart' | 'tradingView'>('chart')
  const toggleChartType = (): void => {
    setChartType(chartType === 'chart' ? 'tradingView' : 'chart')
  }
  const [isSelectLeftChainModalVisible, setIsSelectLeftChainModalVisible] = useState<boolean>(false)
  const [isSelectRightChainModalVisible, setIsSelectRightChainModalVisible] =
    useState<boolean>(false)
  const [selectedLeftChain, setSelectedLeftChain] = useState<{ name: string; symbol: string }>(
    chains[0],
  )
  const [selectedRightChain, setSelectedRightChain] = useState<{ name: string; symbol: string }>(
    chains[1],
  )
  const handleSelectLeftChain = (chain: { name: string; symbol: string }): void => {
    setSelectedLeftChain(chain)
    setIsSelectLeftChainModalVisible(false)
  }
  const handleSelectRightChain = (chain: { name: string; symbol: string }): void => {
    setSelectedRightChain(chain)
    setIsSelectRightChainModalVisible(false)
  }

  return (
    <div className={`card ${classNames.container}`}>
      <CardHeader title="Chart">
        <Button
          variant="subtle"
          size="sm"
          rightIcon={{
            name: 'ChevronDown',
            iconProps: { size: 18 },
          }}
          onClick={() => setIsSelectLeftChainModalVisible(true)}
        >
          <CryptoSymbol name={selectedLeftChain.symbol} symbol={selectedLeftChain.symbol} />
        </Button>
        <Button
          variant="subtle"
          size="sm"
          rightIcon={{
            name: 'ChevronDown',
            iconProps: { size: 18 },
          }}
          onClick={() => setIsSelectRightChainModalVisible(true)}
        >
          <CryptoSymbol name={selectedRightChain.symbol} symbol={selectedRightChain.symbol} />
        </Button>
        <Button variant="subtle" size="sm" onClick={() => toggleChartType()}>
          <Beacon isOn={chartType === 'tradingView'} />
          TradingView
        </Button>
      </CardHeader>
      <div className="f1">
        {chartType === 'chart' ? (
          <Chart />
        ) : (
          <AdvancedRealTimeChart
            theme="dark"
            symbol="BINANCE:BTCUSDT"
            interval="1"
            width="100%"
            height="100%"
          />
        )}
      </div>
      <EntityListModal
        title={'Select chain'}
        show={isSelectLeftChainModalVisible}
        setShow={setIsSelectLeftChainModalVisible}
        data={chains}
        columns={columns}
        onSelect={(chain) => handleSelectLeftChain(chain)}
      />
      <EntityListModal
        title={'Select chain'}
        show={isSelectRightChainModalVisible}
        setShow={setIsSelectRightChainModalVisible}
        data={chains}
        columns={columns}
        onSelect={(chain) => handleSelectRightChain(chain)}
      />
    </div>
  )
}
