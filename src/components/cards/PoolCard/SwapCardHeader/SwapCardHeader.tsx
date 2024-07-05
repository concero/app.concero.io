import classNames from './SwapCardHeader.module.pcss'
import { type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import { type Dispatch, useLayoutEffect, useRef, useState } from 'react'
import { getCardTitleByStatus } from '../handlers/getCardTitleByStatus'

interface SwapCardHeaderProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
}

const mods = [
	{
		title: 'Deposit',
		value: 'deposit',
	},
	{
		title: 'Withdraw',
		value: 'withdraw',
	},
]

export function SwapCardHeader({ swapState, swapDispatch }: SwapCardHeaderProps) {
	const { stage } = swapState
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [titleAnimationWidth, setTitleAnimationWidth] = useState<number>(0)

	const isInputStage = stage === SwapCardStage.input

	useLayoutEffect(() => {
		if (containerRef.current) {
			setTitleAnimationWidth(containerRef.current.scrollWidth / 2 - 74)
		}
	}, [containerRef.current?.scrollWidth])

	const changeMode = (value: 'deposit' | 'withdraw') => {
		swapDispatch({ type: 'SWITCH_POOL_MODE', payload: value })
	}

	const switchMode = (
		<div className="row gap-md">
			{mods.map(({ title, value }) => (
				<h4
					key={title}
					className={swapState.poolMode === value ? classNames.titleModeActive : classNames.titleMode}
					onClick={() => {
						changeMode(value)
					}}
				>
					{title}
				</h4>
			))}
		</div>
	)

	const titleStage = <h5 className={'cardHeaderTitle'}>{getCardTitleByStatus(swapState.stage)}</h5>

	return (
		<div
			className={`${classNames.container} ${isInputStage ? classNames.spaceBetweenContainer : ''}`}
			ref={containerRef}
		>
			<div>{isInputStage ? switchMode : titleStage}</div>
		</div>
	)
}
