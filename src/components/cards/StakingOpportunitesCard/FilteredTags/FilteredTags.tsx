import { Dispatch, FC, useContext, useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import classNames from './FilteredTags.module.pcss'
import { colors } from '../../../../constants/colors'
import { Button } from '../../../buttons/Button/Button'
import { Filter } from '../../../screens/StakingScreen/stakingReducer/types'
import { ListModal } from '../../../modals/MultiselectModal/ListModal'
import { ListEntityButton } from './ListEntityButton'
import { getAllTagStyle, getChainTitle, getSelectedStyle } from './styleHandlers'
import { resetFilter } from './resetFilter'
import { ApyModal } from './ApyModal/ApyModal'
import { DataContext } from '../../../../hooks/DataContext/DataContext'

interface FilteredTagsProps {
  dispatch: Dispatch<any>
  stakingState: {
    filter: Filter
  }
}

export const FilteredTags: FC<FilteredTagsProps> = ({ dispatch, stakingState }) => {
  const { getChains, getTokens } = useContext(DataContext)
  const [isChainsModalOpened, setIsChainsModalOpened] = useState(false)
  const [isApyModalVisible, setIsApyModalVisible] = useState(false)
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const { filter, userBalances } = stakingState
  const { all, my_holdings, compound, chains } = filter

  const handleClick = (filterKey, value) => {
    if (filterKey === 'all') return resetFilter(dispatch)
    dispatch({ type: 'SET_FILTER', payload: { filter: filterKey, value } })
  }

  const handleSelectChains = (item) => {
    let value = []
    if (chains.includes(item)) {
      value = chains.filter((chain) => chain !== item)
    } else {
      value = [...chains, ...[item]]
    }
    dispatch({ type: 'SET_FILTER', payload: { filter: 'chains', value } })
  }

  return (
    <div className={classNames.container}>
      <Button size="sm" variant={getAllTagStyle(filter)} onClick={() => handleClick('all', !all)}>
        All
      </Button>
      <Button size="sm" variant={getSelectedStyle(my_holdings)} onClick={() => handleClick('my_holdings', !my_holdings)}>
        My holdings
      </Button>
      <Button
        size="sm"
        variant={getChainTitle(chains) === 'All' ? 'subtle' : 'primary'}
        rightIcon={<IconChevronDown size={13} color={colors.text.secondary} />}
        onClick={() => setIsChainsModalOpened(true)}
      >
        {`Chains: ${getChainTitle(chains)}`}
      </Button>
      <Button size="sm" variant={getSelectedStyle(compound)} onClick={() => handleClick('compound', !compound)}>
        Compound
      </Button>
      <Button
        variant={getSelectedStyle(filter.apy)}
        size="sm"
        rightIcon={<IconChevronDown size={13} color={colors.text.secondary} />}
        onClick={() => setIsApyModalVisible(true)}
      >
        APY:
        {' '}
        {filter.apy ? `${filter.apy}%` : 'All'}
      </Button>
      <ListModal
        isOpen={isChainsModalOpened}
        setIsOpen={setIsChainsModalOpened}
        getItems={({ offset, limit, search }) => getChains({ offset, limit, search })}
        title="Select chain"
        RenderItem={ListEntityButton}
        selectedItems={chains}
        onSelect={handleSelectChains}
        type="multiselect"
      />
      <ApyModal isOpen={isApyModalVisible} onClose={() => setIsApyModalVisible(false)} stakingState={stakingState} dispatch={dispatch} />
    </div>
  )
}
