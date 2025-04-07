import clsx from 'clsx'
import { Button, Tag } from '@concero/ui-kit'
import { TUserResponse } from '@/entities/User'
import { TooltipWrapper } from '@/components/layout/WithTooltip/TooltipWrapper'
import { StreakTooltip } from '@/components/rewards/StreaksCard/StreakTooltip/StreakTooltip'
import { InfoIcon } from '../../../../assets/icons/InfoIcon'
import TrophyIcon from '@/shared/assets/icons/monochrome/Trophy.svg?react'
import LpHoldingStreak from '@/shared/assets/images/streaks/holding_placeholder.png'
import cls from './HoldingStreak.module.pcss'

type TProps = {
	className?: string
	user?: TUserResponse
}
const lpDescription =
	'Hold at least $100 worth of liquidity to get a multiplier. The longer you hold, the bigger multiplier you get.'
const tooltipTitle = 'LP Holdling Streak'
export const HoldingStreak = (props: TProps) => {
	const { className, user } = props

	return (
		<div className={clsx(cls.lp_main_wrap, className)}>
			<div className={cls.head_wrap}>
				<div className={cls.title}>LP Holdling Streak</div>
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
						<div className={cls.title_counter_month}>1st month</div>
						<div className={cls.reward_wrap}>
							<div className={cls.reward_text}>Reward</div>
							<Tag size="s" variant="neutral">
								2x
							</Tag>
						</div>
					</div>
					<div className={cls.streak_progress_wrap}>
						<div className={cls.progress_days}>
							<span className={cls.current_days_number}>3&nbsp;</span>
							<span>&nbsp;/ 30 days</span>
						</div>
						<div className={cls.progress_grid_days}>
							{user ? (
								<>USer</>
							) : (
								<img width={'100%'} src={LpHoldingStreak} loading="lazy" alt="Quest image" />
							)}
						</div>
					</div>
				</div>
			) : (
				<img width={'100%'} src={LpHoldingStreak} loading="lazy" alt="Quest image" />
			)}

			<div className={cls.wrap_support_text}>
				<TrophyIcon className={cls.trophy_icon} />
				<div className={cls.wrap_text}>
					<span className={cls.hold_text}>Hold a minimum of 100$</span>
					<span className={cls.text}> for one month to get your</span>
					<span className={cls.text_cers}>2x CERs multiplier!</span>
				</div>
			</div>
			<Button className={cls.provide_btn} variant="secondary" size="m">
				Provide Liquidity
			</Button>
		</div>
	)
}
