import { FC, useEffect } from 'react'
import { approve, quote } from 'wido'
import { useSwitchNetwork } from 'wagmi'
import { createWalletClient, custom } from 'viem'
import { providers } from 'ethers'
import { useStakingReducer } from './stakingReducer/stakingReducer'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import classNames from './StakingScreen.module.pcss'
import { StakingOpportunitiesCard } from '../../cards/StakingOpportunitesCard/StakingOpportunitiesCard'
import { StakingHeaderCard } from '../../cards/StakingHeaderCard/StakingHeaderCard'
import { StakingChartCard } from '../../cards/StakingChartCard/StakingChartCard'
import { StakingHighlightsCard } from '../../cards/StakingHighlightsCard/StakingHighlightsCard'
import { TokensCard } from '../../cards/TokensCard/TokensCard'
import { RewardsCard } from '../../cards/RewardsCard/RewardsCard'
import { PredictionCard } from '../../cards/PredictionCard/PredictionCard'
import { RatioCard } from '../../cards/RatioCard/RatioCard'
import { DetailsCard } from '../../cards/DetailsCard/DetailsCard'
import { ProtocolCard } from '../../cards/ProtocolCard/ProtocolCard'
import { withErrorBoundary } from '../../wrappers/WithErrorBoundary'

export const StakingScreen: FC = () => {
  const [stakingState, dispatch] = useStakingReducer()
  const isDesktop = useMediaQuery('mobile') // Adjust this as per your specific media query needs
  const { switchNetworkAsync } = useSwitchNetwork()
  // const StakingOpportunities = withErrorBoundary(StakingOpportunitiesCard)
  const StakingHeader = withErrorBoundary(StakingHeaderCard)
  const StakingChart = withErrorBoundary(StakingChartCard)
  const StakingHighlights = withErrorBoundary(StakingHighlightsCard)
  const Tokens = withErrorBoundary(TokensCard)
  const Rewards = withErrorBoundary(RewardsCard)
  const Prediction = withErrorBoundary(PredictionCard)
  const Ratio = withErrorBoundary(RatioCard)
  const Details = withErrorBoundary(DetailsCard)
  const Protocol = withErrorBoundary(ProtocolCard)

  const getSigner = async (requiredChainId) => {
    if (switchNetworkAsync) await switchNetworkAsync(requiredChainId)
    const client0 = createWalletClient({
      transport: custom(window.ethereum),
    })

    const provider = new providers.Web3Provider(client0.transport, 'any')
    return provider.getSigner()
  }

  const executeTokenSwap = async (fromChainId, fromToken, toChainId, toToken, amount, slippagePercentage, user) => {
    try {
      // Step 1: Get a Quote
      const quoteParams = {
        fromChainId,
        fromToken,
        toChainId,
        toToken,
        amount,
        slippagePercentage,
        user,
      }

      const quoteResult = await quote(quoteParams)
      console.log(quoteResult)
      if (!quoteResult.isSupported) { throw new Error('Route not supported' }

      // Step 2: Approve Wido for the Swap
      const { data: approveData, to: approveTo } = await approve({
        fromChainId,
        toChainId,
        fromToken,
        toToken,
        amount,
      })

      const signer = await getSigner(fromChainId)
      console.log('signer ', signer)

      const approveTx = await signer.sendTransaction({ data: approveData, to: approveTo })
      console.log(`Approve transaction sent: ${approveTx}`)
      await approveTx.wait()

      console.log(`Transaction executed: ${executeTx.hash}`)
    } catch (error) {
      console.error(`Error executing token swap: ${error.message}`)
    }
  }

  // Usage
  const fromChainId = 1
  const fromToken = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
  const toChainId = 1
  const toToken = '0x21E27a5E5513D6e65C4f830167390997aA84843a'
  const amount = '1000000000'
  const slippagePercentage = 0.5
  const user = '0x70E73f067a1fC9FE6D53151bd271715811746d3a'

  useEffect(() => {
    executeTokenSwap(fromChainId, fromToken, toChainId, toToken, amount, slippagePercentage, user)
  }, [])

  const mobileLayout = (
    <div className={classNames.container}>
      <StakingOpportunitiesCard stakingState={stakingState} dispatch={dispatch} />
      {stakingState.selectedVault ? (
        <div className={classNames.mainCardStack}>
          <StakingChart stakingState={stakingState} />
          <StakingHighlights stakingState={stakingState} />
          <Ratio />
          <Details />
        </div>
      ) : null}
    </div>
  )

  const desktopLayout = (
    <div className={classNames.container}>
      <StakingOpportunitiesCard stakingState={stakingState} dispatch={dispatch} />
      {stakingState.selectedVault ? (
        <div className={classNames.stacksContainer}>
          <div className={classNames.mainCardStack}>
            <StakingHeader stakingState={stakingState} />
            <StakingChart stakingState={stakingState} />
          </div>
          <div className={`card ${classNames.secondaryCardStack}`}>
            <Protocol stakingState={stakingState} />
            <StakingHighlights stakingState={stakingState} />
            <Tokens stakingState={stakingState} />
            <Rewards stakingState={stakingState} />
            <Prediction stakingState={stakingState} />
          </div>
        </div>
      ) : null}
    </div>
  )

  return <div style={{ width: '100%', height: '100%' }}>{isDesktop ? desktopLayout : mobileLayout}</div>
}
