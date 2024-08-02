import { type Address, type Hash } from 'viem'

export enum DexType {
	UniswapV2 = 0,
	UniswapV2FoT = 1,
	SushiV3Single = 2,
	UniswapV3Single = 3,
	SushiV3Multi = 4,
	UniswapV3Multi = 5,
	Aerodrome = 6,
	AerodromeFoT = 7,
	UniswapV2Ether = 8,
	WrapNative = 9,
	UnwrapWNative = 10,
}

interface IConceroInfraChain {
	id: string
	name: string
	symbol: string
	logoURI: string
	addressPatterns: string[]
	explorerURI: string
	providers: [
		{
			name: string
			symbol: string
		},
	]
	tokens: string[]
}

interface IConceroInfraToken {
	name: string
	chain_id: string
	symbol: string
	address: string
	decimals: number
	logoURI: string
	is_popular?: boolean
	coinGeckoId: string
	priceUsd: number | null
	providers: [
		{
			name: string
			symbol: string
		},
	]
}

export interface ISwapDirectionData {
	address: Address
	token: IConceroInfraToken
	chain: IConceroInfraChain
	amount: number
}

export interface IFee {
	amount: number
	amount_usd: string
	type: string
	tokenAddress: Address
}

type SwapType = 'bridge' | 'swap'

export enum TxStatus {
	SUCCESS = 'SUCCESS',
	PENDING = 'PENDING',
	FAILED = 'FAILED',
}

export interface IStep {
	from: ISwapDirectionData
	to: ISwapDirectionData
	type: SwapType
	dexType?: DexType
	tool?: {
		name: string
		logo_url: string
		execution_time_seconds: string
		address: Address
		fees: IFee[]
	}
	execution: {
		status: TxStatus | null
	}
}

export interface IGas {
	amount: string
	amount_usd?: string
	type: string
	tokenAddress: Address | null
	used: string | null // new
	price: string // new
}

export interface IConceroInfraTx {
	srcTxHash: Hash
	dstTxHash: Hash | null
	srcBlockNumber: number
	dstBlockNumber: number | null
	timestamp: number
	from: ISwapDirectionData
	to: ISwapDirectionData
	gas: IGas
	fees?: IFee[]
	steps?: IStep[]
	type: string
	status: TxStatus
}
