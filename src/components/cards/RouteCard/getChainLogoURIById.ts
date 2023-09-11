export const getChainLogoURIById = async (id: number, getChains, setChainLogoURI): string | undefined => {
  const chains = await getChains()
  const result = chains.find((chain) => chain.id.toString() === id.toString())?.logoURI
  if (!result) return
  setChainLogoURI(result)
}
