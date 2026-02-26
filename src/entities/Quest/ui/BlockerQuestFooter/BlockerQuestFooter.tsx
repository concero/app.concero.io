import { TQuest } from '../../model/types/response'
import { useUserByAddress } from '@/entities/User'
import { useAccount } from 'wagmi'
import { findXTask } from '../../model/lib/findXTask'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui'
import cls from './BlockerQuestFooter.module.scss'
import { TooltipWrapper } from '@/shared/ui/TooltipWrapper/TooltipWrapper'
import { InfoIcon } from '@/assets/icons/InfoIcon'

type TProps = {
	quest: TQuest
}

export const BlockerQuestFooter = (props: TProps) => {
	const { quest } = props
	const { address } = useAccount()
	const { data } = useUserByAddress(address)

	if (findXTask({ quest })) {
		return (
			<HStack gap="space_0_5" justify="between" max>
				<Text variant="body_medium">Connect X to unlock</Text>
				<TooltipWrapper
					place={'bottom-start'}
					className={cls.tooltipWrap}
					tooltipId={'BLOCKER OF QUEST FOR CONNECT X' + quest.id}
					tooltipContent={
						<Text variant="body_medium">
							To unlock this quest, go to your profile settings and connect your X account.
						</Text>
					}
				>
					<InfoIcon />
				</TooltipWrapper>
			</HStack>
		)
	}
	return <></>
}
