import { PropsWithChildren, useEffect, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { fetchUserByAddress } from '../../../api/concero/user/fetchUserByAddress'
import { TermsConditionModal } from './TermsConditionModal/TermsConditionModal'
import { termsIsActual } from './model/lib/termsIsActual'
import { TermsConditionErrorModal } from './TermsConditionErrorModal/TermsConditionErrorModal'
import { verifyUser } from './model/lib/verifyUser'
import { useAppKitAccount } from '@reown/appkit/react'
import { Address } from 'viem'

export const CheckTermsOfUseDecorator = ({ children }: PropsWithChildren) => {
	const { address } = useAppKitAccount()

	const { signMessageAsync } = useSignMessage()
	const [showModal, setShowModal] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const [isLoadingTerms, setIsLoadingTerms] = useState<boolean>(false)

	useEffect(() => {
		if (address) {
			fetchUserByAddress(address as Address)
				.catch(err => {
					if (err.status == 403) {
						setShowModal(true)
					}
				})
				.then(user => {
					if (user && !termsIsActual(user)) {
						setShowModal(true)
					}
				})
		}
	}, [address])
	const handleVerify = async () => {
		if (!address) {
			console.error('Wallet not connected')
			setShowModal(false)
			return
		}
		setIsLoadingTerms(true)
		verifyUser(address as Address, signMessageAsync)
			.catch(err => {
				setIsError(true)
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
					show={showModal}
					setShow={setShowModal}
					onVerify={handleVerify}
					isVerifyLoading={isLoadingTerms}
				/>
			)}
		</>
	)
}
