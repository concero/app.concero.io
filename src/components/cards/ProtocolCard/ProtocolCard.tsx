import { IconChevronRight } from '@tabler/icons-react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Button } from '../../buttons/Button/Button'
import classNames from './ProtocolCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import { capitalize } from '../../../utils/formatting'
import { colors } from '../../../constants/colors'

interface ProtocolCardProps {
  stakingState: StakingState
}

export function ProtocolCard({ stakingState }: ProtocolCardProps) {
  const { selectedVault } = stakingState
  return (
    <div>
      <CardHeader title={'Protocol'} />
      <Button variant={'subtle'}>
        <div className={classNames.cardContainer}>
          <div className={classNames.avatarContainer}>
            <Avatar src={selectedVault?.logoURI ?? null} />
            <h5>{capitalize(selectedVault.protocolName)}</h5>
          </div>
          <IconChevronRight size={18} color={colors.text.secondary} />
        </div>
      </Button>
    </div>
  )
}
