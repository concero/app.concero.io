import cls from './StepActions.module.pcss'
import { ProgressBar } from '@/components/layout/progressBar/ProgressBar'
import { TQuest, TQuestStep } from '@/entities/Quest'
import { TQuestActions } from '@/entities/Quest'
import {
	getIsStartedQuest,
	useDiscordConnection,
	useTwitterConnection,
	useUserByAddress,
	useUserVolume,
} from '@/entities/User'
import { useAccount } from 'wagmi'
import { getDayRangeDates, getWeekRangeDates } from '@/utils/date/getRangeDates'
import { config } from '@/constants/config'
import { Button } from '@concero/ui-kit'
import { useState } from 'react'
import { useVerifyQuest } from '../../model/hooks/useVerifyQuest'

export type TStepActionProps = {
	quest: TQuest
	step: TQuestStep
	setErrorText?: (text: string) => void
}
const StepActions: Record<TQuestActions, (props: TStepActionProps) => JSX.Element> = {
	ConnectSocialNetwork: function (props: TStepActionProps): JSX.Element {
		const { step, quest, setErrorText } = props
		const { handleVerify, isPendingAddStep, isPendingVerify } = useVerifyQuest()
		const { address } = useAccount()
		const { data } = useUserByAddress(address)
		const { isConnected: discordIsConnected, toggleDiscordConnection } = useDiscordConnection({ user: data })
		const { isConnected: twitterIsConnected, toggleTwitterConnection } = useTwitterConnection({ user: data })
		const isSingleStep = quest.steps.length == 1
		const handleClick = () => {
			if (step.source == 'DISCORD' && discordIsConnected) {
				toggleDiscordConnection()
			} else if (step.source == 'TWITTER' && twitterIsConnected) {
				toggleTwitterConnection()
			}
		}
		return (
			<>
				<div className={cls.controls}>
					<Button variant={isSingleStep ? 'primary' : 'secondary_color'} onClick={handleClick} size="l">
						Connect
					</Button>
					<Button
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
	ConnectGroup: function (props: TStepActionProps): JSX.Element {
		return <></>
	},
	Repost: function (props: TStepActionProps): JSX.Element {
		return <></>
	},
	CheckVolume: function (props: TStepActionProps): JSX.Element {
		const { step, quest, setErrorText } = props
		const { address } = useAccount()
		const { data: user } = useUserByAddress(address)
		const isDailyQuest = quest.type === 'Daily'
		const isWeeklyQuest = quest.type === 'Primary' || quest.type === 'Secondary'
		const isSingleStep = quest.steps.length == 1
		const { handleVerify, isPendingAddStep, isPendingVerify } = useVerifyQuest()

		let startDate = quest.startDate
		let endDate = quest.endDate

		if (isDailyQuest) {
			const dates = getDayRangeDates()
			startDate = dates.startDate
			endDate = dates.endDate
		} else if (isWeeklyQuest) {
			const dates = getWeekRangeDates()
			startDate = dates.startDate
			endDate = dates.endDate
		}
		const { data: volume } = useUserVolume({
			address: user?.address,
			startDate,
			endDate,
			isCrossChain: step.options?.isCrossChain,
			chainIds: step.options?.chainId,
		})
		const handleSwap = () => {
			window.open(config.lancanURL, '_blank')
		}
		return (
			<>
				<ProgressBar
					type="float"
					currentValue={volume ?? Number(0)}
					maxValue={Number(step.options?.value)}
					minValue={0}
				/>
				<div className={cls.controls}>
					<Button variant={isSingleStep ? 'primary' : 'secondary_color'} onClick={handleSwap} size="l">
						Swap
					</Button>
					<Button
						variant={'tetrary_color'}
						onClick={() => handleVerify({ quest, setErrorText, step })}
						isLoading={isPendingVerify || isPendingAddStep}
						size="l"
					>
						Verify
					</Button>
				</div>
			</>
		)
	},
	ProvideLiquidity: function (props: TStepActionProps): JSX.Element {
		return <></>
	},
	LikeTweet: function (props: TStepActionProps): JSX.Element {
		const { step, quest, setErrorText } = props
		const { handleVerify, isPendingAddStep, isPendingVerify } = useVerifyQuest()
		const [isOpenedLink, setIsOpenedLink] = useState(false)
		const isSingleStep = quest.steps.length == 1
		const handleLink = () => {
			window.open(step.options?.link, '_blank')
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
	ProvideFeedback: function (props: TStepActionProps): JSX.Element {
		const { step, quest, setErrorText } = props
		const { address } = useAccount()
		const { data: user } = useUserByAddress(address)
		const isSingleStep = quest.steps.length == 1
		const isStartedQuest = user ? getIsStartedQuest(quest._id, user) : false
		const [isOpenedLink, setIsOpenedLink] = useState(isStartedQuest)
		const { handleVerify, isPendingAddStep, isPendingVerify } = useVerifyQuest()

		const handleLink = () => {
			window.open(step.options?.link, '_blank')
			setIsOpenedLink(true)
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
	RateExperience: function (props: TStepActionProps): JSX.Element {
		return <></>
	},
}

export { StepActions }
