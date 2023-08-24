import classNames from './StakingOpportunitiesCard.module.pcss'
import { colors } from '../../../constants/colors'
import { Button } from '../../buttons/Button/Button'

export const FilteredTags = () => {
  return (
    <div className={classNames.filteredTagsContainer}>
      <Button variant={'primary'}>All</Button>
      <Button variant={'subtle'}>My holdings</Button>
      <Button
        variant={'subtle'}
        rightIcon={{ name: 'ChevronDown', iconProps: { size: 13, color: colors.text.secondary } }}
      >
        Chains: All
      </Button>
      <Button variant={'subtle'}>LP</Button>
      <Button variant={'subtle'}>Compound</Button>
      <Button variant={'subtle'}>Insurable</Button>
      <Button
        variant={'subtle'}
        rightIcon={{ name: 'ChevronDown', iconProps: { size: 13, color: colors.text.secondary } }}
      >
        Sort: Recommended
      </Button>
    </div>
  )
}
