import { Modal } from '../Modal/Modal'
import { useTranslation } from 'react-i18next'
import classNames from './TokensModal.module.pcss'
import { TokensModalHeader } from './TokenModalHeader/TokensModalHeader'
import { TextInput } from '../../input/TextInput'
import { IconSearch } from '@tabler/icons-react'
import { colors } from '../../../constants/colors'
import { useContext, useEffect, useState } from 'react'
import type { Chain, Token } from '../../../api/concero/types'
import { DataContext } from '../../../hooks/DataContext/DataContext'
import { useAccount } from 'wagmi'

interface TokensModalProps {
	isOpen: boolean
	onClose: () => void
}

export function TokensModal({ isOpen, onClose }: TokensModalProps) {
	const { t } = useTranslation()
	const { address } = useAccount()
	const { getTokens } = useContext(DataContext)
	const [selectedChain, setSelectedChain] = useState<Chain | null>(null)
	const [tokens, setTokens] = useState<Token | null>(null)

	useEffect(() => {
		getTokens({ chainId: selectedChain?.id ?? '1', offset: 0, limit: 15, walletAddress: address }).then(res => {
			setTokens(res)
		})
	}, [selectedChain, address])

	return (
		<Modal show={isOpen} setShow={onClose} title={t('tokensModal.selectChainToken')}>
			<div className={classNames.container}>
				<TokensModalHeader selectedChain={selectedChain} setSelectedChain={setSelectedChain} />
				<TextInput
					placeholder={t('tokensModal.searchByTokenNameOrAddress')}
					icon={<IconSearch size={18} color={colors.text.secondary} />}
				/>
				<div></div>
			</div>
		</Modal>
	)
}
