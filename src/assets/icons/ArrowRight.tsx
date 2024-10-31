interface IconProps {
	color?: string
}

export const ArrowRight = ({ color = '#026AA2' }: IconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
			<rect y="6.29999" width="13.02" height="1.4" rx="0.7" fill={color} />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.90502 1.60502C8.17839 1.33165 8.6216 1.33165 8.89497 1.60502L13.795 6.50502C14.0683 6.77839 14.0683 7.2216 13.795 7.49497L8.89497 12.395C8.6216 12.6683 8.17839 12.6683 7.90502 12.395C7.63166 12.1216 7.63166 11.6784 7.90502 11.405L12.31 6.99999L7.90502 2.59497C7.63166 2.3216 7.63166 1.87839 7.90502 1.60502Z"
				fill={color}
			/>
		</svg>
	)
}
