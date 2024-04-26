import { type FC, useContext , useEffect, useState } from 'react'
import classNames from './SwapButton.module.pcss'
import { Button } from '../Button/Button'
import { type SwapButtonProps } from './types'
import { buttonStyleClass, buttonText, ButtonType, iconComponent, isButtonDisabled } from './constants'
import { getButtonType } from './getButtonType'
import { useTranslation } from 'react-i18next'
import { IconGasStation } from '@tabler/icons-react'
import { useGasSufficiency } from './useGasSufficiency'
import { useWeb3Modal } from '@web3modal/react'
import { FeatureFlagContext, FeatureFlagKeys, type FeatureFlags } from '../../../hooks/FeatureFlagContext'
import { TestnetCheckButtons } from './TestnetCheckButtons/TestnetCheckButtons'
import { checkTestnetBalanceSufficiency } from './checkTestnetBalanceSufficiency'

export const SwapButton: FC<SwapButtonProps> = ({ swapState, isConnected, onClick, switchChainHook }) => {
	const { isLoading, isTestnet } = swapState
	const { isLoading: isFetchBalancesLoading, gasSufficiency } = useGasSufficiency(swapState)
	const [testnetBalances, setTestnetBalances] = useState<{
		linkBalanceSufficient: boolean
		bnmBalanceSufficient: boolean
	} | null>(null)
	const { open } = useWeb3Modal()
	const featureFlags = useContext<FeatureFlags>(FeatureFlagContext)
	const { t } = useTranslation()
	const buttonType = getButtonType(
		swapState,
		isConnected,
		gasSufficiency?.isInsufficient ?? false,
		isFetchBalancesLoading,
		featureFlags[FeatureFlagKeys.brighterConnectWalletButton] as boolean,
	)

	useEffect(() => {
		if (!isTestnet) return

		checkTestnetBalanceSufficiency(swapState)
			.then(result => {
				setTestnetBalances(result)
			})
			.catch(error => {
				console.error(error)
				setTestnetBalances({ linkBalanceSufficient: true, bnmBalanceSufficient: true })
			})
	}, [isTestnet, swapState.from.chain.id])

	return (
		<div className={classNames.container}>
			{isTestnet && (!testnetBalances?.bnmBalanceSufficient || !testnetBalances?.linkBalanceSufficient) ? (
				<TestnetCheckButtons
					swapState={swapState}
					testnetBalances={testnetBalances}
					switchChainHook={switchChainHook}
				/>
			) : (
				<>
					{buttonType === ButtonType.LOW_GAS && gasSufficiency ? (
						<div className={classNames.messageContainer}>
							<div className={classNames.titleContainer}>
								<IconGasStation size={17} color="var(--color-red-450)" />
								<p className={'body1'}>{t('button.lowGas')}</p>
							</div>
							<p className={'body1'}>
								{t('swapCard.message.lowGas', {
									amount: gasSufficiency.insufficientAmount,
									tokenSymbol: gasSufficiency.token?.symbol ?? '',
									chainName: gasSufficiency.chain?.name ?? '',
								})}
							</p>
						</div>
					) : (
						<Button
							size="lg"
							leftIcon={iconComponent[buttonType]}
							isDisabled={isButtonDisabled[buttonType]}
							isLoading={isLoading}
							onClick={buttonType === ButtonType.CONNECT_WALLET_BRIGHT ? open : onClick}
							className={`${classNames.swapButton} ${classNames[buttonStyleClass[buttonType]]}`}
						>
							{t(buttonText[buttonType])}
						</Button>
					)}
				</>
			)}
		</div>
	)
}
