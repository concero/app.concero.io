import { Button } from '@concero/ui-kit'
import cls from './RewardPageError.module.pcss'

export const RewardPageError = () => {
	const reloadPage = (): void => {
		location.reload()
	}

	return (
		<div className={cls.page_error}>
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
