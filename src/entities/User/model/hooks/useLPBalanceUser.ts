import { useState, useEffect } from 'react'
import { type Address } from 'viem'
import { getUserLpTokens } from '../lib/getUserLpTokens'

export const useGetUserLPBalance = (address: Address | null | undefined) => {
	const [balance, setBalance] = useState<number | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [userHasDeposited, setUserHasDeposited] = useState<boolean>(false)

	useEffect(() => {
		if (!address) {
			setBalance(null)
			setUserHasDeposited(false)
			setLoading(false)
			return
		}

		const fetchBalance = async () => {
			setLoading(true)
			try {
				const userBalance = await getUserLpTokens(address)
				setBalance(userBalance)
				setUserHasDeposited(userBalance > 0)
			} catch (error) {
				console.error('Failed to fetch user LP balance:', error)
				setBalance(null)
				setUserHasDeposited(false)
			} finally {
				setLoading(false)
			}
		}

		fetchBalance()
	}, [address])

	return { balance, loading, userHasDeposited }
}
