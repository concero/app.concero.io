export function WithTooltip({ WrappedComponent, Tooltip, tooltipProps = {} }) {
	return (
		<div>
			<div>
				<WrappedComponent />
			</div>

			<Tooltip {...tooltipProps}></Tooltip>
		</div>
	)
}
