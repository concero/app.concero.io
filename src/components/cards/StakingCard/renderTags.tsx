import { FC } from 'react'
import Icon from '../../Icon'
import classNames from './StakingCard.module.pcss'
import { secondsConverter } from '../../../utils/formatting'
import { colors } from '../../../constants/colors'

interface RenderTagsProps {
  route: any
  isSelected: boolean
}

export const renderTags: FC<RenderTagsProps> = ({ route, isSelected }) => {
  return (
    <>
      <Icon name={'Lock'} className={`${classNames.icon} ${isSelected ? classNames.selectedText : ''}`} />
      <h5 className={`body1 ${isSelected ? classNames.selectedText : ''}`}>
        {secondsConverter(route.execution_duration_sec)}
      </h5>
      <Icon name={'Stack2'} className={`${classNames.icon} ${isSelected ? classNames.selectedText : ''}`} />
      {route.insured ? <Icon name={'Shield'} className={classNames.icon} color={colors.green.main} /> : null}
    </>
  )
}
