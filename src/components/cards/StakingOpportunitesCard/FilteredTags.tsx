import classNames from './StakingOpportunitiesCard.module.pcss'
import { colors } from '../../../constants/colors'
import { Button } from '../../buttons/Button/Button'

export const FilteredTags = () => {
  return (
    <div className={classNames.filteredTagsContainer}>
      <Button size={'sm'} variant={'primary'}>
        All
      </Button>
      <Button size={'sm'} variant={'subtle'}>
        My holdings
      </Button>
      <Button
        size={'sm'}
        variant={'subtle'}
        rightIcon={{ name: 'ChevronDown', iconProps: { size: 13, color: colors.text.secondary } }}
      >
        Chains: All
      </Button>
      <Button size={'sm'} variant={'subtle'}>
        LP
      </Button>
      <Button size={'sm'} variant={'subtle'}>
        Compound
      </Button>
      <Button size={'sm'} variant={'subtle'}>
        Insurable
      </Button>
      <Button
        size={'sm'}
        variant={'subtle'}
        rightIcon={{ name: 'ChevronDown', iconProps: { size: 13, color: colors.text.secondary } }}
      >
        Sort: Recommended
      </Button>
    </div>
  )
}
