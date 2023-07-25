import { FC, useMemo } from 'react'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { MobileExchangeScreen } from './MobileExchangeScreen'
import { DesktopExchangeScreen } from './DesktopExchangeScreen'

export interface ExchangeScreenProps {}

export const ExchangeScreen: FC<ExchangeScreenProps> = () => {
  const isDesktop = useMediaQuery('mobile')

  const exchangeScreenComponent = useMemo(() => {
    return isDesktop ? <DesktopExchangeScreen /> : <MobileExchangeScreen />
  }, [isDesktop])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {exchangeScreenComponent}
    </div>
  )
}
