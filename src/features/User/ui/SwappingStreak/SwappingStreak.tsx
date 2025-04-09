import { TooltipWrapper } from '@/components/layout/WithTooltip/TooltipWrapper'
import cls from './SwappingStreak.module.pcss'
import { InfoIcon } from '../../../../assets/icons/InfoIcon'
import { StreakTooltip } from '@/components/rewards/StreaksCard/StreakTooltip/StreakTooltip'
import { getCountMonthText, TUserResponse, useUserVolume } from '@/entities/User'
import { Button, Tag } from '@concero/ui-kit'
import { Separator } from '@/components/layout/Separator/Separator'
import { CircleBar } from '@/shared/ui/CircleBar/CircleBar'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import clsx from 'clsx'
import { ProgressStepper } from '@/shared/ui/ProgressStepper/ProgressStepper'
const swapDescription = 'Perform swaps of at least $50 every day to get a multiplier. '
const tooltipTitle = 'Daily Swapping Rewards'
dayjs.extend(utc)
type TProps = {
	className?: string
	user?: TUserResponse
}

const SWAP_VOLUME = 50
export const SwappingStreak = (props: TProps) => {
	const { className, user } = props

	const todayStart = dayjs().utc().startOf('day').valueOf()
	const todayEnd = dayjs().utc().endOf('day').valueOf()
	const { data: currentVolume } = useUserVolume({ address: user?.address, startDate: todayStart, endDate: todayEnd })
	const currentVolumePercent = Math.min(((currentVolume || 0) / SWAP_VOLUME) * 100, 100)
	const isNotEnough = (currentVolume || 0) < 50
	const nowLondon = dayjs().utc().valueOf()
	/**seconds */
	const timeLeft = (todayEnd - nowLondon) / 1000
	const oneHourInSecond = 60 * 60
	const threeHoursInSeconds = 3 * oneHourInSecond

	/** Adding one because the current streak has already occurred and is confirmed,
	 * but we need to display the new day that will be confirmed tonight. */
	const current_streak = (user?.streak?.dailySwap || 0) + 1
	const successSwap = currentVolume === SWAP_VOLUME
	const warningTime = isNotEnough && timeLeft > oneHourInSecond && timeLeft <= threeHoursInSeconds
	const dangerTime = isNotEnough && timeLeft < oneHourInSecond
	const countMonth = Math.ceil(current_streak / 28)
	const monthCounterText = getCountMonthText(countMonth)

	return (
		<div className={clsx(cls.swapping_streak_wrap, className)}>
			<div className={cls.title_wrap}>
				<span className={cls.title}>Daily Swapping Streak</span>
				<div className={cls.swap_tooltip}>
					<TooltipWrapper
						place={'bottom-start'}
						className={cls.tooltipWrap}
						tooltipId={tooltipTitle}
						tooltipContent={<StreakTooltip title={tooltipTitle} description={swapDescription} />}
					>
						<InfoIcon />
					</TooltipWrapper>
				</div>
			</div>
			<div className={cls.current_value_wrap}>
				<CircleBar
					progress={currentVolumePercent}
					variant={successSwap ? 'success' : dangerTime ? 'danger' : warningTime ? 'warning' : 'default'}
				>
					<div className={cls.circle_value_wrap}>
						{warningTime && (
							<Tag variant="warning" size="s">
								{Math.ceil(timeLeft / oneHourInSecond)}h. left
							</Tag>
						)}
						{dangerTime && (
							<Tag variant="negative" size="s">
								{Math.ceil(timeLeft / 60)}m. left
							</Tag>
						)}
						{successSwap && (
							<Tag variant="positive" size="s">
								Done
							</Tag>
						)}
						<div>
							<span className={cls.current_progress_text}>{currentVolume}$</span>
							<div className={cls.current_progress_text_from_wrap}>
								<span className={cls.separator}>/</span>
								<span className={cls.from_value}>$50</span>
							</div>
						</div>
					</div>
				</CircleBar>
			</div>
			<Separator />
			<div className={cls.streak_wrap}>
				<div className={cls.streak_head_wrap}>
					<div className={cls.title_counter_month}>{monthCounterText}</div>
					<div className={cls.reward_wrap}>
						<div className={cls.reward_text}>Reward</div>
						<Tag size="s" variant="neutral">
							{user?.multiplier?.dailySwap || 2}x
						</Tag>
					</div>
				</div>
				<div className={cls.progress_value_wrap}>
					<div className={cls.progress_days}>
						<span className={cls.current_days_number}>
							{current_streak % 7 == 0 ? Math.min(current_streak, 7) : current_streak % 7}&nbsp;
						</span>
						<span>&nbsp;/ 7 days</span>
					</div>
					<ProgressStepper
						currentProgress={current_streak % 7 == 0 ? Math.min(current_streak, 7) : current_streak % 7}
					/>
				</div>
			</div>
			<Button variant={warningTime || dangerTime ? 'primary' : 'secondary_color'} size="m">
				Swap
			</Button>
		</div>
	)
}
