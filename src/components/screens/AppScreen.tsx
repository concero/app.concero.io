import { CSSProperties, FC, ReactNode } from 'react'
import { pd } from '../../constants/styles'
import { colors } from '../../constants/colors'

export interface AppScreenProps {
  children?: ReactNode
}

export const AppScreen: FC<AppScreenProps> = ({ children, ...rest }) => {
  return (
    <div style={styles.container} {...rest}>
      {children}
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {
    flex: 1,
    paddingTop: pd.screen.v,
    paddingBottom: pd.screen.v,
    paddingLeft: pd.screen.h,
    paddingRight: pd.screen.h,
    backgroundColor: colors.background,
  },
}
