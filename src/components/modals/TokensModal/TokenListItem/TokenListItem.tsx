import classNames from './TokenListItem.module.pcss'
import { type Token } from '../../../../api/concero/types'
import { getChainLogoURIById } from '../../../cards/RouteCard/getChainLogoURIById'
import { useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
import { TokenAmount } from '../../../../utils/TokenAmount'
import { SkeletonLoader } from '../../../layout/SkeletonLoader/SkeletonLoader'
import { TokenIcon } from '../../../layout/TokenIcon/TokenIcon'
import { animated, useSpring } from '@react-spring/web'
import { truncateWallet } from '../../../../utils/formatting'
import { IconExternalLink } from '@tabler/icons-react'
import { easeQuadInOut } from 'd3-ease'

interface TokenListItemProps {
	token: Token
	isBalanceLoading: boolean
	onSelect: (token: Token) => void
	explorerURI: string
}

export function TokenListItem({ token, isBalanceLoading, onSelect, explorerURI }: TokenListItemProps) {
	const [chainLogoSrc, setChainLogoSrc] = useState('')
	const [isHovered, setIsHovered] = useState(false)
	const [addressContainerHeight, setAddressContainerHeight] = useState(0)
	const { getChains } = useContext(DataContext)
	const addressContainerRef = useRef<HTMLDivElement | null>(null)

	const tokenAddressAnimation = useSpring({
		y: isHovered ? -(addressContainerHeight - 19) : 0,
		config: { duration: 200, easing: easeQuadInOut },
	})

	useEffect(() => {
		getChainLogoURIById(Number(token.chain_id), getChains, setChainLogoSrc)
	}, [])

	useEffect(() => {
		setAddressContainerHeight(addressContainerRef.current?.scrollHeight || 0)
	}, [addressContainerRef.current])

	return (
		<div
			className={classNames.container}
			onClick={() => {
				onSelect(token)
			}}
			onMouseEnter={() => {
				setIsHovered(true)
			}}
			onMouseLeave={() => {
				setIsHovered(false)
			}}
		>
			<div className={classNames.tokenInfoContainer}>
				<TokenIcon tokenLogoSrc={token.logoURI} chainLogoSrc={chainLogoSrc} />
				<div className={classNames.tokenTitleContainer}>
					<h4>{token.name}</h4>
					<div className={classNames.tokenAddressContainer} ref={addressContainerRef}>
						<animated.div style={tokenAddressAnimation}>
							<p className={'body1'}>{token.symbol}</p>
							<div
								className={classNames.tokenAddress}
								onClick={event => {
									event.stopPropagation()
									window.open(`${explorerURI}/address/${token.address}`, '_blank')
								}}
							>
								<p className={'body1'}>{truncateWallet(token.address)}</p>
								<IconExternalLink size={12} color={'var(--color-text-secondary)'} />
							</div>
						</animated.div>
					</div>
				</div>
			</div>
			<div className={classNames.tokenPriceContainer}>
				{isBalanceLoading ? (
					<SkeletonLoader className={classNames.balanceSkeleton} />
				) : token.balance ? (
					<h4>{new TokenAmount(token.balance, token.decimals).rounded}</h4>
				) : null}
			</div>
		</div>
	)
}
