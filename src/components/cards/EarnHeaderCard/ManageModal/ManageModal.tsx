import { useContext, useEffect, useRef } from 'react'
import { Modal } from '../../../modals/Modal/Modal'
import { EarnState } from '../../../screens/EarnScreen/earnReducer/types'
import classNames from './ManageModal.module.pcss'
import { SelectArea } from './SelectArea/SelectArea'
import { useEarnReducer } from './useEarnReducer/useEarnReducer'
import { ModalType, SwapType } from './constants'
import { InnerSelectModal } from './InnerSelectModal/InnerSelectModal'
import { ListEntityButton } from '../../../buttons/ListEntityButton/ListEntityButton'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
import { Button } from '../../../buttons/Button/Button'
import { Details } from './Details/Details'
import { StakeButton } from '../StakeButton/StakeButton'
import { getQuote } from './getQuote'
import { getBalance } from '../../../../utils/getBalance'
import { DataContextValue } from '../../../../hooks/DataContext/types'

import { clearRoute } from './clearRoute'
import { EarnTXProgress } from './EarnTXProgress/EarnTXProgress'
import { useTranslation } from 'react-i18next'

interface ManageModalProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	earnState: EarnState
}

export function ManageModal({ isOpen, setIsOpen, earnState }: ManageModalProps) {
	const { getChains, getTokens } = useContext<DataContextValue>(DataContext)
	const [manageState, manageDispatch] = useEarnReducer(earnState)
	const { modalType, swapType } = manageState
	const typingTimeoutRef = useRef(null)
	const { t } = useTranslation()

	async function handleSelectChain(item: any): Promise<void> {
		const direction = swapType === SwapType.stake ? 'from' : 'to'
		const tokens = await getTokens({ chainId: item.id, offset: 0, limit: 15 })
		manageDispatch({ type: 'SET_CHAIN', payload: item, tokens, direction })
		manageDispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.input })
	}

	function handleSelectToken(item: any): void {
		const direction = swapType === SwapType.stake ? 'from' : 'to'
		manageDispatch({ type: 'SET_TOKEN', payload: item, direction })
		manageDispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.input })
	}

	function handleOnClose(): void {
		if (manageState.modalType === ModalType.progress) {
			window.alert('Please wait for the transaction to complete')
			return
		}
		setIsOpen(false)
	}

	async function setWithdrawType(): Promise<void> {
		if (manageState.swapType === SwapType.withdraw) return
		manageDispatch({ type: 'SWITCH_TYPE' })
	}

	function setStakeType(): void {
		if (manageState.swapType === SwapType.stake) return
		manageDispatch({ type: 'SWITCH_TYPE' })
	}

	async function populateSelections(): Promise<void> {
		const [chains, tokens] = await Promise.all([getChains({}), getTokens({ chainId: earnState.selectedVault?.chain_id as string, offset: 0, limit: 15 })])
		const chain = chains.find(chain => chain.id === earnState.selectedVault?.chain_id)
		manageDispatch({ type: 'SET_FROM_SELECTION', chain, token: tokens[0] })
		manageDispatch({ type: 'SET_TO_SELECTION', payload: earnState.selectedVault })
		manageDispatch({ type: 'SET_STAKE_TYPE' })
	}

	function handleGoBack(): void {
		clearRoute(manageDispatch, typingTimeoutRef)
	}

	useEffect(() => {
		getQuote({ manageState, manageDispatch, typingTimeoutRef })
	}, [manageState.from.amount, manageState.from.chain.id, manageState.to.chain.id, manageState.from.token.address, manageState.to.token.address])

	useEffect(() => {
		if (swapType == SwapType.stake) {
			getBalance({ dispatch: manageDispatch, from: manageState.from, address: manageState.address })
		} else {
			const balanceAmount = earnState?.selectedVault?.stakedAmount.toString() ?? null
			manageDispatch({ type: 'SET_BALANCE', payload: balanceAmount })
		}
	}, [manageState.from.chain.id, manageState.from.token.address, manageState.from.token.symbol])

	useEffect(() => {
		populateSelections()
	}, [earnState.selectedVault?.address])

	return (
		<Modal title={t('manageModal.title')} show={isOpen} setShow={handleOnClose}>
			<div className={classNames.container}>
				{modalType === ModalType.input ? (
					<div className={classNames.areaContainer}>
						<div className={classNames.row}>
							<Button size="sm" variant={swapType === SwapType.stake ? 'primary' : 'subtle'} onClick={setStakeType}>
								{t('button.stake')}
							</Button>
							<Button size="sm" variant={swapType === SwapType.withdraw ? 'primary' : 'subtle'} onClick={setWithdrawType} isDisabled={!earnState.selectedVault?.stakedAmount}>
								{t('button.withdraw')}
							</Button>
						</div>
						<SelectArea selection={manageState.from} direction="from" dispatch={manageDispatch} swapType={swapType} balance={manageState.balance} />
						<SelectArea selection={manageState.to} direction="to" dispatch={manageDispatch} swapType={swapType} />
						<Details manageState={manageState} />
						<StakeButton manageState={manageState} manageDispatch={manageDispatch} />
					</div>
				) : modalType === ModalType.chains ? (
					<InnerSelectModal RenderItem={ListEntityButton} getItems={getChains} onSelect={handleSelectChain} />
				) : modalType === ModalType.tokens ? (
					<InnerSelectModal RenderItem={ListEntityButton} getItems={getTokens} onSelect={handleSelectToken} chainId={manageState.from.chain.id} />
				) : (
					<EarnTXProgress manageState={manageState} handleGoBack={handleGoBack} />
				)}
			</div>
		</Modal>
	)
}
