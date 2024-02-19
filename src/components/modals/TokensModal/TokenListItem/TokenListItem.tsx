import classNames from './TokenListItem.module.pcss'
import { type Token } from '../../../../api/concero/types'
import { useEffect, useRef, useState } from 'react'
import { TokenAmount } from '../../../../utils/TokenAmount'
import { SkeletonLoader } from '../../../layout/SkeletonLoader/SkeletonLoader'
import { TokenIcon } from '../../../layout/TokenIcon/TokenIcon'
import { animated, useSpring } from '@react-spring/web'
import { numberToFormatString, truncate, truncateWallet } from '../../../../utils/formatting'
import { IconExternalLink } from '@tabler/icons-react'
import { easeQuadInOut } from 'd3-ease'
import { config } from '../../../../constants/config'

interface TokenListItemProps {
	token: Token
	isBalanceLoading: boolean
	onSelect: (token: Token) => void
	explorerURI: string
}

export function TokenListItem({ token, isBalanceLoading, onSelect, explorerURI }: TokenListItemProps) {
	const [isHovered, setIsHovered] = useState(false)
	const [addressContainerHeight, setAddressContainerHeight] = useState(0)
	const addressContainerRef = useRef<HTMLDivElement | null>(null)
	const tokenAmount = new TokenAmount(token.balance, token.decimals).rounded
	const tokenAddressAnimation = useSpring({
		y: isHovered ? -(addressContainerHeight - 19) : 0,
		config: { duration: 200, easing: easeQuadInOut },
		delay: 150,
	})

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
				<TokenIcon
					tokenLogoSrc={token.logoURI}
					chainLogoSrc={`${config.CONCERO_ASSETS_URI}/icons/chains/filled/${token.chain_id}.svg`}
				/>
				<div className={classNames.tokenTitleContainer}>
					<h4>{truncate(token.name, 20)}</h4>
					<div className={classNames.tokenAddressContainer} ref={addressContainerRef}>
						<animated.div style={tokenAddressAnimation}>
							<p className={'body1'}>{truncate(token.symbol, 20)}</p>
							<div className={classNames.tokenAddress}>
								<p className={'body1'}>{truncateWallet(token.address)}</p>
								<div className={classNames.linkButton}>
									<IconExternalLink
										size={12}
										color={'var(--color-text-secondary)'}
										onClick={event => {
											event.stopPropagation()
											window.open(`${explorerURI}/address/${token.address}`, '_blank')
										}}
									/>
								</div>
							</div>
						</animated.div>
					</div>
				</div>
			</div>
			<div className={classNames.tokenPriceContainer}>
				{isBalanceLoading ? (
					<SkeletonLoader className={classNames.balanceSkeleton} />
				) : token.balance ? (
					<>
						<h4>{tokenAmount}</h4>
						{token.priceUsd && token.priceUsd > 0 ? (
							<p className={'body1'}>
								{'$' + numberToFormatString(token.priceUsd * Number(tokenAmount), 2, true)}{' '}
							</p>
						) : null}
					</>
				) : null}
			</div>
		</div>
	)
}
