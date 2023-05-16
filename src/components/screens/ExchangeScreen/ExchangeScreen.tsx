import { FC } from 'react'
import styles from './ExchangeScreen.module.pcss'
import { ChartCard } from '../../cards/ChartCard/ChartCard.tsx'
import { HistoryCard } from '../../cards/HistoryCard'
import { SwapCard } from '../../cards/SwapCard/SwapCard.tsx'
import { NewsCard } from '../../cards/NewsCard/NewsCard.tsx'

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
