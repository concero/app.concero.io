import { useContext, useEffect, useRef } from 'react'
import { Modal } from '../../../modals/Modal/Modal'
import { StakingState } from '../../../screens/StakingScreen/stakingReducer/types'
import classNames from './ManageModal.module.pcss'
import { SelectArea } from './SelectArea/SelectArea'
import { useManageReducer } from './useManageReducer/useManageReducer'
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
import { SwapProgress } from '../../../layout/SwapProgress/SwapProgress'
import { clearRoute } from './clearRoute'

interface ManageModalProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	stakingState: StakingState
}

export function ManageModal({ isOpen, setIsOpen, stakingState }: ManageModalProps) {
	const { getChains, getTokens } = useContext<DataContextValue>(DataContext)
	const [manageState, manageDispatch] = useManageReducer(stakingState)
	const { modalType, swapType } = manageState
	const typingTimeoutRef = useRef(null)

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
		const [chains, tokens] = await Promise.all([getChains({}), getTokens({ chainId: stakingState.selectedVault?.chain_id as string, offset: 0, limit: 15 })])
		const chain = chains.find(chain => chain.id === stakingState.selectedVault?.chain_id)
		manageDispatch({ type: 'SET_FROM_SELECTION', chain, token: tokens[0] })
		manageDispatch({ type: 'SET_TO_SELECTION', payload: stakingState.selectedVault })
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
			const balanceAmount = stakingState?.selectedVault?.stakedAmount.toString() ?? null
			manageDispatch({ type: 'SET_BALANCE', payload: balanceAmount })
		}
	}, [manageState.from.chain.id, manageState.from.token.address, manageState.from.token.symbol])

	useEffect(() => {
		populateSelections()
	}, [stakingState.selectedVault?.address])

	return (
		<Modal title="Manage position" show={isOpen} setShow={handleOnClose}>
			<div className={classNames.container}>
				{modalType === ModalType.input ? (
					<div className={classNames.areaContainer}>
						<div className={classNames.row}>
							<Button size="sm" variant={swapType === SwapType.stake ? 'primary' : 'subtle'} onClick={setStakeType}>
								Stake
							</Button>
							<Button size="sm" variant={swapType === SwapType.withdraw ? 'primary' : 'subtle'} onClick={setWithdrawType} isDisabled={!stakingState.selectedVault?.stakedAmount}>
								Withdraw
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
					<SwapProgress swapState={manageState} handleGoBack={handleGoBack} />
				)}
			</div>
		</Modal>
	)
}
