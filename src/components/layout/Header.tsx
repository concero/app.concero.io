import { CSSProperties, FC, ReactNode } from 'react'

export interface HeaderProps {
  style?: CSSProperties
  children?: ReactNode
}

export const Header: FC<HeaderProps> = ({ style, children }) => {
  return <header style={{ ...styles.container, ...style }}>{children}</header>
}

const styles: Record<string, CSSProperties> = {
  container: {},
}
