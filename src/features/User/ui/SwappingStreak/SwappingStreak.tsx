import { TooltipWrapper } from '@/components/layout/WithTooltip/TooltipWrapper'
import cls from './SwappingStreak.module.pcss'
import { InfoIcon } from '../../../../assets/icons/InfoIcon'
import { StreakTooltip } from '@/components/rewards/StreaksCard/StreakTooltip/StreakTooltip'
import { getCountStreakPeriodText, TUserResponse, useUserVolume } from '@/entities/User'
import { Button, Tag } from '@concero/ui-kit'
import { Separator } from '@/components/layout/Separator/Separator'
import { CircleBar } from '@/shared/ui/CircleBar/CircleBar'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import clsx from 'clsx'

import StreakPlaceholder from '@/shared/assets/images/streaks/holding_placeholder.webp'
import { streak_config } from '../../../../entities/User/config/streak'
import { Stepper } from '@/shared/ui/Stepper/Stepper'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery'
import { ProgressBar } from '@/shared/ui/progressBar/ProgressBar'
import { getUserFutureMultiplier } from '../../model/lib/getUserStreakMultiplier'
const swapDescription = 'Perform swaps of at least $50 every day to get a multiplier. '
const tooltipTitle = 'Daily Swapping Rewards'
dayjs.extend(utc)
type TProps = {
	className?: string
	user: TUserResponse | null
}

const SWAP_VOLUME = 50
export const SwappingStreak = (props: TProps) => {
	const { className, user } = props
	const isDesktop = useMediaQuery('desktop')
	const todayStart = dayjs().utc().startOf('day').valueOf()
	const todayEnd = dayjs().utc().endOf('day').valueOf()
	const { data: currentVolume } = useUserVolume({ address: user?.address, startDate: todayStart, endDate: todayEnd })
	const formattedVolume = Math.floor(currentVolume || 0)
	const currentVolumePercent = Math.min(((formattedVolume || 0) / SWAP_VOLUME) * 100, 100)
	const isNotEnough = (formattedVolume || 0) < 50
	const nowLondon = dayjs().utc().valueOf()
	/**seconds */
	const timeLeft = (todayEnd - nowLondon) / 1000
	const oneHourInSecond = 60 * 60
	const threeHoursInSeconds = 3 * oneHourInSecond

	/** Adding one because the current streak has already occurred and is confirmed,
	 * but we need to display the new day that will be confirmed tonight. */
	const current_streak = user?.streak.dailySwap ? user?.streak.dailySwap + 1 : 0
	const successSwap = (formattedVolume || 0) >= SWAP_VOLUME
	const warningTime = isNotEnough && timeLeft > oneHourInSecond && timeLeft <= threeHoursInSeconds
	const dangerTime = isNotEnough && timeLeft < oneHourInSecond
	const monthCounterText = getCountStreakPeriodText(current_streak)
	const currentPeriodStreak = current_streak <= 7 ? streak_config.ONE_WEEK : streak_config.ONE_MONTH
	const currentProgressForStepper =
		current_streak < 7
			? current_streak % currentPeriodStreak || 1
			: current_streak === 7
				? current_streak
				: Math.min((current_streak - 7) % currentPeriodStreak || current_streak - 7, 30)

	const handleSwapClick = () => {
		window.open('https://app.lanca.io', '_blank')
	}
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
				{user ? (
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
								<span className={cls.current_progress_text}>{formattedVolume}$</span>
								<div className={cls.current_progress_text_from_wrap}>
									<span className={cls.separator}>/</span>
									<span className={cls.from_value}>$50</span>
								</div>
							</div>
						</div>
					</CircleBar>
				) : (
					<div className={cls.placeholder_image_wrap}>
						<img width={'100%'} height={'100%'} src={StreakPlaceholder} loading="lazy" alt="Quest image" />
					</div>
				)}
			</div>
			{user ? <Separator /> : null}
			<div className={cls.streak_wrap}>
				{user ? (
					<>
						<div className={cls.streak_head_wrap}>
							<div className={cls.title_counter_month}>{monthCounterText}</div>
							<div className={cls.reward_wrap}>
								<div className={cls.reward_text}>Reward</div>
								<Tag size="s" variant="neutral">
									{getUserFutureMultiplier(user.streak.dailySwap)}x
								</Tag>
							</div>
						</div>
						<div
							className={clsx(cls.progress_value_wrap, {
								[cls.week_stepper]: current_streak <= 7,
								[cls.month_line]: current_streak > 7,
							})}
						>
							<div className={cls.progress_days}>
								<span className={cls.current_days_number}>{currentProgressForStepper}&nbsp;</span>
								<span>
									<span className={cls.slash}>&nbsp;/&nbsp;</span>
									{current_streak <= 7 ? '7' : '30'} days
								</span>
							</div>
							{current_streak <= 7 ? (
								<Stepper
									currentProgress={currentProgressForStepper}
									max={streak_config.ONE_WEEK}
									warningCells={warningTime ? [currentProgressForStepper] : undefined}
									dangerCells={dangerTime ? [currentProgressForStepper] : undefined}
									successCells={successSwap ? [currentProgressForStepper] : undefined}
								/>
							) : (
								<ProgressBar
									currentValue={currentProgressForStepper}
									maxValue={30}
									symbol="days"
									type="big"
									status={
										warningTime
											? 'warning'
											: dangerTime
												? 'danger'
												: successSwap
													? 'success'
													: 'default'
									}
								/>
							)}
						</div>
					</>
				) : (
					<div className={cls.no_user_wrap_tip}>
						<Tag variant="branded" size="m">
							1.5x
						</Tag>

						<div className={cls.no_user_text_wrap}>
							<span className={cls.no_user_text}>Swap for one week to get your</span>
							<span className={cls.no_user_text_cers}>1,5x CERs multiplier!</span>
						</div>
					</div>
				)}
			</div>
			<Button
				variant={warningTime || dangerTime ? 'primary' : !user ? 'primary' : 'secondary_color'}
				size={isDesktop ? 'm' : 'l'}
				onClick={handleSwapClick}
			>
				Swap
			</Button>
		</div>
	)
}
