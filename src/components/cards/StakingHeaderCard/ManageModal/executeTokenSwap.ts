import { createWalletClient, custom } from 'viem'
import { providers } from 'ethers'

async function getSigner(requiredChainId, switchNetworkAsync) {
  if (switchNetworkAsync) await switchNetworkAsync(requiredChainId)
  const client0 = createWalletClient({
    transport: custom(window.ethereum),
  })

  const provider = new providers.Web3Provider(client0.transport, 'any')
  return provider.getSigner()
}

export async function executeTokenSwap({ manageStaking, switchNetworkAsync }) {
  try {
    // Step 2: Approve Wido for the Swap
    const { data: approveData, to: approveTo } = await approve({
      fromChainId,
      toChainId,
      fromToken,
      toToken,
      amount,
    })

    const signer = await getSigner(fromChainId, switchNetworkAsync)
    console.log('signer ', signer)

    const approveTx = await signer.sendTransaction({ data: approveData, to: approveTo })
    console.log(`Approve transaction sent: ${approveTx}`)
    await approveTx.wait()

    console.log(`Transaction executed: ${executeTx.hash}`)
  } catch (error) {
    console.error(`Error executing token swap: ${error.message}`)
  }
}
