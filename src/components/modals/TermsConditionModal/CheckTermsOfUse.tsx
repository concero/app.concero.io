import { skipToken, useQuery } from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { fetchUserByAddress } from '../../../api/concero/user/fetchUserByAddress'
import { TermsConditionModal } from './TermsConditionModal/TermsConditionModal'
import { acceptTerms } from '../../../api/concero/user/acceptTerms'
import { getAccessToken } from '../../../api/concero/user/getAccessToken'
import { AxiosResponse } from 'axios'
import { termsIsActual } from './model/lib/termsIsActual'
import { TermsConditionErrorModal } from './TermsConditionErrorModal/TermsConditionErrorModal'

export const CheckTermsOfUseDecorator = ({ children }: PropsWithChildren) => {
	const { address } = useAccount()
	const { signMessageAsync } = useSignMessage()
	const [showModal, setShowModal] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const [isLoadingTerms, setIsLoadingTerms] = useState<boolean>(false)

	useEffect(() => {
		if (address) {
			fetchUserByAddress(address)
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
	let isIdleVerify = true
	const verifyUser = async () => {
		if (!address) {
			console.error('Wallet not connected')
			return
		}

		try {
			setIsLoadingTerms(true)
			await acceptTerms(address)
			//@ts-expect-error Here only AxiosResponse
		} catch (errObj: AxiosResponse) {
			if (errObj?.status === 403 && isIdleVerify) {
				getAccessToken(address, signMessageAsync)
					.catch(err => {
						setIsError(true)
						console.error('Error during get access token', errObj)
					})
					.then(() => {
						isIdleVerify = false
						verifyUser()
					})
			} else {
				setIsError(true)
				console.error('Error during authentication', errObj)
			}
		} finally {
			setShowModal(false)
			setIsLoadingTerms(false)
		}
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
					onVerify={verifyUser}
					isVerifyLoading={isLoadingTerms}
				/>
			)}
		</>
	)
}
