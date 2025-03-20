import { useUpdateNicknameMutation, useUserByAddress } from '@/entities/User'
import { Button, Input } from '@concero/ui-kit'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import WarningIcon from '@/shared/assets/icons/monochrome/warning.svg?react'
import cls from './NicknameConnect.module.pcss'
import { NicknameError } from '@/entities/User/model/types/response'
export const NicknameConnect = () => {
	const { address } = useAccount()
	const { data: user } = useUserByAddress(address)
	const { mutate, isPending, isError, isSuccess, error, reset } = useUpdateNicknameMutation()
	const [newNickname, setNewNickname] = useState(user?.nickname ?? '')

	const saveHandler = () => {
		if (address) {
			mutate({
				address,
				newNickname,
			})
		}
	}
	const showSaveBtn = newNickname.length > 0 && !isError
	const errorMap: Record<NicknameError, string> = {
		Error: 'An error occurred while saving the nickname',
		Exists: 'Nickname is already taken',
		Invalid: 'Nickname can only contain letters, numbers, and the following special characters: - . + @ ! # № * _',
		Long: 'Nickname must be less than 60 characters',
		Short: 'Nickname must be greater than 1 character',
	}
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
					if (isError) {
						reset()
					}
				}}
				size="l"
				isError={isError}
				iconHint={isError ? <WarningIcon /> : null}
				hintText={isError ? errorMap[error.data.error] : null}
			/>
			{showSaveBtn && (
				<Button variant="primary" size="m" onClick={saveHandler} isLoading={isPending} className={cls.btn}>
					Save Nickname
				</Button>
			)}
		</div>
	)
}
