import { FC } from 'react'
import styles from '../ExchangeScreen/ExchangeScreen.module.pcss'
import { HistoryCard } from '../../cards/HistoryCard/HistoryCard'
import { ChartCard } from '../../cards/ChartCard/ChartCard.tsx'

export interface PortfolioScreenProps {}

export const PortfolioScreen: FC<PortfolioScreenProps> = () => (
  <div className={`row ${styles.container}`}>
    <div className={styles.mainCardStack}>
      <ChartCard />
    </div>
    <div className={styles.secondaryCardStack}>
      <HistoryCard />
      <HistoryCard />
    </div>
  </div>
)
