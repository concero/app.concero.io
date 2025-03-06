// import './styles/App.css'
import '../../../styles/App.css'
import '../../../styles/index.css'
import '@concero/ui-kit/styles/concero/index.css'
import type { StoryFn } from '@storybook/react'
import cls from './StyleDecorator.module.pcss'

export const StyleDecorator = (Story: StoryFn): JSX.Element => {
	return (
		<div className={`${cls.wrap} light`}>
			<Story />
		</div>
	)
}
