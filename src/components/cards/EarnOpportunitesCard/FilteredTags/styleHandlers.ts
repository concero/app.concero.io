export const getChainTitle = chains => {
	if (chains.length === 0) return 'All'
	if (chains.length === 1) return chains[0].name
	if (chains.length > 1) return chains.length
}

export function getSelectedStyle(isSelected: boolean) {
	return isSelected ? 'primary' : 'subtle'
}

export function getAllTagStyle(filter) {
	const { my_holdings, my_positions, chains, compound, apy } = filter
	if (my_holdings || my_positions || chains.length > 0 || compound || apy) return 'subtle'
	return 'primary'
}

export function getCategoryTitle(filter) {
	const { category } = filter
	if (!category.length) return 'All'
	if (category.length === 1) return category[0]
	return category.length
}
