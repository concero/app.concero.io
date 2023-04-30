import { CSSProperties, FC, ReactNode } from 'react'

export interface H2Props {
  children?: ReactNode
  style?: CSSProperties
}

export const H2: FC<H2Props> = ({ children, ...rest }) => {
  return (
    <h2 style={styles.container} {...rest}>
      {children}
    </h2>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {
    fontSize: 24,
    fontWeight: 500,
  },
}
