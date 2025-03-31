import clsx from 'clsx'
import cls from './MetaInput.module.pcss'
import { TInputProps } from '../Input/Input'
import { PropsWithChildren, useRef } from 'react'

type MetaInput = PropsWithChildren<
	Pick<
		TInputProps,
		'classNameWrap' | 'count' | 'iconHint' | 'labelText' | 'subLabelText' | 'hintText' | 'isError' | 'isSuccess'
	>
>

export const MetaInput = (props: MetaInput) => {
	const { classNameWrap, iconHint, labelText, subLabelText, count, hintText, isError, isSuccess, children } = props

	const counterRef = useRef(0)
	const showHeader = Boolean(labelText || subLabelText || count)
	const showFooter = Boolean(hintText || iconHint)
	return (
		<div className={clsx(cls.input_wrap, classNameWrap)}>
			{showHeader && (
				<div className={cls.header_input}>
					<div className={cls.label_wrap}>
						<span className={cls.label_text}>{labelText}</span>
						<span className={cls.sublabel_text}>{subLabelText}</span>
					</div>
					{count && (
						<span className={cls.word_counter}>
							{counterRef.current}/{count.max}
						</span>
					)}
				</div>
			)}
			{children}
			{showFooter && (
				<div
					className={clsx(cls.footer_input, {
						[cls.hint_error_state]: isError,
						[cls.hint_success_state]: isSuccess,
					})}
				>
					{iconHint && <span className={cls.icon_footer}>{iconHint}</span>}
					<span className={cls.hint_footer}>{hintText}</span>
				</div>
			)}
		</div>
	)
}
