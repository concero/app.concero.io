import styles from './ExchangeScreen.module.pcss'
import { ChartCard } from '../../cards/ChartCard/ChartCard'
import { NewsCard } from '../../cards/NewsCard/NewsCard'
import { SwapCard } from '../../cards/SwapCard/SwapCard'
import { HistoryCard } from '../../cards/HistoryCard/HistoryCard'

export const DesktopExchangeScreen = () => {
  return (
    <div className={`row ${styles.container}`}>
      <div className={styles.mainCardStack}>
        <ChartCard />
        <NewsCard />
      </div>
      <div className={styles.secondaryCardStack}>
        <SwapCard />
        <HistoryCard />
      </div>
    </div>
  )
}
