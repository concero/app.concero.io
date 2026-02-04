// import { Text } from '@/shared/ui'
// import { VStack, HStack } from '@/shared/ui/Stack'
// import { Stepper } from '@/shared/ui/Stepper/Stepper'
// import { TQuestBlocker } from '../../model/types/response'
// import cls from './BlockerQuestFooter.module.scss'
// import { getBlockerMessages } from '../../model/lib/blocker/getBlockerMessages'
// import { useEffect, useState } from 'react'
// import { blockerResolvers } from '@/features/Quest/model/libs/blockerResolvers'
// import { useUserByAddress } from '@/entities/User'
// import { useAccount } from 'wagmi'

// type TProps = {
// 	blocker: TQuestBlocker
// }

// export const BlockerQuestFooter = (props: TProps) => {
// 	const { blocker } = props
// 	const { address } = useAccount()
// 	const { data } = useUserByAddress(address)
// 	const [currentProgress, setCurentProgress] = useState(0)
// 	// const blockerMessages = getBlockerMessages(blocker)
// 	useEffect(() => {
// 		if (!address) {
// 			return
// 		}
// 		// const blockerKey = blockerMessages[0][0] as keyof TQuestBlocker
// 		// const getProgress = blockerResolvers[blockerKey]
// 		let result = null
// 		// switch (blockerKey) {
// 		// 	case 'swaps_min_count': {
// 		// 		getProgress({ address }).then(res => {
// 		// 			setCurentProgress(res.current)
// 		// 		}, console.error)
// 		// 	}
// 		// 	case 'swaps_max_count': {
// 		// 		getProgress({ address }).then(res => {
// 		// 			setCurentProgress(res.current)
// 		// 		}, console.error)
// 		// 	}
// 		// 	case 'swaps_min_volume': {
// 		// 		getProgress({ address }).then(res => {
// 		// 			setCurentProgress(res.current)
// 		// 		}, console.error)
// 		// 	}
// 		// 	case 'swaps_max_volume': {
// 		// 		getProgress({ address }).then(res => {
// 		// 			setCurentProgress(res.current)
// 		// 		}, console.error)
// 		// 	}
// 		// 	case 'swaps_streak_min_time': {
// 		// 		getProgress({ address, user: data?.payload ?? undefined }).then(res => {
// 		// 			setCurentProgress(res.current)
// 		// 		}, console.error)
// 		// 	}
// 		// 	case 'liquidity_pool_loan_min_time': {
// 		// 		getProgress({ user: data?.payload ?? undefined, address }).then(res => {
// 		// 			setCurentProgress(res.current)
// 		// 		}, console.error)
// 		// 	}
// 		// 	case 'liquidity_pool_loan_min_volume': {
// 		// 		getProgress({ address }).then(res => {
// 		// 			setCurentProgress(res.current)
// 		// 		}, console.error)
// 		// 	}
// 		// 	case 'quests_total_completed': {
// 		// 		getProgress({ address }).then(res => {
// 		// 			setCurentProgress(res.current)
// 		// 		}, console.error)
// 		// 	}
// 		// }
// 	}, [blocker])

// 	let UI = <></>

// 	switch()

// 	const maxValue = blocker[blockerMessages[0][0] as keyof TQuestBlocker]
// 	const labelBlocker = blockerMessages[0][1]
// 	return (
// 		<VStack max gap={'space_0_5'}>
// 			<VStack max align="center" gap="space_0_5">
// 				<HStack gap="space_0_25">
// 					<Text variant="heading_medium">Progress:</Text>
// 					<Text variant="heading_medium">{currentProgress}</Text>
// 					<Text variant="body_large">/</Text>
// 					<Text variant="heading_medium"> {maxValue}</Text>
// 				</HStack>
// 				<Stepper currentProgress={6} max={maxValue ?? 0} maxColumns={10} className={cls.stepper} />
// 			</VStack>
// 			<Text variant="body_medium">{labelBlocker}</Text>
// 		</VStack>
// 	)
// }
