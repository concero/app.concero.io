import { CSSProperties, FC } from 'react'
import { Button } from '../buttons/Button/Button'

export interface ExchangeScreenProps {}

export const ExchangeScreen: FC<ExchangeScreenProps> = ({ ...rest }) => {
  return (
    <div style={styles.container}>
      <Button primary md>
        Exchange
      </Button>
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {},
}
