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
        baseUrl: isDevelopmentMode ? 'https://alpha-v1.api.hipo.one' : 'https://api-v1.hipo.one',
    },
    tokens: {        
        weth: '0x232bB0bBf8274342fB044FF40e716bf887fb9214',
        usdc: '0x48cC35cA5f68BA3bb9b864d152377308a3FdF47f',
        usdt: '0xe307D26Ee744be4730cF4EA3AEdF4808eC5846bE',        
        dai: '0x2B3a1009E4c01B4676CEbfC37C2b91BF2d330508',
        
        usdcwethLpToken: '0x5A1fcDa636294fc4DFdbe4B732488D7d4DA75099',               
        wethusdtLpToken: '0xfFe3a709D0892BdFd985356FDeB359839F5c67f7',
        daiwethLpToken: '0x81b94766463E059a4196081f88DBBF7e7c945726',

        cuUSDCWETH: '0xeEbB9e9535F5b9A11C6f5519707C8F04BB8CA08A',
        cuWETHUSDT: '0x814caA8AC5F88c4F3a9Fd9D38F7BD5a02a933eBA',
        cuDAIWETH: '0xC2857237b5D306614D43D4d5fD553f08E033c7BA',

        dWETH5: '0x836d52D7A8532f5a36bC049Ac9F351BE063a0842',
        dWETH10: '0xB94efE0D74b626629f3c506961ed446695bb5293',
        dWETH15: '0xF8ba2aA88858F2Ae7DAd66C7A250A3FedF4D7269',
        dWETH30: '0x4Cc50F6b72Ffb0460b70dE57d40a1d03e8576e51',
        dWETH45: '0xE82Fa5D9A4752dED38dD29864d25bCa2a8094101',
        dWETH60: '0xd712174DdC44aB6380cffAf0e60F65E04BC6a3E1',
        dUSDC5: '0x2d5D3716fE95d2AC1c96655a081566033fCD02Db',
        dUSDC10: '0x1939B24E77955baFCAD6Aa1357740B691547F747',
        dUSDC15: '0x27dD84E5b9dEc565D40A88CBef6A643B073124cf',
        dUSDC30: '0x4b084FDD84C8db60dF90009CB767dD257E312708',
        dUSDC45: '0x4e16D43c0cc5c8F27230c1Fb455BA114fC19d481',
        dUSDC60: '0x88Ad8c2559f42182C2D570364844b5E69C0910A4',
        dUSDT5: '0x38696aFB35c2Bc82cC93Ece381299352426C9C52',
        dUSDT10: '0xFCa04FBf7A0b86079930488db36e88ddbBE956D5',
        dUSDT15: '0xee54E89355eBa91a46d35c7ef6A3726423352Ced',
        dUSDT30: '0x5C14d932b3c415628C5F824fa40b440f03272457',
        dUSDT45: '0x31B4d9386bc894d4426C0e15CCfB309A1c6dFdE3',
        dUSDT60: '0xe22ae9DFC7f25AeCC4f8BA91bbA42e336110f131',
        dDAI5: '0x7c105065a1D6FB043abd244aAd229d71d4a0a3c4',
        dDAI10: '0xe2b9A4af3A69C4505B23F918687cB441AE2B27d9',
        dDAI15: '0x6dC5B36a405FC03c379c44659F605b2c3cFf2F85',
        dDAI30: '0x13EAA4e66b52f934E91b1303a82379534Cc0a150',
        dDAI45: '0x4197ca99B361D6ADd508Ae61cFB66CA42F52BA97',
        dDAI60: '0xBbF390b50E552c35D352D0aA892080B04F303c6d', 

        lpWETH5: '0x406268D510410282630Fe5559A9B5F1AC226C68F',
        lpWETH10: '0x449Bd03B3F2A2CbE8E11521e803C8B70Fef61E28',
        lpWETH15: '0x273eceF5f1496399572978C83Ce8AE01e21Cc3E0',
        lpWETH30: '0xea33e483825ba11A95FA5bdCF14Ce0966024eb4E',
        lpWETH45: '0xc7CE6094B6aC9E6Fe82706dA3bF457CE6f2Ea08E',
        lpWETH60: '0x9694EF332b681d24aF99F89c436D9C117CC2A775',
        lpUSDC5: '0x78Ece238D70E7C9dB31A1fa7dFE60bCF9Aa72014',
        lpUSDC10: '0xaC1DD2794b2E9F8E7C2651C927F48153eA9daf2F',
        lpUSDC15: '0x7D8A28c6b3ff230eD875d01201Bf8630DB0dD295',
        lpUSDC30: '0xBE1839e79f7F462CB10C1062eC333485e1BeE310',
        lpUSDC45: '0x88c32e1704357c4243F30e80eaaF53F2a73E8775',
        lpUSDC60: '0x4DEaeca96b0e179E0Db6f03D4654595De43F3456',
        lpUSDT5: '0x73196F451eeb31B0e217e64f12BE679E1C3892f4',
        lpUSDT10: '0x6E633d880b855Bc12f02435254011167c213c501',
        lpUSDT15: '0x62F371DAb505dB383372802245ec69310eF6F4d6',
        lpUSDT30: '0xa41170CEaea0F787590EE7fF5cc900FD844DF884',
        lpUSDT45: '0xcba4D1Df410fA21CEbB616440309E3B392A77CB6',
        lpUSDT60: '0x16795Daf50a80f8499CD14DeA11cd295FE469435',
        lpDAI5: '0x8BD08c549B54154D3A567A59DFBC54D9310A6083',
        lpDAI10: '0x004Ec6C2cC15b4762b04c8d71443E0687FEc54B7',
        lpDAI15: '0xC4694687650938Ab9B423f926BfA73De46c2Df9c',
        lpDAI30: '0x0DC46eB688A3199D01d50111D0c64C94c0506c34',
        lpDAI45: '0x35c99eE332C6835F0E08B7E9238be543e41878f9',
        lpDAI60: '0xBB06dEec5960DD63289D57EC31abB59FbFB7E8dC', 
        
        bWETH5: '0x18f4A65f64602a70930C19a010a993245F30956B',
        bWETH10: '0xb70CE344112E8C5297E3E5a3A224e8f9b02ADE4A',
        bWETH15: '0x75940027690072C70b0CD2548C3C94Cd94472E52',
        bWETH30: '0x13Cc0665554AE2A5a8Da982efac4873289Fd0e71',
        bWETH45: '0x8b8f4621c1c8f3bc057b1D9f4CF0Dfcf39d640Cb',
        bWETH60: '0x6F1D3e1218426af88E00f90ae988f9318b5A7003',
        bUSDC5: '0xb048C55f01974De00484be4305459D8a2933B000',
        bUSDC10: '0x2473d10FD7711AE8A2c2C332F977E052A3CE0245',
        bUSDC15: '0x6Df2e7Cd57329f687771F563150e3d1928acA2e3',
        bUSDC30: '0xD0561b72724cB870D99b2a26fb8b440aFe115BF0',
        bUSDC45: '0xD2Baa9445df1D7E21B53c7b5c263845Ce5535f61',
        bUSDC60: '0xA8A1d5db90507c00E930A6cbc72c3727d8741622',
        bUSDT5: '0xF73AD1062Dfd156C6A2E8C790af9bFD21038B294',
        bUSDT10: '0x0E5360001A39723Ca821aA801f640783EDbE06fD',
        bUSDT15: '0x7E5EdF042459D3e4ff4A083D43B5edb3244AD4c2',
        bUSDT30: '0x9AaAB5F68562BE56833180561A929Df7Cc360ba5',
        bUSDT45: '0x3c21849Fb48246A47918355Aa60765Af1DB5d912',
        bUSDT60: '0x7d23578a15A2E07913fC7b4BCFCFb094f291eA30',
        bDAI5: '0x44dA25657287301843d45f1909C90c9534faD74A',
        bDAI10: '0x18909D9E23E258B7D003Ba3b8a0624a03C00DE9C',
        bDAI15: '0x82468eAd13379AEA22A17DC7C61BD523B30B6c52',
        bDAI30: '0xb258807e61C945B1819378CD7b75B52B113F1eDc',
        bDAI45: '0x9DBdc1f70503D4CF3F64b167E0043a4EFE38e941',
        bDAI60: '0x53eb96bC28a2Ed3B33E2bc6f721BFa3F7840fA69',
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
            protocolDataProvider: '0x3150e8AEd850bCD99Ce1a8f77f0fc5B4Af2B013B',
            walletDataProvider: '0x8c5F63ce373F9A182dbf6D240B543186d96A672d',
        },
        financingPool: {
            financingPool: '0xb3b526f6B3c1734Cd87ec5B60E92481895352028',
        },
        hipoV1AMMfactory: '0xb7926Bf50E254eC072E1aB5a3dF49b9F79B81CA2',
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