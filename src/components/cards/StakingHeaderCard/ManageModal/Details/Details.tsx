import { ManageState } from '../useManageReducer/types'
import classNames from './Details.module.pcss'
import { Avatar } from '../../../../tags/Avatar/Avatar'
import { Tag } from '../../../../tags/Tag/Tag'
import { IconArrowWaveRightUp, IconGasStation } from '@tabler/icons-react'
import { colors } from '../../../../../constants/colors'

interface DetailsProps {
  manageState: ManageState
}

export function Details({ manageState }: DetailsProps) {
  return (
    <div className={classNames.container}>
      <Tag>
        <p className={'body1'}>1</p>
        <Avatar src={manageState.from.token.logoURI} size={'sm'} />
        <p className={'body1'}>=</p>
        <p className={'body1'}>{manageState.route.price}</p>
        <Avatar src={manageState.to.token.logoURI} size={'sm'} />
      </Tag>
      <Tag color={'grey'}>
        <div className={classNames.tagContainer}>
          <div className={classNames.tagInnerContainer}>
            <IconGasStation color={colors.text.secondary} size={16} />
            <p className={'body1'}>${manageState.route.fee_bps}</p>
          </div>
          <div className={classNames.tagInnerContainer}>
            <IconArrowWaveRightUp size={16} color={colors.text.secondary} />
            <p className={'body1'}>{manageState.route.expectedSlippage}%</p>
          </div>
        </div>
      </Tag>
    </div>
  )
}
