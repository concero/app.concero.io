import classNames from './LancaAdd.module.pcss'
import { LancaIcon } from '../../../../../assets/icons/LancaIcon'
import { Button } from '../../../../buttons/Button/Button'

export const LancaAdd = () => {
	return (
		<div className={classNames.container}>
			<div className={classNames.wrapIcon}>
				<LancaIcon />
			</div>
			<div className={classNames.text}>
				<div className="gap-sm">
					<h5>Don't have USDC on Base?</h5>
					<p className="body2">Lanca will swap any token to USDC on Base in 30 seconds</p>
				</div>

				<a href="https://lanca.io" target="_blank" rel="noopener noreferrer">
					<Button size="sm" className={classNames.button}>
						Launch lanca
					</Button>
				</a>
			</div>
		</div>
	)
}
