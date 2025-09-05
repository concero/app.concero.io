import { Flex, getFlexStyle, type FlexProps } from '../Flex/Flex'

type VStackProps = Omit<FlexProps, 'direction'>
export const getVStackStyle = (props?: Omit<VStackProps, 'children'>) => {
	return getFlexStyle({
		...props,
		direction: 'column',
		align: 'start',
	})
}
export const VStack = (props: VStackProps) => {
	const { align = 'start', children, ...otherProps } = props
	return (
		<Flex {...otherProps} align={align} direction="column">
			{children}
		</Flex>
	)
}
