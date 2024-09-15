import { Tooltip } from 'react-tooltip'

export const UserMultipliers = () => {
	return (
		<Tooltip isOpen={true} id="multiplier-tooltip" className="tooltip">
			<div>
				<h6>Multipliers:</h6>
				<div>
					<div>
						<span className="body1">Total Multiplier:</span>
						<p>4,5x</p>
					</div>
				</div>
			</div>
		</Tooltip>
	)
}
