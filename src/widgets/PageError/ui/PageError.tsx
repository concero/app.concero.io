import clsx from 'clsx'
import cls from './PageError.module.pcss'
import { useTranslation } from 'react-i18next'
import { Button } from '@concero/ui-kit'

interface PageErrorProps {
	className?: string
}

export const PageError = ({ className = '' }: PageErrorProps): JSX.Element => {
	const reloadPage = (): void => {
		location.reload()
	}

	return (
		<div className={clsx(cls.page_error ?? '', {}, [className])}>
			<h4>Error on page</h4>
			<Button variant="secondary" onClick={reloadPage}>
				Reload page
			</Button>
		</div>
	)
}
