import { IconArrowWaveRightUp, IconGasStation } from '@tabler/icons-react'
import { ManageState } from '../useManageReducer/types'
import classNames from './Details.module.pcss'
import { Avatar } from '../../../../tags/Avatar/Avatar'
import { Tag } from '../../../../tags/Tag/Tag'
import { colors } from '../../../../../constants/colors'
import { numberToFormatString } from '../../../../../utils/formatting'

interface DetailsProps {
  manageState: ManageState
}

export function Details({ manageState }: DetailsProps) {
  const rate = numberToFormatString(parseFloat(manageState.to.amount) / parseFloat(manageState.from.amount))

  return (
    <div className={`${classNames.container} ${!manageState.route ? classNames.hidden : ''}`}>
      <Tag>
        <p className={'body1'}>1</p>
        <Avatar src={manageState?.from.token.logoURI} size={'sm'} />
        <p className={'body1'}>=</p>
        <p className={'body1'}>{rate}</p>
        <Avatar src={manageState?.to.token.logoURI} size={'sm'} />
      </Tag>
      <Tag color={'grey'}>
        <div className={classNames.tagContainer}>
          {manageState?.route?.feeUsdValue ? (
            <div className={classNames.tagInnerContainer}>
              <IconGasStation color={colors.text.secondary} size={16} />
              <p className={'body1'}>${numberToFormatString(parseFloat(manageState?.route?.feeUsdValue), 4)}</p>
            </div>
          ) : null}
          {manageState?.route?.expectedSlippage ? (
            <div className={classNames.tagInnerContainer}>
              <IconArrowWaveRightUp size={16} color={colors.text.secondary} />
              <p className={'body1'}>{numberToFormatString(parseFloat(manageState?.route?.expectedSlippage), 4)}%</p>
            </div>
          ) : null}
        </div>
      </Tag>
    </div>
  )
}
