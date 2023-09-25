import { FC, useState } from 'react'
import { IconArrowsUpDown } from '@tabler/icons-react'
import classNames from './StakingHeaderCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { Vault } from '../../screens/StakingScreen/stakingReducer/types'
import { capitalize, formatNumber } from '../../../utils/formatting'
import { Button } from '../../buttons/Button/Button'
import { InfoCard } from './InfoCard/InfoCard'
import { ManageModal } from './ManageModal/ManageModal'

interface StakingHeaderCardProps {
  stakingState: {
    selectedVault: Vault
  }
}

export const StakingHeaderCard: FC<StakingHeaderCardProps> = ({ stakingState }) => {
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)
  const { selectedVault } = stakingState

  const stakedAmount = formatNumber(selectedVault.stakedAmount, { decimals: selectedVault.decimals, decimalPlaces: 5, disableUnit: true })

  function handleManageButtonClick() {
    setIsManageModalOpen(true)
  }

  return (
    <div className={`card ${classNames.container} ${stakedAmount ? classNames.staked : ''}`}>
      <div className={classNames.headerContainer}>
        <div className={classNames.sideContainer}>
          <Avatar src={selectedVault.logoURI} />
          <div>
            <h5 className={classNames.symbolTitle}>{selectedVault.widoSymbol}</h5>
            <p className={`body1 ${classNames.protocolTitle}`}>{capitalize(selectedVault?.protocolName ?? '')}</p>
          </div>
        </div>
        <div className={classNames.sideContainer}>
          <Button
            leftIcon={<IconArrowsUpDown size={16} color="white" />}
            variant="primary"
            onClick={handleManageButtonClick}
            className={classNames.stakeButton}
          >
            {stakedAmount ? 'Manage' : 'Stake'}
          </Button>
        </div>
      </div>
      {stakedAmount ? (
        <div className={classNames.cardsContainer}>
          <InfoCard title={'Staked'} value={stakedAmount} secondaryValue={stakingState.selectedVault.symbol} />
          <InfoCard title={'Earned'} value={stakedAmount} />
          <InfoCard title={'Pool share'} value={stakedAmount} />
        </div>
      ) : null}
      <ManageModal isOpen={isManageModalOpen} setIsOpen={setIsManageModalOpen} stakingState={stakingState} />
    </div>
  )
}
