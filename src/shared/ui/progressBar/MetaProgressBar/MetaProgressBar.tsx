import React, { ReactNode } from 'react'
import { HStack, VStack } from '../../Stack'
import cls from './MetaProgressBar.module.pcss'
import { SkeletonLoader } from '../../SkeletonLoader/SkeletonLoader'
import InfoIcon from '@/shared/assets/icons/monochrome/info.svg?react'
import { Text } from '../../Text/Text'
import clsx from 'clsx'

export type TMetaProgressBarProps = {
	isLoading?: boolean
	error?: {
		isError: boolean
		title?: string
		description?: string
	}
	children: ReactNode
	description?: {
		current: string | number
		max: string | number
		title: string
	}
}

export const MetaProgressBar = (props: TMetaProgressBarProps) => {
	const { children, error, isLoading } = props
	let Header = null
	let Footer = null
	if (isLoading) {
		Header = <SkeletonLoader height={20} width={128} />
		Footer = (
			<HStack justify="between" max>
				<SkeletonLoader height={16} width={32} />
				<SkeletonLoader height={16} width={32} />
			</HStack>
		)
	} else if (error?.isError) {
		Header = (
			<Text variant="heading_medium" className={cls.error_title}>
				{error?.title ?? 'Data missed'}
			</Text>
		)
		Footer = (
			<VStack gap="space_0_5">
				<HStack gap="8px" max>
					<InfoIcon className={clsx(cls.error_description, cls.error_icon)} />
					<Text variant="heading_small">{error.description ?? 'Error'}</Text>
				</HStack>
			</VStack>
		)
	} else if (props.description) {
		const { max, current, title } = props.description
		Header = (
			<HStack gap="space_0_5" max justify="start">
				<Text variant="heading_medium" className={cls.description_title}>
					{title}
				</Text>
				<HStack gap="4px">
					<Text variant="heading_medium" className={cls.description_current_number}>
						{current}
					</Text>
					<Text variant="heading_medium" className={cls.description_separator}>
						/
					</Text>
					<Text variant="heading_medium" className={cls.description_max}>
						{max}
					</Text>
				</HStack>
			</HStack>
		)
		Footer = (
			<HStack gap="space_0_5" max justify="between">
				<Text variant="heading_medium" className={cls.description_max}>
					{0}
				</Text>
				<Text variant="heading_medium" className={cls.description_max}>
					{max}
				</Text>
			</HStack>
		)
	}

	return (
		<VStack gap="space_0_5" align="start" max>
			{Header}
			<React.Fragment key={'children'}>{children}</React.Fragment>
			{Footer}
		</VStack>
	)
}
