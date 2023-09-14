export const getChainTitle = (chains) => {
  if (chains.length === 0) return 'All'
  if (chains.length === 1) return chains[0].name
  if (chains.length > 1) return chains.length
}

export const getSelectedStyle = (isSelected: boolean) => {
  return isSelected ? 'primary' : 'subtle'
}

export const getAllTagStyle = (filter) => {
  const { all, my_holdings, chains, compound, apy } = filter
  if (my_holdings || chains.length > 0 || compound || apy) return 'subtle'
  return 'primary'
}
