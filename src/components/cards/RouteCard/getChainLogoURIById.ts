export const getChainLogoURIById = async (id: number, getChains, setChainLogoURI): undefined => {
  const chains = await getChains({ offset: 0, limit: 100 })
  const result = chains.find((chain) => chain.id.toString() === id.toString())?.logoURI
  if (!result) return
  setChainLogoURI(result)
}
