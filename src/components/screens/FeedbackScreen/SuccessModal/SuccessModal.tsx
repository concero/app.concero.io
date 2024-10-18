import { useEffect } from 'react'
import classNames from './SuccessModal.module.pcss'
import { Button } from '../Button/Button'

interface SuccessModalProps {
	show: boolean
	onClose: () => void
}

export function SuccessModal({ show, onClose }: SuccessModalProps) {
	// Закрытие модалки при нажатии на фон
	useEffect(() => {
		if (show) {
			document.body.style.overflow = 'hidden' // Отключаем скролл при открытой модалке
		} else {
			document.body.style.overflow = 'auto' // Включаем обратно скролл
		}
	}, [show])

	if (!show) return null

	return (
		<div className={classNames.modalOverlay} onClick={onClose}>
			<div className={classNames.modalContent} onClick={e => { e.stopPropagation(); }}>
				<h2 className={classNames.modalTitle}>Feedback successfully sent!</h2>
				<img
					className={classNames.modalImage}
					src="./success-image.png" // Путь к изображению
					alt="Success Image"
				/>
				<p className={classNames.modalText}>Thank you!</p>
				<div className={classNames.divider}></div>
				{/* <Button className={classNames.modalButton} onClick={() => (window.location.href = '/rewards')}> */}
				{/*	Go to Main Page */}
				{/* </Button> */}
				<button className={classNames.modalButton} onClick={() => (window.location.href = '/rewards')}>
					Go to Main Page
				</button>
			</div>
		</div>
	)
}
