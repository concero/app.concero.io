import classNames from './StakingOpportunitiesCard.module.pcss'
import { Tag } from '../../tags/Tag/Tag'
import { colors } from '../../../constants/colors'

export const FilteredTags = () => {
  return (
    <div className={classNames.filteredTagsContainer}>
      <Tag color={'main'} title={'All'} />
      <Tag color={'secondary'} title={'My holdings'} />
      <Tag
        color={'secondary'}
        title={'Chains: All'}
        rightIcon={{ name: 'ChevronDown', iconProps: { size: 13, color: colors.text.secondary } }}
      />
      <Tag color={'secondary'} title={'LP'} />
      <Tag color={'secondary'} title={'Compound'} />
      <Tag color={'secondary'} title={'Insurable'} />
      <Tag
        color={'secondary'}
        title={'Sort: Recommended'}
        rightIcon={{ name: 'ChevronDown', iconProps: { size: 13, color: colors.text.secondary } }}
      />
    </div>
  )
}
