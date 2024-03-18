import { publicClient } from '../../../../web3/wagmi'

export async function executeConceroRoute() {
	console.log('Executing concero route')
	const unwantch = publicClient.watchEvent({
		address: '0x7388365d49049164B6aBF3218c8cbA67A51580EF',
		onLogs: logs => {
			console.log('Logs:', logs)
		},
	})
}
