import { CSSProperties, FC } from 'react'
import { H2 } from '../text/H2'

export interface ExchangeScreenProps {}

export const ExchangeScreen: FC<ExchangeScreenProps> = ({ ...rest }) => {
  return (
    <div style={styles.container}>
      <H2>$25,960</H2>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {},
}
