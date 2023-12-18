import { Dispatch, FC, useContext } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import classNames from './FilteredTags.module.pcss'
import { Button } from '../../../buttons/Button/Button'
import { EarnAction, EarnState, FilterCategory } from '../../../screens/EarnScreen/earnReducer/types'
import { ListModal } from '../../../modals/ListModal/ListModal'
import { ListEntityButton } from '../../../buttons/ListEntityButton/ListEntityButton'
import { getAllTagStyle, getCategoryTitle, getChainTitle, getSelectedStyle } from './styleHandlers'
import { resetFilter } from './resetFilter'
import { ApyModal } from './ApyModal/ApyModal'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
import { ListCategoryButton } from './ListCategoryButton/ListCategoryButton'
import { FilterDispatchType } from './contants'
import { useFilteredTagsReducer } from './useFilteredTagsReducer/useFilteredTagsReducer'
import { categories } from './constants'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'

interface FilteredTagsProps {
	earnDispatch: Dispatch<EarnAction>
	earnState: EarnState
}

export const FilteredTags: FC<FilteredTagsProps> = ({ earnDispatch, earnState }) => {
	const { getChains } = useContext(DataContext)
	const [filterState, filterDispatch] = useFilteredTagsReducer()
	const { t } = useTranslation()

	const { isChainsModalOpened, isCategoriesModalOpened, isApyModalOpened } = filterState
	const { filter, address } = earnState
	const { all, my_holdings, my_positions, chains } = filter

	function handleSelectChains(item) {
		let value = []
		if (chains.includes(item)) {
			value = chains.filter(chain => chain !== item)
		} else {
			value = [...chains, ...[item]]
		}
		earnDispatch({ type: 'SET_FILTER', payload: { filter: FilterCategory.chains, value } })
	}

	function handleSelectCategory(item: string) {
		let value = []
		if (filter.category.includes(item)) {
			value = filter.category.filter(category => category !== item)
		} else {
			value = [...filter.category, ...[item]]
		}
		earnDispatch({ type: 'SET_FILTER', payload: { filter: FilterCategory.category, value } })
	}

	function handleTagClick(filterKey: FilterCategory, value: boolean) {
		if (filterKey === FilterCategory.all) return resetFilter(earnDispatch)
		if (filterKey === FilterCategory.my_holdings || filterKey === FilterCategory.my_positions) {
			resetFilter(earnDispatch)
		}
		earnDispatch({ type: 'SET_FILTER', payload: { filter: filterKey, value } })
		trackEvent({ category: category.StakingScreen, action: action.FilterTagClicked, label: 'Staking filter tag clicked', data: { filterKey } })
	}

	function setIsChainsModalOpened(value: boolean) {
		filterDispatch({ type: FilterDispatchType.setIsChainsModalOpened, payload: value })
	}

	function setIsCategoryModalOpened(value: boolean) {
		filterDispatch({ type: FilterDispatchType.setIsCategoryModalOpened, payload: value })
	}

	function setIsApyModalVisible(value: boolean) {
		filterDispatch({ type: FilterDispatchType.setIsApyModalOpened, payload: value })
	}

	const getCategories = () => categories

	return (
		<div className={classNames.container}>
			<Button size="sm" variant={getAllTagStyle(filter)} onClick={() => handleTagClick(FilterCategory.all, !all)}>
				{t('stakingOpportunitiesCard.filterTag.all')}
			</Button>
			{/* <Button size="sm" variant={getSelectedStyle(my_holdings)} onClick={() => handleTagClick(FilterCategory.my_holdings, !my_holdings)} isDisabled={!address}> */}
			{/* 	My holdings */}
			{/* </Button> */}
			<Button size="sm" variant={getSelectedStyle(my_positions)} onClick={() => handleTagClick(FilterCategory.my_positions, !my_positions)} isDisabled={!address}>
				{t('stakingOpportunitiesCard.filterTag.myPositions')}
			</Button>
			<Button
				size="sm"
				variant={getChainTitle(chains) === 'All' ? 'subtle' : 'primary'}
				rightIcon={<IconChevronDown size={13} color={'var(--color-text-secondary)'} />}
				onClick={() => setIsChainsModalOpened(true)}
			>
				{`${t('stakingOpportunitiesCard.filterTag.chains')}: ${getChainTitle(chains)}`}
			</Button>
			<Button
				variant={getSelectedStyle(filter.apy)}
				size="sm"
				rightIcon={<IconChevronDown size={13} color={'var(--color-text-secondary)'} />}
				onClick={() => setIsApyModalVisible(true)}
			>
				APY: {filter.apy ? `${filter.apy}%` : t('stakingOpportunitiesCard.filterTag.all')}
			</Button>
			<Button
				size="sm"
				variant={getCategoryTitle(filter) === 'All' ? 'subtle' : 'primary'}
				rightIcon={<IconChevronDown size={13} color={'var(--color-text-secondary)'} />}
				onClick={() => setIsCategoryModalOpened(true)}
			>
				{`${t('stakingOpportunitiesCard.filterTag.category')}: ${getCategoryTitle(filter)}`}
			</Button>
			<ListModal
				isOpen={isChainsModalOpened}
				setIsOpen={setIsChainsModalOpened}
				getItems={getChains}
				title={'Select chain'}
				RenderItem={ListEntityButton}
				selectedItems={chains}
				onSelect={handleSelectChains}
				isSearchable={true}
			/>
			<ListModal
				isOpen={isCategoriesModalOpened}
				setIsOpen={setIsCategoryModalOpened}
				getItems={getCategories}
				title={'Select category'}
				RenderItem={ListCategoryButton}
				selectedItems={filter.category}
				onSelect={handleSelectCategory}
			/>
			<ApyModal isOpen={isApyModalOpened} onClose={() => setIsApyModalVisible(false)} earnState={earnState} earnDispatch={earnDispatch} />
		</div>
	)
}
