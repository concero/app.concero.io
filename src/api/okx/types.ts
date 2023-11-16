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

export interface OkxTx {
	data: string
	from: string
	gasLimit: string
	gasPrice: string
	to: string
	value: number
}

export interface IFetchOkxTxResponse {
	fromTokenAmount: string
	router: number
	bridgeName: string
	crossChainFee: string
	otherNativeFee: string
	toTokenAmount: string
	tx: OkxTx
}

export interface IFetchOkxTransactionStatus {
	walletAddress: string
	fromChainId: number
	toChainId: number
	toTxHash: number
	fromTxHash: number
	detailStatus: 'WAITING' | 'FROM_SUCCESS' | 'BRIDGE_PENDING' | 'SUCCESS' | 'FAILURE'
}
