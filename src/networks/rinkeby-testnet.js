import { isDevelopmentMode } from '../utils'

const RPC_KEY = !isDevelopmentMode ? '75d301c9ba884f80a9935b8536c3ebfa' : '75d301c9ba884f80a9935b8536c3ebfa';
const RPC_HTTPS_URL = `https://rinkeby.infura.io/v3/${RPC_KEY}`;
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

        cuUSDCWETH: '0xfBaC32628121A64aaA24294219fAA12bC225A958',
        cuWETHUSDT: '0x602558862C55ba238E8f918ce28c6518193A49e1',
        cuDAIWETH: '0xd85F3bd1d0d2c6DE4F379034C1942F45604B6390',

        dWETH5: '0xE88dd2D1f6fc4A6bC3Ce82Ae7073C8E1ae2f0d46',
        dWETH10: '0x7c9e52A63D85E77F6F1374De980706D89b5d836A',
        dWETH15: '0x53e3e970A1cAE3cBe5C4E96c82679fdD9808Da86',
        dWETH30: '0x5636708309f837537c95f84418Cf672A07F3d50A',
        dWETH45: '0xeB181f0B514D35F71F384ACB9b348f9213F46713',
        dWETH60: '0x5F921286bC5665459CBA4F3feFAB7AF7998fe06A',
        dUSDC5: '0x5C5585d031c9FFC1ac6b9C6fEae0c2A29402C444',
        dUSDC10: '0x60Bc8E47E631B8b40775fd890F0ed5ad76F86720',
        dUSDC15: '0x09E8583F05f3755AAa48DeD32a44eb6Acdba5ce4',
        dUSDC30: '0xC3C4Bfc2F63359620AB6Db0265884546886ff63d',
        dUSDC45: '0x9b1d1992A740B56DF2447D50D60594A949E1CC0e',
        dUSDC60: '0xA33Acc9571832DE61834CF909971568B82BA140D',
        dUSDT5: '0x6674323Bc66dDdcCaf21E073F562363f5e54Ad97',
        dUSDT10: '0x4059BEF237FE8C6BaB55CA7163289C4e58dD435B',
        dUSDT15: '0x47d9AfFA17AAB8cA13Ef29ace99b3d2B8b193c29',
        dUSDT30: '0x3CAA4Ad5a7Ea08aABD36f8B6E61820C065e4c176',
        dUSDT45: '0xF062ab7E7747a6d23764c5982AA79d2849326135',
        dUSDT60: '0xd12e58A000c29613A539272754e4427304e0E07A',
        dDAI5: '0x358bea30e57295e7386D7a2e01094a7dB55045A7',
        dDAI10: '0x59ace89764518abC2b898a200E3216EbFad481b7',
        dDAI15: '0x3De0b34418f93cA19A1647d6df8f40b00a6277c1',
        dDAI30: '0x21F83bD9BAe5FDF5E5C3A3aD29Ffc9EF3D8b6C36',
        dDAI45: '0x64E0393606A3e8Bd41A9e1503375D7Fe5ffEe405',
        dDAI60: '0x3dE7248c5A6779afE3d14b5A999Aa78277C1A1a0', 

        lpWETH5: '0x72caf9952D473d924307318742D461B6D4A30964',
        lpWETH10: '0x4bab91bB10A1cA2c23a26e576C586fF84Dafe390',
        lpWETH15: '0xd30Edaf20F8107c0b690d42C73071311070b8033',
        lpWETH30: '0x1E4260Ca02FB7DB7929AC321a1Dd9dd073eb292A',
        lpWETH45: '0x132A78E18931e91cAe2C98d9D7637fc610b96BC8',
        lpWETH60: '0x5b9a1192962d1937aF073BBdEC4341852F29D789',
        lpUSDC5: '0x75160fF2EAaf424C57daBaC44c773d813bE014e2',
        lpUSDC10: '0x0A0317C783D5244F2780C465bA31aa56E5025B68',
        lpUSDC15: '0x709A1Ec98941Dcf44dEac524Ff166F0f981BD17c',
        lpUSDC30: '0x74e06d90e3c794e22b83596A755aBe3eA3b901EF',
        lpUSDC45: '0xd0C6636C07F6F80252A6021DD4D81Ac27e042F91',
        lpUSDC60: '0xCd83896bFF8fa669B16dBcE5fa8A391107e99063',
        lpUSDT5: '0xD3CD091566F20454254A69a62eDD80AD5CA3Ef3d',
        lpUSDT10: '0xa0d371a28F0D4C675797Ca55fbD275FE812B01DF',
        lpUSDT15: '0x9895224EDf9eAd7398666e3Ece256950e13eF839',
        lpUSDT30: '0x2340b9AD3e383eAcff525F8DA9182cf5592d36Bc',
        lpUSDT45: '0x6BBccf0C0A9bf89178a58115D70393b3ff2FB76b',
        lpUSDT60: '0xf1a721171869DEa3276e79DE72eEf538F0255aAE',
        lpDAI5: '0xa1E3FBEA747013C812fA72677aC9FFDBC51Ad06F',
        lpDAI10: '0x3ab9F68Edf57b4CCF1288dd5361808F4B8903870',
        lpDAI15: '0x94E6276F8880Ff7fed74Ba507Ed97A2B91A20c35',
        lpDAI30: '0xaa1CD6B23e24Ef061c25A424c0F9a216AB9567ec',
        lpDAI45: '0xC5205f65E2bb46da9c85A0c99ce02Ffc80bFf37a',
        lpDAI60: '0x5FbFA669d5cB538C6f32cf21d5Cada01D78E1ad6', 
        
        bWETH5: '0xC413d71Cea46AAF23dfd99D1920e7874eA80DDAf',
        bWETH10: '0xf330b82E5edb4DaC0d328868516841D08423F8B6',
        bWETH15: '0x6A7afe74A0CB5a55a613C21E17EbEd9da3B65733',
        bWETH30: '0x6061f29e8635cc76F390Fd358fD7ebF8cF9A7a55',
        bWETH45: '0x901d50902cF704bDde28F4adB0627d773fF54F79',
        bWETH60: '0xb221ed8e737ED8edE9F6683db6f0854e1e856580',
        bUSDC5: '0x0046D1b2fa90ca25c1cFe348b0429B2738bbB12f',
        bUSDC10: '0x3fAbEeb7c265fa89D9f3b22A8CD731166130aE54',
        bUSDC15: '0xF7cB7E831bD61f4758687445674c98bb842D0899',
        bUSDC30: '0xF7cB7E831bD61f4758687445674c98bb842D0899',
        bUSDC45: '0x381159C1beDAAE72F8b3cF780178Ba4D0a5Db1E9',
        bUSDC60: '0x6E147fd0dE2b5a2CA9A329116E88B9BEF668D679',
        bUSDT5: '0xB482156624cCABE6Ed1f8758e5EFE73e9d20a918',
        bUSDT10: '0xEf04c1Eca228733407736b05b5BD97386e729A54',
        // bUSDT15: '0xf9Bd5c375bde221f32C3421F107816f0AD8f378a',
        bUSDT15: '0xEf04c1Eca228733407736b05b5BD97386e729A54',
        bUSDT30: '0xeb3498efD35E54d43a52415d9520Bba15ef7f722',
        bUSDT45: '0xDDfB5b483D64d68ea41FC8cBA105187305105400',
        bUSDT60: '0xC26995180b67c311c8Ad30A4382182c1ccFCB60D',
        bDAI5: '0x1cDdd184e1273AbB7E54a7A2D0Ed6F087167737a',
        bDAI10: '0xFe145Af3dBAd7484B42Fc1ba0faBcA8296996637',
        bDAI15: '0x88D1A60B09773e49389800763f1d7AD847f5A8a7',
        bDAI30: '0x425240d9b0Addd8fD254a2586D9EF910BdC1a1C5',
        bDAI45: '0xD251389750Bc64bE8cf5fd8F91f485b2B2B394A0',
        bDAI60: '0x07276c8dbc4Dd73833317841d632c30ff47D47d4',
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
            protocolDataProvider: '0x869715D590f0a400BC4839B3516347408D55f669',
            walletDataProvider: '0xd4257Aad8D7FE85E213fe44525092fdB6c9121fD',
        },
        financingPool: {
            financingPool: '0x3376B3f38B2F8DeAaA0FC71aeBc5A2845178d990',
        },
        hipoV1AMMfactory: '0xCc4f21c5FB18330Ba23B0541c2A0ba7b9f4ef353',
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