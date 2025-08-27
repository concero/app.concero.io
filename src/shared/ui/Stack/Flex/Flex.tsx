import { type MutableRefObject, type RefObject, type HTMLAttributes, type ReactNode, CSSProperties } from 'react'
import cls from './Flex.module.pcss'
import clsx from 'clsx'
import { HintedString } from '@/types/utils'
import { OmitTyped } from '@/shared/types/utils'

export type FlexJustify = 'start' | 'center' | 'end' | 'between'
export type FlexAlign = 'start' | 'center' | 'end'
export type FlexDirection = 'row' | 'column'
export type FlexWrap = 'nowrap' | 'wrap'
type FlexGap =
	| 'space_0_25'
	| 'space_0_5'
	| 'space_0_75'
	| 'space_1'
	| 'space_1_5'
	| 'space_2'
	| 'space_2_5'
	| 'space_3'
	| 'space_4'
	| 'space_6'
	| 'space_8'
const flexGapValues = [
	'space_0_25',
	'space_0_5',
	'space_0_75',
	'space_1',
	'space_1_5',
	'space_2',
	'space_2_5',
	'space_3',
	'space_4',
	'space_6',
	'space_8',
] as const
const justifyClasses: Record<FlexJustify, string> = {
	start: cls.justify_start ?? '',
	center: cls.justify_center ?? '',
	end: cls.justify_end ?? '',
	between: cls.justify_between ?? '',
}
const alignClasses: Record<FlexAlign, string> = {
	start: cls.align_start ?? '',
	center: cls.align_center ?? '',
	end: cls.align_end ?? '',
}
const directionClasses: Record<FlexDirection, string> = {
	row: cls.direction_row ?? '',
	column: cls.direction_column ?? '',
}
type CssGapValue = `${0}` | `${number}${'rem' | 'em' | 'px' | 'vh' | 'vw'}` | 'auto'

export interface FlexProps {
	className?: string
	children: ReactNode
	justify?: FlexJustify
	align?: FlexAlign
	direction?: FlexDirection
	wrap?: FlexWrap
	gap?: HintedString<(typeof flexGapValues)[number], `${CssGapValue}`>
	max?: boolean
	flexref?: MutableRefObject<HTMLElement> | null | RefObject<HTMLElement | null>
	htmlProps?: OmitTyped<HTMLAttributes<HTMLElement>, 'className' | 'children'>
}

export const getFlexStyle = (props: Omit<FlexProps, 'children'>) => {
	const {
		className,
		justify = 'start',
		align = 'center',
		direction = 'row',
		wrap = 'nowrap',
		gap,
		max: maxProp,
		htmlProps,
	} = props

	const classes = [className, justifyClasses[justify], alignClasses[align], directionClasses[direction], cls[wrap]]

	const mods = {
		[cls.max ?? '']: maxProp,
	}
	const styles: CSSProperties = {}
	if (gap && flexGapValues.find(el => el === gap)) {
		mods[cls[gap]] = true
	} else {
		styles['gap'] = gap
	}

	return {
		className: clsx(cls.flex, mods, classes),
		...htmlProps,
		style: {
			...styles,
			...htmlProps?.style,
		},
	}
}
export const Flex = (props: FlexProps) => {
	const { children } = props

	return <div {...getFlexStyle(props)}>{children}</div>
}
