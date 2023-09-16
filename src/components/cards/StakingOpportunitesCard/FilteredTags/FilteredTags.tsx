import { Dispatch, FC, useContext, useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import classNames from './FilteredTags.module.pcss'
import { colors } from '../../../../constants/colors'
import { Button } from '../../../buttons/Button/Button'
import { Filter } from '../../../screens/StakingScreen/stakingReducer/types'
import { ListModal } from '../../../modals/MultiselectModal/ListModal'
import { ListEntityButton } from './ListEntityButton'
import { getAllTagStyle, getCategoryTitle, getChainTitle, getSelectedStyle } from './styleHandlers'
import { resetFilter } from './resetFilter'
import { ApyModal } from './ApyModal/ApyModal'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
import { ListCategoryButton } from './ListCategoryButton/ListCategoryButton'
import { categores } from './constants'

interface FilteredTagsProps {
  dispatch: Dispatch<any>
  stakingState: {
    filter: Filter
  }
}

enum ListModalType {
  chains = 0,
  category = 1,
}

type ListModalTypeInterface = keyof typeof ListModalType

export const FilteredTags: FC<FilteredTagsProps> = ({ dispatch, stakingState }) => {
  const { getChains } = useContext(DataContext)
  const [isLisModalOpened, setIsListModalOpened] = useState(false)
  const [listModalType, setListModalType] = useState<ListModalTypeInterface>(ListModalType.chains)
  const [isApyModalVisible, setIsApyModalVisible] = useState(false)
  const { filter } = stakingState
  const { all, my_holdings, compound, chains } = filter

  function handleSelectChains(item) {
    let value = []
    if (chains.includes(item)) {
      value = chains.filter((chain) => chain !== item)
    } else {
      value = [...chains, ...[item]]
    }
    dispatch({ type: 'SET_FILTER', payload: { filter: 'chains', value } })
  }

  function handleSelectCategory(item) {
    let value = []
    if (filter.category.includes(item)) {
      value = filter.category.filter((category) => category !== item)
    } else {
      value = [...filter.category, ...[item]]
    }
    dispatch({ type: 'SET_FILTER', payload: { filter: 'category', value } })
  }

  function handleTagClick(filterKey, value) {
    if (filterKey === 'all') return resetFilter(dispatch)
    dispatch({ type: 'SET_FILTER', payload: { filter: filterKey, value } })
  }

  function handleChainsTagClick() {
    setListModalType(ListModalType.chains)
    setIsListModalOpened(true)
  }

  function handleCategoryTagClick() {
    setListModalType(ListModalType.category)
    setIsListModalOpened(true)
  }

  const getCategores = () => categores

  return (
    <div className={classNames.container}>
      <Button size="sm" variant={getAllTagStyle(filter)} onClick={() => handleTagClick('all', !all)}>
        All
      </Button>
      <Button size="sm" variant={getSelectedStyle(my_holdings)} onClick={() => handleTagClick('my_holdings', !my_holdings)}>
        My holdings
      </Button>
      <Button
        size="sm"
        variant={getChainTitle(chains) === 'All' ? 'subtle' : 'primary'}
        rightIcon={<IconChevronDown size={13} color={colors.text.secondary} />}
        onClick={handleChainsTagClick}
      >
        {`Chains: ${getChainTitle(chains)}`}
      </Button>
      <Button size="sm" variant={getSelectedStyle(compound)} onClick={() => handleTagClick('compound', !compound)}>
        Compound
      </Button>
      <Button
        variant={getSelectedStyle(filter.apy)}
        size="sm"
        rightIcon={<IconChevronDown size={13} color={colors.text.secondary} />}
        onClick={() => setIsApyModalVisible(true)}
      >
        APY: {filter.apy ? `${filter.apy}%` : 'All'}
      </Button>
      <Button
        size="sm"
        variant={getCategoryTitle(filter) === 'All' ? 'subtle' : 'primary'}
        rightIcon={<IconChevronDown size={13} color={colors.text.secondary} />}
        onClick={handleCategoryTagClick}
      >
        {`Category: ${getCategoryTitle(filter)}`}
      </Button>
      <ListModal
        isOpen={isLisModalOpened}
        setIsOpen={setIsListModalOpened}
        getItems={listModalType === ListModalType.chains ? ({ offset, limit, search }) => getChains({ offset, limit, search }) : getCategores}
        title={listModalType === ListModalType.chains ? 'Select chain' : 'Select category'}
        RenderItem={listModalType === ListModalType.chains ? ListEntityButton : ListCategoryButton}
        selectedItems={listModalType === ListModalType.chains ? chains : filter.category}
        onSelect={listModalType === ListModalType.chains ? handleSelectChains : handleSelectCategory}
        isSearchable={listModalType === ListModalType.chains}
      />
      <ApyModal isOpen={isApyModalVisible} onClose={() => setIsApyModalVisible(false)} stakingState={stakingState} dispatch={dispatch} />
    </div>
  )
}
