import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAccount } from 'wagmi'
import posthog from 'posthog-js'

export const Navigator = () => {
	const { address } = useAccount()

	useEffect(() => {
		if (!address) return
		posthog.identify(address)
	}, [address])

	useEffect(() => {
		window.location.replace('https://lanca.io/')
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				<Route path={'/*'} element={<div></div>} />
			</Routes>
		</BrowserRouter>
	)
}
