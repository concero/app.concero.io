import { CSSProperties, FC, ReactNode } from 'react'

export interface H3Props {
  children?: ReactNode
  style?: CSSProperties
}

export const H3: FC<H3Props> = ({ children, style, ...rest }) => {
  return (
    <h3 style={{ ...styles.container, ...style }} {...rest}>
      {children}
    </h3>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {},
}
