import { isDevelopmentMode } from '../utils'

const RPC_KEY = !isDevelopmentMode ? '75d301c9ba884f80a9935b8536c3ebfa' : '75d301c9ba884f80a9935b8536c3ebfa';
const RPC_HTTPS_URL = `https://rinkeby.infura.io/v3/${RPC_KEY}`;
const RPC_WSS_URL = `wss://rinkeby.infura.io/ws/v3${RPC_KEY}`;

const EXPLORER_KEY = '4RSJUUZQFMXUAUUJP5FI5UR5U59N7UIA32';
const EXPLORER_URL = 'https://rinkeby.etherscan.io';
const EXPLORER_API_URL = 'https://api.etherscan.io';

export const RINKEBY_CHAIN_ID = 4;
export const DEFAULT_RPC_POOLING_INTERVAL = 12_000

export const RinkebyTestnetConfig = {
    title: 'Hipo Rinkeby',
    features: {
        pledge: true,
        issue: true,
        purchase: true,
        addLiquidity: true,
        collaterals: true,
        bonds: true,
        pools: true,
        gasFees: false,
        addHipoToken: false,
    },
    wallets: {
        portisId: '',
        walletConnectBridge: '',
        coinbaseAppName: '',
        trezorEmail: '',
        trezorAppUrl: '', 
    },
    api: {
        baseUrl: isDevelopmentMode ? 'https://alpha-v1.api.hipo.one' : 'https://api-v1.hipo.one',
    },
    tokens: {        
        weth: '0x232bB0bBf8274342fB044FF40e716bf887fb9214',
        usdc: '0x48cC35cA5f68BA3bb9b864d152377308a3FdF47f',
        usdt: '0xe307D26Ee744be4730cF4EA3AEdF4808eC5846bE',        
        dai: '0x2B3a1009E4c01B4676CEbfC37C2b91BF2d330508',
        
        wethusdcLpToken: '0x232bB0bBf8274342fB044FF40e716bf887fb9214',       
        wethdaiLpToken: '0x5A1fcDa636294fc4DFdbe4B732488D7d4DA75099',
        usdtwethLpToken: '0x5A1fcDa636294fc4DFdbe4B732488D7d4DA75099',
        bonds: {
            weth: {
                address:'0x232bB0bBf8274342fB044FF40e716bf887fb9214',
                symbol: 'WETH',            
            },
            usdc: {
                address: '0x48cC35cA5f68BA3bb9b864d152377308a3FdF47f',
                symbol: 'USDC',
            },
            dai: {
                address: '0x2B3a1009E4c01B4676CEbfC37C2b91BF2d330508',
                symbol: 'DAI',
            },
            usdt: {
                address: '0xe307D26Ee744be4730cF4EA3AEdF4808eC5846bE',
                symbol: 'USDT',
            },
        },
        bondAssets: ['WETH', 'USDC', 'DAI', 'USDT']       
    },
    feeds: {
        btc: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
        eth: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
        bond: '0x6591c4BcD6D7A1eb4E537DA8B78676C1576Ba244',
        univ2: '0x6591c4BcD6D7A1eb4E537DA8B78676C1576Ba244',
        usdc: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
        usdt: '0x4e58ab12d2051ea2068e78e4fcee7ddee6785848',
        susd: '0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757',
        dai: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
        stkaave: '0x547a514d5e3769680Ce22B2361c10Ea13619e8a9',
        floki: '0xfbafc1f5b1b37cc0763780453d1ea635520708f2',
        wmatic: '0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676',
    },
    contracts: {
        col: {
            wethusdcLpTokenContract: '0x5A1fcDa636294fc4DFdbe4B732488D7d4DA75099',
            wethdaiLpTokenContract: '',
            usdtwethLpTokenContract: '',
        },
        financingPool: {
            financingPool: '0x3376B3f38B2F8DeAaA0FC71aeBc5A2845178d990',
        },
        yf: {
            staking: '0xb0Fa2BeEe3Cf36a7Ac7E99B885b48538Ab364853',
            stable: '0xB3F7abF8FA1Df0fF61C5AC38d35e20490419f4bb',
            unilp: '0xC25c37c387C5C909a94055F4f16184ca325D3a76',
            bond: '0x3FdFb07472ea4771E1aD66FD3b87b265Cd4ec112',
        },
        se: {
            ePoolPeriphery: '0x33c8d6f8271675eda1a0e72558d4904c96c7a888',
            ePoolHelper: '0x8a63822d8c1be5590bbf72fb58e69285a776a5df',
          },
        sa: {
            loupe: '0xb7D7E8F3526187e065bc674b19E0BBa42B569f6d',
        },
    },
    durations: {
        fivedays: 300,

    },
}

export const RinkebyMetamaskChain = {
    // chainId: toHex(RINKEBY_CHAIN_ID),
    chainId: RINKEBY_CHAIN_ID,
    chainName: 'Rinkeby',
    nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18
    },
    rpcUrls: ['https://rinkeby.infura.io'],
    blockExplorerUrls: [EXPLORER_URL],
}

export const RinkebyTestnetNetwork = {
    id: 'rinkeby',
    type: 'Ethereum',
    meta: {
        chainId: RINKEBY_CHAIN_ID,
        name: isDevelopmentMode ? 'Rinkeby (Alpha)' : 'Rinkeby',
        logo: '/media/logos/logo-1-dark.svg',
    },
    rpc: {
        httpsUrl: RPC_HTTPS_URL,
        wssUrl: RPC_WSS_URL,
        poolingInterval: DEFAULT_RPC_POOLING_INTERVAL,
    },
    explorer: {
        name: 'Rinkeby',
        key: EXPLORER_KEY,
        url: EXPLORER_URL,
        apiUrl: EXPLORER_API_URL,
    },
    metamaskChain: RinkebyMetamaskChain,
    config: RinkebyTestnetConfig,
}