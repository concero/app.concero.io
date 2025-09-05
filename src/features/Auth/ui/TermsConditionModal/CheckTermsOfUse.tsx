import { PropsWithChildren, useEffect, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { TermsConditionModal } from './TermsConditionModal/TermsConditionModal'
import { termsIsActual } from './model/lib/termsIsActual'
import { TermsConditionErrorModal } from './TermsConditionErrorModal/TermsConditionErrorModal'
import { verifyUser } from './model/lib/verifyUser'
import { CheckTermsModalProvider, useCheckTermsModal } from './CheckTermsModalContext'
import { useAcceptTermsMutation, useUserByAddress } from '@/entities/User/api/userApi'
import { Http } from '@/shared/types/api'

const CheckTermsOfUseDecoratorInner = ({ children }: PropsWithChildren) => {
	const { address, isConnected } = useAccount()
	const { signMessageAsync } = useSignMessage()
	const { opened: showModal, setOpen: setShowModal } = useCheckTermsModal()
	const { mutateAsync: acceptTerms } = useAcceptTermsMutation()

	const [isError, setIsError] = useState<boolean>(false)
	const [isLoadingTerms, setIsLoadingTerms] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const user = useUserByAddress(address)
	useEffect(() => {
		if (user.data && !termsIsActual(user.data.payload)) {
			setShowModal(true)
		}
		if (
			!user ||
			(user.error &&
				(user.error.code === Http.Code.Enum.TOKEN_NOT_PROVIDED ||
					user.error.code === Http.Code.Enum.TOKEN_INVALID))
		) {
			setShowModal(true)
		}
	}, [user])
	const handleVerify = async () => {
		if (!address) {
			console.error('Wallet not connected')
			setShowModal(false)
			return
		}
		setIsLoadingTerms(true)
		//@ts-expect-error TODO: Fix this type
		verifyUser({ address, signMessageAsync, acceptTerms })
			.catch((err: any) => {
				setIsError(true)
				setError(err)
			})
			.finally(() => {
				setShowModal(false)
				setIsLoadingTerms(false)
			})
	}

	return (
		<>
			{children}
			{isError ? (
				<TermsConditionErrorModal
					error={error}
					show={isError}
					setShow={newValue => {
						setIsError(newValue)
						setShowModal(newValue)
					}}
					onTryAgain={() => {
						setIsError(false)
						setShowModal(true)
					}}
				/>
			) : (
				<TermsConditionModal
					show={showModal && isConnected}
					setShow={setShowModal}
					onVerify={handleVerify}
					isVerifyLoading={isLoadingTerms}
				/>
			)}
		</>
	)
}

export const CheckTermsOfUseDecorator = ({ children }: PropsWithChildren) => {
	return (
		<CheckTermsModalProvider>
			<CheckTermsOfUseDecoratorInner>{children}</CheckTermsOfUseDecoratorInner>
		</CheckTermsModalProvider>
	)
}
