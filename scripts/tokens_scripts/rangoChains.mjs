export const rangoChains = [
    {
        "name": "ETH",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "ETH",
                "symbol": "ETH",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "1",
        "logo": "https://api.rango.exchange/blockchains/ethereum.svg",
        "displayName": "Ethereum",
        "shortName": "ETH",
        "sort": 0,
        "color": "#ecf0f1",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Ethereum Mainnet",
            "nativeCurrency": {
                "name": "ETH",
                "symbol": "ETH",
                "decimals": 18
            },
            "rpcUrls": [
                "https://rpc.ankr.com/eth"
            ],
            "blockExplorerUrls": [
                "https://etherscan.io"
            ],
            "addressUrl": "https://etherscan.io/address/{wallet}",
            "transactionUrl": "https://etherscan.io/tx/{txHash}",
            "enableGasV2": true
        }
    },
    {
        "name": "BSC",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "BSC",
                "symbol": "BNB",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "56",
        "logo": "https://api.rango.exchange/blockchains/bsc.svg",
        "displayName": "BNB Smart Chain",
        "shortName": "BSC",
        "sort": 1,
        "color": "#F3BA2F",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Binance Smart Chain Mainnet",
            "nativeCurrency": {
                "name": "BNB",
                "symbol": "BNB",
                "decimals": 18
            },
            "rpcUrls": [
                "https://bsc-dataseed1.ninicoin.io"
            ],
            "blockExplorerUrls": [
                "https://bscscan.com"
            ],
            "addressUrl": "https://bscscan.com/address/{wallet}",
            "transactionUrl": "https://bscscan.com/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "ARBITRUM",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "ARBITRUM",
                "symbol": "ETH",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "42161",
        "logo": "https://api.rango.exchange/blockchains/arbitrum.svg",
        "displayName": "Arbitrum",
        "shortName": "Arbitrum",
        "sort": 2,
        "color": "#28a0f0",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Arbitrum One",
            "nativeCurrency": {
                "name": "ETH",
                "symbol": "ETH",
                "decimals": 18
            },
            "rpcUrls": [
                "https://arb1.arbitrum.io/rpc"
            ],
            "blockExplorerUrls": [
                "https://arbiscan.io"
            ],
            "addressUrl": "https://arbiscan.io/address/{wallet}",
            "transactionUrl": "https://arbiscan.io/tx/{txHash}",
            "enableGasV2": true
        }
    },
    {
        "name": "POLYGON",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "POLYGON",
                "symbol": "MATIC",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "137",
        "logo": "https://api.rango.exchange/blockchains/polygon.svg",
        "displayName": "Polygon",
        "shortName": "Polygon",
        "sort": 3,
        "color": "#8247E5",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Polygon Mainnet",
            "nativeCurrency": {
                "name": "MATIC",
                "symbol": "MATIC",
                "decimals": 18
            },
            "rpcUrls": [
                "https://polygon-rpc.com"
            ],
            "blockExplorerUrls": [
                "https://polygonscan.com"
            ],
            "addressUrl": "https://polygonscan.com/address/{wallet}",
            "transactionUrl": "https://polygonscan.com/tx/{txHash}",
            "enableGasV2": true
        }
    },
    {
        "name": "ZKSYNC",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "ZKSYNC",
                "symbol": "ETH",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "324",
        "logo": "https://api.rango.exchange/blockchains/zksync.png",
        "displayName": "zkSync era",
        "shortName": "zkSync",
        "sort": 4,
        "color": "#2D2925",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "zkSync",
            "nativeCurrency": {
                "name": "ETH",
                "symbol": "ETH",
                "decimals": 18
            },
            "rpcUrls": [
                "https://mainnet.era.zksync.io"
            ],
            "blockExplorerUrls": [
                "https://explorer.zksync.io"
            ],
            "addressUrl": "https://explorer.zksync.io/address/{wallet}",
            "transactionUrl": "https://explorer.zksync.io/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "STARKNET",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{32,64}$"
        ],
        "feeAssets": [
            {
                "blockchain": "STARKNET",
                "symbol": "ETH",
                "address": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
            }
        ],
        "type": "STARKNET",
        "chainId": "SN_MAIN",
        "logo": "https://api.rango.exchange/blockchains/starknet.svg",
        "displayName": "StarkNet",
        "shortName": "StarkNet",
        "sort": 5,
        "color": "#708DD2",
        "enabled": true,
        "info": {
            "infoType": "StarkNetMetaInfo",
            "chainName": "StarkNet Mainnet",
            "nativeCurrency": {
                "name": "ETH",
                "symbol": "ETH",
                "decimals": 18
            },
            "blockExplorerUrls": [
                "https://starkscan.co"
            ],
            "addressUrl": "https://starkscan.co/contract/{wallet}",
            "transactionUrl": "https://starkscan.co/tx/{txHash}"
        }
    },
    {
        "name": "OPTIMISM",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "OPTIMISM",
                "symbol": "ETH",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "10",
        "logo": "https://api.rango.exchange/blockchains/optimism.svg",
        "displayName": "Optimism",
        "shortName": "Optimism",
        "sort": 6,
        "color": "#FF0420",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Optimism",
            "nativeCurrency": {
                "name": "ETH",
                "symbol": "ETH",
                "decimals": 18
            },
            "rpcUrls": [
                "https://mainnet.optimism.io"
            ],
            "blockExplorerUrls": [
                "https://optimistic.etherscan.io"
            ],
            "addressUrl": "https://optimistic.etherscan.io/address/{wallet}",
            "transactionUrl": "https://optimistic.etherscan.io/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "AVAX_CCHAIN",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "AVAX_CCHAIN",
                "symbol": "AVAX",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "43114",
        "logo": "https://api.rango.exchange/blockchains/avax_cchain.svg",
        "displayName": "Avalanche",
        "shortName": "Avax",
        "sort": 7,
        "color": "#e84142",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Avalanche C-Chain",
            "nativeCurrency": {
                "name": "AVAX",
                "symbol": "AVAX",
                "decimals": 18
            },
            "rpcUrls": [
                "https://api.avax.network/ext/bc/C/rpc"
            ],
            "blockExplorerUrls": [
                "https://snowtrace.io"
            ],
            "addressUrl": "https://snowtrace.io/address/{wallet}",
            "transactionUrl": "https://snowtrace.io/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "POLYGONZK",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "POLYGONZK",
                "symbol": "ETH",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "1101",
        "logo": "https://api.rango.exchange/blockchains/zkevmpolygon.png",
        "displayName": "polygon zkEVM",
        "shortName": "polygon zkEVM",
        "sort": 8,
        "color": "#8247e5",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Polygon zkEVM Mainnet",
            "nativeCurrency": {
                "name": "ETH",
                "symbol": "ETH",
                "decimals": 18
            },
            "rpcUrls": [
                "https://zkevm-rpc.com"
            ],
            "blockExplorerUrls": [
                "https://zkevm.polygonscan.com"
            ],
            "addressUrl": "https://zkevm.polygonscan.com/address/{wallet}",
            "transactionUrl": "https://zkevm.polygonscan.com/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "TRON",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^T[1-9A-HJ-NP-Za-km-z]{33}$"
        ],
        "feeAssets": [
            {
                "blockchain": "TRON",
                "symbol": "TRX",
                "address": null
            }
        ],
        "type": "TRON",
        "chainId": "728126428",
        "logo": "https://api.rango.exchange/blockchains/tron.svg",
        "displayName": "Tron",
        "shortName": "Tron",
        "sort": 9,
        "color": "#FF060A",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "TRON Mainnet",
            "nativeCurrency": {
                "name": "TRX",
                "symbol": "TRX",
                "decimals": 6
            },
            "rpcUrls": [
                "https://api.trongrid.io/jsonrpc"
            ],
            "blockExplorerUrls": [
                "https://tronscan.org/#"
            ],
            "addressUrl": "https://tronscan.org/#/address/{wallet}",
            "transactionUrl": "https://tronscan.org/#/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "BTC",
        "defaultDecimals": 8,
        "addressPatterns": [
            "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^(bc1)[0-9A-Za-z]{39,59}$"
        ],
        "feeAssets": [
            {
                "blockchain": "BTC",
                "symbol": "BTC",
                "address": null
            }
        ],
        "type": "TRANSFER",
        "chainId": "",
        "logo": "https://api.rango.exchange/blockchains/btc.svg",
        "displayName": "Bitcoin",
        "shortName": "BTC",
        "sort": 10,
        "color": "#F7931A",
        "enabled": true,
        "info": null
    },
    {
        "name": "COSMOS",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(cosmos1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "COSMOS",
                "symbol": "ATOM",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "cosmoshub-4",
        "logo": "https://api.rango.exchange/blockchains/cosmos.svg",
        "displayName": "Cosmos",
        "shortName": "Cosmos",
        "sort": 11,
        "color": "#2E3148",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://cosmos-rpc.polkachu.com",
            "rest": "https://lcd-cosmoshub.blockapsis.com",
            "cosmostationLcdUrl": "https://lcd-cosmoshub.blockapsis.com",
            "cosmostationApiUrl": "https://cosmos-rpc.polkachu.com",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "cosmos",
            "chainName": "Cosmos",
            "stakeCurrency": {
                "coinDenom": "ATOM",
                "coinMinimalDenom": "uatom",
                "coinDecimals": 6,
                "coinGeckoId": "cosmos",
                "coinImageUrl": "/tokens/blockchain/cosmos.svg"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "cosmos",
                "bech32PrefixAccPub": "cosmospub",
                "bech32PrefixValAddr": "cosmosvaloper",
                "bech32PrefixValPub": "cosmosvaloperpub",
                "bech32PrefixConsAddr": "cosmosvalcons",
                "bech32PrefixConsPub": "cosmosvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "ATOM",
                    "coinMinimalDenom": "uatom",
                    "coinDecimals": 6,
                    "coinGeckoId": "cosmos",
                    "coinImageUrl": "/tokens/blockchain/cosmos.svg"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "ATOM",
                    "coinMinimalDenom": "uatom",
                    "coinDecimals": 6,
                    "coinGeckoId": "cosmos",
                    "coinImageUrl": "/tokens/blockchain/cosmos.svg"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/cosmos/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.01,
                "average": 0.025,
                "high": 0.04
            }
        }
    },
    {
        "name": "OSMOSIS",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(osmo1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "OSMOSIS",
                "symbol": "OSMO",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "osmosis-1",
        "logo": "https://api.rango.exchange/blockchains/osmosis.svg",
        "displayName": "Osmosis",
        "shortName": "Osmosis",
        "sort": 12,
        "color": "#7901B4",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://rpc.osmosis.zone",
            "rest": "https://lcd.osmosis.zone",
            "cosmostationLcdUrl": "https://lcd.osmosis.zone",
            "cosmostationApiUrl": "https://rpc.osmosis.zone",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "osmosis",
            "chainName": "Osmosis",
            "stakeCurrency": {
                "coinDenom": "OSMO",
                "coinMinimalDenom": "uosmo",
                "coinDecimals": 6,
                "coinGeckoId": "pool:uosmo",
                "coinImageUrl": "/tokens/blockchain/osmosis.svg"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "osmo",
                "bech32PrefixAccPub": "osmopub",
                "bech32PrefixValAddr": "osmovaloper",
                "bech32PrefixValPub": "osmovaloperpub",
                "bech32PrefixConsAddr": "osmovalcons",
                "bech32PrefixConsPub": "osmovalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "OSMO",
                    "coinMinimalDenom": "uosmo",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:uosmo",
                    "coinImageUrl": "/tokens/blockchain/osmosis.svg"
                },
                {
                    "coinDenom": "ION",
                    "coinMinimalDenom": "uion",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:uion",
                    "coinImageUrl": "/tokens/blockchain/ion.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "OSMO",
                    "coinMinimalDenom": "uosmo",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:uosmo",
                    "coinImageUrl": "/tokens/blockchain/osmosis.svg"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/osmosis/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.0,
                "average": 0.025,
                "high": 0.04
            }
        }
    },
    {
        "name": "NEUTRON",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(neutron1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "NEUTRON",
                "symbol": "NTRN",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "neutron-1",
        "logo": "https://api.rango.exchange/blockchains/neutron.svg",
        "displayName": "Neutron",
        "shortName": "Neutron",
        "sort": 13,
        "color": "#141414",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://rpc-kralum.neutron-1.neutron.org",
            "rest": "https://rest-kralum.neutron-1.neutron.org",
            "cosmostationLcdUrl": "https://lcd-neutron.whispernode.com",
            "cosmostationApiUrl": "https://neutron-rpc.polkachu.com",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "neutron",
            "chainName": "Neutron",
            "stakeCurrency": {
                "coinDenom": "NTRN",
                "coinMinimalDenom": "untrn",
                "coinDecimals": 6,
                "coinGeckoId": "neutron",
                "coinImageUrl": "/tokens/blockchain/neutron.jpg"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "neutron",
                "bech32PrefixAccPub": "neutronpub",
                "bech32PrefixValAddr": "neutronvaloper",
                "bech32PrefixValPub": "neutronvaloperpub",
                "bech32PrefixConsAddr": "neutronvalcons",
                "bech32PrefixConsPub": "neutronvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "NTRN",
                    "coinMinimalDenom": "untrn",
                    "coinDecimals": 6,
                    "coinGeckoId": "neutron",
                    "coinImageUrl": "/tokens/blockchain/neutron.jpg"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "NTRN",
                    "coinMinimalDenom": "untrn",
                    "coinDecimals": 6,
                    "coinGeckoId": "neutron",
                    "coinImageUrl": "/tokens/blockchain/neutron.jpg"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/neutron/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.01,
                "average": 0.025,
                "high": 0.05
            }
        }
    },
    {
        "name": "SOLANA",
        "defaultDecimals": 9,
        "addressPatterns": [
            "^[1-9A-HJ-NP-Za-km-z]{32,44}$"
        ],
        "feeAssets": [
            {
                "blockchain": "SOLANA",
                "symbol": "SOL",
                "address": null
            }
        ],
        "type": "SOLANA",
        "chainId": "mainnet-beta",
        "logo": "https://api.rango.exchange/blockchains/solana.svg",
        "displayName": "Solana",
        "shortName": "Solana",
        "sort": 14,
        "color": "#708DD2",
        "enabled": true,
        "info": null
    },
    {
        "name": "CRONOS",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "CRONOS",
                "symbol": "CRO",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "25",
        "logo": "https://api.rango.exchange/blockchains/cronos.svg",
        "displayName": "Cronos",
        "shortName": "Cronos",
        "sort": 15,
        "color": "#1a90ff",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Cronos Mainnet Beta",
            "nativeCurrency": {
                "name": "CRO",
                "symbol": "CRO",
                "decimals": 18
            },
            "rpcUrls": [
                "https://evm.cronos.org"
            ],
            "blockExplorerUrls": [
                "https://cronoscan.com"
            ],
            "addressUrl": "https://cronoscan.com/address/{wallet}",
            "transactionUrl": "https://cronoscan.com/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "BNB",
        "defaultDecimals": 8,
        "addressPatterns": [
            "^(bnb1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "BNB",
                "symbol": "BNB",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "",
        "logo": "https://api.rango.exchange/blockchains/bnb.svg",
        "displayName": "Binance Chain",
        "shortName": "BNB",
        "sort": 16,
        "color": "#F3BA2F",
        "enabled": true,
        "info": null
    },
    {
        "name": "FANTOM",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "FANTOM",
                "symbol": "FTM",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "250",
        "logo": "https://api.rango.exchange/blockchains/fantom.png",
        "displayName": "Fantom",
        "shortName": "Fantom",
        "sort": 17,
        "color": "#337afe",
        "enabled": false,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Fantom Opera",
            "nativeCurrency": {
                "name": "FTM",
                "symbol": "FTM",
                "decimals": 18
            },
            "rpcUrls": [
                "https://rpc.ftm.tools"
            ],
            "blockExplorerUrls": [
                "https://ftmscan.com"
            ],
            "addressUrl": "https://ftmscan.com/address/{wallet}",
            "transactionUrl": "https://ftmscan.com/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "AURORA",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "AURORA",
                "symbol": "ETH",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "1313161554",
        "logo": "https://api.rango.exchange/blockchains/aurora.svg",
        "displayName": "Aurora",
        "shortName": "Aurora",
        "sort": 18,
        "color": "#78d64b",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Aurora Mainnet",
            "nativeCurrency": {
                "name": "ETH",
                "symbol": "ETH",
                "decimals": 18
            },
            "rpcUrls": [
                "https://mainnet.aurora.dev"
            ],
            "blockExplorerUrls": [
                "https://explorer.mainnet.aurora.dev"
            ],
            "addressUrl": "https://explorer.mainnet.aurora.dev/address/{wallet}",
            "transactionUrl": "https://explorer.mainnet.aurora.dev/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "MAYA",
        "defaultDecimals": 8,
        "addressPatterns": [
            "^(maya1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "MAYA",
                "symbol": "CACAO",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "",
        "logo": "https://api.rango.exchange/blockchains/maya.svg",
        "displayName": "MayaChain",
        "shortName": "MayaChain",
        "sort": 19,
        "color": "#1ae6e6",
        "enabled": true,
        "info": null
    },
    {
        "name": "THOR",
        "defaultDecimals": 8,
        "addressPatterns": [
            "^(thor1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "THOR",
                "symbol": "RUNE",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "thorchain-mainnet-v1",
        "logo": "https://api.rango.exchange/blockchains/thorchain.svg",
        "displayName": "Thorchain",
        "shortName": "Thorchain",
        "sort": 20,
        "color": "#1AE6CB",
        "enabled": true,
        "info": null
    },
    {
        "name": "BOBA",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "BOBA",
                "symbol": "ETH",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "288",
        "logo": "https://api.rango.exchange/blockchains/boba.png",
        "displayName": "Boba",
        "shortName": "Boba",
        "sort": 21,
        "color": "#ccff00",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Boba Network",
            "nativeCurrency": {
                "name": "ETH",
                "symbol": "ETH",
                "decimals": 18
            },
            "rpcUrls": [
                "https://mainnet.boba.network"
            ],
            "blockExplorerUrls": [
                "https://bobascan.com/"
            ],
            "addressUrl": "https://bobascan.com//address/{wallet}",
            "transactionUrl": "https://bobascan.com//tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "MOONBEAM",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "MOONBEAM",
                "symbol": "GLMR",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "1284",
        "logo": "https://api.rango.exchange/blockchains/moonbeam.png",
        "displayName": "MoonBeam",
        "shortName": "MoonBeam",
        "sort": 22,
        "color": "#B3206B",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "MoonBeam",
            "nativeCurrency": {
                "name": "GLMR",
                "symbol": "GLMR",
                "decimals": 18
            },
            "rpcUrls": [
                "https://rpc.api.moonbeam.network"
            ],
            "blockExplorerUrls": [
                "https://moonbeam.moonscan.io"
            ],
            "addressUrl": "https://moonbeam.moonscan.io/address/{wallet}",
            "transactionUrl": "https://moonbeam.moonscan.io/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "MOONRIVER",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "MOONRIVER",
                "symbol": "MOVR",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "1285",
        "logo": "https://api.rango.exchange/blockchains/moonriver.svg",
        "displayName": "MoonRiver",
        "shortName": "MoonRiver",
        "sort": 23,
        "color": "#F3B404",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "MoonRiver",
            "nativeCurrency": {
                "name": "MOVR",
                "symbol": "MOVR",
                "decimals": 18
            },
            "rpcUrls": [
                "https://rpc.moonriver.moonbeam.network"
            ],
            "blockExplorerUrls": [
                "https://moonriver.moonscan.io"
            ],
            "addressUrl": "https://moonriver.moonscan.io/address/{wallet}",
            "transactionUrl": "https://moonriver.moonscan.io/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "OKC",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "OKC",
                "symbol": "OKT",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "66",
        "logo": "https://api.rango.exchange/blockchains/okx.png",
        "displayName": "OKX Chain (OKC)",
        "shortName": "Okx",
        "sort": 24,
        "color": "#29a0f0",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "OKX Chain",
            "nativeCurrency": {
                "name": "OKT",
                "symbol": "OKT",
                "decimals": 18
            },
            "rpcUrls": [
                "https://exchainrpc.okex.org"
            ],
            "blockExplorerUrls": [
                "https://www.oklink.com/en/okc"
            ],
            "addressUrl": "https://www.oklink.com/en/okc/address/{wallet}",
            "transactionUrl": "https://www.oklink.com/en/okc/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "BOBA_BNB",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "BOBA_BNB",
                "symbol": "BOBA",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "56288",
        "logo": "https://api.rango.exchange/blockchains/boba.png",
        "displayName": "Boba Bnb",
        "shortName": "Boba Bnb",
        "sort": 25,
        "color": "#ccff00",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Boba Bnb Network",
            "nativeCurrency": {
                "name": "BOBA",
                "symbol": "BOBA",
                "decimals": 18
            },
            "rpcUrls": [
                "https://bnb.boba.network"
            ],
            "blockExplorerUrls": [
                "https://blockexplorer.bnb.boba.network"
            ],
            "addressUrl": "https://blockexplorer.bnb.boba.network/address/{wallet}",
            "transactionUrl": "https://blockexplorer.bnb.boba.network/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "BOBA_AVALANCHE",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "BOBA_AVALANCHE",
                "symbol": "BOBA",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "43288",
        "logo": "https://api.rango.exchange/blockchains/boba.png",
        "displayName": "Boba Avalanche",
        "shortName": "Boba Avalanche",
        "sort": 26,
        "color": "#ccff00",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Boba Avalanche Network",
            "nativeCurrency": {
                "name": "BOBA",
                "symbol": "BOBA",
                "decimals": 18
            },
            "rpcUrls": [
                "https://avax.boba.network"
            ],
            "blockExplorerUrls": [
                "https://blockexplorer.avax.boba.network"
            ],
            "addressUrl": "https://blockexplorer.avax.boba.network/address/{wallet}",
            "transactionUrl": "https://blockexplorer.avax.boba.network/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "LTC",
        "defaultDecimals": 8,
        "addressPatterns": [
            "^(L|M|3)[A-Za-z0-9]{33}$|^(ltc1)[0-9A-Za-z]{39}$"
        ],
        "feeAssets": [
            {
                "blockchain": "LTC",
                "symbol": "LTC",
                "address": null
            }
        ],
        "type": "TRANSFER",
        "chainId": "",
        "logo": "https://api.rango.exchange/blockchains/ltc.svg",
        "displayName": "LiteCoin",
        "shortName": "LTC",
        "sort": 27,
        "color": "#345D9D",
        "enabled": true,
        "info": null
    },
    {
        "name": "BCH",
        "defaultDecimals": 8,
        "addressPatterns": [
            "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^[0-9A-Za-z]{42,42}$"
        ],
        "feeAssets": [
            {
                "blockchain": "BCH",
                "symbol": "BCH",
                "address": null
            }
        ],
        "type": "TRANSFER",
        "chainId": "",
        "logo": "https://api.rango.exchange/blockchains/bch.svg",
        "displayName": "Bitcoin Cash",
        "shortName": "BCH",
        "sort": 28,
        "color": "#0AC18E",
        "enabled": true,
        "info": null
    },
    {
        "name": "HARMONY",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(one1)[0-9a-z]{38}$",
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "HARMONY",
                "symbol": "ONE",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "1666600000",
        "logo": "https://api.rango.exchange/blockchains/harmony.svg",
        "displayName": "Harmony",
        "shortName": "Harmony",
        "sort": 29,
        "color": "#50AEE9",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Harmony Mainnet",
            "nativeCurrency": {
                "name": "ONE",
                "symbol": "ONE",
                "decimals": 18
            },
            "rpcUrls": [
                "https://rpc.ankr.com/harmony"
            ],
            "blockExplorerUrls": [
                "https://explorer.harmony.one"
            ],
            "addressUrl": "https://explorer.harmony.one/address/{wallet}",
            "transactionUrl": "https://explorer.harmony.one/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "EVMOS",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "EVMOS",
                "symbol": "EVMOS",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "9001",
        "logo": "https://api.rango.exchange/blockchains/evmos.png",
        "displayName": "Evmos",
        "shortName": "Evmos",
        "sort": 30,
        "color": "#2D2925",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Evmos",
            "nativeCurrency": {
                "name": "EVMOS",
                "symbol": "EVMOS",
                "decimals": 18
            },
            "rpcUrls": [
                "https://eth.bd.evmos.org:8545"
            ],
            "blockExplorerUrls": [
                "https://evm.evmos.org"
            ],
            "addressUrl": "https://evm.evmos.org/address/{wallet}",
            "transactionUrl": "https://evm.evmos.org/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "HECO",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "HECO",
                "symbol": "HT",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "128",
        "logo": "https://api.rango.exchange/blockchains/heco.png",
        "displayName": "Heco",
        "shortName": "Heco",
        "sort": 31,
        "color": "#4CA852",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Huobi ECO Chain Mainnet",
            "nativeCurrency": {
                "name": "HT",
                "symbol": "HT",
                "decimals": 18
            },
            "rpcUrls": [
                "https://http-mainnet.hecochain.com"
            ],
            "blockExplorerUrls": [
                "https://hecoinfo.com"
            ],
            "addressUrl": "https://hecoinfo.com/address/{wallet}",
            "transactionUrl": "https://hecoinfo.com/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "SIF",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(sif1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "SIF",
                "symbol": "ROWAN",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "sifchain-1",
        "logo": "https://api.rango.exchange/blockchains/sif.png",
        "displayName": "Sifchain",
        "shortName": "Sifchain",
        "sort": 32,
        "color": "#CAAA3A",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://sifchain-rpc.publicnode.com",
            "rest": "https://sifchain-rest.publicnode.com",
            "cosmostationLcdUrl": "https://sifchain-rest.publicnode.com",
            "cosmostationApiUrl": "https://sifchain-rpc.publicnode.com",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "sifchain",
            "chainName": "Sifchain",
            "stakeCurrency": {
                "coinDenom": "ROWAN",
                "coinMinimalDenom": "rowan",
                "coinDecimals": 18,
                "coinGeckoId": "",
                "coinImageUrl": ""
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "sif",
                "bech32PrefixAccPub": "sifpub",
                "bech32PrefixValAddr": "sifvaloper",
                "bech32PrefixValPub": "sifvaloperpub",
                "bech32PrefixConsAddr": "sifvalcons",
                "bech32PrefixConsPub": "sifvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "ROWAN",
                    "coinMinimalDenom": "rowan",
                    "coinDecimals": 18,
                    "coinGeckoId": "",
                    "coinImageUrl": ""
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "ROWAN",
                    "coinMinimalDenom": "rowan",
                    "coinDecimals": 18,
                    "coinGeckoId": "",
                    "coinImageUrl": ""
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/sifchain/txs/{txHash}",
            "gasPriceStep": {
                "low": 1.0E12,
                "average": 1.5E12,
                "high": 2.0E12
            }
        }
    },
    {
        "name": "BRISE",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "BRISE",
                "symbol": "BRISE",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "32520",
        "logo": "https://api.rango.exchange/blockchains/bitgert.png",
        "displayName": "Brise",
        "shortName": "Brise",
        "sort": 33,
        "color": "#0693E3",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Brise",
            "nativeCurrency": {
                "name": "BRISE",
                "symbol": "BRISE",
                "decimals": 18
            },
            "rpcUrls": [
                "https://rpc.icecreamswap.com"
            ],
            "blockExplorerUrls": [
                "https://brisescan.com/"
            ],
            "addressUrl": "https://brisescan.com//address/{wallet}",
            "transactionUrl": "https://brisescan.com//tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "STARGAZE",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(stars1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "STARGAZE",
                "symbol": "STARS",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "stargaze-1",
        "logo": "https://api.rango.exchange/blockchains/stargaze.png",
        "displayName": "Stargaze",
        "shortName": "Stargaze",
        "sort": 34,
        "color": "#231B60",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://rpc.stargaze-apis.com",
            "rest": "https://rest.stargaze-apis.com",
            "cosmostationLcdUrl": "https://rpc.stargaze-apis.com",
            "cosmostationApiUrl": "https://rest.stargaze-apis.com",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "stargaze",
            "chainName": "Stargaze",
            "stakeCurrency": {
                "coinDenom": "STARS",
                "coinMinimalDenom": "ustars",
                "coinDecimals": 6,
                "coinGeckoId": "pool:ustars",
                "coinImageUrl": "/tokens/blockchain/STARS.png"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "stars",
                "bech32PrefixAccPub": "starspub",
                "bech32PrefixValAddr": "starsvaloper",
                "bech32PrefixValPub": "starsvaloperpub",
                "bech32PrefixConsAddr": "starsvalcons",
                "bech32PrefixConsPub": "starsvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "STARS",
                    "coinMinimalDenom": "ustars",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:ustars",
                    "coinImageUrl": "/tokens/blockchain/STARS.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "STARS",
                    "coinMinimalDenom": "ustars",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:ustars",
                    "coinImageUrl": "/tokens/blockchain/STARS.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer",
                "no-legacy-stdTx"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/stargaze/txs/{txHash}",
            "gasPriceStep": {
                "low": 1.0,
                "average": 1.0,
                "high": 1.0
            }
        }
    },
    {
        "name": "FUSE",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "FUSE",
                "symbol": "FUSE",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "122",
        "logo": "https://api.rango.exchange/blockchains/fuse.png",
        "displayName": "Fuse",
        "shortName": "Fuse",
        "sort": 35,
        "color": "#C5F9AD",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Fuse Mainnet",
            "nativeCurrency": {
                "name": "FUSE",
                "symbol": "FUSE",
                "decimals": 18
            },
            "rpcUrls": [
                "https://rpc.fuse.io"
            ],
            "blockExplorerUrls": [
                "https://explorer.fuse.io"
            ],
            "addressUrl": "https://explorer.fuse.io/address/{wallet}",
            "transactionUrl": "https://explorer.fuse.io/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "CRYPTO_ORG",
        "defaultDecimals": 8,
        "addressPatterns": [
            "^(cro1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "CRYPTO_ORG",
                "symbol": "CRO",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "crypto-org-chain-mainnet-1",
        "logo": "https://api.rango.exchange/blockchains/crypto_org.png",
        "displayName": "Crypto.org",
        "shortName": "Crypto.org",
        "sort": 36,
        "color": "#103F68",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://rpc.mainnet.crypto.org",
            "rest": "https://rest.mainnet.crypto.org",
            "cosmostationLcdUrl": "https://rest.mainnet.crypto.org",
            "cosmostationApiUrl": "https://rpc.mainnet.crypto.org",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "crypto-org",
            "chainName": "Crypto.org",
            "stakeCurrency": {
                "coinDenom": "CRO",
                "coinMinimalDenom": "basecro",
                "coinDecimals": 8,
                "coinGeckoId": "crypto-com-chain",
                "coinImageUrl": "/tokens/blockchain/cro.png"
            },
            "bip44": {
                "coinType": 394
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "cro",
                "bech32PrefixAccPub": "cropub",
                "bech32PrefixValAddr": "crovaloper",
                "bech32PrefixValPub": "crovaloperpub",
                "bech32PrefixConsAddr": "crovalcons",
                "bech32PrefixConsPub": "crovalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "CRO",
                    "coinMinimalDenom": "basecro",
                    "coinDecimals": 8,
                    "coinGeckoId": "crypto-com-chain",
                    "coinImageUrl": "/tokens/blockchain/cro.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "CRO",
                    "coinMinimalDenom": "basecro",
                    "coinDecimals": 8,
                    "coinGeckoId": "crypto-com-chain",
                    "coinImageUrl": "/tokens/blockchain/cro.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/crypto-org/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.025,
                "average": 0.03,
                "high": 0.04
            }
        }
    },
    {
        "name": "CHIHUAHUA",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(chihuahua1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "CHIHUAHUA",
                "symbol": "HUAHUA",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "chihuahua-1",
        "logo": "https://api.rango.exchange/blockchains/chihuahua.png",
        "displayName": "Chihuahua",
        "shortName": "Chihuahua",
        "sort": 37,
        "color": "#EFC92B",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": true,
            "rpc": "https://rpc.chihuahua.wtf",
            "rest": "https://api.chihuahua.wtf",
            "cosmostationLcdUrl": "https://api.chihuahua.wtf",
            "cosmostationApiUrl": "https://rpc.chihuahua.wtf",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "chihuahua",
            "chainName": "Chihuahua",
            "stakeCurrency": {
                "coinDenom": "HUAHUA",
                "coinMinimalDenom": "uhuahua",
                "coinDecimals": 6,
                "coinGeckoId": "pool:uhuahua",
                "coinImageUrl": "/tokens/blockchain/HUAHUA.svg"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "chihuahua",
                "bech32PrefixAccPub": "chihuahuapub",
                "bech32PrefixValAddr": "chihuahuavaloper",
                "bech32PrefixValPub": "chihuahuavaloperpub",
                "bech32PrefixConsAddr": "chihuahuavalcons",
                "bech32PrefixConsPub": "chihuahuavalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "HUAHUA",
                    "coinMinimalDenom": "uhuahua",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:uhuahua",
                    "coinImageUrl": "/tokens/blockchain/HUAHUA.svg"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "HUAHUA",
                    "coinMinimalDenom": "uhuahua",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:uhuahua",
                    "coinImageUrl": "/tokens/blockchain/HUAHUA.svg"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer",
                "no-legacy-stdTx"
            ],
            "explorerUrlToTx": "https://ping.pub/chihuahua/tx/{txHash}",
            "gasPriceStep": {
                "low": 0.025,
                "average": 0.03,
                "high": 0.035
            }
        }
    },
    {
        "name": "BANDCHAIN",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(band1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "BANDCHAIN",
                "symbol": "BAND",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "laozi-mainnet",
        "logo": "https://api.rango.exchange/blockchains/bandchain.svg",
        "displayName": "BandChain",
        "shortName": "BandChain",
        "sort": 38,
        "color": "#4520E6",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": true,
            "rpc": "https://rpc.laozi3.bandchain.org/",
            "rest": "https://laozi1.bandchain.org/api",
            "cosmostationLcdUrl": "https://laozi1.bandchain.org/api",
            "cosmostationApiUrl": "https://rpc.laozi3.bandchain.org",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "band",
            "chainName": "BandChain",
            "stakeCurrency": {
                "coinDenom": "BAND",
                "coinMinimalDenom": "uband",
                "coinDecimals": 6,
                "coinGeckoId": "band-protocol",
                "coinImageUrl": "/tokens/blockchain/BAND.svg"
            },
            "bip44": {
                "coinType": 494
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "band",
                "bech32PrefixAccPub": "bandpub",
                "bech32PrefixValAddr": "bandvaloper",
                "bech32PrefixValPub": "bandvaloperpub",
                "bech32PrefixConsAddr": "bandvalcons",
                "bech32PrefixConsPub": "bandvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "BAND",
                    "coinMinimalDenom": "uband",
                    "coinDecimals": 6,
                    "coinGeckoId": "band-protocol",
                    "coinImageUrl": "/tokens/blockchain/BAND.svg"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "BAND",
                    "coinMinimalDenom": "uband",
                    "coinDecimals": 6,
                    "coinGeckoId": "band-protocol",
                    "coinImageUrl": "/tokens/blockchain/BAND.svg"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer",
                "no-legacy-stdTx"
            ],
            "explorerUrlToTx": "https://cosmoscan.io/tx/{txHash}",
            "gasPriceStep": null
        }
    },
    {
        "name": "COMDEX",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(comdex1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "COMDEX",
                "symbol": "CMDX",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "comdex-1",
        "logo": "https://api.rango.exchange/blockchains/comdex.svg",
        "displayName": "Comdex",
        "shortName": "Comdex",
        "sort": 39,
        "color": "#FE4350",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": true,
            "rpc": "https://rpc.comdex.one",
            "rest": "https://rest.comdex.one",
            "cosmostationLcdUrl": "https://rest.comdex.one",
            "cosmostationApiUrl": "https://rpc.comdex.one",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "comdex",
            "chainName": "Comdex",
            "stakeCurrency": {
                "coinDenom": "CMDX",
                "coinMinimalDenom": "ucmdx",
                "coinDecimals": 6,
                "coinGeckoId": "comdex",
                "coinImageUrl": "/tokens/blockchain/CMDX.png"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "comdex",
                "bech32PrefixAccPub": "comdexpub",
                "bech32PrefixValAddr": "comdexvaloper",
                "bech32PrefixValPub": "comdexvaloperpub",
                "bech32PrefixConsAddr": "comdexvalcons",
                "bech32PrefixConsPub": "comdexvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "CMDX",
                    "coinMinimalDenom": "ucmdx",
                    "coinDecimals": 6,
                    "coinGeckoId": "comdex",
                    "coinImageUrl": "/tokens/blockchain/CMDX.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "CMDX",
                    "coinMinimalDenom": "ucmdx",
                    "coinDecimals": 6,
                    "coinGeckoId": "comdex",
                    "coinImageUrl": "/tokens/blockchain/CMDX.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer",
                "no-legacy-stdTx"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/comdex/txs/{txHash}",
            "gasPriceStep": null
        }
    },
    {
        "name": "REGEN",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(regen1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "REGEN",
                "symbol": "REGEN",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "regen-1",
        "logo": "https://api.rango.exchange/blockchains/regen.png",
        "displayName": "Regen Network",
        "shortName": "Regen Network",
        "sort": 40,
        "color": "#4FB573",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://rpc-regen.ecostake.com",
            "rest": "https://regen.stakesystems.io",
            "cosmostationLcdUrl": "https://regen.stakesystems.io",
            "cosmostationApiUrl": "https://rpc-regen.ecostake.com",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "regen",
            "chainName": "Regen Network",
            "stakeCurrency": {
                "coinDenom": "REGEN",
                "coinMinimalDenom": "uregen",
                "coinDecimals": 6,
                "coinGeckoId": "pool:uregen",
                "coinImageUrl": "/tokens/blockchain/regen.png"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "regen",
                "bech32PrefixAccPub": "regenpub",
                "bech32PrefixValAddr": "regenvaloper",
                "bech32PrefixValPub": "regenvaloperpub",
                "bech32PrefixConsAddr": "regenvalcons",
                "bech32PrefixConsPub": "regenvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "REGEN",
                    "coinMinimalDenom": "uregen",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:uregen",
                    "coinImageUrl": "/tokens/blockchain/regen.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "REGEN",
                    "coinMinimalDenom": "uregen",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:uregen",
                    "coinImageUrl": "/tokens/blockchain/regen.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://regen.aneka.io/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.015,
                "average": 0.025,
                "high": 0.04
            }
        }
    },
    {
        "name": "IRIS",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(iaa1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "IRIS",
                "symbol": "IRIS",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "irishub-1",
        "logo": "https://api.rango.exchange/blockchains/iris.png",
        "displayName": "IRISnet",
        "shortName": "IRISnet",
        "sort": 41,
        "color": "#8A4A8E",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://rpc.nyancat.irisnet.org",
            "rest": "https://lcd.nyancat.irisnet.org",
            "cosmostationLcdUrl": "https://lcd.nyancat.irisnet.org",
            "cosmostationApiUrl": "https://rpc.nyancat.irisnet.org",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "iris",
            "chainName": "IRISnet",
            "stakeCurrency": {
                "coinDenom": "IRIS",
                "coinMinimalDenom": "uiris",
                "coinDecimals": 6,
                "coinGeckoId": "iris-network",
                "coinImageUrl": "/tokens/blockchain/iris.svg"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "iaa",
                "bech32PrefixAccPub": "iaapub",
                "bech32PrefixValAddr": "iaavaloper",
                "bech32PrefixValPub": "iaavaloperpub",
                "bech32PrefixConsAddr": "iaavalcons",
                "bech32PrefixConsPub": "iaavalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "IRIS",
                    "coinMinimalDenom": "uiris",
                    "coinDecimals": 6,
                    "coinGeckoId": "iris-network",
                    "coinImageUrl": "/tokens/blockchain/iris.svg"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "IRIS",
                    "coinMinimalDenom": "uiris",
                    "coinDecimals": 6,
                    "coinGeckoId": "iris-network",
                    "coinImageUrl": "/tokens/blockchain/iris.svg"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/iris/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.2,
                "average": 0.3,
                "high": 0.4
            }
        }
    },
    {
        "name": "EMONEY",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(emoney1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "EMONEY",
                "symbol": "NGM",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "emoney-3",
        "logo": "https://api.rango.exchange/blockchains/emoney.svg",
        "displayName": "e-Money",
        "shortName": "e-Money",
        "sort": 42,
        "color": "#DFF5EF",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": true,
            "rpc": "https://emoney.validator.network/",
            "rest": "https://emoney.validator.network/api",
            "cosmostationLcdUrl": "https://emoney.validator.network/api",
            "cosmostationApiUrl": "https://emoney.validator.network",
            "cosmostationDenomTracePath": "/ibc/applications/transfer/v1beta1/denom_traces/",
            "mintScanName": "emoney",
            "chainName": "e-Money",
            "stakeCurrency": {
                "coinDenom": "NGM",
                "coinMinimalDenom": "ungm",
                "coinDecimals": 6,
                "coinGeckoId": "e-money",
                "coinImageUrl": "/tokens/blockchain/NGM.png"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "emoney",
                "bech32PrefixAccPub": "emoneypub",
                "bech32PrefixValAddr": "emoneyvaloper",
                "bech32PrefixValPub": "emoneyvaloperpub",
                "bech32PrefixConsAddr": "emoneyvalcons",
                "bech32PrefixConsPub": "emoneyvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "NGM",
                    "coinMinimalDenom": "ungm",
                    "coinDecimals": 6,
                    "coinGeckoId": "e-money",
                    "coinImageUrl": "/tokens/blockchain/NGM.png"
                },
                {
                    "coinDenom": "EEUR",
                    "coinMinimalDenom": "eeur",
                    "coinDecimals": 6,
                    "coinGeckoId": "e-money-eur",
                    "coinImageUrl": "/tokens/blockchain/EEUR.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "NGM",
                    "coinMinimalDenom": "ungm",
                    "coinDecimals": 6,
                    "coinGeckoId": "e-money",
                    "coinImageUrl": "/tokens/blockchain/NGM.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://emoney.bigdipper.live/transactions/{txHash}",
            "gasPriceStep": {
                "low": 1.0,
                "average": 1.0,
                "high": 1.0
            }
        }
    },
    {
        "name": "GNOSIS",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "GNOSIS",
                "symbol": "XDAI",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "100",
        "logo": "https://api.rango.exchange/blockchains/gnosis.svg",
        "displayName": "Gnosis",
        "shortName": "Gnosis",
        "sort": 43,
        "color": "#3E6957",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Gnosis Chain",
            "nativeCurrency": {
                "name": "XDAI",
                "symbol": "XDAI",
                "decimals": 18
            },
            "rpcUrls": [
                "https://rpc.gnosischain.com"
            ],
            "blockExplorerUrls": [
                "https://blockscout.com/xdai/mainnet"
            ],
            "addressUrl": "https://blockscout.com/xdai/mainnet/address/{wallet}",
            "transactionUrl": "https://blockscout.com/xdai/mainnet/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "JUNO",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(juno1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "JUNO",
                "symbol": "JUNO",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "juno-1",
        "logo": "https://api.rango.exchange/blockchains/juno.svg",
        "displayName": "Juno",
        "shortName": "Juno",
        "sort": 44,
        "color": "#f0827d",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://rpc-juno.itastakers.com:443/",
            "rest": "https://lcd-juno.itastakers.com",
            "cosmostationLcdUrl": "https://lcd-juno.itastakers.com",
            "cosmostationApiUrl": "https://rpc-juno.itastakers.com",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "juno",
            "chainName": "Juno",
            "stakeCurrency": {
                "coinDenom": "JUNO",
                "coinMinimalDenom": "ujuno",
                "coinDecimals": 6,
                "coinGeckoId": "juno-network",
                "coinImageUrl": "/tokens/blockchain/JUNO.png"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "juno",
                "bech32PrefixAccPub": "junopub",
                "bech32PrefixValAddr": "junovaloper",
                "bech32PrefixValPub": "junovaloperpub",
                "bech32PrefixConsAddr": "junovalcons",
                "bech32PrefixConsPub": "junovalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "JUNO",
                    "coinMinimalDenom": "ujuno",
                    "coinDecimals": 6,
                    "coinGeckoId": "juno-network",
                    "coinImageUrl": "/tokens/blockchain/JUNO.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "JUNO",
                    "coinMinimalDenom": "ujuno",
                    "coinDecimals": 6,
                    "coinGeckoId": "juno-network",
                    "coinImageUrl": "/tokens/blockchain/JUNO.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/juno/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.001,
                "average": 0.0025,
                "high": 0.004
            }
        }
    },
    {
        "name": "AXELAR",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(axelar1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "AXELAR",
                "symbol": "AXL",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "axelar-dojo-1",
        "logo": "https://api.rango.exchange/blockchains/axelar.png",
        "displayName": "Axelar",
        "shortName": "Axelar",
        "sort": 45,
        "color": "#15181C",
        "enabled": false,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://mainnet-rpc-router.axelar-dev.workers.dev/chain/axelar",
            "rest": "https://axelar-lcd.quickapi.com",
            "cosmostationLcdUrl": "https://axelar-lcd.quickapi.com",
            "cosmostationApiUrl": "https://mainnet-rpc-router.axelar-dev.workers.dev/chain/axelar",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "axelar",
            "chainName": "Axelar",
            "stakeCurrency": {
                "coinDenom": "AXL",
                "coinMinimalDenom": "uaxl",
                "coinDecimals": 6,
                "coinGeckoId": "axelar",
                "coinImageUrl": "/tokens/blockchain/axl.png"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "axl",
                "bech32PrefixAccPub": "axlpub",
                "bech32PrefixValAddr": "axlvaloper",
                "bech32PrefixValPub": "axlvaloperpub",
                "bech32PrefixConsAddr": "axlvalcons",
                "bech32PrefixConsPub": "axlvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "AXL",
                    "coinMinimalDenom": "uaxl",
                    "coinDecimals": 6,
                    "coinGeckoId": "axelar",
                    "coinImageUrl": "/tokens/blockchain/axl.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "AXL",
                    "coinMinimalDenom": "uaxl",
                    "coinDecimals": 6,
                    "coinGeckoId": "axelar",
                    "coinImageUrl": "/tokens/blockchain/axl.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/axelar/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.007,
                "average": 0.007,
                "high": 0.01
            }
        }
    },
    {
        "name": "STRIDE",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(stride1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "STRIDE",
                "symbol": "STRD",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "stride-1",
        "logo": "https://api.rango.exchange/blockchains/stride.svg",
        "displayName": "Stride",
        "shortName": "Stride",
        "sort": 46,
        "color": "#D63178",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://stride-rpc.polkachu.com",
            "rest": "https://stride-api.polkachu.com",
            "cosmostationLcdUrl": "https://stride-api.polkachu.com",
            "cosmostationApiUrl": "https://stride-rpc.polkachu.com",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "stride",
            "chainName": "Stride",
            "stakeCurrency": {
                "coinDenom": "STRD",
                "coinMinimalDenom": "ustrd",
                "coinDecimals": 6,
                "coinGeckoId": "stride",
                "coinImageUrl": ""
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "stride",
                "bech32PrefixAccPub": "stridepub",
                "bech32PrefixValAddr": "stridevaloper",
                "bech32PrefixValPub": "stridevaloperpub",
                "bech32PrefixConsAddr": "stridevalcons",
                "bech32PrefixConsPub": "stridevalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "STRD",
                    "coinMinimalDenom": "ustrd",
                    "coinDecimals": 6,
                    "coinGeckoId": "stride",
                    "coinImageUrl": ""
                },
                {
                    "coinDenom": "stATOM",
                    "coinMinimalDenom": "stuatom",
                    "coinDecimals": 6,
                    "coinGeckoId": "stride-staked-atom",
                    "coinImageUrl": ""
                },
                {
                    "coinDenom": "stOSMO",
                    "coinMinimalDenom": "stuosmo",
                    "coinDecimals": 6,
                    "coinGeckoId": "stride-staked-osmo",
                    "coinImageUrl": ""
                },
                {
                    "coinDenom": "stJUNO",
                    "coinMinimalDenom": "stujuno",
                    "coinDecimals": 6,
                    "coinGeckoId": "stride-staked-juno",
                    "coinImageUrl": ""
                },
                {
                    "coinDenom": "stSTARS",
                    "coinMinimalDenom": "stustars",
                    "coinDecimals": 6,
                    "coinGeckoId": "",
                    "coinImageUrl": ""
                },
                {
                    "coinDenom": "stEVMOS",
                    "coinMinimalDenom": "staevmos",
                    "coinDecimals": 18,
                    "coinGeckoId": "",
                    "coinImageUrl": ""
                },
                {
                    "coinDenom": "stLUNA",
                    "coinMinimalDenom": "stuluna",
                    "coinDecimals": 6,
                    "coinGeckoId": "",
                    "coinImageUrl": ""
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "STRD",
                    "coinMinimalDenom": "ustrd",
                    "coinDecimals": 6,
                    "coinGeckoId": "stride",
                    "coinImageUrl": ""
                }
            ],
            "features": [
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/stride/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.001,
                "average": 0.0025,
                "high": 0.04
            }
        }
    },
    {
        "name": "KCC",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "KCC",
                "symbol": "KCS",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "321",
        "logo": "https://api.rango.exchange/blockchains/kcc.png",
        "displayName": "Kcc",
        "shortName": "Kcc",
        "sort": 47,
        "color": "#ccff00",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Kcc Network",
            "nativeCurrency": {
                "name": "KCS",
                "symbol": "KCS",
                "decimals": 18
            },
            "rpcUrls": [
                "https://rpc-mainnet.kcc.network/"
            ],
            "blockExplorerUrls": [
                "https://explorer.kcc.io/en"
            ],
            "addressUrl": "https://explorer.kcc.io/en/address/{wallet}",
            "transactionUrl": "https://explorer.kcc.io/en/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "MARS",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(mars1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "MARS",
                "symbol": "MARS",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "mars-1",
        "logo": "https://api.rango.exchange/blockchains/mars.svg",
        "displayName": "Mars",
        "shortName": "Mars",
        "sort": 48,
        "color": "#CB4B3D",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://rpc.marsprotocol.io",
            "rest": "https://rest.marsprotocol.io",
            "cosmostationLcdUrl": "https://rest.marsprotocol.io",
            "cosmostationApiUrl": "https://rpc.marsprotocol.io",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "mars-protocol",
            "chainName": "Mars",
            "stakeCurrency": {
                "coinDenom": "MARS",
                "coinMinimalDenom": "umars",
                "coinDecimals": 6,
                "coinGeckoId": "mars-protocol-a7fcbcfb-fd61-4017-92f0-7ee9f9cc6da3",
                "coinImageUrl": "/tokens/blockchain/mars.svg"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "mars",
                "bech32PrefixAccPub": "marspub",
                "bech32PrefixValAddr": "marsvaloper",
                "bech32PrefixValPub": "marsvaloperpub",
                "bech32PrefixConsAddr": "marsvalcons",
                "bech32PrefixConsPub": "marsvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "MARS",
                    "coinMinimalDenom": "umars",
                    "coinDecimals": 6,
                    "coinGeckoId": "mars-protocol-a7fcbcfb-fd61-4017-92f0-7ee9f9cc6da3",
                    "coinImageUrl": "/tokens/blockchain/mars.svg"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "MARS",
                    "coinMinimalDenom": "umars",
                    "coinDecimals": 6,
                    "coinGeckoId": "mars-protocol-a7fcbcfb-fd61-4017-92f0-7ee9f9cc6da3",
                    "coinImageUrl": "/tokens/blockchain/mars.svg"
                }
            ],
            "features": [
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/mars-protocol/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.001,
                "average": 0.0025,
                "high": 0.01
            }
        }
    },
    {
        "name": "TERRA",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(terra1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "TERRA",
                "symbol": "LUNA",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "phoenix-1",
        "logo": "https://api.rango.exchange/blockchains/terra.png",
        "displayName": "Terra 2.0",
        "shortName": "Terra 2.0",
        "sort": 49,
        "color": "#5493F7",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://phoenix-rpc.terra.dev",
            "rest": "https://phoenix-lcd.terra.dev",
            "cosmostationLcdUrl": "https://phoenix-lcd.terra.dev",
            "cosmostationApiUrl": null,
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": null,
            "chainName": "Terra 2.0",
            "stakeCurrency": {
                "coinDenom": "LUNA",
                "coinMinimalDenom": "uluna",
                "coinDecimals": 6,
                "coinGeckoId": "terra-luna-2",
                "coinImageUrl": ""
            },
            "bip44": {
                "coinType": 330
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "terra",
                "bech32PrefixAccPub": "terrapub",
                "bech32PrefixValAddr": "terravaloper",
                "bech32PrefixValPub": "terravaloperpub",
                "bech32PrefixConsAddr": "terravalcons",
                "bech32PrefixConsPub": "terravalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "LUNA",
                    "coinMinimalDenom": "uluna",
                    "coinDecimals": 6,
                    "coinGeckoId": "terra-luna-2",
                    "coinImageUrl": ""
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "LUNA",
                    "coinMinimalDenom": "uluna",
                    "coinDecimals": 6,
                    "coinGeckoId": "terra-luna-2",
                    "coinImageUrl": ""
                }
            ],
            "features": [
                "cosmwasm",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://finder.terra.money/mainnet/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.0125,
                "average": 0.015,
                "high": 0.15
            }
        }
    },
    {
        "name": "TELOS",
        "defaultDecimals": 18,
        "addressPatterns": [
            "^(0x)[0-9A-Fa-f]{40}$"
        ],
        "feeAssets": [
            {
                "blockchain": "TELOS",
                "symbol": "TLOS",
                "address": null
            }
        ],
        "type": "EVM",
        "chainId": "40",
        "logo": "https://api.rango.exchange/blockchains/telos.png",
        "displayName": "Telos",
        "shortName": "Telos",
        "sort": 50,
        "color": "#6144ae",
        "enabled": true,
        "info": {
            "infoType": "EvmMetaInfo",
            "chainName": "Telos Mainnet",
            "nativeCurrency": {
                "name": "TLOS",
                "symbol": "TLOS",
                "decimals": 18
            },
            "rpcUrls": [
                "https://mainnet.telos.net/evm"
            ],
            "blockExplorerUrls": [
                "https://www.teloscan.io"
            ],
            "addressUrl": "https://www.teloscan.io/address/{wallet}",
            "transactionUrl": "https://www.teloscan.io/tx/{txHash}",
            "enableGasV2": false
        }
    },
    {
        "name": "BITSONG",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(bitsong1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "BITSONG",
                "symbol": "BTSG",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "bitsong-2b",
        "logo": "https://api.rango.exchange/blockchains/bitsong.svg",
        "displayName": "BitSong",
        "shortName": "BitSong",
        "sort": 51,
        "color": "#FF005C",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": true,
            "rpc": "https://rpc.explorebitsong.com",
            "rest": "https://lcd.explorebitsong.com",
            "cosmostationLcdUrl": "https://lcd.explorebitsong.com",
            "cosmostationApiUrl": "https://rpc.explorebitsong.com",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "bitsong",
            "chainName": "BitSong",
            "stakeCurrency": {
                "coinDenom": "BTSG",
                "coinMinimalDenom": "ubtsg",
                "coinDecimals": 6,
                "coinGeckoId": "pool:ubtsg",
                "coinImageUrl": "/tokens/blockchain/BTSG.png"
            },
            "bip44": {
                "coinType": 639
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "bitsong",
                "bech32PrefixAccPub": "bitsongpub",
                "bech32PrefixValAddr": "bitsongvaloper",
                "bech32PrefixValPub": "bitsongvaloperpub",
                "bech32PrefixConsAddr": "bitsongvalcons",
                "bech32PrefixConsPub": "bitsongvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "BTSG",
                    "coinMinimalDenom": "ubtsg",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:ubtsg",
                    "coinImageUrl": "/tokens/blockchain/BTSG.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "BTSG",
                    "coinMinimalDenom": "ubtsg",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:ubtsg",
                    "coinImageUrl": "/tokens/blockchain/BTSG.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer",
                "no-legacy-stdTx",
                "ibc-go"
            ],
            "explorerUrlToTx": "https://explorebitsong.com/transactions/{txHash}",
            "gasPriceStep": null
        }
    },
    {
        "name": "AKASH",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(akash1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "AKASH",
                "symbol": "AKT",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "akashnet-2",
        "logo": "https://api.rango.exchange/blockchains/akash.svg",
        "displayName": "Akash",
        "shortName": "Akash",
        "sort": 52,
        "color": "#ED3524",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://rpc.akashnet.net",
            "rest": "https://api.akashnet.net",
            "cosmostationLcdUrl": "https://api.akashnet.net",
            "cosmostationApiUrl": "https://rpc.akashnet.net",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "akash",
            "chainName": "Akash",
            "stakeCurrency": {
                "coinDenom": "AKT",
                "coinMinimalDenom": "uakt",
                "coinDecimals": 6,
                "coinGeckoId": "akash-network",
                "coinImageUrl": "/tokens/blockchain/akt.svg"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "akash",
                "bech32PrefixAccPub": "akashpub",
                "bech32PrefixValAddr": "akashvaloper",
                "bech32PrefixValPub": "akashvaloperpub",
                "bech32PrefixConsAddr": "akashvalcons",
                "bech32PrefixConsPub": "akashvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "AKT",
                    "coinMinimalDenom": "uakt",
                    "coinDecimals": 6,
                    "coinGeckoId": "akash-network",
                    "coinImageUrl": "/tokens/blockchain/akt.svg"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "AKT",
                    "coinMinimalDenom": "uakt",
                    "coinDecimals": 6,
                    "coinGeckoId": "akash-network",
                    "coinImageUrl": "/tokens/blockchain/akt.svg"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/akash/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.001,
                "average": 0.0025,
                "high": 0.004
            }
        }
    },
    {
        "name": "KI",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(ki1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "KI",
                "symbol": "XKI",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "kichain-2",
        "logo": "https://api.rango.exchange/blockchains/ki.png",
        "displayName": "Ki",
        "shortName": "Ki",
        "sort": 53,
        "color": "#0F2B3D",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": true,
            "rpc": "https://rpc-mainnet.blockchain.ki",
            "rest": "https://api-mainnet.blockchain.ki",
            "cosmostationLcdUrl": "https://api-mainnet.blockchain.ki",
            "cosmostationApiUrl": "https://rpc-mainnet.blockchain.ki",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "ki-chain",
            "chainName": "Ki",
            "stakeCurrency": {
                "coinDenom": "XKI",
                "coinMinimalDenom": "uxki",
                "coinDecimals": 6,
                "coinGeckoId": "pool:uxki",
                "coinImageUrl": "/tokens/blockchain/XKI.png"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "ki",
                "bech32PrefixAccPub": "kipub",
                "bech32PrefixValAddr": "kivaloper",
                "bech32PrefixValPub": "kivaloperpub",
                "bech32PrefixConsAddr": "kivalcons",
                "bech32PrefixConsPub": "kivalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "XKI",
                    "coinMinimalDenom": "uxki",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:uxki",
                    "coinImageUrl": "/tokens/blockchain/XKI.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "XKI",
                    "coinMinimalDenom": "uxki",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:uxki",
                    "coinImageUrl": "/tokens/blockchain/XKI.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/ki-chain/txs/{txHash}",
            "gasPriceStep": null
        }
    },
    {
        "name": "PERSISTENCE",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(persistence1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "PERSISTENCE",
                "symbol": "XPRT",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "core-1",
        "logo": "https://api.rango.exchange/blockchains/persistence.png",
        "displayName": "Persistence",
        "shortName": "Persistence",
        "sort": 54,
        "color": "#383838",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://rpc.core.persistence.one",
            "rest": "https://rest.core.persistence.one",
            "cosmostationLcdUrl": "https://rest.core.persistence.one",
            "cosmostationApiUrl": "https://rpc.core.persistence.one",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "persistence",
            "chainName": "Persistence",
            "stakeCurrency": {
                "coinDenom": "XPRT",
                "coinMinimalDenom": "uxprt",
                "coinDecimals": 6,
                "coinGeckoId": "persistence",
                "coinImageUrl": "/tokens/blockchain/xprt.png"
            },
            "bip44": {
                "coinType": 750
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "persistence",
                "bech32PrefixAccPub": "persistencepub",
                "bech32PrefixValAddr": "persistencevaloper",
                "bech32PrefixValPub": "persistencevaloperpub",
                "bech32PrefixConsAddr": "persistencevalcons",
                "bech32PrefixConsPub": "persistencevalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "XPRT",
                    "coinMinimalDenom": "uxprt",
                    "coinDecimals": 6,
                    "coinGeckoId": "persistence",
                    "coinImageUrl": "/tokens/blockchain/xprt.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "XPRT",
                    "coinMinimalDenom": "uxprt",
                    "coinDecimals": 6,
                    "coinGeckoId": "persistence",
                    "coinImageUrl": "/tokens/blockchain/xprt.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/persistence/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.0,
                "average": 0.025,
                "high": 0.04
            }
        }
    },
    {
        "name": "MEDIBLOC",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(panacea1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "MEDIBLOC",
                "symbol": "MED",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "panacea-3",
        "logo": "https://api.rango.exchange/blockchains/medibloc.png",
        "displayName": "MediBloc",
        "shortName": "MediBloc",
        "sort": 55,
        "color": "#4B66DC",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": true,
            "rpc": "https://rpc.gopanacea.org",
            "rest": "https://api.gopanacea.org",
            "cosmostationLcdUrl": "https://api.gopanacea.org",
            "cosmostationApiUrl": "https://rpc.gopanacea.org",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "medibloc",
            "chainName": "MediBloc",
            "stakeCurrency": {
                "coinDenom": "MED",
                "coinMinimalDenom": "umed",
                "coinDecimals": 6,
                "coinGeckoId": "medibloc",
                "coinImageUrl": "/tokens/blockchain/MED.png"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "panacea",
                "bech32PrefixAccPub": "panaceapub",
                "bech32PrefixValAddr": "panaceavaloper",
                "bech32PrefixValPub": "panaceavaloperpub",
                "bech32PrefixConsAddr": "panaceavalcons",
                "bech32PrefixConsPub": "panaceavalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "MED",
                    "coinMinimalDenom": "umed",
                    "coinDecimals": 6,
                    "coinGeckoId": "medibloc",
                    "coinImageUrl": "/tokens/blockchain/MED.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "MED",
                    "coinMinimalDenom": "umed",
                    "coinDecimals": 6,
                    "coinGeckoId": "medibloc",
                    "coinImageUrl": "/tokens/blockchain/MED.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/medibloc/txs/{txHash}",
            "gasPriceStep": {
                "low": 5.0,
                "average": 7.0,
                "high": 9.0
            }
        }
    },
    {
        "name": "KUJIRA",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(kujira1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "KUJIRA",
                "symbol": "KUJI",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "kaiyo-1",
        "logo": "https://api.rango.exchange/blockchains/kuji.svg",
        "displayName": "Kujira",
        "shortName": "Kujira",
        "sort": 56,
        "color": "#DF3935",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": true,
            "rpc": "https://kujira-rpc.lavenderfive.com",
            "rest": "https://kujira-api.lavenderfive.com",
            "cosmostationLcdUrl": "https://lcd.kaiyo.kujira.setten.io",
            "cosmostationApiUrl": "https://kujira-rpc.lavenderfive.com",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "kujira",
            "chainName": "Kujira",
            "stakeCurrency": {
                "coinDenom": "KUJI",
                "coinMinimalDenom": "ukuji",
                "coinDecimals": 6,
                "coinGeckoId": "kujira",
                "coinImageUrl": "/tokens/blockchain/kuji.svg"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "kujira",
                "bech32PrefixAccPub": "kujirapub",
                "bech32PrefixValAddr": "kujiravaloper",
                "bech32PrefixValPub": "kujiravaloperpub",
                "bech32PrefixConsAddr": "kujiravalcons",
                "bech32PrefixConsPub": "kujiravalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "KUJI",
                    "coinMinimalDenom": "ukuji",
                    "coinDecimals": 6,
                    "coinGeckoId": "kujira",
                    "coinImageUrl": "/tokens/blockchain/kuji.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "KUJI",
                    "coinMinimalDenom": "ukuji",
                    "coinDecimals": 6,
                    "coinGeckoId": "kujira",
                    "coinImageUrl": "/tokens/blockchain/kuji.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://finder.kujira.app/kaiyo-1/tx/{txHash}",
            "gasPriceStep": {
                "low": 0.01,
                "average": 0.025,
                "high": 0.03
            }
        }
    },
    {
        "name": "SENTINEL",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(sent1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "SENTINEL",
                "symbol": "DVPN",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "sentinelhub-2",
        "logo": "https://api.rango.exchange/blockchains/sentinel.png",
        "displayName": "Sentinel",
        "shortName": "Sentinel",
        "sort": 57,
        "color": "#142E51",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://sentinel-rpc.publicnode.com",
            "rest": "https://sentinel-rest.publicnode.com",
            "cosmostationLcdUrl": "https://sentinel-rest.publicnode.com",
            "cosmostationApiUrl": "https://sentinel-rpc.publicnode.com",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "sentinel",
            "chainName": "Sentinel",
            "stakeCurrency": {
                "coinDenom": "DVPN",
                "coinMinimalDenom": "udvpn",
                "coinDecimals": 6,
                "coinGeckoId": "sentinel",
                "coinImageUrl": "/tokens/blockchain/dvpn.png"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "sent",
                "bech32PrefixAccPub": "sentpub",
                "bech32PrefixValAddr": "sentvaloper",
                "bech32PrefixValPub": "sentvaloperpub",
                "bech32PrefixConsAddr": "sentvalcons",
                "bech32PrefixConsPub": "sentvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "DVPN",
                    "coinMinimalDenom": "udvpn",
                    "coinDecimals": 6,
                    "coinGeckoId": "sentinel",
                    "coinImageUrl": "/tokens/blockchain/dvpn.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "DVPN",
                    "coinMinimalDenom": "udvpn",
                    "coinDecimals": 6,
                    "coinGeckoId": "sentinel",
                    "coinImageUrl": "/tokens/blockchain/dvpn.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/sentinel/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.1,
                "average": 0.25,
                "high": 0.4
            }
        }
    },
    {
        "name": "INJECTIVE",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(inj1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "INJECTIVE",
                "symbol": "INJ",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "injective-1",
        "logo": "https://api.rango.exchange/blockchains/injective.svg",
        "displayName": "Injective",
        "shortName": "Injective",
        "sort": 58,
        "color": "#29B2F4",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": true,
            "rpc": "https://tm.injective.network",
            "rest": "https://lcd.injective.network",
            "cosmostationLcdUrl": "https://lcd.injective.network",
            "cosmostationApiUrl": "https://tm.injective.network",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "injective",
            "chainName": "Injective",
            "stakeCurrency": {
                "coinDenom": "INJ",
                "coinMinimalDenom": "uinj",
                "coinDecimals": 18,
                "coinGeckoId": "injective",
                "coinImageUrl": "/tokens/INJECTIVE/inj.svg"
            },
            "bip44": {
                "coinType": 529
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "inj",
                "bech32PrefixAccPub": "injpub",
                "bech32PrefixValAddr": "injvaloper",
                "bech32PrefixValPub": "injvaloperpub",
                "bech32PrefixConsAddr": "injvalcons",
                "bech32PrefixConsPub": "injvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "INJ",
                    "coinMinimalDenom": "uinj",
                    "coinDecimals": 18,
                    "coinGeckoId": "injective",
                    "coinImageUrl": "/tokens/INJECTIVE/inj.svg"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "INJ",
                    "coinMinimalDenom": "uinj",
                    "coinDecimals": 18,
                    "coinGeckoId": "injective",
                    "coinImageUrl": "/tokens/INJECTIVE/inj.svg"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/injective/txs/{txHash}",
            "gasPriceStep": {
                "low": 5.0E8,
                "average": 5.0E8,
                "high": 5.0E8
            }
        }
    },
    {
        "name": "SECRET",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(secret1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "SECRET",
                "symbol": "SCRT",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "secret-4",
        "logo": "https://api.rango.exchange/blockchains/secret.svg",
        "displayName": "Secret",
        "shortName": "Secret",
        "sort": 59,
        "color": "#1B1B1B",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://rpc.secret.express",
            "rest": "https://lcd.secret.express",
            "cosmostationLcdUrl": "https://lcd.secret.express",
            "cosmostationApiUrl": "https://rpc.secret.express",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "secret",
            "chainName": "Secret",
            "stakeCurrency": {
                "coinDenom": "SCRT",
                "coinMinimalDenom": "uscrt",
                "coinDecimals": 6,
                "coinGeckoId": "secret",
                "coinImageUrl": "https://dhj8dql1kzq2v.cloudfront.net/white/secret.png"
            },
            "bip44": {
                "coinType": 529
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "secret",
                "bech32PrefixAccPub": "secretpub",
                "bech32PrefixValAddr": "secretvaloper",
                "bech32PrefixValPub": "secretvaloperpub",
                "bech32PrefixConsAddr": "secretvalcons",
                "bech32PrefixConsPub": "secretvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "SCRT",
                    "coinMinimalDenom": "uscrt",
                    "coinDecimals": 6,
                    "coinGeckoId": "secret",
                    "coinImageUrl": "https://dhj8dql1kzq2v.cloudfront.net/white/secret.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "SCRT",
                    "coinMinimalDenom": "uscrt",
                    "coinDecimals": 6,
                    "coinGeckoId": "secret",
                    "coinImageUrl": "https://dhj8dql1kzq2v.cloudfront.net/white/secret.png"
                }
            ],
            "features": [
                "secretwasm"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/injective/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.1,
                "average": 0.25,
                "high": 0.3
            }
        }
    },
    {
        "name": "KONSTELLATION",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(darc1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "KONSTELLATION",
                "symbol": "DARC",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "darchub",
        "logo": "https://api.rango.exchange/blockchains/konstellation.svg",
        "displayName": "Konstellation",
        "shortName": "Konstellation",
        "sort": 60,
        "color": "#3D7BC2",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": true,
            "rpc": "https://node1.konstellation.tech:26657",
            "rest": "https://node1.konstellation.tech:1318",
            "cosmostationLcdUrl": "https://node1.konstellation.tech:1318",
            "cosmostationApiUrl": "https://node1.konstellation.tech:26657",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "konstellation",
            "chainName": "Konstellation",
            "stakeCurrency": {
                "coinDenom": "DARC",
                "coinMinimalDenom": "udarc",
                "coinDecimals": 6,
                "coinGeckoId": "pool:udarc",
                "coinImageUrl": "/tokens/blockchain/DARC.png"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "darc",
                "bech32PrefixAccPub": "darcpub",
                "bech32PrefixValAddr": "darcvaloper",
                "bech32PrefixValPub": "darcvaloperpub",
                "bech32PrefixConsAddr": "darcvalcons",
                "bech32PrefixConsPub": "darcvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "DARC",
                    "coinMinimalDenom": "udarc",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:udarc",
                    "coinImageUrl": "/tokens/blockchain/DARC.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "DARC",
                    "coinMinimalDenom": "udarc",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:udarc",
                    "coinImageUrl": "/tokens/blockchain/DARC.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer",
                "no-legacy-stdTx"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/konstellation/txs/{txHash}",
            "gasPriceStep": null
        }
    },
    {
        "name": "STARNAME",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(star1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "STARNAME",
                "symbol": "IOV",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "iov-mainnet-ibc",
        "logo": "https://api.rango.exchange/blockchains/starname.png",
        "displayName": "Starname",
        "shortName": "Starname",
        "sort": 61,
        "color": "#BC64BB",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://rpc-starname-ia.cosmosia.notional.ventures",
            "rest": "https://api-starname-ia.cosmosia.notional.ventures",
            "cosmostationLcdUrl": "https://api-starname-ia.cosmosia.notional.ventures",
            "cosmostationApiUrl": "https://rpc-starname-ia.cosmosia.notional.ventures",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "starname",
            "chainName": "Starname",
            "stakeCurrency": {
                "coinDenom": "IOV",
                "coinMinimalDenom": "uiov",
                "coinDecimals": 6,
                "coinGeckoId": "starname",
                "coinImageUrl": "/tokens/blockchain/IOV.png"
            },
            "bip44": {
                "coinType": 494
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "star",
                "bech32PrefixAccPub": "starpub",
                "bech32PrefixValAddr": "starvaloper",
                "bech32PrefixValPub": "starvaloperpub",
                "bech32PrefixConsAddr": "starvalcons",
                "bech32PrefixConsPub": "starvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "IOV",
                    "coinMinimalDenom": "uiov",
                    "coinDecimals": 6,
                    "coinGeckoId": "starname",
                    "coinImageUrl": "/tokens/blockchain/IOV.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "IOV",
                    "coinMinimalDenom": "uiov",
                    "coinDecimals": 6,
                    "coinGeckoId": "starname",
                    "coinImageUrl": "/tokens/blockchain/IOV.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/starname/txs/{txHash}",
            "gasPriceStep": {
                "low": 1.0,
                "average": 2.0,
                "high": 3.0
            }
        }
    },
    {
        "name": "BITCANNA",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(bcna1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "BITCANNA",
                "symbol": "BCNA",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "bitcanna-1",
        "logo": "https://api.rango.exchange/blockchains/bitcanna.svg",
        "displayName": "BitCanna",
        "shortName": "BitCanna",
        "sort": 62,
        "color": "#3CC194",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": true,
            "rpc": "https://rpc.bitcanna.io",
            "rest": "https://lcd.bitcanna.io",
            "cosmostationLcdUrl": "https://lcd.bitcanna.io",
            "cosmostationApiUrl": "https://rpc.bitcanna.io",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "bitcanna",
            "chainName": "BitCanna",
            "stakeCurrency": {
                "coinDenom": "BCNA",
                "coinMinimalDenom": "ubcna",
                "coinDecimals": 6,
                "coinGeckoId": "bitcanna",
                "coinImageUrl": "/tokens/blockchain/BCNA.png"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "bcna",
                "bech32PrefixAccPub": "bcnapub",
                "bech32PrefixValAddr": "bcnavaloper",
                "bech32PrefixValPub": "bcnavaloperpub",
                "bech32PrefixConsAddr": "bcnavalcons",
                "bech32PrefixConsPub": "bcnavalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "BCNA",
                    "coinMinimalDenom": "ubcna",
                    "coinDecimals": 6,
                    "coinGeckoId": "bitcanna",
                    "coinImageUrl": "/tokens/blockchain/BCNA.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "BCNA",
                    "coinMinimalDenom": "ubcna",
                    "coinDecimals": 6,
                    "coinGeckoId": "bitcanna",
                    "coinImageUrl": "/tokens/blockchain/BCNA.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer",
                "no-legacy-stdTx"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/bitcanna/txs/{txHash}",
            "gasPriceStep": null
        }
    },
    {
        "name": "UMEE",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(umee1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "UMEE",
                "symbol": "UMEE",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "umee-1",
        "logo": "https://api.rango.exchange/blockchains/umee.svg",
        "displayName": "Umee",
        "shortName": "Umee",
        "sort": 63,
        "color": "#D2B6FF",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": false,
            "rpc": "https://umee-rpc.polkachu.com",
            "rest": "https://api.mainnet.network.umee.cc",
            "cosmostationLcdUrl": "https://api.mainnet.network.umee.cc",
            "cosmostationApiUrl": "https://umee-rpc.polkachu.com",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "umee",
            "chainName": "Umee",
            "stakeCurrency": {
                "coinDenom": "UMEE",
                "coinMinimalDenom": "uumee",
                "coinDecimals": 6,
                "coinGeckoId": "pool:uumee",
                "coinImageUrl": "/tokens/blockchain/UMEE.png"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "umee",
                "bech32PrefixAccPub": "umeepub",
                "bech32PrefixValAddr": "umeevaloper",
                "bech32PrefixValPub": "umeevaloperpub",
                "bech32PrefixConsAddr": "umeevalcons",
                "bech32PrefixConsPub": "umeevalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "UMEE",
                    "coinMinimalDenom": "uumee",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:uumee",
                    "coinImageUrl": "/tokens/blockchain/UMEE.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "UMEE",
                    "coinMinimalDenom": "uumee",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:uumee",
                    "coinImageUrl": "/tokens/blockchain/UMEE.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer",
                "no-legacy-stdTx"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/umee/txs/{txHash}",
            "gasPriceStep": {
                "low": 0.05,
                "average": 0.06,
                "high": 0.1
            }
        }
    },
    {
        "name": "DESMOS",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(desmos1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "DESMOS",
                "symbol": "DSM",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "desmos-mainnet",
        "logo": "https://api.rango.exchange/blockchains/desmos.svg",
        "displayName": "Desmos",
        "shortName": "Desmos",
        "sort": 64,
        "color": "#DF6952",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": true,
            "rpc": "https://rpc.mainnet.desmos.network",
            "rest": "https://api.mainnet.desmos.network",
            "cosmostationLcdUrl": "https://api.mainnet.desmos.network",
            "cosmostationApiUrl": "https://rpc.mainnet.desmos.network",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "desmos",
            "chainName": "Desmos",
            "stakeCurrency": {
                "coinDenom": "DSM",
                "coinMinimalDenom": "udsm",
                "coinDecimals": 6,
                "coinGeckoId": "pool:udsm",
                "coinImageUrl": "/tokens/blockchain/DSM.png"
            },
            "bip44": {
                "coinType": 852
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "desmos",
                "bech32PrefixAccPub": "desmospub",
                "bech32PrefixValAddr": "desmosvaloper",
                "bech32PrefixValPub": "desmosvaloperpub",
                "bech32PrefixConsAddr": "desmosvalcons",
                "bech32PrefixConsPub": "desmosvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "DSM",
                    "coinMinimalDenom": "udsm",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:udsm",
                    "coinImageUrl": "/tokens/blockchain/DSM.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "DSM",
                    "coinMinimalDenom": "udsm",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:udsm",
                    "coinImageUrl": "/tokens/blockchain/DSM.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer",
                "no-legacy-stdTx",
                "ibc-go"
            ],
            "explorerUrlToTx": "https://explorer.desmos.network/transactions/{txHash}",
            "gasPriceStep": null
        }
    },
    {
        "name": "LUMNETWORK",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(lum1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "LUMNETWORK",
                "symbol": "LUM",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "lum-network-1",
        "logo": "https://api.rango.exchange/blockchains/lumnetwork.png",
        "displayName": "Lum Network",
        "shortName": "Lum Network",
        "sort": 65,
        "color": "#1B42B4",
        "enabled": true,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": true,
            "rpc": "https://node0.mainnet.lum.network/rpc",
            "rest": "https://node0.mainnet.lum.network/rest",
            "cosmostationLcdUrl": "https://node0.mainnet.lum.network/rest",
            "cosmostationApiUrl": "https://node0.mainnet.lum.network/rpc",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": "lum",
            "chainName": "Lum Network",
            "stakeCurrency": {
                "coinDenom": "LUM",
                "coinMinimalDenom": "ulum",
                "coinDecimals": 6,
                "coinGeckoId": "pool:ulum",
                "coinImageUrl": "/tokens/blockchain/LUM.png"
            },
            "bip44": {
                "coinType": 118
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "lum",
                "bech32PrefixAccPub": "lumpub",
                "bech32PrefixValAddr": "lumvaloper",
                "bech32PrefixValPub": "lumvaloperpub",
                "bech32PrefixConsAddr": "lumvalcons",
                "bech32PrefixConsPub": "lumvalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "LUM",
                    "coinMinimalDenom": "ulum",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:ulum",
                    "coinImageUrl": "/tokens/blockchain/LUM.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "LUM",
                    "coinMinimalDenom": "ulum",
                    "coinDecimals": 6,
                    "coinGeckoId": "pool:ulum",
                    "coinImageUrl": "/tokens/blockchain/LUM.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer",
                "no-legacy-stdTx",
                "ibc-go"
            ],
            "explorerUrlToTx": "https://www.mintscan.io/lum/txs/{txHash}",
            "gasPriceStep": null
        }
    },
    {
        "name": "TERRA_CLASSIC",
        "defaultDecimals": 6,
        "addressPatterns": [
            "^(terra1)[0-9a-z]{38}$"
        ],
        "feeAssets": [
            {
                "blockchain": "TERRA_CLASSIC",
                "symbol": "KRT",
                "address": null
            },
            {
                "blockchain": "TERRA_CLASSIC",
                "symbol": "LUNC",
                "address": null
            },
            {
                "blockchain": "TERRA_CLASSIC",
                "symbol": "EUT",
                "address": null
            },
            {
                "blockchain": "TERRA_CLASSIC",
                "symbol": "UST",
                "address": null
            }
        ],
        "type": "COSMOS",
        "chainId": "columbus-5",
        "logo": "https://api.rango.exchange/blockchains/terraclassic.svg",
        "displayName": "Terra",
        "shortName": "Terra",
        "sort": 66,
        "color": "#5493F7",
        "enabled": false,
        "info": {
            "infoType": "CosmosMetaInfo",
            "experimental": true,
            "rpc": "https://rpc.terrarebels.net",
            "rest": "https://terra-classic-lcd.publicnode.com",
            "cosmostationLcdUrl": "https://terra-classic-lcd.publicnode.com",
            "cosmostationApiUrl": "https://rpc.terrarebels.net",
            "cosmostationDenomTracePath": "/ibc/apps/transfer/v1/denom_traces/",
            "mintScanName": null,
            "chainName": "Terra",
            "stakeCurrency": {
                "coinDenom": "LUNC",
                "coinMinimalDenom": "uluna",
                "coinDecimals": 6,
                "coinGeckoId": "terra-luna",
                "coinImageUrl": "/tokens/blockchain/LUNA.png"
            },
            "bip44": {
                "coinType": 330
            },
            "bech32Config": {
                "bech32PrefixAccAddr": "terra",
                "bech32PrefixAccPub": "terrapub",
                "bech32PrefixValAddr": "terravaloper",
                "bech32PrefixValPub": "terravaloperpub",
                "bech32PrefixConsAddr": "terravalcons",
                "bech32PrefixConsPub": "terravalconspub"
            },
            "currencies": [
                {
                    "coinDenom": "LUNC",
                    "coinMinimalDenom": "uluna",
                    "coinDecimals": 6,
                    "coinGeckoId": "terra-luna",
                    "coinImageUrl": "/tokens/blockchain/LUNA.png"
                },
                {
                    "coinDenom": "UST",
                    "coinMinimalDenom": "uusd",
                    "coinDecimals": 6,
                    "coinGeckoId": "terrausd",
                    "coinImageUrl": "/tokens/blockchain/UST.png"
                }
            ],
            "feeCurrencies": [
                {
                    "coinDenom": "LUNC",
                    "coinMinimalDenom": "uluna",
                    "coinDecimals": 6,
                    "coinGeckoId": "terra-luna",
                    "coinImageUrl": "/tokens/blockchain/LUNA.png"
                },
                {
                    "coinDenom": "UST",
                    "coinMinimalDenom": "uusd",
                    "coinDecimals": 6,
                    "coinGeckoId": "terrausd",
                    "coinImageUrl": "/tokens/blockchain/UST.png"
                }
            ],
            "features": [
                "stargate",
                "ibc-transfer",
                "no-legacy-stdTx"
            ],
            "explorerUrlToTx": "https://finder.terra.money/columbus-5/tx/{txHash}",
            "gasPriceStep": {
                "low": 0.0075,
                "average": 0.0075,
                "high": 0.0075
            }
        }
    },
    {
        "name": "DOGE",
        "defaultDecimals": 8,
        "addressPatterns": [
            "^(D|A|9)[a-km-zA-HJ-NP-Z1-9]{33,34}$"
        ],
        "feeAssets": [
            {
                "blockchain": "DOGE",
                "symbol": "DOGE",
                "address": null
            }
        ],
        "type": "TRANSFER",
        "chainId": "",
        "logo": "https://api.rango.exchange/blockchains/doge.svg",
        "displayName": "Doge",
        "shortName": "Doge",
        "sort": 69,
        "color": "#BA9F33",
        "enabled": false,
        "info": null
    }
]
