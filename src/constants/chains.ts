export const chains = [
  {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'ETH',
      },
      rango: {
        key: 'ETH',
      },
    },
  },
  {
    id: 137,
    name: 'Matic',
    symbol: 'MATIC',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/polygon.svg',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'MATIC',
      },
      rango: {
        key: 'POLYGON',
      },
    },
  },
  {
    id: 56,
    name: 'BSC',
    symbol: 'BNB',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/bsc.svg',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'BNB',
      },
      rango: {
        key: 'BSC',
      },
    },
  },
  {
    id: 100,
    name: 'Gnosis',
    symbol: 'DAI',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/gnosis.svg',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'DAI',
      },
      rango: {
        key: 'GNOSIS',
      },
    },
  },
  {
    id: 250,
    name: 'Fantom',
    symbol: 'FTM',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/fantom.svg',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'FTM',
      },
      rango: {
        key: 'FANTOM',
      },
    },
  },
  {
    id: 66,
    name: 'OKXChain',
    symbol: 'OKT',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/okx.svg',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'OKT',
      },
      rango: {
        key: 'OKC',
      },
    },
  },
  {
    id: 43114,
    name: 'Avalanche',
    symbol: 'AVAX',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/avalanche.svg',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'AVAX',
      },
      rango: {
        key: 'AVAX_CCHAIN',
      },
    },
  },
  {
    id: 42161,
    name: 'Arbitrum',
    symbol: 'ETH',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/arbitrum.svg',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'ETH',
      },
      rango: {
        key: 'ARBITRUM',
      },
    },
  },
  {
    id: 10,
    name: 'Optimism',
    symbol: 'ETH',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/optimism.svg',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'ETH',
      },
      rango: {
        key: 'OPTIMISM',
      },
    },
  },
  {
    id: 1285,
    name: 'Moonriver',
    symbol: 'MOVR',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/moonriver.svg',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'MOVR',
      },
      rango: {
        key: 'MOONRIVER',
      },
    },
  },
  {
    id: 1284,
    name: 'Moonbeam',
    symbol: 'GLMR',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/moonbeam.svg',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'GLMR',
      },
      rango: {
        key: 'MOONBEAM',
      },
    },
  },
  {
    id: 42220,
    name: 'CELO',
    symbol: 'CELO',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/celo.svg',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'CELO',
      },
    },
  },
  {
    id: 122,
    name: 'FUSE',
    symbol: 'FUSE',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/fuse.svg',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'FUSE',
      },
      rango: {
        key: 'FUSE',
      },
    },
  },
  {
    id: 25,
    name: 'Cronos',
    symbol: 'CRO',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/cronos.svg',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'CRO',
      },
      rango: {
        key: 'CRONOS',
      },
    },
  },
  {
    id: 288,
    name: 'Boba',
    symbol: 'ETH',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/boba.png',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'ETH',
      },
      rango: {
        key: 'BOBA',
      },
    },
  },
  {
    id: 106,
    name: 'Velas',
    symbol: 'VLX',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/velas.png',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'VLX',
      },
    },
  },
  {
    id: 1313161554,
    name: 'Aurora',
    symbol: 'ETH',
    logoURI: 'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/aurora.png',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      lifi: {
        key: 'ETH',
      },
      rango: {
        key: 'AURORA',
      },
    },
  },
  {
    id: '324',
    name: 'ZKSYNC',
    symbol: 'ZKSYNC',
    logoURI: 'https://api.rango.exchange/blockchains/zksync.png',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      rango: {
        key: 'ZKSYNC',
      },
    },
  },
  {
    id: 'SN_MAIN',
    name: 'STARKNET',
    symbol: 'STARKNET',
    logoURI: 'https://api.rango.exchange/blockchains/starknet.svg',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{32,64}$'],
    providers: {
      rango: {
        key: 'STARKNET',
      },
    },
  },
  {
    id: '1101',
    name: 'POLYGONZK',
    symbol: 'POLYGONZK',
    logoURI: 'https://api.rango.exchange/blockchains/zkevmpolygon.png',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      rango: {
        key: 'POLYGONZK',
      },
    },
  },
  {
    id: '728126428',
    name: 'TRON',
    symbol: 'TRON',
    logoURI: 'https://api.rango.exchange/blockchains/tron.svg',
    addressPatterns: ['^T[1-9A-HJ-NP-Za-km-z]{33}$'],
    providers: {
      rango: {
        key: 'TRON',
      },
    },
  },
  {
    id: '',
    name: 'BTC',
    symbol: 'BTC',
    logoURI: 'https://api.rango.exchange/blockchains/btc.svg',
    addressPatterns: ['^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^(bc1)[0-9A-Za-z]{39,59}$'],
    providers: {
      rango: {
        key: 'BTC',
      },
    },
  },
  {
    id: 'cosmoshub-4',
    name: 'COSMOS',
    symbol: 'COSMOS',
    logoURI: 'https://api.rango.exchange/blockchains/cosmos.svg',
    addressPatterns: ['^(cosmos1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'COSMOS',
      },
    },
  },
  {
    id: 'osmosis-1',
    name: 'OSMOSIS',
    symbol: 'OSMOSIS',
    logoURI: 'https://api.rango.exchange/blockchains/osmosis.svg',
    addressPatterns: ['^(osmo1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'OSMOSIS',
      },
    },
  },
  {
    id: 'neutron-1',
    name: 'NEUTRON',
    symbol: 'NEUTRON',
    logoURI: 'https://api.rango.exchange/blockchains/neutron.svg',
    addressPatterns: ['^(neutron1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'NEUTRON',
      },
    },
  },
  {
    id: 'mainnet-beta',
    name: 'SOLANA',
    symbol: 'SOLANA',
    logoURI: 'https://api.rango.exchange/blockchains/solana.svg',
    addressPatterns: ['^[1-9A-HJ-NP-Za-km-z]{32,44}$'],
    providers: {
      rango: {
        key: 'SOLANA',
      },
    },
  },
  {
    id: 'thorchain-mainnet-v1',
    name: 'THOR',
    symbol: 'THOR',
    logoURI: 'https://api.rango.exchange/blockchains/thorchain.svg',
    addressPatterns: ['^(thor1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'THOR',
      },
    },
  },
  {
    id: '56288',
    name: 'BOBA_BNB',
    symbol: 'BOBA_BNB',
    logoURI: 'https://api.rango.exchange/blockchains/boba.png',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      rango: {
        key: 'BOBA_BNB',
      },
    },
  },
  {
    id: '43288',
    name: 'BOBA_AVALANCHE',
    symbol: 'BOBA_AVALANCHE',
    logoURI: 'https://api.rango.exchange/blockchains/boba.png',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      rango: {
        key: 'BOBA_AVALANCHE',
      },
    },
  },
  {
    id: '1666600000',
    name: 'HARMONY',
    symbol: 'HARMONY',
    logoURI: 'https://api.rango.exchange/blockchains/harmony.svg',
    addressPatterns: ['^(one1)[0-9a-z]{38}$', '^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      rango: {
        key: 'HARMONY',
      },
    },
  },
  {
    id: '9001',
    name: 'EVMOS',
    symbol: 'EVMOS',
    logoURI: 'https://api.rango.exchange/blockchains/evmos.png',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      rango: {
        key: 'EVMOS',
      },
    },
  },
  {
    id: '128',
    name: 'HECO',
    symbol: 'HECO',
    logoURI: 'https://api.rango.exchange/blockchains/heco.png',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      rango: {
        key: 'HECO',
      },
    },
  },
  {
    id: 'sifchain-1',
    name: 'SIF',
    symbol: 'SIF',
    logoURI: 'https://api.rango.exchange/blockchains/sif.png',
    addressPatterns: ['^(sif1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'SIF',
      },
    },
  },
  {
    id: '32520',
    name: 'BRISE',
    symbol: 'BRISE',
    logoURI: 'https://api.rango.exchange/blockchains/bitgert.png',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      rango: {
        key: 'BRISE',
      },
    },
  },
  {
    id: 'stargaze-1',
    name: 'STARGAZE',
    symbol: 'STARGAZE',
    logoURI: 'https://api.rango.exchange/blockchains/stargaze.png',
    addressPatterns: ['^(stars1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'STARGAZE',
      },
    },
  },
  {
    id: 'crypto-org-chain-mainnet-1',
    name: 'CRYPTO_ORG',
    symbol: 'CRYPTO_ORG',
    logoURI: 'https://api.rango.exchange/blockchains/crypto_org.png',
    addressPatterns: ['^(cro1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'CRYPTO_ORG',
      },
    },
  },
  {
    id: 'chihuahua-1',
    name: 'CHIHUAHUA',
    symbol: 'CHIHUAHUA',
    logoURI: 'https://api.rango.exchange/blockchains/chihuahua.png',
    addressPatterns: ['^(chihuahua1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'CHIHUAHUA',
      },
    },
  },
  {
    id: 'laozi-mainnet',
    name: 'BANDCHAIN',
    symbol: 'BANDCHAIN',
    logoURI: 'https://api.rango.exchange/blockchains/bandchain.svg',
    addressPatterns: ['^(band1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'BANDCHAIN',
      },
    },
  },
  {
    id: 'comdex-1',
    name: 'COMDEX',
    symbol: 'COMDEX',
    logoURI: 'https://api.rango.exchange/blockchains/comdex.svg',
    addressPatterns: ['^(comdex1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'COMDEX',
      },
    },
  },
  {
    id: 'regen-1',
    name: 'REGEN',
    symbol: 'REGEN',
    logoURI: 'https://api.rango.exchange/blockchains/regen.png',
    addressPatterns: ['^(regen1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'REGEN',
      },
    },
  },
  {
    id: 'irishub-1',
    name: 'IRIS',
    symbol: 'IRIS',
    logoURI: 'https://api.rango.exchange/blockchains/iris.png',
    addressPatterns: ['^(iaa1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'IRIS',
      },
    },
  },
  {
    id: 'emoney-3',
    name: 'EMONEY',
    symbol: 'EMONEY',
    logoURI: 'https://api.rango.exchange/blockchains/emoney.svg',
    addressPatterns: ['^(emoney1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'EMONEY',
      },
    },
  },
  {
    id: 'juno-1',
    name: 'JUNO',
    symbol: 'JUNO',
    logoURI: 'https://api.rango.exchange/blockchains/juno.svg',
    addressPatterns: ['^(juno1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'JUNO',
      },
    },
  },
  {
    id: 'axelar-dojo-1',
    name: 'AXELAR',
    symbol: 'AXELAR',
    logoURI: 'https://api.rango.exchange/blockchains/axelar.png',
    addressPatterns: ['^(axelar1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'AXELAR',
      },
    },
  },
  {
    id: 'stride-1',
    name: 'STRIDE',
    symbol: 'STRIDE',
    logoURI: 'https://api.rango.exchange/blockchains/stride.svg',
    addressPatterns: ['^(stride1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'STRIDE',
      },
    },
  },
  {
    id: '321',
    name: 'KCC',
    symbol: 'KCC',
    logoURI: 'https://api.rango.exchange/blockchains/kcc.png',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      rango: {
        key: 'KCC',
      },
    },
  },
  {
    id: 'mars-1',
    name: 'MARS',
    symbol: 'MARS',
    logoURI: 'https://api.rango.exchange/blockchains/mars.svg',
    addressPatterns: ['^(mars1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'MARS',
      },
    },
  },
  {
    id: 'phoenix-1',
    name: 'TERRA',
    symbol: 'TERRA',
    logoURI: 'https://api.rango.exchange/blockchains/terra.png',
    addressPatterns: ['^(terra1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'TERRA',
      },
    },
  },
  {
    id: '40',
    name: 'TELOS',
    symbol: 'TELOS',
    logoURI: 'https://api.rango.exchange/blockchains/telos.png',
    addressPatterns: ['^(0x)[0-9A-Fa-f]{40}$'],
    providers: {
      rango: {
        key: 'TELOS',
      },
    },
  },
  {
    id: 'bitsong-2b',
    name: 'BITSONG',
    symbol: 'BITSONG',
    logoURI: 'https://api.rango.exchange/blockchains/bitsong.svg',
    addressPatterns: ['^(bitsong1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'BITSONG',
      },
    },
  },
  {
    id: 'akashnet-2',
    name: 'AKASH',
    symbol: 'AKASH',
    logoURI: 'https://api.rango.exchange/blockchains/akash.svg',
    addressPatterns: ['^(akash1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'AKASH',
      },
    },
  },
  {
    id: 'kichain-2',
    name: 'KI',
    symbol: 'KI',
    logoURI: 'https://api.rango.exchange/blockchains/ki.png',
    addressPatterns: ['^(ki1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'KI',
      },
    },
  },
  {
    id: 'core-1',
    name: 'PERSISTENCE',
    symbol: 'PERSISTENCE',
    logoURI: 'https://api.rango.exchange/blockchains/persistence.png',
    addressPatterns: ['^(persistence1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'PERSISTENCE',
      },
    },
  },
  {
    id: 'panacea-3',
    name: 'MEDIBLOC',
    symbol: 'MEDIBLOC',
    logoURI: 'https://api.rango.exchange/blockchains/medibloc.png',
    addressPatterns: ['^(panacea1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'MEDIBLOC',
      },
    },
  },
  {
    id: 'kaiyo-1',
    name: 'KUJIRA',
    symbol: 'KUJIRA',
    logoURI: 'https://api.rango.exchange/blockchains/kuji.svg',
    addressPatterns: ['^(kujira1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'KUJIRA',
      },
    },
  },
  {
    id: 'sentinelhub-2',
    name: 'SENTINEL',
    symbol: 'SENTINEL',
    logoURI: 'https://api.rango.exchange/blockchains/sentinel.png',
    addressPatterns: ['^(sent1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'SENTINEL',
      },
    },
  },
  {
    id: 'injective-1',
    name: 'INJECTIVE',
    symbol: 'INJECTIVE',
    logoURI: 'https://api.rango.exchange/blockchains/injective.svg',
    addressPatterns: ['^(inj1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'INJECTIVE',
      },
    },
  },
  {
    id: 'secret-4',
    name: 'SECRET',
    symbol: 'SECRET',
    logoURI: 'https://api.rango.exchange/blockchains/secret.svg',
    addressPatterns: ['^(secret1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'SECRET',
      },
    },
  },
  {
    id: 'darchub',
    name: 'KONSTELLATION',
    symbol: 'KONSTELLATION',
    logoURI: 'https://api.rango.exchange/blockchains/konstellation.svg',
    addressPatterns: ['^(darc1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'KONSTELLATION',
      },
    },
  },
  {
    id: 'iov-mainnet-ibc',
    name: 'STARNAME',
    symbol: 'STARNAME',
    logoURI: 'https://api.rango.exchange/blockchains/starname.png',
    addressPatterns: ['^(star1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'STARNAME',
      },
    },
  },
  {
    id: 'bitcanna-1',
    name: 'BITCANNA',
    symbol: 'BITCANNA',
    logoURI: 'https://api.rango.exchange/blockchains/bitcanna.svg',
    addressPatterns: ['^(bcna1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'BITCANNA',
      },
    },
  },
  {
    id: 'umee-1',
    name: 'UMEE',
    symbol: 'UMEE',
    logoURI: 'https://api.rango.exchange/blockchains/umee.svg',
    addressPatterns: ['^(umee1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'UMEE',
      },
    },
  },
  {
    id: 'desmos-mainnet',
    name: 'DESMOS',
    symbol: 'DESMOS',
    logoURI: 'https://api.rango.exchange/blockchains/desmos.svg',
    addressPatterns: ['^(desmos1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'DESMOS',
      },
    },
  },
  {
    id: 'lum-network-1',
    name: 'LUMNETWORK',
    symbol: 'LUMNETWORK',
    logoURI: 'https://api.rango.exchange/blockchains/lumnetwork.png',
    addressPatterns: ['^(lum1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'LUMNETWORK',
      },
    },
  },
  {
    id: 'columbus-5',
    name: 'TERRA_CLASSIC',
    symbol: 'TERRA_CLASSIC',
    logoURI: 'https://api.rango.exchange/blockchains/terraclassic.svg',
    addressPatterns: ['^(terra1)[0-9a-z]{38}$'],
    providers: {
      rango: {
        key: 'TERRA_CLASSIC',
      },
    },
  },
]
