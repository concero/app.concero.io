import { Button } from '@/components/buttons/Button/Button'
import cls from './StepActions.module.pcss'
import { ProgressBar } from '@/components/layout/progressBar/ProgressBar'
import { TQuest, TQuestStep } from '@/entities/Quest'
import { TQuestActions } from '@/entities/Quest/model/types/schema'
import { useUserVolume } from '@/entities/User/api/userApi'

export type TStepActionProps = {
	step: TQuestStep
	setErrorText?: (text: string) => void
}
const StepActions: Record<TQuestActions, (props: TStepActionProps) => JSX.Element> = {
	ConnectSocialNetwork: function (props: TStepActionProps): JSX.Element {
		return <></>
	},
	ConnectGroup: function (props: TStepActionProps): JSX.Element {
		return <></>
	},
	Repost: function (props: TStepActionProps): JSX.Element {
		return <></>
	},
	CheckVolume: function (props: TStepActionProps): JSX.Element {
		const { step } = props
		const data = useUserVolume({})
		return (
			<>
				<ProgressBar
					type="float"
					currentValue={Number(0)}
					maxValue={Number(step.options?.value)}
					minValue={0}
				/>
				<div className={cls.controls}>
					<Button variant={'secondaryColor'}>Swap</Button>
					<Button variant={'tetraryColor'}>Verify</Button>
				</div>
			</>
		)
	},
	ProvideLiquidity: function (props: TStepActionProps): JSX.Element {
		return <></>
	},
}

export { StepActions }
