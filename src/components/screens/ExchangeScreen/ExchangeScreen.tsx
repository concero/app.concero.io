import { FC } from 'react'
import styles from './ExchangeScreen.module.pcss'
import { ChartCard } from '../../cards/ChartCard/ChartCard'
import { HistoryCard } from '../../cards/HistoryCard/HistoryCard'
import { SwapCard } from '../../cards/SwapCard/SwapCard'
import { NewsCard } from '../../cards/NewsCard/NewsCard'

export interface ExchangeScreenProps {
}

export const ExchangeScreen: FC<ExchangeScreenProps> = () => (
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
