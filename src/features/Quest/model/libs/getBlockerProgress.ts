import { TQuestBlocker } from '@/entities/Quest'
import { TTuple } from '@/entities/Quest'
import { TUserResponse } from '@/entities/User'
import { useEffect, useState } from 'react'
import { blockerResolvers } from './blockerResolvers'
type TProps = {
	blocker: TQuestBlocker
	blockerMessages: TTuple[]
	address?: string
	user?: TUserResponse
}
export const getBlockerProgress = (arg: TProps) => {
	const { blockerMessages, blocker, address, user } = arg
	const [currentProgress, setCurentProgress] = useState(0)
	const maxValue = blocker[blockerMessages[0][0] as keyof TQuestBlocker]
	useEffect(() => {
		if (!address) {
			return
		}
		const blockerKey = blockerMessages[0][0] as keyof TQuestBlocker
		const getProgress = blockerResolvers[blockerKey]
		let result = null
		switch (blockerKey) {
			case 'swaps_min_count': {
				getProgress({ address }).then(res => {
					setCurentProgress(res.current)
				}, console.error)
			}
			case 'swaps_max_count': {
				getProgress({ address }).then(res => {
					setCurentProgress(res.current)
				}, console.error)
			}
			case 'swaps_min_volume': {
				getProgress({ address }).then(res => {
					setCurentProgress(res.current)
				}, console.error)
			}
			case 'swaps_max_volume': {
				getProgress({ address }).then(res => {
					setCurentProgress(res.current)
				}, console.error)
			}
			case 'swaps_streak_min_time': {
				getProgress({ address, user }).then(res => {
					setCurentProgress(res.current)
				}, console.error)
			}
			case 'liquidity_pool_loan_min_time': {
				getProgress({ user, address }).then(res => {
					setCurentProgress(res.current)
				}, console.error)
			}
			case 'liquidity_pool_loan_min_volume': {
				getProgress({ address }).then(res => {
					setCurentProgress(res.current)
				}, console.error)
			}
			case 'quests_total_completed': {
				getProgress({ address }).then(res => {
					setCurentProgress(res.current)
				}, console.error)
			}
		}
	}, [blocker])
	return { currentProgress, isCompleted: currentProgress >= (maxValue ?? 0) }
}
