import { toHex } from 'web3-utils';
import { isDevelopmentMode } from '../utils'

// const RPC_KEY = !isDevelopmentMode ? '75d301c9ba884f80a9935b8536c3ebfa' : '75d301c9ba884f80a9935b8536c3ebfa';
const RPC_KEY = !isDevelopmentMode ? '434ef1f8d25a495cab78aa7530dc4213' : '434ef1f8d25a495cab78aa7530dc4213';
export const RPC_HTTPS_URL = `https://rinkeby.infura.io/v3/${RPC_KEY}`;
const RPC_WSS_URL = `wss://rinkeby.infura.io/ws/v3${RPC_KEY}`;

const EXPLORER_KEY = 'T66G8AXRHGVFJ1VWWPM39PDG59Y8V747E7';
const EXPLORER_URL = 'https://rinkeby.etherscan.io';
const EXPLORER_API_URL = 'https://api.etherscan.io';

export const RINKEBY_CHAIN_ID = 4;
export const DEFAULT_RPC_POOLING_INTERVAL = 12_000

export const RinkebyTestnetConfig = {
    title: 'Hipo: Decentralized Bond Protocol',
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
        // baseUrl: isDevelopmentMode ? 'https://alpha-v1.api.hipo.one' : 'https://api-v1.hipo.one',
        baseUrl: isDevelopmentMode ? 'https://alpha-v1.api.hipo.one' : 'https://alpha-v1.api.hipo.one',
    },
    tokens: {        
        weth: '0x232bB0bBf8274342fB044FF40e716bf887fb9214',
        usdc: '0x48cC35cA5f68BA3bb9b864d152377308a3FdF47f',
        usdt: '0xe307D26Ee744be4730cF4EA3AEdF4808eC5846bE',        
        dai: '0x2B3a1009E4c01B4676CEbfC37C2b91BF2d330508',
        
        usdcwethLpToken: '0x5A1fcDa636294fc4DFdbe4B732488D7d4DA75099',               
        wethusdtLpToken: '0xfFe3a709D0892BdFd985356FDeB359839F5c67f7',
        daiwethLpToken: '0x81b94766463E059a4196081f88DBBF7e7c945726',

        cuUSDCWETH: '0xC14b74e0A607FfeCe795ae0Ed55476949775e9c5',
        cuWETHUSDT: '0x2B5A523f44bD248E731ad1d934d221631026F746',
        cuDAIWETH: '0xB82348662C329F7D8C6817ba743247C288b66967',

        dWETH5: '0x5942E9f2E1195Dba6e0731f5c4742256E018Be9C',
        dWETH10: '0x6925321aba8DbB7a55fc77c6c10b41716b78dE77',
        dWETH15: '0x235274a3Db2459b8057608a38439f3cae03Ccccb',
        dWETH30: '0xDFA44BC1Ed4BeC97652d4c2DB3F2f07F946dB162',
        dWETH45: '0x862834491574594471dC485480dd522aFF709cc4',
        dWETH60: '0x0A4FC401A8CA03F541775Edf06eB7FBeB0aF2A2F',
        dUSDC5: '0x738f7deb9d945787B499Db335A8EE5B934E04C7b',
        dUSDC10: '0xf13D8D74c6d8A12fC5799E4A534C71F5B234Cb8e',
        dUSDC15: '0xc7EA7a94Ce22DA7705a3D818F70eE15c3445E4D0',
        dUSDC30: '0xd4D1190fa2B1Bd110371BA4dd937454B53adA2F9',
        dUSDC45: '0x1800bb0d9820bda6f8F7647d61102056eEf1fA30',
        dUSDC60: '0x654f5c1eA9EE164663839Ef3538626085f2e65E3',
        dUSDT5: '0xbc6609b86Ffe8c3D776AC2586AF7f8e926145bF6',
        dUSDT10: '0x141d53017AD8d0da9112594AfA355e8B370AF5cD',
        dUSDT15: '0xd91F5B089AaC1DD8d1EE14E17714C0D098425E8A',
        dUSDT30: '0x69f337615d56a0C63D6875036f0bCf6b23a016f9',
        dUSDT45: '0xd1Cd959B3635c31b2Ae009b6596A476EFaaDa7DA',
        dUSDT60: '0x7eb284CbE5381D77894F2900630fbC59163D0Fbb',
        dDAI5: '0x8B102918f7F6e3D9029C0365f7433f69351a3977',
        dDAI10: '0x4fc7c1273e2eC24F0e3cC8429d6f6F947CB53A32',
        dDAI15: '0x5aBDA44ECeed5b757fA6d079EEBC5e4f174ad5Ba',
        dDAI30: '0xC7fd772fB343Ebc7fae56411AbEEadD60FCC70a9',
        dDAI45: '0x8B9571579bB4A0E85F152C72C03535973008CE9A',
        dDAI60: '0xdcC8DAB721eBC8D09028460399D50048969aA5bE', 

        lpWETH5: '0x9ee04Ef738dE740F9d17015d45C8222A54D0ce69',
        lpWETH10: '0x93936f9531962eD876cBBaEc116A3EA05b220024',
        lpWETH15: '0x09b9DE3e58ceCEB71b07B4c12e54Ec59f2b27244',
        lpWETH30: '0x25c6895dcc7D1E2D008e31f577F4223eF047fE65',
        lpWETH45: '0x00DB6D4AcC3B6938967bABE16743982515677c82',
        lpWETH60: '0xd46771A1d4192a71FbD421D81b83b4c906204e96',
        lpUSDC5: '0x89039f3caB23bB978d41c8AA10120A853732Aa83',
        lpUSDC10: '0x32182Eb53Ff5E4BaAeD5dd6dC7039b3C6b745fC1',
        lpUSDC15: '0xE4883Ca792C0b0e0f30fB2bb743CaB276Cc88f3E',
        lpUSDC30: '0x5b868C2277Cc2264CD77C00882eF478669687529',
        lpUSDC45: '0x12f3bD6AB51dd7e36a6daFb9Ae3EB0DD055907AE',
        lpUSDC60: '0x176255b62edA4C5931aEBe102781DF3ab26474d8',
        lpUSDT5: '0x5Fb262215c2cd85CA16bE646Ca9d0FA5A9aa8d06',
        lpUSDT10: '0x47cC44445060e0C1AF9554F15BF00218620eD074',
        lpUSDT15: '0xd8F2FC922d17b4230bBB9a69A01C42E9141c55F2',
        lpUSDT30: '0x5Dbbd780e275a5E05F0A004E30c0ad4cEbfaC248',
        lpUSDT45: '0x103fF0e85B9B1695d698c9961445c0689954c692',
        lpUSDT60: '0x251b1AAc79045d58117A804cBB582718F2025662',
        lpDAI5: '0xac41354ccC0bcE4ad65DF23A4DDF1cD806f3dECe',
        lpDAI10: '0x803F927Bc412141b0A720D8700faF4EF37d861fC',
        lpDAI15: '0x9A9fB8392edc6D425F729972BE7C3ce4d6F51f34',
        lpDAI30: '0x6FAF2324F487f493919AA282e77e78849490cF5D',
        lpDAI45: '0x58b9269c4c293976A0f5BEaD2Af4b358919c5798',
        lpDAI60: '0x3D9b282AC62874CbE652940Efaf193ebAaCCC662', 
        
        bWETH5: '0x1B39Dc80DAb47FF66D6701eEcA81bFA807fa8A3f',
        bWETH10: '0x4beb91a99880e7b1858Bb04674fb783CB2c17390',
        bWETH15: '0x7cb0F4a8cE50C523f83b645e8D4F595D77107B0b',
        bWETH30: '0x4C9523687cd84C555D19Dc5717B8708d9E73EC4B',
        bWETH45: '0x1823f18D40dCC9d7703D4c2E22B827c11b13cFf2',
        bWETH60: '0x70D297b58352f69Cc050103Cb37e1854e7f74FC9',
        bUSDC5: '0x43Ed2aCA08DA6beb605fE5034cD6d6493b6E8aB4',
        bUSDC10: '0x5A4DeCf152E05f40C02C4f835db9a3C526A01AF3',
        bUSDC15: '0x70291336FFa75963e00cb02fAE7bfEfb26b53ecF',
        bUSDC30: '0x711407EEA17dFCc7B1392Bb6F8140e8502CFa2c2',
        bUSDC45: '0xFF2e1aD9A84Dd81C41E0A1d656b68fDF19A62d7B',
        bUSDC60: '0xEA9a2FB3659cc4e98dd5363A0048c3996Bb6DbE3',
        bUSDT5: '0xDd784178a530f76885A07849B9d899718d984fb5',
        bUSDT10: '0x00Ea0ac2F00e0daB339120bC1E81E6ed4713823e',
        bUSDT15: '0x35eDc98BA61E4A6f9f0d4d8e1696A79abE10B644',
        bUSDT30: '0x5103b59b8448F7F7626E17b99F07Af45F212a99D',
        bUSDT45: '0xd335768d7714C3bcf7105898aEbB00cC2bc38EC1',
        bUSDT60: '0x72ec63BB12608ef1D3867074Ccd7479168e11711',
        bDAI5: '0x87ef6d6fD16f35E6F8D66760E28b17bD17397cc8',
        bDAI10: '0xBf1D602474Bba1e280F43B34aE3A0b440Bac3982',
        bDAI15: '0x168fFb482619B2167c06FAC53b8aa5A9812fA169',
        bDAI30: '0x2d51c9c62D25896b1A98F36Fa9B1E7D93e9B600C',
        bDAI45: '0x70E89F14fe8eEb83375D6BF39C9917EB7bb36F76',
        bDAI60: '0x28F351b234D963b7e0A86054b5a850c742549A20',
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
        
        dataProvider: {
            protocolDataProvider: '0x23f3fa94c1127b46F6C9387641D991a7a19A0B3d',
            walletDataProvider: '0xa0Ef5B7E7C8D1F82f7569cA6ed5790741FE5Ebe0',
        },
        financingPool: {
            financingPool: '0x29Eaa93307896Ba122325F00415b3467379c7A4B',
        },
        hipoV1AMMfactory: '0xA859AC72c93Db81428966eC98Cf8C76F390ea31f',
    },
}

export const RinkebyMetamaskChain = {
    chainId: toHex(RINKEBY_CHAIN_ID),
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
        name: isDevelopmentMode ? 'Rinkeby Testnet' : 'Rinkeby Testnet',
        logo: '/media/networks/ethereum.svg',
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