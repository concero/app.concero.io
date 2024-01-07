import { type FC } from 'react'
import { Modal } from '../../modals/Modal/Modal'
import { truncateWallet } from '../../../utils/formatting'
import classNames from './TransactionDetailsModal.module.pcss'

interface TransactionDetailsModalProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	data: any
}

export const TransactionDetailsModal: FC<TransactionDetailsModalProps> = ({ isOpen, setIsOpen, data }) => (
	<Modal show={isOpen} setShow={setIsOpen} title="Transaction details">
		<div className={classNames.container}>
			<div className={classNames.rowContainer}>
				<p className="body1">ID</p>
				<p className="body1">{data ? truncateWallet(data?.transaction?.hash) : ''}</p>
			</div>
			<div className={classNames.rowContainer}>
				<p className="body1">Block height</p>
				<p className="body1">{data?.block?.height}</p>
			</div>
			<div className={classNames.rowContainer}>
				<p className="body1">Exchange</p>
				<p className="body1">{data?.exchange?.fullName}</p>
			</div>
			<div className={classNames.rowContainer}>
				<p className="body1">Contract address</p>
				<p className="body1">{data ? truncateWallet(data.smartContract?.address.address) : ''}</p>
			</div>
		</div>
	</Modal>
)
