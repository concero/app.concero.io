import classNames from './TokensModalHeader.module.pcss'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
import { Button } from '../../../buttons/Button/Button'
import type { Chain } from '../../../../api/concero/types'
import { CryptoSymbol } from '../../../tags/CryptoSymbol/CryptoSymbol'
import { useTranslation } from 'react-i18next'
import { IconChevronDown } from '@tabler/icons-react'
import { animated, useSpring } from '@react-spring/web'
import { easeQuadInOut } from 'd3-ease'
import { colors } from '../../../../constants/colors'
import { useAccount } from 'wagmi'

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
		>
			<CryptoSymbol src={chain.logoURI} size={'md'} />
		</Button>
	)
}

interface TokensModalHeaderProps {
	selectedChain: Chain | null
	setSelectedChain: (param: Chain | null) => void
}

export function TokensModalHeader({ selectedChain, setSelectedChain }: TokensModalHeaderProps) {
	const { t } = useTranslation()
	const { address } = useAccount()
	const { getChains } = useContext(DataContext)
	const [chains, setChains] = useState<Chain[]>([])
	const [offset, setOffset] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(false)
	const [isChainsCollapsed, setIsChainsCollapsed] = useState<boolean>(true)

	const fistLineChains = chains.slice(0, 4)
	const restChains = chains.slice(4)

	const chainsBlockAnimation = useSpring({
		height: isChainsCollapsed ? 0 : 240,
		config: { duration: 200, easing: easeQuadInOut },
	})

	const chevronAnimation = useSpring({
		transform: isChainsCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
		config: { duration: 200, easing: easeQuadInOut },
	})

	useEffect(() => {
		setLoading(true)
		getChains({ offset, limit: 30 })
			.then(chains => {
				setChains(chains)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])

	return (
		<div className={classNames.container}>
			<div className={classNames.firsChainsLineContainer}>
				<Button
					variant={selectedChain ? 'convex' : 'light'}
					size={'lg'}
					onClick={() => {
						setSelectedChain(null)
					}}
				>
					{t('tokensModal.allChains')}
				</Button>
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
			<animated.div style={chainsBlockAnimation} className={classNames.chainsContainer}>
				{restChains.map((chain: Chain) => {
					const isSelected = selectedChain?._id === chain._id
					return <ChainItem key={chain._id} chain={chain} isSelected={isSelected} onSelect={setSelectedChain} />
				})}
			</animated.div>
		</div>
	)
}
