import { FC } from 'react'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { withErrorBoundary } from '../../wrappers/WithErrorBoundary'
import { HistoryCard } from '../../cards/HistoryCard/HistoryCard'
import { SwapCard } from '../../cards/SwapCard/SwapCard'
import { NewsCard } from '../../cards/NewsCard/NewsCard'
import { ChartCard } from '../../cards/ChartCard/ChartCard'
import classNames from './ExchangeScreen.module.pcss'

export interface ExchangeScreenProps {}

export const ExchangeScreen: FC<ExchangeScreenProps> = () => {
  const isDesktop = useMediaQuery('mobile')
  const History = withErrorBoundary(HistoryCard)
  const Swap = withErrorBoundary(SwapCard)
  const News = withErrorBoundary(NewsCard)
  const Chart = withErrorBoundary(ChartCard)

  const desktopLayout = (
    <div className={`row ${classNames.container}`}>
      <div className={classNames.mainCardStack}>
        <Chart />
        <News />
      </div>
      <div className={classNames.secondaryCardStack}>
        <Swap />
        <History />
      </div>
    </div>
  )

  const mobileLayout = (
    <div className={classNames.container}>
      <div className={classNames.mainCardStack}>
        <Swap />
        <Chart />
        <News />
        <History />
      </div>
    </div>
  )

  return <div style={{ width: '100%', height: '100%' }}>{isDesktop ? desktopLayout : mobileLayout}</div>
}
