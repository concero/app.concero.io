import { type FC, type ReactNode, useContext } from 'react'
import classNames from './AppScreen.module.pcss'
import {
	FeatureFlagContext,
	FeatureFlagKeys,
	type FeatureFlags,
	FeatureFlagVariants,
} from '../../../hooks/FeatureFlagContext'

export interface AppScreenProps {
	children?: ReactNode
}

export const AppScreen: FC<AppScreenProps> = ({ children }) => {
	const featureFlags = useContext<FeatureFlags>(FeatureFlagContext)
	const isNewSwapScreenLayout = featureFlags[FeatureFlagKeys.newSwapScreenLayout] === FeatureFlagVariants.newSwapCard

	return (
		<div
			className={`${classNames.container} ${isNewSwapScreenLayout ? classNames.abTestNewSwapCardLayoutContainer : ''}`}
		>
			{children}
		</div>
	)
}
