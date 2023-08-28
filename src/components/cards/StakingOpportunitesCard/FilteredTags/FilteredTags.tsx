import { Dispatch, FC, useState } from 'react'
import classNames from './FilteredTags.module.pcss'
import { colors } from '../../../../constants/colors'
import { Button } from '../../../buttons/Button/Button'
import { Filter } from '../../../screens/StakingScreen/stakingReducer/types'
import { MultiselectModal } from '../../../modals/MultiselectModal/MultiselectModal'
import { chains } from '../../../../constants/chains'
import { ChainSelectionRow } from './ChainSelectionRow'

interface FilteredTagsProps {
  dispatch: Dispatch<any>
  filter: Filter
}

export const FilteredTags: FC<FilteredTagsProps> = ({ dispatch, filter }) => {
  const [isChainsModalOpened, setIsChainsModalOpened] = useState(false)
  const [selectedItemsIds, setSelectedItemsIds] = useState<string[]>([])
  const { all, my_holdings, compound } = filter

  const handleClick = (filterKey, value) => {
    dispatch({
      type: 'SET_FILTER',
      payload: {
        filter: filterKey,
        value,
      },
    })
  }

  const getSelectedStyle = (isSelected: boolean) => {
    return isSelected ? 'primary' : 'subtle'
  }

  return (
    <div className={classNames.container}>
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
        rightIcon={{
          name: 'ChevronDown',
          iconProps: {
            size: 13,
            color: colors.text.secondary,
          },
        }}
        onClick={() => setIsChainsModalOpened(true)}
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
        rightIcon={{
          name: 'ChevronDown',
          iconProps: {
            size: 13,
            color: colors.text.secondary,
          },
        }}
      >
        Sort: Recommended
      </Button>
      <MultiselectModal
        isOpen={isChainsModalOpened}
        setIsOpen={setIsChainsModalOpened}
        items={chains}
        title="Select chain"
        RowComponent={ChainSelectionRow}
        selectedItemsIds={selectedItemsIds}
        setSelectedItemsIds={setSelectedItemsIds}
        type="multiselect"
      />
    </div>
  )
}
