import { Button } from '../../../../buttons/Button/Button'
import classNames from './QuestStep.module.pcss'
import { Tag } from '../../../../tags/Tag/Tag'

export const QuestStep = () => {
	const isDone = false

	if (isDone) {
		return (
			<div className={classNames.containerSuccessState}>
				<h4>Step heading</h4>
				<Tag size="md" variant="positive">
					Done!
				</Tag>
			</div>
		)
	}

	return (
		<div className={classNames.container}>
			<div className="gap-xs">
				<h4>Step heading</h4>
				<p className="body2">Step heading</p>
			</div>
			<div className="row">
				<Button size="sm" variant="secondaryColor">
					Primary action
				</Button>
				<Button size="sm" variant="tetrary">
					Secondary action
				</Button>
			</div>
		</div>
	)
}
