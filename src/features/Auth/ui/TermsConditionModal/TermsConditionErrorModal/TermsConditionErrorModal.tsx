import { Modal } from '@/components/modals/Modal/Modal'
import WarningBoxIcon from '@/assets/icons/WarningBox.svg?react'
import cls from './TermsConditionErrorModal.module.pcss'
import { Button } from '@concero/ui-kit'
import clsx from 'clsx'

type TProps = {
	show: boolean
	setShow: (newShow: boolean) => void
	onTryAgain: () => void
	error?: string
}
export const TermsConditionErrorModal = (props: TProps): JSX.Element => {
	const { setShow, show, onTryAgain, error } = props
	return (
		<Modal
			className={cls.modal_block}
			setShow={setShow}
			show={show}
			title={<span className={cls.title}>Verification failed</span>}
		>
			<div className={`${cls.icon} ${cls.block}`}>
				<WarningBoxIcon />
			</div>
			<p className={clsx(cls.block, {}, [cls.description])}>Something went wrong, try again</p>
			<div className={clsx(cls.block, {}, [cls.condition])}>Error: {error}</div>
			<Button variant="primary" className={cls.block} isFull onClick={onTryAgain} size="l">
				Try again
			</Button>
		</Modal>
	)
}
