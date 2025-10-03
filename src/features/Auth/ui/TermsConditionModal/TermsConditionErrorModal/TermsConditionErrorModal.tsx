import { Modal } from '@/components/modals/Modal/Modal'
import WarningBoxIcon from '@/assets/icons/WarningBox.svg?react'
import cls from './TermsConditionErrorModal.module.pcss'
import { Button } from '@concero/ui-kit'
import clsx from 'clsx'

type TProps = {
	show: boolean
	setShow: (newShow: boolean) => void
	onTryAgain: () => void
	error?: unknown
}

const getErrorMessage = (error: unknown): string => {
	if (error instanceof Error) {
		return error.message
	}
	if (typeof error === 'string') {
		return error
	}
	if (error && typeof error === 'object') {
		// Например, axios error или { message: '...' }
		return (error as any).message || 'Unknown error'
	}
	return 'Unknown error'
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
			<div className={clsx(cls.block, {}, [cls.condition])}>
				{' '}
				Error: {error ? getErrorMessage(error) : 'No details'}
			</div>
			<Button variant="primary" className={cls.block} isFull onClick={onTryAgain} size="l">
				Try again
			</Button>
		</Modal>
	)
}
