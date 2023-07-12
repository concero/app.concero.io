import { FC, useEffect } from 'react'
import styles from './ExchangeScreen.module.pcss'
import { ChartCard } from '../../cards/ChartCard/ChartCard'
import { NewsCard } from '../../cards/NewsCard/NewsCard'
import { SwapCard } from '../../cards/SwapCard/SwapCard'
import { HistoryCard } from '../../cards/HistoryCard/HistoryCard'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { getPosts } from '../../../api/cryptopanic/cryptoPanic'

export interface ExchangeScreenProps {}

export const ExchangeScreen: FC<ExchangeScreenProps> = () => {
  const isDesktop = useMediaQuery('mobile')
  useEffect(() => {
    getPosts({ currencies: ['BTC'] })
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {isDesktop ? (
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
      ) : (
        <div className={styles.container}>
          <div className={styles.mainCardStack}>
            <SwapCard />
            <ChartCard />
            <NewsCard />
            <HistoryCard />
          </div>
        </div>
      )}
    </div>
  )
}
