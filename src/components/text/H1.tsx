import { CSSProperties, FC, ReactNode } from 'react'

export interface H1Props {
  children?: ReactNode
  style?: CSSProperties
}

export const H1: FC<H1Props> = ({ children, style, ...rest }) => {
  return (
    <h1 style={{ ...styles.container, ...style }} {...rest}>
      {children}
    </h1>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {},
}
