import { CSSProperties, FC, ReactNode } from 'react'

export interface H4Props {
  children?: ReactNode
  style?: CSSProperties
}

export const H4: FC<H4Props> = ({ children, style, ...rest }) => {
  return (
    <h4 style={{ ...styles.container, ...style }} {...rest}>
      {children}
    </h4>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {},
}
