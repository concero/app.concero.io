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

interface TokensModalProps {
	isOpen: boolean
	onClose: () => void
}

export function TokensModal({ isOpen, onClose }: TokensModalProps) {
	const { t } = useTranslation()
	const { address } = useAccount()
	const { getTokens } = useContext(DataContext)
	const [selectedChain, setSelectedChain] = useState<Chain | null>(null)
	const [offset, setOffset] = useState(0)
	const [tokens, setTokens] = useState<Token[]>([])
	const [balanceTokens, setBalanceTokens] = useState<Token[]>([])
	const tokenContainerRef = useRef<HTMLDivElement>(null)
	const limit = 15

	const getBalanceTokens = async () => {
		if (!address) return

		const res = await fetchTokensByBalances(selectedChain.id, address)
		if (!res) return

		setBalanceTokens(res[selectedChain.id])
		setTokens(prevTokens => {
			const filteredTokens = prevTokens.filter(token => {
				return !res[selectedChain.id].find(t => t._id === token._id)
			})
			return [...res[selectedChain.id], ...filteredTokens]
		})
	}

	const handleEndReached = async () => {
		const newOffset = offset + limit
		setOffset(newOffset)
		const newTokens = await getTokens({ chainId: selectedChain?.id, offset: newOffset, limit })
		const filteredTokens = newTokens.filter((token: Token) => {
			return !balanceTokens.find(t => t._id === token._id)
		})
		setTokens(prevTokens => [...prevTokens, ...filteredTokens])
	}

	const handleScroll = (e: UIEvent<HTMLDivElement>) => {
		const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
		const heightToBottom = clientHeight - (scrollHeight - scrollTop)
		if (heightToBottom < 2 && heightToBottom > -2) {
			void handleEndReached()
		}
	}

	async function initialPopulateTokens() {
		getTokens({ chainId: selectedChain?.id, offset: 0, limit }).then(res => {
			if (!res.length) {
				setTokens([])
			} else {
				setTokens(res)
			}
			void getBalanceTokens()
		})
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
					{tokens.map((token: Token) => {
						return <TokenListItem key={token._id} token={token} />
					})}
				</div>
			</div>
		</Modal>
	)
}
