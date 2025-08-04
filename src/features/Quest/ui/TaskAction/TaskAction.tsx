import { TQuest, TTaskType } from '@/entities/Quest'
import { TQuestTask } from '@/entities/Quest'
import { Button } from '@concero/ui-kit'
import cls from './TaskAction.module.pcss'
import { useState } from 'react'
export type TTaskActionProps = {
	quest: TQuest
	task: TQuestTask
	setErrorText?: (text: string) => void
}

export const TaskActions: Record<TTaskType, (props: TTaskActionProps) => JSX.Element> = {
	like_x: function (props: TTaskActionProps): JSX.Element {
		const { quest, task, setErrorText } = props
		// const { handleVerify, isPendingAddStep, isPendingVerify } = useVerifyQuest()
		const [isOpenedLink, setIsOpenedLink] = useState(false)
		const isSingleStep = task.steps.length == 1
		const step = task.steps[0]
		const handleLink = () => {
			window.open(step.options, '_blank')
			setTimeout(() => {
				setIsOpenedLink(true)
			}, 3000)
		}
		return (
			<>
				<div className={cls.controls}>
					<Button variant={isSingleStep ? 'primary' : 'secondary_color'} onClick={handleLink} size="l">
						Open
					</Button>
					<Button
						isDisabled={!isOpenedLink}
						variant={isSingleStep ? 'secondary_color' : 'tetrary_color'}
						onClick={() => handleVerify({ quest, setErrorText, step })}
						size="l"
						isLoading={isPendingVerify || isPendingAddStep}
					>
						Verify
					</Button>
				</div>
			</>
		)
	},
	progress_line: function (props: TTaskActionProps): JSX.Element {
		return <span>progress_line</span>
	},
	connect_discord: function (props: TTaskActionProps): JSX.Element {
		return <span>progress_line</span>
	},
	connect_x: function (props: TTaskActionProps): JSX.Element {
		return <span>connect_x</span>
	},
	connect_email: function (props: TTaskActionProps): JSX.Element {
		return <span>connect_email</span>
	},
	input: function (props: TTaskActionProps): JSX.Element {
		return <span>input</span>
	},
	textarea: function (props: TTaskActionProps): JSX.Element {
		return <span>textarea</span>
	},
	rate: function (props: TTaskActionProps): JSX.Element {
		return <span>rate</span>
	},
	google_form: function (props: TTaskActionProps): JSX.Element {
		return <span>google_form</span>
	},
}
