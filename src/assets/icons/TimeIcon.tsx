export const TimeIcon = ({ color = '#667085' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8 14.4001C11.5346 14.4001 14.4 11.5347 14.4 8.00009C14.4 4.46547 11.5346 1.60009 8 1.60009C4.46538 1.60009 1.6 4.46547 1.6 8.00009C1.6 11.5347 4.46538 14.4001 8 14.4001ZM8 16.0001C12.4183 16.0001 16 12.4184 16 8.00009C16 3.58181 12.4183 9.15527e-05 8 9.15527e-05C3.58172 9.15527e-05 0 3.58181 0 8.00009C0 12.4184 3.58172 16.0001 8 16.0001Z"
			fill={color}
		/>
		<rect x="6.40039" y="8.00009" width="5.6" height="1.6" rx="0.8" fill={color} />
		<rect x="8" y="4.00009" width="5.6" height="1.6" rx="0.8" transform="rotate(90 8 4.00009)" fill={color} />
	</svg>
)
