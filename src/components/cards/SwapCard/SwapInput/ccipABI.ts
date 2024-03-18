export const ccipABI = [
	{
		inputs: [
			{
				internalType: 'uint64',
				name: 'destinationChainSelector',
				type: 'uint64',
			},
		],
		name: 'DestinationChainNotAllowlisted',
		type: 'error',
	},
	{
		inputs: [],
		name: 'ErrorCase',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				internalType: 'address',
				name: 'target',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'value',
				type: 'uint256',
			},
		],
		name: 'FailedToWithdrawEth',
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
				internalType: 'bytes32',
				name: 'messageId',
				type: 'bytes32',
			},
		],
		name: 'MessageNotFailed',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'currentBalance',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'calculatedFees',
				type: 'uint256',
			},
		],
		name: 'NotEnoughBalance',
		type: 'error',
	},
	{
		inputs: [],
		name: 'NothingToWithdraw',
		type: 'error',
	},
	{
		inputs: [],
		name: 'OnlySelf',
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
		name: 'SenderNotAllowed',
		type: 'error',
	},
	{
		inputs: [
			{
				internalType: 'uint64',
				name: 'sourceChainSelector',
				type: 'uint64',
			},
		],
		name: 'SourceChainNotAllowed',
		type: 'error',
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
				indexed: true,
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
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'feeToken',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'fees',
				type: 'uint256',
			},
		],
		name: 'CrossChainBurnAndMintMessageSent',
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
				indexed: true,
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
				internalType: 'address',
				name: 'to',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'feeToken',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'fees',
				type: 'uint256',
			},
		],
		name: 'CrossChainMintMessageSent',
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
				internalType: 'bytes',
				name: 'reason',
				type: 'bytes',
			},
		],
		name: 'MessageFailed',
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
				indexed: true,
				internalType: 'uint64',
				name: 'sourceChainSelector',
				type: 'uint64',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'sender',
				type: 'address',
			},
			{ indexed: false, internalType: 'string', name: 'text', type: 'string' },
			{
				indexed: false,
				internalType: 'address',
				name: 'token',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'tokenAmount',
				type: 'uint256',
			},
		],
		name: 'MessageReceived',
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
		],
		name: 'MessageRecovered',
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
				indexed: true,
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
				internalType: 'string',
				name: 'text',
				type: 'string',
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
				name: 'tokenAmount',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'feeToken',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'fees',
				type: 'uint256',
			},
		],
		name: 'MessageSent',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [],
		name: 'MintCallSuccessfull',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_receiver',
				type: 'address',
			},
			{
				internalType: 'string',
				name: '_text',
				type: 'string',
			},
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
				name: '_feeTokenAddress',
				type: 'address',
			},
		],
		name: '_buildCCIPMessage',
		outputs: [
			{
				components: [
					{
						internalType: 'bytes',
						name: 'receiver',
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
						name: 'tokenAmounts',
						type: 'tuple[]',
					},
					{
						internalType: 'address',
						name: 'feeToken',
						type: 'address',
					},
					{
						internalType: 'bytes',
						name: 'extraArgs',
						type: 'bytes',
					},
				],
				internalType: 'struct Client.EVM2AnyMessage',
				name: '',
				type: 'tuple',
			},
		],
		stateMutability: 'pure',
		type: 'function',
	},
]
