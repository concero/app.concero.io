import classNames from './StakingCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import Icon from '../../Icon'

interface StakeButtonsProps {
  isCollapsed: boolean
}

export const StakeButtons: FC<StakeButtonsProps> = ({ isCollapsed }) => {
  return (
    <>
      {!isCollapsed ? (
        <div className={classNames.buttonContainer}>
          <Button variant={'primary'} className={classNames.stakeButton}>
            <Icon name={'ArrowsDiff'} className={classNames.buttonIcon} />
            Stake more
          </Button>
          <Button variant={'primary'} className={classNames.stakeButton}>
            <Icon name={'ArrowsDiff'} className={classNames.buttonIcon} />
            Claim rewards
          </Button>
        </div>
      ) : null}
    </>
  )
}
