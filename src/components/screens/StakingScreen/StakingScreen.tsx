import { FC, useContext, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useStakingReducer } from './stakingReducer/stakingReducer'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { DataContext } from '../../../hooks/DataContext/DataContext'
import { populateChains } from './populateFunctions'
import { DesktopLayout } from './DesktopLayout'
import { MobileLayout } from './MobileLayout'

export const StakingScreen: FC = () => {
  const { getChains } = useContext(DataContext)
  const { address } = useAccount()
  const [stakingState, dispatch] = useStakingReducer()
  const isDesktop = useMediaQuery('mobile') // Adjust this as per your specific media query needs

  useEffect(() => {
    populateChains(getChains, dispatch)
    if (address) dispatch({ type: 'SET_ADDRESS', payload: address })
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {isDesktop ? <DesktopLayout stakingState={stakingState} dispatch={dispatch} /> : <MobileLayout stakingState={stakingState} dispatch={dispatch} />}
    </div>
  )
}
