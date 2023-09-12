import { Dispatch, FC, useState } from 'react'
import classNames from './FilteredTags.module.pcss'
import { colors } from '../../../../constants/colors'
import { Button } from '../../../buttons/Button/Button'
import { Filter } from '../../../screens/StakingScreen/stakingReducer/types'
import { MultiselectModal } from '../../../modals/MultiselectModal/MultiselectModal'
import { ChainSelectionRow } from './ChainSelectionRow'
import { IconChevronDown } from '@tabler/icons-react'

interface FilteredTagsProps {
  dispatch: Dispatch<any>
  stakingState: {
    filter: Filter
  }
}

const getChainTitle = (chains) => {
  if (chains.length === 0) return 'All'
  if (chains.length === 1) return chains[0].name
  if (chains.length > 1) return chains.length
}

export const FilteredTags: FC<FilteredTagsProps> = ({ dispatch, stakingState }) => {
  const { filter } = stakingState
  const [isChainsModalOpened, setIsChainsModalOpened] = useState(false)
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const { all, my_holdings, compound, chains } = filter

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

  const handleSelectChains = (item) => {
    let value = []

    if (chains.includes(item)) {
      value = chains.filter((chain) => chain !== item)
    } else {
      value = [...chains, ...[item]]
    }

    dispatch({
      type: 'SET_FILTER',
      payload: {
        filter: 'chains',
        value,
      },
    })
  }

  return (
    <div className={classNames.container}>
      <Button size={'sm'} variant={getSelectedStyle(all)} onClick={() => handleClick('all', !all)}>
        All
      </Button>
      <Button size={'sm'} variant={getSelectedStyle(my_holdings)} onClick={() => handleClick('my_holdings', !my_holdings)}>
        My holdings
      </Button>
      <Button
        size={'sm'}
        variant={getChainTitle(chains) === 'All' ? 'subtle' : 'primary'}
        rightIcon={<IconChevronDown size={13} color={colors.text.secondary} />}
        onClick={() => setIsChainsModalOpened(true)}
      >
        {`Chains: ${getChainTitle(chains)}`}
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
        rightIcon={<IconChevronDown size={13} color={colors.text.secondary} />}
      >
        Sort: Recommended
      </Button>
      <MultiselectModal
        isOpen={isChainsModalOpened}
        setIsOpen={setIsChainsModalOpened}
        items={stakingState.chains}
        title="Select chain"
        RowComponent={ChainSelectionRow}
        selectedItems={chains}
        onSelect={handleSelectChains}
        type="multiselect"
      />
    </div>
  )
}
