import { CSSProperties, FC, ReactNode } from 'react'
import { sp } from '../../constants/spacing'
import { colors } from '../../constants/colors'

export interface AppScreenProps {
  children?: ReactNode
}

export const AppScreen: FC<AppScreenProps> = ({ children, ...rest }) => (
  <div style={styles.container} {...rest}>
    {children}
  </div>
)

const styles: Record<string, CSSProperties> = {
  container: {
    flex: 1,
    paddingTop: sp.screen.v,
    paddingBottom: sp.screen.v,
    paddingLeft: sp.screen.h,
    paddingRight: sp.screen.h,
    backgroundColor: colors.base.background,
  },
}
