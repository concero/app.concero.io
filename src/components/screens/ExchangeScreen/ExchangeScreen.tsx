import { FC } from 'react'
import styles from './ExchangeScreen.module.pcss'
import { ChartCard } from '../../cards/ChartCard/ChartCard'
import { NewsCard } from '../../cards/NewsCard/NewsCard'
import { SwapCard } from '../../cards/SwapCard/SwapCard'
import { HistoryCard } from '../../cards/HistoryCard/HistoryCard'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

export interface ExchangeScreenProps {}

export const ExchangeScreen: FC<ExchangeScreenProps> = () => {
  const isDesktop = useMediaQuery('mobile')

  // const socket = io('ws://localhost:4000')
  // async function connect() {
  //   const authClient = await AuthClient.init({
  //     projectId: '47f2338094539d9c202f23c64a764f29',
  //     metadata: {
  //       name: 'concero',
  //       description: 'A dapp using WalletConnect AuthClient',
  //       url: 'concero.io',
  //       icons: ['https://my-auth-dapp.com/icons/logo.png'],
  //     },
  //   })
  //   authClient.on('auth_response', ({ params }) => {
  //     if (params.result?.s) {
  //       console.log(params.result.s)
  //       // Response contained a valid signature -> user is authenticated.
  //     } else {
  //       // Handle error or invalid signature case
  //       console.error(params.message)
  //     }
  //   })
  // }
  // connect()

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
