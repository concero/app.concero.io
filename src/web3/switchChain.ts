import { ethers } from 'ethers'

export const switchChain = async (chainId: string) => {
  if (window.ethereum.chainId && chainId && parseInt(window.ethereum.chainId) !== parseInt(chainId)) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('wallet_switchEthereumChain', [
        {
          chainId: `0x${Number(chainId).toString(16)}`,
        },
      ])
    } catch (e) {
      console.log(e)
      return
    }
  }
}
