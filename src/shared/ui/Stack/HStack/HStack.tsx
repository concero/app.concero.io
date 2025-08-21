import { Flex, getFlexStyle, type FlexProps } from '../Flex/Flex'

type HStackProps = Omit<FlexProps, 'direction'>
export const getHStackStyle = (props?: Omit<HStackProps, 'children'>) => {
	return getFlexStyle({
		direction: 'row',
		...props,
	})
}
export const HStack = (props: HStackProps) => {
	const { children, ...otherProps } = props
	return (
		<Flex {...otherProps} direction="row">
			{children}
		</Flex>
	)
}
