export interface DexRouterList {
	bridgeId: number
	bridgeName: string
	otherNativeFee: string
}

export interface RouterList {
	estimateGasFee: string
	estimateTime: string
	fromDexRouterList: DexRouterList[]
	minimumReceived: string
	needApprove: number
	router: {
		bridgeId: number
		bridgeName: string
		otherNativeFee: string
	}
	toTokenAmount: string
}

export interface OKXRoute {
	fromChainId: number
	fromToken: {
		decimals: number
		tokenContractAddress: string
		tokenSymbol: string
	}
	fromTokenAmount: string
	routerList: RouterList[]
	toChainId: number
	toToken: {
		decimals: number
		tokenContractAddress: string
		tokenSymbol: string
	}
}
