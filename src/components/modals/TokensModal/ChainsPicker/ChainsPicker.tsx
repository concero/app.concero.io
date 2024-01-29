import classNames from './ChainsPicker.module.pcss'
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
import { Button } from '../../../buttons/Button/Button'
import type { Chain } from '../../../../api/concero/types'
import { CryptoSymbol } from '../../../tags/CryptoSymbol/CryptoSymbol'
import { useTranslation } from 'react-i18next'
import { IconChevronDown } from '@tabler/icons-react'
import { animated, useSpring } from '@react-spring/web'
import { easeQuadInOut } from 'd3-ease'
import { colors } from '../../../../constants/colors'

interface ChainItemProps {
	chain: Chain
	isSelected: boolean
	onSelect: (param: Chain) => void
}

function ChainItem({ chain, isSelected, onSelect }: ChainItemProps) {
	return (
		<Button
			key={chain._id}
			variant={isSelected ? 'light' : 'black'}
			onClick={() => {
				onSelect(chain)
			}}
			className={classNames.chainButton}
		>
			<CryptoSymbol src={chain.logoURI} size={'md'} />
		</Button>
	)
}

interface TokensModalHeaderProps {
	selectedChain: Chain | null
	setSelectedChain: (param: Chain | null) => void
}

export function ChainsPicker({ selectedChain, setSelectedChain }: TokensModalHeaderProps) {
	const { t } = useTranslation()
	const { getChains } = useContext(DataContext)
	const [chains, setChains] = useState<Chain[]>([])
	const [isChainsCollapsed, setIsChainsCollapsed] = useState<boolean>(true)
	const [chainContainerHeight, setChainContainerHeight] = useState<number>(0)
	const chainsRef = useRef<HTMLDivElement | null>(null)

	const fistLineChains = chains.slice(0, 7)
	const restChains = chains.slice(4)

	const chainsBlockAnimation = useSpring({
		height: isChainsCollapsed ? 0 : chainContainerHeight,
		config: { duration: 200, easing: easeQuadInOut },
	})

	const chevronAnimation = useSpring({
		transform: isChainsCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
		config: { duration: 200, easing: easeQuadInOut },
	})

	useLayoutEffect(() => {
		setChainContainerHeight(chainsRef?.current?.offsetHeight ?? 0)
	}, [chainsRef?.current?.offsetHeight])

	useEffect(() => {
		getChains({ offset: 0, limit: 18 }).then((chains: Chain[]) => {
			setChains(chains)
		})
	}, [])

	return (
		<div className={classNames.container}>
			<div className={classNames.firsChainsLineContainer}>
				{fistLineChains.map((chain: Chain) => {
					const isSelected = selectedChain?._id === chain._id
					return <ChainItem key={chain._id} chain={chain} isSelected={isSelected} onSelect={setSelectedChain} />
				})}
				<Button
					variant={isChainsCollapsed ? 'convex' : 'light'}
					leftIcon={
						<animated.div style={chevronAnimation}>
							<IconChevronDown size={28} color={colors.text.secondary} />
						</animated.div>
					}
					size={'md'}
					onClick={() => {
						setIsChainsCollapsed(prev => !prev)
					}}
				/>
			</div>
			<animated.div style={chainsBlockAnimation} className={classNames.animeContainer}>
				<div className={classNames.chainsContainer} ref={chainsRef}>
					{restChains.map((chain: Chain) => {
						const isSelected = selectedChain?._id === chain._id
						return <ChainItem key={chain._id} chain={chain} isSelected={isSelected} onSelect={setSelectedChain} />
					})}
				</div>
			</animated.div>
		</div>
	)
}
