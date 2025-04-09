import clsx from 'clsx'
import { Button, Tag } from '@concero/ui-kit'
import { getCountMonthText, TUserResponse, useGetUserLPBalance } from '@/entities/User'
import { TooltipWrapper } from '@/components/layout/WithTooltip/TooltipWrapper'
import { StreakTooltip } from '@/components/rewards/StreaksCard/StreakTooltip/StreakTooltip'
import { InfoIcon } from '../../../../assets/icons/InfoIcon'
import TrophyIcon from '@/shared/assets/icons/monochrome/Trophy.svg?react'
import WarningIcon from '@/shared/assets/icons/monochrome/warning.svg?react'
import LpHoldingStreak from '@/shared/assets/images/streaks/holding_placeholder.png'
import cls from './HoldingStreak.module.pcss'
import { Stepper } from '@/shared/ui/Stepper/Stepper'
import { Address } from 'viem'

type TProps = {
	className?: string
	user?: TUserResponse
}
const lpDescription = 'Hold a minimum of 100$ for one month to get your CERs multiplier reward!'
const tooltipTitle = 'LP holding Rewards'

export const HoldingStreak = (props: TProps) => {
	const { className, user } = props
	const lpBalance = useGetUserLPBalance(user?.address as Address)

	const showDefaultTip = lpBalance.balance === null || lpBalance.balance === 0 || lpBalance.balance > 100
	const showWarningTip = lpBalance.balance ? lpBalance.balance > 0 && lpBalance.balance < 100 : false
	const countMonth = Math.ceil((user?.streak?.liquidityHold || 1) / 28)
	const monthCounterText = getCountMonthText(countMonth)
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
							<span className={cls.current_days_number}>{user.streak.liquidityHold % 28}&nbsp;</span>
							<span>&nbsp;/ 28 days</span>
						</div>
						<div className={cls.progress_grid_days}>
							{user ? (
								<Stepper currentProgress={user.streak.liquidityHold % 28} />
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
				{showDefaultTip && (
					<>
						<TrophyIcon className={cls.trophy_icon} />
						<div className={cls.wrap_text}>
							<span className={cls.hold_text}>Hold a minimum of 100$</span>
							<span className={cls.text}> for one month to get your</span>
							<span className={cls.text_cers}>2x CERs multiplier!</span>
						</div>
					</>
				)}
				{showWarningTip && (
					<>
						<WarningIcon className={cls.warning_icon} />
						<div className={cls.wrap_text}>
							<span className={cls.balance_text}>LP balance is below 100$.</span>
							<span className={cls.hold_text_warning}>Top up in 7 days to save your streak </span>
						</div>
					</>
				)}
			</div>
			<Button className={cls.provide_btn} variant="secondary" size="m">
				Provide Liquidity
			</Button>
		</div>
	)
}
