import { type Abi } from 'viem'

export default [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_parentPoolProxy',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_parentPoolCLFCLA',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_automationForwarder',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_link',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_ccipRouter',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_usdc',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_lpToken',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_infraProxy',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_clfRouter',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_owner',
				type: 'address',
			},
			{
				internalType: 'address[3]',
				name: '_messengers',
				type: 'address[3]',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'target',
				type: 'address',
			},
		],
		name: 'AddressEmptyCode',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'AddressInsufficientBalance',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'minAmount',
				type: 'uint256',
			},
		],
		name: 'DepositAmountBelowMinimum',
		type: 'error',
	},
	{
		inputs: [],
		name: 'DepositRequestNotReady',
		type: 'error',
	},
	{
		inputs: [],
		name: 'DepositsOnTheWayArrayFull',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'requestId',
				type: 'bytes32',
			},
		],
		name: 'DistributeLiquidityRequestAlreadyProceeded',
		type: 'error',
	},
	{
		inputs: [],
		name: 'FailedInnerCall',
		type: 'error',
	},
	{
		inputs: [],
		name: 'InvalidAddress',
		type: 'error',
	},
	{
		inputs: [],
		name: 'InvalidAddress',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'router',
				type: 'address',
			},
		],
		name: 'InvalidRouter',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'maxCap',
				type: 'uint256',
			},
		],
		name: 'MaxDepositCapReached',
		type: 'error',
	},
	{
		inputs: [],
		name: 'NotAllowedToCompleteDeposit',
		type: 'error',
	},
	{
		inputs: [],
		name: 'NotConceroInfraProxy',
		type: 'error',
	},
	{
		inputs: [],
		name: 'NotMessenger',
		type: 'error',
	},
	{
		inputs: [],
		name: 'NotOwner',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'sender',
				type: 'address',
			},
		],
		name: 'NotParentPoolProxy',
		type: 'error',
	},
	{
		inputs: [],
		name: 'NotUsdcToken',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'OnlyRouterCanFulfill',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
		],
		name: 'SafeERC20FailedOperation',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_sender',
				type: 'address',
			},
		],
		name: 'SenderNotAllowed',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'bytes',
				name: 'data',
				type: 'bytes',
			},
		],
		name: 'UnableToCompleteDelegateCall',
		type: 'error',
	},
	{
		inputs: [],
		name: 'Unauthorized',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'minAmount',
				type: 'uint256',
			},
		],
		name: 'WithdrawAmountBelowMinimum',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'withdrawalId',
				type: 'bytes32',
			},
		],
		name: 'WithdrawRequestDoesntExist',
		type: 'error',
	},
	{
		inputs: [],
		name: 'WithdrawalRequestAlreadyExists',
		type: 'error',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'ccipMessageId',
				type: 'bytes32',
			},
			{
				indexed: false,
				internalType: 'uint64',
				name: 'srcChainSelector',
				type: 'uint64',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'sender',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'CCIPReceived',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'messageId',
				type: 'bytes32',
			},
			{
				indexed: false,
				internalType: 'uint64',
				name: 'destinationChainSelector',
				type: 'uint64',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'receiver',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'CCIPSent',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'requestId',
				type: 'bytes32',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'lpAddress',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'usdcAmount',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_lpTokensToMint',
				type: 'uint256',
			},
		],
		name: 'DepositCompleted',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'requestId',
				type: 'bytes32',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'liquidityProvider',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'deadline',
				type: 'uint256',
			},
		],
		name: 'DepositInitiated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'conceroMessageId',
				type: 'bytes32',
			},
		],
		name: 'FailedExecutionLayerTxSettled',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'requestId',
				type: 'bytes32',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'WithdrawalCompleted',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'requestId',
				type: 'bytes32',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'caller',
				type: 'address',
			},
		],
		name: 'WithdrawalRequestInitiated',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'childPoolsBalance',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'amountToDeposit',
				type: 'uint256',
			},
		],
		name: 'calculateLPTokensToMint',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'childPoolsBalance',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'clpAmount',
				type: 'uint256',
			},
		],
		name: 'calculateWithdrawableAmount',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'childPoolsBalance',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'clpAmount',
				type: 'uint256',
			},
		],
		name: 'calculateWithdrawableAmountViaDelegateCall',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: 'bytes32',
						name: 'messageId',
						type: 'bytes32',
					},
					{
						internalType: 'uint64',
						name: 'sourceChainSelector',
						type: 'uint64',
					},
					{
						internalType: 'bytes',
						name: 'sender',
						type: 'bytes',
					},
					{
						internalType: 'bytes',
						name: 'data',
						type: 'bytes',
					},
					{
						components: [
							{
								internalType: 'address',
								name: 'token',
								type: 'address',
							},
							{
								internalType: 'uint256',
								name: 'amount',
								type: 'uint256',
							},
						],
						internalType: 'struct Client.EVMTokenAmount[]',
						name: 'destTokenAmounts',
						type: 'tuple[]',
					},
				],
				internalType: 'struct Client.Any2EVMMessage',
				name: 'message',
				type: 'tuple',
			},
		],
		name: 'ccipReceive',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes',
				name: '',
				type: 'bytes',
			},
		],
		name: 'checkUpkeep',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
			{
				internalType: 'bytes',
				name: '',
				type: 'bytes',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'checkUpkeepViaDelegate',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
			{
				internalType: 'bytes',
				name: '',
				type: 'bytes',
			},
		],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_depositRequestId',
				type: 'bytes32',
			},
		],
		name: 'completeDeposit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_chainSelector',
				type: 'uint64',
			},
			{
				internalType: 'uint256',
				name: '_amountToSend',
				type: 'uint256',
			},
			{
				internalType: 'bytes32',
				name: '_requestId',
				type: 'bytes32',
			},
			{
				internalType: 'enum ICCIP.CcipTxType',
				name: '_ccipTxType',
				type: 'uint8',
			},
		],
		name: 'distributeLiquidity',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getDepositsOnTheWay',
		outputs: [
			{
				components: [
					{
						internalType: 'uint64',
						name: 'chainSelector',
						type: 'uint64',
					},
					{
						internalType: 'bytes32',
						name: 'ccipMessageId',
						type: 'bytes32',
					},
					{
						internalType: 'uint256',
						name: 'amount',
						type: 'uint256',
					},
				],
				internalType: 'struct IParentPool.DepositOnTheWay[150]',
				name: '',
				type: 'tuple[150]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getPendingWithdrawalRequestIds',
		outputs: [
			{
				internalType: 'bytes32[]',
				name: '',
				type: 'bytes32[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getRouter',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getUsdcInUse',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_lpAddress',
				type: 'address',
			},
		],
		name: 'getWithdrawalIdByLPAddress',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'requestId',
				type: 'bytes32',
			},
			{
				internalType: 'bytes',
				name: 'delegateCallResponse',
				type: 'bytes',
			},
			{
				internalType: 'bytes',
				name: 'err',
				type: 'bytes',
			},
		],
		name: 'handleOracleFulfillment',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'i_lpToken',
		outputs: [
			{
				internalType: 'contract LPToken',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes',
				name: '_performData',
				type: 'bytes',
			},
		],
		name: 'performUpkeep',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_chainSelector',
				type: 'uint64',
			},
		],
		name: 'removePools',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'retryPerformWithdrawalRequest',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: 'chainSelector',
				type: 'uint64',
			},
		],
		name: 's_childPools',
		outputs: [
			{
				internalType: 'address',
				name: 'pool',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'clfReqId',
				type: 'bytes32',
			},
		],
		name: 's_clfRequestTypes',
		outputs: [
			{
				internalType: 'enum IParentPool.CLFRequestType',
				name: '',
				type: 'uint8',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'clfReqId',
				type: 'bytes32',
			},
		],
		name: 's_depositRequests',
		outputs: [
			{
				internalType: 'address',
				name: 'lpAddress',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'childPoolsLiquiditySnapshot',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'usdcAmountToDeposit',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'deadline',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 's_depositsOnTheWayAmount',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		name: 's_distributeLiquidityRequestProcessed',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: 'chainSelector',
				type: 'uint64',
			},
			{
				internalType: 'address',
				name: 'poolAddress',
				type: 'address',
			},
		],
		name: 's_isSenderContractAllowed',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 's_liquidityCap',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 's_loansInUse',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 's_withdrawAmountLocked',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'withdrawalId',
				type: 'bytes32',
			},
		],
		name: 's_withdrawRequests',
		outputs: [
			{
				internalType: 'address',
				name: 'lpAddress',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'lpSupplySnapshot_DEPRECATED',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'lpAmountToBurn',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'totalCrossChainLiquiditySnapshot',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'amountToWithdraw',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'liquidityRequestedFromEachPool',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'remainingLiquidityFromChildPools',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'triggeredAtTimestamp',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'withdrawalId',
				type: 'bytes32',
			},
		],
		name: 's_withdrawTriggered',
		outputs: [
			{
				internalType: 'bool',
				name: 'isTriggered',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'clfReqId',
				type: 'bytes32',
			},
		],
		name: 's_withdrawalIdByCLFRequestId',
		outputs: [
			{
				internalType: 'bytes32',
				name: 'withdrawalId',
				type: 'bytes32',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'lpAddress',
				type: 'address',
			},
		],
		name: 's_withdrawalIdByLPAddress',
		outputs: [
			{
				internalType: 'bytes32',
				name: 'withdrawalId',
				type: 'bytes32',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 's_withdrawalRequestIds',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_hashSum',
				type: 'bytes32',
			},
		],
		name: 'setCollectLiquidityJsCodeHashSum',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_chainSelector',
				type: 'uint64',
			},
			{
				internalType: 'address',
				name: '_contractAddress',
				type: 'address',
			},
			{
				internalType: 'bool',
				name: '_isAllowed',
				type: 'bool',
			},
		],
		name: 'setConceroContractSender',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_hashSum',
				type: 'bytes32',
			},
		],
		name: 'setDistributeLiquidityJsCodeHashSum',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint8',
				name: '_slotId',
				type: 'uint8',
			},
		],
		name: 'setDonHostedSecretsSlotId',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_version',
				type: 'uint64',
			},
		],
		name: 'setDonHostedSecretsVersion',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_ethersHashSum',
				type: 'bytes32',
			},
		],
		name: 'setEthersHashSum',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_hashSum',
				type: 'bytes32',
			},
		],
		name: 'setGetBalanceJsCodeHashSum',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_newCap',
				type: 'uint256',
			},
		],
		name: 'setPoolCap',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: '_chainSelector',
				type: 'uint64',
			},
			{
				internalType: 'address',
				name: '_pool',
				type: 'address',
			},
			{
				internalType: 'bool',
				name: 'isRebalancingNeeded',
				type: 'bool',
			},
		],
		name: 'setPools',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_usdcAmount',
				type: 'uint256',
			},
		],
		name: 'startDeposit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_lpAmount',
				type: 'uint256',
			},
		],
		name: 'startWithdrawal',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes4',
				name: 'interfaceId',
				type: 'bytes4',
			},
		],
		name: 'supportsInterface',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_token',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: '_receiver',
				type: 'address',
			},
		],
		name: 'takeLoan',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'withdrawDepositFees',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		stateMutability: 'payable',
		type: 'receive',
	},
] as Abi
