import { FC, useState } from 'react'
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets'
import { Button } from '../../buttons/Button/Button'
import classNames from './ChartCard.module.pcss'
import { Chart } from './Chart'
import { Beacon } from '../../layout/Beacon'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { EntityListModal } from '../../modals/EntityListModal/EntityListModal'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { chains } from '../../../constants/chains'
import { SegmentedControl } from '../../buttons/SegmentedControl/SegmentedControl'
import { colors } from '../../../constants/colors'
import { intervals } from './constants'
import { columns } from './columns'

export interface ChartCardProps {}

export const ChartCard: FC<ChartCardProps> = () => {
  const [chartType, setChartType] = useState<'chart' | 'tradingView'>('chart')
  const toggleChartType = (): void => {
    setChartType(chartType === 'chart' ? 'tradingView' : 'chart')
  }
  const [isSelectLeftChainModalVisible, setIsSelectLeftChainModalVisible] = useState<boolean>(false)
  const [isSelectRightChainModalVisible, setIsSelectRightChainModalVisible] = useState<boolean>(false)
  const [selectedLeftChain, setSelectedLeftChain] = useState<{ name: string; symbol: string }>(chains[0])
  const [selectedRightChain, setSelectedRightChain] = useState<{ name: string; symbol: string }>(chains[1])
  const [selectedInterval, setSelectedInterval] = useState<{ title: string; id: string } | undefined>(intervals[0])

  const handleSelectLeftChain = (chain: { name: string; symbol: string }): void => {
    setSelectedLeftChain(chain)
    setIsSelectLeftChainModalVisible(false)
  }

  const handleSelectRightChain = (chain: { name: string; symbol: string }): void => {
    setSelectedRightChain(chain)
    setIsSelectRightChainModalVisible(false)
  }

  const isDesktop = useMediaQuery('mobile')

  return (
    <div className={`card ${classNames.container}`}>
      <div className={classNames.headerContainer}>
        <div className={classNames.selectChainContainer}>
          <h5>Chart</h5>
          <Button
            variant="subtle"
            size="sm"
            rightIcon={{
              name: 'ChevronDown',
              iconProps: { size: 18, color: colors.text.secondary },
            }}
            onClick={() => setIsSelectLeftChainModalVisible(true)}
          >
            <CryptoSymbol name={selectedLeftChain.symbol} symbol={selectedLeftChain.symbol} />
          </Button>
          {/* <Button */}
          {/*   variant="subtle" */}
          {/*   size="sm" */}
          {/*   rightIcon={{ */}
          {/*     name: 'ChevronDown', */}
          {/*     iconProps: { size: 18 }, */}
          {/*   }} */}
          {/*   onClick={() => setIsSelectRightChainModalVisible(true)} */}
          {/* > */}
          {/*   <CryptoSymbol name={selectedRightChain.symbol} symbol={selectedRightChain.symbol} /> */}
          {/* </Button> */}
          {isDesktop ? (
            <Button variant="subtle" size="sm" onClick={() => toggleChartType()}>
              <Beacon isOn={chartType === 'tradingView'} />
              <p className={'body1'}>TradingView</p>
            </Button>
          ) : null}
        </div>
        {chartType === 'chart' ? (
          <SegmentedControl data={intervals} selectedItem={selectedInterval} setSelectedItem={setSelectedInterval} />
        ) : null}
      </div>
      <div className="f1">
        {chartType === 'chart' ? (
          <Chart selectedChain={selectedLeftChain} selectedInterval={selectedInterval} />
        ) : (
          <AdvancedRealTimeChart
            theme="dark"
            symbol="BINANCE:BTCUSDT"
            interval="1"
            width="100%"
            height="100%"
            locale="en"
            hide_side_toolbar
            allow_symbol_change
            save_image
            container_id="tradingview_9e3a4"
          />
        )}
      </div>
      <EntityListModal
        title="Select chain"
        show={isSelectLeftChainModalVisible}
        setShow={setIsSelectLeftChainModalVisible}
        data={chains}
        columns={columns}
        onSelect={(chain) => handleSelectLeftChain(chain)}
      />
      {/* <EntityListModal */}
      {/*   title="Select chain" */}
      {/*   show={isSelectRightChainModalVisible} */}
      {/*   setShow={setIsSelectRightChainModalVisible} */}
      {/*   data={chains} */}
      {/*   columns={columns} */}
      {/*   onSelect={(chain) => handleSelectRightChain(chain)} */}
      {/* /> */}
    </div>
  )
}
