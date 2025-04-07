import { TooltipWrapper } from '@/components/layout/WithTooltip/TooltipWrapper'
import cls from './SwappingStreak.module.pcss'
import { InfoIcon } from '../../../../assets/icons/InfoIcon'
import { StreakTooltip } from '@/components/rewards/StreaksCard/StreakTooltip/StreakTooltip'
import { TUserResponse } from '@/entities/User'
import { Button } from '@concero/ui-kit'
import { Separator } from '@/components/layout/Separator/Separator'
const swapDescription =
	'Perform swaps of at least $50 every day to get a multiplier. The longer your daily streak is the bigger multiplier you get.'
const tooltipTitle = 'LP Holdling Streak'

type TProps = {
	className?: string
	user?: TUserResponse
}
export const SwappingStreak = (props: TProps) => {
	return (
		<div className={cls.swapping_streak_wrap}>
			<div className={cls.title_wrap}>
				<span className={cls.title}>Daily Swapping Streak</span>
				<div className={cls.swap_tooltip}>
					<TooltipWrapper
						place={'bottom-start'}
						className={cls.tooltipWrap}
						tooltipId={tooltipTitle}
						tooltipContent={<StreakTooltip title={'Liquidity'} description={swapDescription} />}
					>
						<InfoIcon />
					</TooltipWrapper>
				</div>
			</div>
			<div className={cls.current_value_wrap}></div>
			<Separator />
			<div className={cls.progress_value_wrap}>
				<div className={cls.progress_days}>
					<span className={cls.current_days_number}>3&nbsp;</span>
					<span>&nbsp;/ 30 days</span>
				</div>
				<div className={cls.progress_grid_days}></div>
			</div>
			<Button variant="secondary_color" size="m">
				Swap
			</Button>
		</div>
	)
}
