import { type MutableRefObject, type RefObject, type HTMLAttributes, type ReactNode } from 'react'
import cls from './Flex.module.pcss'
import clsx from 'clsx'

export type FlexJustify = 'start' | 'center' | 'end' | 'between'
export type FlexAlign = 'start' | 'center' | 'end'
export type FlexDirection = 'row' | 'column'
export type FlexWrap = 'nowrap' | 'wrap'
export type FlexGap = '4' | '8' | '16' | '24' | '32'
const justifyClasses: Record<FlexJustify, string> = {
	start: cls.justifyStart ?? '',
	center: cls.justifyCenter ?? '',
	end: cls.justifyEnd ?? '',
	between: cls.justifyBetween ?? '',
}
const alignClasses: Record<FlexAlign, string> = {
	start: cls.alignStart ?? '',
	center: cls.alignCenter ?? '',
	end: cls.alignEnd ?? '',
}
const directionClasses: Record<FlexDirection, string> = {
	row: cls.directionRow ?? '',
	column: cls.directionColumn ?? '',
}

const gapClasses: Record<FlexGap, string> = {
	4: cls.gap4 ?? '',
	8: cls.gap8 ?? '',
	16: cls.gap16 ?? '',
	24: cls.gap24 ?? '',
	32: cls.gap32 ?? '',
}

export interface FlexProps extends HTMLAttributes<HTMLElement> {
	className?: string
	children: ReactNode
	justify?: FlexJustify
	align?: FlexAlign
	direction?: FlexDirection
	wrap?: FlexWrap
	gap?: FlexGap
	max?: boolean
	flexref?: MutableRefObject<HTMLElement> | null | RefObject<HTMLElement | null>
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
		...otherProps
	} = props

	const classes = [className, justifyClasses[justify], alignClasses[align], directionClasses[direction], cls[wrap]]
	if (gap !== undefined) {
		classes.push(gapClasses[gap])
	}

	const mods = {
		[cls.max ?? '']: maxProp,
	}
	return {
		className: clsx(cls.Flex, mods, classes),
		...otherProps,
	}
}
export const Flex = (props: FlexProps) => {
	const { children } = props

	return <div {...getFlexStyle(props)}>{children}</div>
}
