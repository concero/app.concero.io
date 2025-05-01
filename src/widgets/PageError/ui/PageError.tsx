import clsx from 'clsx'
import cls from './PageError.module.pcss'
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
			<h4>Sorry, we are already fixing this issue </h4>
			<a target="_blank" rel="noreferrer" href="https://concero.io/">
				<Button variant="secondary_color" size="m">
					Main Page
				</Button>
			</a>
			<Button variant="tetrary" onClick={reloadPage}>
				Reload page
			</Button>
		</div>
	)
}
