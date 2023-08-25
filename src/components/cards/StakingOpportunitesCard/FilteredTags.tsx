import { Dispatch, FC } from 'react'
import classNames from './StakingOpportunitiesCard.module.pcss'
import { colors } from '../../../constants/colors'
import { Button } from '../../buttons/Button/Button'
import { Filter } from '../../screens/StakingScreen/stakingReducer/types'

interface FilteredTagsProps {
  dispatch: Dispatch<any>
  filter: Filter
}

export const FilteredTags: FC<FilteredTagsProps> = ({ dispatch, filter }) => {
  const { all, my_holdings, compound } = filter

  const handleClick = (filterKey, value) => {
    dispatch({ type: 'SET_FILTER', payload: { filter: filterKey, value } })
  }

  const getSelectedStyle = (isSelected: boolean) => {
    return isSelected ? 'primary' : 'subtle'
  }

  return (
    <div className={classNames.filteredTagsContainer}>
      <Button size={'sm'} variant={getSelectedStyle(all)} onClick={() => handleClick('all', !all)}>
        All
      </Button>
      <Button
        size={'sm'}
        variant={getSelectedStyle(my_holdings)}
        onClick={() => handleClick('my_holdings', !my_holdings)}
      >
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
      <Button size={'sm'} variant={getSelectedStyle(compound)} onClick={() => handleClick('compound', !compound)}>
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
