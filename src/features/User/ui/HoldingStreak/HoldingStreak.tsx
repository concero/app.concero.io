import clsx from 'clsx'
import { Button, Tag } from '@concero/ui-kit'
import { getCountStreakPeriodText, TUserResponse, useGetUserLPBalance } from '@/entities/User'
import { TooltipWrapper } from '@/components/layout/WithTooltip/TooltipWrapper'
import { StreakTooltip } from '@/components/rewards/StreaksCard/StreakTooltip/StreakTooltip'
import { InfoIcon } from '../../../../assets/icons/InfoIcon'
import TrophyIcon from '@/shared/assets/icons/monochrome/Trophy.svg?react'
import WarningIcon from '@/shared/assets/icons/monochrome/warning.svg?react'
import LpHoldingStreak from '@/shared/assets/images/streaks/holding_placeholder.png'
import cls from './HoldingStreak.module.pcss'
import { Stepper } from '@/shared/ui/Stepper/Stepper'
import { Address } from 'viem'
import { streak_config } from '../../../../entities/User/config/streak'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery'

type TProps = {
	className?: string
	user: TUserResponse | null
}
const lpDescription = 'Hold a minimum of 100$ for one month to get your CERs multiplier reward!'
const tooltipTitle = 'LP holding Rewards'

export const HoldingStreak = (props: TProps) => {
	const { className, user } = props
	const isDesktop = useMediaQuery('desktop')
	/** Adding one because the current streak has already occurred and is confirmed,
	 * but we need to display the new day that will be confirmed tonight. */
	const currentStreak = user?.streak.liquidityHold ? user?.streak.liquidityHold + 1 : 0
	const lpBalance = useGetUserLPBalance(user?.address as Address)

	const showDefaultTip =
		(user && lpBalance.balance === null) || lpBalance.balance === 0 || (lpBalance.balance || 0) > 100
	const showDanger = user && lpBalance.balance ? lpBalance.balance > 0 && lpBalance.balance < 100 : false
	const showWithoutUserTip = !user

	const currentPeriodStreak = currentStreak <= 7 ? streak_config.ONE_WEEK : streak_config.ONE_MONTH
	const monthCounterText = getCountStreakPeriodText(currentStreak)

	return (
		<div className={clsx(cls.lp_main_wrap, className)}>
			<div className={cls.head_wrap}>
				<div className={cls.title}>LP Holding Streak</div>
				<div className={cls.swap_tooltip}>
					<TooltipWrapper
						place={'bottom-start'}
						className={cls.tooltipWrap}
						tooltipId={tooltipTitle}
						tooltipContent={<StreakTooltip title={'Liquidity'} description={lpDescription} />}
					>
						<InfoIcon />
					</TooltipWrapper>
				</div>
			</div>
			{user ? (
				<div className={cls.wrap_with_days}>
					<div className={cls.streak_head_wrap}>
						<div className={cls.title_counter_month}>{monthCounterText}</div>
						<div className={cls.reward_wrap}>
							<div className={cls.reward_text}>Reward</div>
							<Tag size="s" variant="neutral">
								{user?.multiplier?.liquidityHold || 2}x
							</Tag>
						</div>
					</div>
					<div className={cls.streak_progress_wrap}>
						<div className={cls.progress_days}>
							<span className={cls.current_days_number}>
								{currentStreak < 7
									? currentStreak % currentPeriodStreak
									: currentStreak === 7
										? currentStreak
										: (currentStreak - 7) % currentPeriodStreak}
							</span>
							<span>
								<span className={cls.slash}>&nbsp;/&nbsp;</span>
								{currentPeriodStreak} days
							</span>
						</div>
						<div
							className={clsx(cls.progress_grid_days, {
								[cls.progress_grid_days_one_line]: currentStreak <= streak_config.ONE_WEEK,
							})}
						>
							{user ? (
								<Stepper
									currentProgress={
										currentStreak < 7
											? currentStreak % currentPeriodStreak
											: currentStreak === 7
												? currentStreak
												: (currentStreak - 7) % currentPeriodStreak
									}
									max={currentPeriodStreak}
									dangerCells={
										showDanger
											? [
													currentStreak % currentPeriodStreak == 0
														? Math.min(currentStreak, currentPeriodStreak)
														: currentStreak % currentPeriodStreak,
												]
											: []
									}
								/>
							) : (
								<img
									width={'100%'}
									height={'100%'}
									src={LpHoldingStreak}
									loading="lazy"
									alt="Quest image"
								/>
							)}
						</div>
					</div>
				</div>
			) : (
				<div className={cls.placeholder_image_wrap}>
					<img width={'100%'} height={'100%'} src={LpHoldingStreak} loading="lazy" alt="Quest image" />
				</div>
			)}

			<div className={cls.wrap_support_text}>
				{showDefaultTip && (
					<>
						<TrophyIcon className={cls.trophy_icon} />
						<div className={cls.wrap_text}>
							<span className={cls.hold_text}>Hold a minimum of 100$</span>
							<span className={cls.text}> for one month to get your</span>
							<span className={cls.text_cers}> 2x CERs multiplier!</span>
						</div>
					</>
				)}
				{showDanger && (
					<>
						<WarningIcon className={cls.warning_icon} />
						<div className={cls.wrap_text}>
							<span className={cls.balance_text}>Last chance to save your streak</span>
							<span className={cls.hold_text_warning}>, top up your balance to stay on track</span>
						</div>
					</>
				)}
				{showWithoutUserTip && (
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
			<Button className={cls.provide_btn} variant={!user ? 'primary' : 'secondary'} size={isDesktop ? 'm' : 'l'}>
				Provide Liquidity
			</Button>
		</div>
	)
}
