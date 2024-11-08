import { InfoIcon } from '../../../../../assets/icons/InfoIcon'
import className from './InputError.module.pcss'

interface Props {
	errorText: string
	color?: string
}

export const InputError = ({ errorText, color }: Props) => {
	return (
		<div className={className.container}>
			<InfoIcon color={color} />
			<p className={`${className.text} body2`}>{errorText}</p>
		</div>
	)
}
