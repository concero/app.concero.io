import { useUpdateNicknameMutation, useUserByAddress } from '@/entities/User'
import { Button, Input } from '@concero/ui-kit'
import { useState } from 'react'
import WarningIcon from '@/shared/assets/icons/monochrome/warning.svg?react'
import SuccessIcon from '@/shared/assets/icons/monochrome/success.svg?react'
import cls from './NicknameConnect.module.pcss'
import { NicknameError, TUserResponse } from '@/entities/User/model/types/response'
import { Address } from 'viem'
type TProps = {
	user: TUserResponse
}

export const NicknameConnect = (props: TProps) => {
	const { user } = props
	const { mutate, isPending, isError, isSuccess, error, reset } = useUpdateNicknameMutation()

	const [newNickname, setNewNickname] = useState(user?.nickname ?? '')

	const saveHandler = () => {
		if (user && user.address) {
			mutate({
				address: user.address as Address,
				newNickname,
			})
		}
	}
	const showSaveBtn = newNickname !== user?.nickname && newNickname.length > 0 && !isError
	const errorMap: Record<NicknameError, string> = {
		Error: 'An error occurred while saving the nickname',
		Exists: 'Nickname is already taken',
		Invalid: 'Nickname can only contain letters, numbers, and the following special characters: - . + @ ! # № * _',
		Long: 'Nickname must be less than 60 characters',
		Short: 'Nickname must be greater than 1 character',
	}
	const hintText = isError ? errorMap[error.data.error] : isSuccess ? 'Nickname successfully updated ' : null
	const hintIcon = isError ? <WarningIcon /> : isSuccess ? <SuccessIcon /> : null
	return (
		<div className={cls.wrap_input_btn}>
			<Input
				isSuccess={isSuccess}
				labelText="Nickname"
				placeholder="Nickname"
				count={{
					max: 60,
				}}
				value={newNickname}
				onChange={e => {
					setNewNickname(e.target.value)
					reset()
				}}
				size="l"
				isError={isError}
				iconHint={hintIcon}
				hintText={hintText}
			/>
			{showSaveBtn && (
				<Button variant="primary" size="m" onClick={saveHandler} isLoading={isPending} className={cls.btn}>
					Save Nickname
				</Button>
			)}
		</div>
	)
}
