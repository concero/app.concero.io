import { Modal } from '../Modal/Modal'
import { type UIEvent, useContext, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from './TokensModal.module.pcss'
import { TokensModalHeader } from './TokenModalHeader/TokensModalHeader'
import { TextInput } from '../../input/TextInput'
import { IconSearch } from '@tabler/icons-react'
import { colors } from '../../../constants/colors'
import type { Chain, Token } from '../../../api/concero/types'
import { DataContext } from '../../../hooks/DataContext/DataContext'
import { useAccount } from 'wagmi'
import { TokenListItem } from './TokenListItem/TokenListItem'
import { TokenSkeletonLoader } from './TokenSkeletonLoader/TokenSkeletonLoader'
import { useTokensModalReducer } from './useTokensModalReducer/useTokensModalReducer'
import { TokenModalActionType } from './useTokensModalReducer/types'
import { getBalanceTokens } from './handlers/getBalanceTokens'

interface TokensModalProps {
	isOpen: boolean
	onClose: () => void
}

export function TokensModal({ isOpen, onClose }: TokensModalProps) {
	const { t } = useTranslation()
	const { address } = useAccount()
	const { getTokens } = useContext(DataContext)
	const tokenContainerRef = useRef<HTMLDivElement>(null)
	const limit = 15
	const [tokensModalState, tokensModalDispatch] = useTokensModalReducer()
	const { selectedChain, tokens, isLoading, isBalanceLoading, offset } = tokensModalState

	const addTokens = async () => {
		const newTokens = await getTokens({ chainId: selectedChain?.id!, offset, limit })
		if (!newTokens.length) return
		tokensModalDispatch({ type: TokenModalActionType.UPSERT_TOKENS, tokens: newTokens })
	}

	const handleEndReached = async () => {
		if (!selectedChain) return
		const newOffset = offset + limit
		tokensModalDispatch({ type: TokenModalActionType.SET_OFFSET, offset: newOffset })
		void addTokens()
	}

	const handleScroll = (e: UIEvent<HTMLDivElement>) => {
		const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
		const heightToBottom = clientHeight - (scrollHeight - scrollTop)
		if (heightToBottom < 1 && heightToBottom > -1) {
			void handleEndReached()
		}
	}

	async function initialPopulateTokens() {
		tokensModalDispatch({ type: TokenModalActionType.SET_OFFSET, offset: 0 })
		tokensModalDispatch({ type: TokenModalActionType.SET_TOKENS, tokens: [] })
		tokensModalDispatch({ type: TokenModalActionType.SET_IS_LOADING, isLoading: true })

		if (selectedChain) {
			const resToken = await getTokens({ chainId: selectedChain.id, offset: 0, limit })
			if (resToken.length > 0) {
				tokensModalDispatch({ type: TokenModalActionType.SET_TOKENS, tokens: resToken })
			}
			tokensModalDispatch({ type: TokenModalActionType.SET_IS_LOADING, isLoading: false })
		}
		void getBalanceTokens(tokensModalDispatch, address, selectedChain)
	}

	const moveToTop = () => {
		if (tokenContainerRef.current) {
			tokenContainerRef.current.scrollTop = 0
		}
	}

	const handleSelectToken = (token: Token) => {}

	const handleSelectChain = (chain: Chain | null) => {
		tokensModalDispatch({ type: TokenModalActionType.SET_SELECTED_CHAIN, chain })
	}

	useEffect(() => {
		void initialPopulateTokens()
		moveToTop()
	}, [selectedChain?.id, address])

	return (
		<Modal show={isOpen} setShow={onClose} title={t('tokensModal.selectChainToken')}>
			<div className={classNames.container}>
				<TokensModalHeader selectedChain={selectedChain} setSelectedChain={handleSelectChain} />
				<TextInput
					placeholder={t('tokensModal.searchByTokenNameOrAddress')}
					icon={<IconSearch size={18} color={colors.text.secondary} />}
				/>
				<div className={classNames.tokenContainer} onScroll={handleScroll} ref={tokenContainerRef}>
					{!isLoading && tokens ? (
						tokens.map((token: Token, index: number) => {
							return (
								<TokenListItem
									key={token._id + index.toString()}
									token={token}
									isBalanceLoading={isBalanceLoading}
									onSelect={handleSelectToken}
								/>
							)
						})
					) : (
						<TokenSkeletonLoader count={9} />
					)}
				</div>
			</div>
		</Modal>
	)
}
