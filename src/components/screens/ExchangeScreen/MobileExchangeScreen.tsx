import styles from './ExchangeScreen.module.pcss'
import { SwapCard } from '../../cards/SwapCard/SwapCard'
import { ChartCard } from '../../cards/ChartCard/ChartCard'
import { NewsCard } from '../../cards/NewsCard/NewsCard'
import { HistoryCard } from '../../cards/HistoryCard/HistoryCard'

export const MobileExchangeScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainCardStack}>
        <SwapCard />
        <ChartCard />
        <NewsCard />
        <HistoryCard />
      </div>
    </div>
  )
}
