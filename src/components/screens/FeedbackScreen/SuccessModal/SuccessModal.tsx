import { useEffect } from 'react'
import classNames from './SuccessModal.module.pcss'

interface SuccessModalProps {
	show: boolean
	onClose: () => void
}

export function SuccessModal({ show, onClose }: SuccessModalProps) {
	useEffect(() => {
		if (show) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [show])

	if (!show) return null

	return (
		<div className={classNames.modalOverlay} onClick={onClose}>
			<div
				className={classNames.modalContent}
				onClick={e => {
					e.stopPropagation()
				}}
			>
				<h2 className={classNames.modalTitle}>Feedback successfully sent!</h2>
				<img className={classNames.modalImage} src="./success-image.png" alt="Success Image" />
				<p className={classNames.modalText}>Thank you!</p>
				<div className={classNames.divider}></div>
				<button className={classNames.modalButton} onClick={() => (window.location.href = '/rewards')}>
					Go to Main Page
				</button>
			</div>
		</div>
	)
}
