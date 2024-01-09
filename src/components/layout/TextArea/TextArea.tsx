import classNames from './TextArea.module.pcss'
import { type ChangeEvent, forwardRef, type TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
	const { onChange, ...rest } = props

	return (
		<div className={classNames.container}>
			<textarea ref={ref} onChange={onChange} className={classNames.textarea} placeholder="Enter text here..." {...rest} />
		</div>
	)
})
