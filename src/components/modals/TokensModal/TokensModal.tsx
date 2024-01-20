import { Modal } from '../Modal/Modal'
import { type UIEvent, useContext, useEffect, useRef, useState } from 'react'
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
import { fetchTokensByBalances } from '../../../api/concero/fetchTokensByBalances'
import { TokenSkeletonLoader } from './TokenSkeletonLoader/TokenSkeletonLoader'

interface TokensModalProps {
	isOpen: boolean
	onClose: () => void
}

export function TokensModal({ isOpen, onClose }: TokensModalProps) {
	const { t } = useTranslation()
	const { address } = useAccount()
	const { getTokens } = useContext(DataContext)
	const [selectedChain, setSelectedChain] = useState<Chain | null>(null)
	const [offset, setOffset] = useState<number>(0)
	const [tokens, setTokens] = useState<Token[]>([])
	const [balanceTokens, setBalanceTokens] = useState<Token[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isBalanceLoading, setIsBalanceLoading] = useState<boolean>(false)
	const tokenContainerRef = useRef<HTMLDivElement>(null)
	const limit = 15

	const getBalanceTokens = async () => {
		if (!address) return
		setIsBalanceLoading(true)

		if (!selectedChain) {
			setIsLoading(true)
		}

		const res = await fetchTokensByBalances(selectedChain?.id, address)
		if (!res) return
		if (selectedChain) {
			setBalanceTokens(res[selectedChain.id])
			setTokens(prevTokens => {
				const filteredTokens = prevTokens.filter(token => {
					return !res[selectedChain.id].find(t => t._id === token._id)
				})
				return [...res[selectedChain.id], ...filteredTokens]
			})
		} else {
			// if al chains are selected
			const tokensToPaste: Token[] = []
			for (const key in res) {
				tokensToPaste.push(...res[key])
			}
			setBalanceTokens(tokensToPaste)
			setTokens(tokensToPaste)
			setIsLoading(false)
		}
		setIsBalanceLoading(false)
	}

	const addTokens = async () => {
		const newTokens = await getTokens({ chainId: selectedChain?.id!, offset, limit })
		const filteredTokens = newTokens.filter((token: Token) => {
			return !balanceTokens.find(t => t._id === token._id)
		})
		setTokens(prevTokens => [...prevTokens, ...filteredTokens])
	}

	const handleEndReached = async () => {
		if (!selectedChain) return
		const newOffset = offset + limit
		setOffset(newOffset)
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
		setOffset(0)
		if (selectedChain) {
			setIsLoading(true)
			const resToken = await getTokens({ chainId: selectedChain.id, offset: 0, limit })
			if (!resToken.length) {
				setTokens([])
			} else {
				setTokens(resToken)
			}
			setIsLoading(false)
		} else {
			setTokens([])
		}
		void getBalanceTokens()
	}

	const moveToTop = () => {
		if (tokenContainerRef.current) {
			tokenContainerRef.current.scrollTop = 0
		}
	}

	useEffect(() => {
		void initialPopulateTokens()
		moveToTop()
	}, [selectedChain?.id, address])

	return (
		<Modal show={isOpen} setShow={onClose} title={t('tokensModal.selectChainToken')}>
			<div className={classNames.container}>
				<TokensModalHeader selectedChain={selectedChain} setSelectedChain={setSelectedChain} />
				<TextInput
					placeholder={t('tokensModal.searchByTokenNameOrAddress')}
					icon={<IconSearch size={18} color={colors.text.secondary} />}
				/>
				<div className={classNames.tokenContainer} onScroll={handleScroll} ref={tokenContainerRef}>
					{!isLoading ? (
						tokens.map((token: Token, index: number) => {
							return <TokenListItem key={token._id + index.toString()} token={token} isBalanceLoading={isBalanceLoading} />
						})
					) : (
						<TokenSkeletonLoader count={9} />
					)}
				</div>
			</div>
		</Modal>
	)
}
