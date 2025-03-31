import { Input as BaseInput } from './Input/Input'
export type { TInputProps, TInputSize } from './Input/Input'
import { OTP } from './OTP/OTP'

type InputType = typeof BaseInput & {
	OTP: typeof OTP
}

const Input = BaseInput as InputType

Input.OTP = OTP

export { Input }
