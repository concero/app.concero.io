import { FC, useContext, useEffect, useState } from 'react'
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
import { intervals } from './constants'
import { columns } from './columns'
import { lifiTokens } from '../../../constants/lifiTokens'
import { SelectionContext } from '../../../hooks/SelectionContext'

export interface ChartCardProps {}

export const ChartCard: FC<ChartCardProps> = () => {
  const [chartType, setChartType] = useState<'coinGecko' | 'tradingView'>('coinGecko')
  const [isSelectLeftTokenModalVisible, setIsSelectLeftTokenModalVisible] = useState<boolean>(false)
  const [isSelectRightChainModalVisible, setIsSelectRightChainModalVisible] = useState<boolean>(false)
  const { selection } = useContext(SelectionContext)

  const [selectedLeftToken, setSelectedLeftToken] = useState<{
    name: string
    symbol: string
    logoURI: string
  }>(selection.swapCard.to.token)

  const [selectedRightChain, setSelectedRightChain] = useState<{
    name: string
    symbol: string
  }>(chains[1])
  const [selectedInterval, setSelectedInterval] = useState<
    | {
        title: string
        id: string
      }
    | undefined
  >(intervals[0])
  const [mappedTokens, setMappedTokens] = useState<
    {
      name: string
      symbol: string
      logoURI: string
    }[]
  >(lifiTokens[1].slice(0, 50))

  useEffect(() => {
    if (!selection.swapCard.to.token) return
    setSelectedLeftToken(selection.swapCard.to.token)
  }, [selection.swapCard.to.token])

  const handleSelectLeftToken = (chain: { name: string; symbol: string }): void => {
    setSelectedLeftToken(chain)
    setIsSelectLeftTokenModalVisible(false)
  }

  const handleSelectRightChain = (chain: { name: string; symbol: string }): void => {
    setSelectedRightChain(chain)
    setIsSelectRightChainModalVisible(false)
  }

  const toggleChartType = (): void => {
    setChartType(chartType === 'coinGecko' ? 'tradingView' : 'coinGecko')
  }

  const handleEndReached = () => {
    setMappedTokens([...mappedTokens, ...lifiTokens['1'].slice(mappedTokens.length, mappedTokens.length + 50)])
  }

  const isDesktop = useMediaQuery('mobile')

  return (
    <div className={`card ${classNames.container}`}>
      <div className={classNames.headerContainer}>
        <div className={classNames.selectChainContainer}>
          <h5>Chart</h5>
          <Button
            variant="black"
            size="sm"
            // rightIcon={{
            //   name: 'ChevronDown',
            //   iconProps: { size: 18, color: colors.text.secondary },
            // }}
            onClick={() => setIsSelectLeftTokenModalVisible(true)}
          >
            <CryptoSymbol src={selectedLeftToken.logoURI} symbol={selectedLeftToken.symbol} />
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
            <Button variant="black" size="sm" onClick={() => toggleChartType()}>
              <Beacon isOn={chartType === 'tradingView'} />
              <p className="body1">TradingView</p>
            </Button>
          ) : null}
        </div>
        {chartType === 'coinGecko' ? (
          <SegmentedControl data={intervals} selectedItem={selectedInterval} setSelectedItem={setSelectedInterval} />
        ) : null}
      </div>
      <div className="f1">
        {chartType === 'coinGecko' ? (
          <Chart selectedToken={selectedLeftToken} selectedInterval={selectedInterval} />
        ) : (
          <AdvancedRealTimeChart
            theme="dark"
            symbol={`BINANCE:${selection.swapCard.to.token.symbol}USDT`}
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
        title="Select token"
        show={isSelectLeftTokenModalVisible}
        setShow={setIsSelectLeftTokenModalVisible}
        data={lifiTokens[1]}
        visibleData={mappedTokens}
        onEndReached={() => handleEndReached()}
        columns={columns}
        onSelect={(token) => handleSelectLeftToken(token)}
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
