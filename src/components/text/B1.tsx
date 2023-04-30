import { CSSProperties, FC, ReactNode } from 'react'

export interface B1Props {
  children?: ReactNode
  style?: CSSProperties
}

export const B1: FC<B1Props> = ({ children, ...rest }) => {
  return (
    <p style={styles.container} {...rest}>
      {children}
    </p>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {
    fontSize: 15,
    fontWeight: 500,
  },
}
