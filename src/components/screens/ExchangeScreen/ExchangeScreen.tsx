import { FC } from 'react'
import styles from './ExchangeScreen.module.pcss'
import { ChartCard } from '../../cards/ChartCard'
import { HistoryCard } from '../../cards/HistoryCard'
import { SwapCard } from '../../cards/SwapCard'
import { NewsCard } from '../../cards/NewsCard'

export interface ExchangeScreenProps {}

export const ExchangeScreen: FC<ExchangeScreenProps> = () => {
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
