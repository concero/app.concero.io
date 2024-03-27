// import { useContext } from 'react'
// import { createWeb3Modal, defaultConfig } from '@web3modal/wagmi/react'
// import { projectId } from './wagmi'
// import { ThemeContext } from '../hooks/themeContext'
//
// export function WalletConnectModal() {
// 	const { theme, colors } = useContext(ThemeContext)
// 	// 2. Set chains
// 	const mainnet = {
// 		chainId: 1,
// 		name: 'Ethereum',
// 		currency: 'ETH',
// 		explorerUrl: 'https://etherscan.io',
// 		rpcUrl: 'https://cloudflare-eth.com',
// 	}
//
// 	// 3. Create modal
// 	const metadata = {
// 		name: 'My Website',
// 		description: 'My Website description',
// 		url: 'https://mywebsite.com', // origin must match your domain & subdomain
// 		icons: ['https://avatars.mywebsite.com/'],
// 	}
//
// 	createWeb3Modal({
// 		ethersConfig: defaultConfig({ metadata }),
// 		chains: [mainnet],
// 		projectId,
// 		enableAnalytics: true, // Optional - defaults to your Cloud configuration
// 	})
//
// 	return null
// }
