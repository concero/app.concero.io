import { CSSProperties, FC } from 'react'

export interface ExchangeScreenProps {}

export const ExchangeScreen: FC<ExchangeScreenProps> = ({ ...rest }) => {
  return <div style={styles.container}></div>
}

const styles: Record<string, CSSProperties> = {
  container: {},
}
