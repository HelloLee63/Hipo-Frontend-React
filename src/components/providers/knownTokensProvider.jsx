import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
// import { formatUSD } from 'web3/utils';

// import { MumbaiNetwork } from 'networks/mumbai';
// import { PolygonNetwork } from 'networks/polygon';

import TokensProvider from './tokensProvider';

import { isDevelopmentMode } from '../../utils';
import { queryfy } from '../../utils/fetch';

import { useNetwork } from './networkProvider';
import { MainnetHttpsWeb3Provider, useWeb3 } from './web3Provider';
import { useReload } from '../../hooks/useReload';
import { InvariantContext } from '../../utils/context';
import { useWallet } from '../../wallets/walletProvider';
import { useContractManager, useErc20Contract } from '../../web3/components/contractManagerProvider';
import Web3Contract, { createAbiItem } from '../../web3/web3Contract';
import Erc20Contract from '../../web3/erc20Contract';
import { useConfig } from './configProvider';

const KnownTokens = {
  ETH: 'ETH',
  WETH: 'WETH',
  USDC: 'USDC',
  DAI: 'DAI',
  USDT: 'USDT',
}

const Context = createContext(InvariantContext('KnownTokensProvider'));

export function useKnownTokens() {
  return useContext(Context);
}

const PRICE_FEED_ABI = [
  createAbiItem('decimals', [], ['int8']),
  createAbiItem('latestAnswer', [], ['int256']),
];

const BOND_PRICE_FEED_ABI = [
  createAbiItem('decimals', [], ['uint8']),
  createAbiItem('totalSupply', [], ['uint256']),
  createAbiItem('getReserves', [], ['uint112', 'uint112']),
  createAbiItem('token0', [], ['address']),
];

const J_PRICE_FEED_ABI = [createAbiItem('price', [], ['uint256'])];

async function getGusdPrice() {
  const query = queryfy({
    ids: ['gemini-dollar'],
    vs_currencies: 'usd',
  });

  const url = new URL(`/api/v3/simple/price?${query}`, 'https://api.coingecko.com');
  const result = await fetch(String(url)).then(response => response.json());

  return BigNumber.from(result['gemini-dollar'].usd);
}

async function getRaiPrice() {
  const query = queryfy({
    ids: ['rai'],
    vs_currencies: 'usd',
  });

  const url = new URL(`/api/v3/simple/price?${query}`, 'https://api.coingecko.com');
  const result = await fetch(String(url)).then(response => response.json());

  return BigNumber.from(result['rai'].usd);
}

const KnownTokensProvider = props => {
  const { children } = props;

  const network = useNetwork();
  const config = useConfig();
  const wallet = useWallet();
  const web3 = useWeb3();
  const { getContract } = useContractManager();
  const [reload] = useReload();

  
  const wethContract = useErc20Contract(config.tokens.weth);
  const usdcContract = useErc20Contract(config.tokens.usdc);
  const usdtContract = useErc20Contract(config.tokens.usdt);
  const daiContract = useErc20Contract(config.tokens.dai);


  //Collateral Tokens
 
  const wethusdcLpTokenContract = useErc20Contract(config.tokens.wethusdcLpToken);
  const wethdaiLpTokenContract = useErc20Contract(config.tokens.wethdaiLpToken);
  const usdtwethLpTokenContract = useErc20Contract(config.tokens.usdtwethLpToken);
  

  const tokens = useMemo(
    () => [
      { symbol: 'wethusdcLpToken',
        name: 'wethusdcLpToken',
        address: '',
        decimals: 18,
        icon: 'wethusdcLpToken',
        // pricePath: [KnownTokens.BTC],
        contract: wethusdcLpTokenContract,
      },
      { symbol: 'wethdaiLpToken',
        name: 'wethdaiLpToken',
        address: '',
        decimals: 18,
        icon: 'wethusdcLpToken',
        // pricePath: [KnownTokens.BTC],
        contract: wethdaiLpTokenContract,
      },
      { symbol: 'usdtwethLpToken',
        name: 'usdtwethLpToken',
        address: '',
        decimals: 18,
        icon: 'usdtwethLpToken',
        // pricePath: [KnownTokens.BTC],
        contract: usdtwethLpTokenContract,
      },
      {
        symbol: KnownTokens.ETH,
        name: 'Ether',
        address: '0x',
        decimals: 18,
        icon: 'eth',
        priceFeed: config.feeds.eth, // ETH -> $
      },
      {
        symbol: KnownTokens.WETH,
        name: 'Wrapped Ether',
        address: config.tokens.weth.toLowerCase(),
        decimals: 18,
        icon: 'weth',
        pricePath: [KnownTokens.ETH],
        contract: wethContract,
      },
      {
        symbol: KnownTokens.USDC,
        name: 'USD Coin',
        address: config.tokens.usdc.toLowerCase(),
        decimals: 6,
        icon: 'usdc',
        color: '#4f6ae5',
        priceFeed: config.feeds.usdc, // USDC -> $
        contract: usdcContract,
      },
      {
        symbol: KnownTokens.USDT,
        name: 'Tether USD',
        address: config.tokens.usdt.toLowerCase(),
        decimals: 6,
        icon: 'usdt',
        priceFeed: config.feeds.usdt, // USDT -> $
        contract: usdtContract,
      },
      {
        symbol: KnownTokens.DAI,
        name: 'Dai Stablecoin',
        address: config.tokens.dai.toLowerCase(),
        decimals: 18,
        icon: 'dai',
        color: '#ffd160',
        priceFeed: config.feeds.dai, // DAI -> $
        contract: daiContract,
      },
    ],
    [],
  );

  const getTokenBySymbol = useCallback(
    (symbol) => {
      let fSymbol = symbol;

      // if (isDevelopmentMode) {
      //   if (fSymbol === 'bbcUSDC') {
      //     fSymbol = KnownTokens.bbcUSDC;
      //   }
      // }

      // if (network.activeNetwork === PolygonNetwork || network.activeNetwork === MumbaiNetwork) {
      //   switch (fSymbol) {
      //     case 'bb_cmUSDC':
      //       fSymbol = KnownTokens.bbcUSDC;
      //       break;
      //     case 'bb_cmDAI':
      //       fSymbol = KnownTokens.bbcDAI;
      //       break;
      //     case 'bb_amUSDC':
      //       fSymbol = KnownTokens.bbaUSDC;
      //       break;
      //     case 'bb_amUSDT':
      //       fSymbol = KnownTokens.bbaUSDT;
      //       break;
      //     case 'bb_amGUSD':
      //       fSymbol = KnownTokens.bbaGUSD;
      //       break;
      //     case 'bb_amDAI':
      //       fSymbol = KnownTokens.bbaDAI;
      //       break;
      //     case 'bb_crmUSDC':
      //       fSymbol = KnownTokens.bbcrUSDC;
      //       break;
      //     case 'bb_crmUSDT':
      //       fSymbol = KnownTokens.bbcrUSDT;
      //       break;
      //     case 'bb_crmDAI':
      //       fSymbol = KnownTokens.bbcrDAI;
      //       break;
      //   }
      // }

      return tokens.find(token => token.symbol === fSymbol);
    },
    [tokens],
  );

  const getTokenByAddress = useCallback(
    (address) => {
      return tokens.find(token => token.address.toLowerCase() === address.toLowerCase());
    },
    [tokens],
  );

  // const getTokenIconBySymbol = useCallback(
  //   (symbol) => {
  //     let foundToken

  //     if (isDevelopmentMode && symbol === KnownTokens.bbcUSDC) {
  //       foundToken = tokens.find(token => token.symbol === 'bb_cUSDC');
  //     } else {
  //       foundToken = tokens.find(token => token.symbol === symbol);
  //     }

  //     return foundToken?.icon || 'unknown';
  //   },
  //   [tokens],
  // );

  // const getFeedPrice = useCallback(async (symbol) => {
  //   const token = getTokenBySymbol(symbol);

  //   if (!token || !token.priceFeed) {
  //     return Promise.reject();
  //   }

  //   const priceFeedContract = getContract<Erc20Contract>(token.priceFeed, () => {
  //     return new Erc20Contract(PRICE_FEED_ABI, token.priceFeed);
  //   });
  //   priceFeedContract.setCallProvider(MainnetHttpsWeb3Provider); // TODO: Re-think about mainnet provider

  //   const [decimals, latestAnswer] = await priceFeedContract.batch([
  //     { method: 'decimals', transform: Number },
  //     { method: 'latestAnswer', transform: BigNumber.parse },
  //   ]);

  //   return latestAnswer.unscaleBy(decimals);
  // }, []);

  // const getBondPrice = useCallback(async () => {
  //   const usdcToken = getTokenBySymbol(KnownTokens.USDC);
  //   const bondToken = getTokenBySymbol(KnownTokens.BOND);

  //   if (!usdcToken || !bondToken || !bondToken.priceFeed) {
  //     return Promise.reject();
  //   }

  //   const priceFeedContract = new Erc20Contract(BOND_PRICE_FEED_ABI, bondToken.priceFeed);
  //   priceFeedContract.setCallProvider(web3.activeProvider);
  //   const [decimals, [reserve0, reserve1], token0] = await priceFeedContract.batch([
  //     { method: 'decimals', transform: Number },
  //     {
  //       method: 'getReserves',
  //       transform: ({ 0: reserve0, 1: reserve1 }) => [BigNumber.parse(reserve0), BigNumber.parse(reserve1)],
  //     },
  //     { method: 'token0', transform: value => value.toLowerCase() },
  //   ]);

  //   const bond = token0 === bondToken.address.toLowerCase() ? reserve0 : reserve1;
  //   const usdc = token0 === bondToken.address.toLowerCase() ? reserve1 : reserve0;

  //   const bondReserve = bond.unscaleBy(decimals);
  //   const usdcReserve = usdc.unscaleBy(usdcToken.decimals);

  //   return usdcReserve.dividedBy(bondReserve);
  // }, [getTokenBySymbol]);

  // const getUniV2Price = useCallback(async () => {
  //   const usdcToken = getTokenBySymbol(KnownTokens.USDC);
  //   const univ2Token = getTokenBySymbol(KnownTokens.UNIV2);

  //   if (!usdcToken || !univ2Token || !univ2Token.priceFeed) {
  //     return Promise.reject();
  //   }

  //   const priceFeedContract = new Erc20Contract(BOND_PRICE_FEED_ABI, univ2Token.priceFeed);
  //   priceFeedContract.setCallProvider(web3.activeProvider);

  //   const [decimals, totalSupply, [reserve0, reserve1], token0] = await priceFeedContract.batch([
  //     { method: 'decimals', transform: Number },
  //     { method: 'totalSupply', transform: BigNumber.parse },
  //     {
  //       method: 'getReserves',
  //       transform: ({ 0: reserve0, 1: reserve1 }) => [BigNumber.parse(reserve0), BigNumber.parse(reserve1)],
  //     },
  //     { method: 'token0', transform: value => value.toLowerCase() },
  //   ]);

  //   const usdcAmount = token0 === usdcToken.address.toLowerCase() ? reserve0 : reserve1;
  //   const usdcReserve = usdcAmount.unscaleBy(usdcToken.decimals);
  //   const supply = totalSupply.unscaleBy(decimals);

  //   return usdcReserve.dividedBy(supply).multipliedBy(2);
  // }, [getTokenBySymbol]);

  // const getJTokenPrice = useCallback(
  //   async (symbol) => {
  //     const token = getTokenBySymbol(symbol);

  //     if (!token || !token.priceFeed) {
  //       return Promise.reject();
  //     }

  //     const priceFeedContract = new Erc20Contract(J_PRICE_FEED_ABI, token.priceFeed);
  //     priceFeedContract.setCallProvider(web3.activeProvider);

  //     const price = await priceFeedContract.call('price');

  //     return new BigNumber(price).dividedBy(1e18);
  //   },
  //   [getTokenBySymbol],
  // );

  // const getJATokenPrice = useCallback(
  //   async (symbol) => {
  //     const token = getTokenBySymbol(symbol);

  //     if (!token || !token.priceFeed) {
  //       return Promise.reject();
  //     }

  //     const priceFeedContract = new Erc20Contract(J_PRICE_FEED_ABI, token.priceFeed);
  //     priceFeedContract.setCallProvider(MainnetHttpsWeb3Provider); // TODO: Re-think about mainnet provider

  //     const price = await priceFeedContract.call('price');

  //     return new BigNumber(price).dividedBy(1e18);
  //   },
  //   [getTokenBySymbol],
  // );

  // const getTokenPrice = useCallback(
  //   (symbol) => {
  //     return getTokenBySymbol(symbol)?.price;
  //   },
  //   [getTokenBySymbol],
  // );

  // const getTokenPriceIn = useCallback(
  //   (source, target) => {
  //     const sourcePrice = getTokenPrice(source);
  //     const targetPrice = getTokenPrice(target);

  //     if (!sourcePrice || !targetPrice) {
  //       return undefined;
  //     }

  //     return sourcePrice.dividedBy(targetPrice);
  //   },
  //   [getTokenPrice],
  // );

  // const convertTokenIn = useCallback(
  //   (amount, source, target) => {
  //     if (amount === undefined || amount === null) {
  //       return undefined;
  //     }

  //     if (amount === 0 || BigNumber.ZERO.eq(amount)) {
  //       return BigNumber.ZERO;
  //     }

  //     const bnAmount = new BigNumber(amount);

  //     if (bnAmount.isNaN()) {
  //       return undefined;
  //     }

  //     if (source === target) {
  //       return bnAmount;
  //     }

  //     const price = getTokenPriceIn(source, target);

  //     if (!price) {
  //       return undefined;
  //     }

  //     return bnAmount.multipliedBy(price);
  //   },
  //   [getTokenPriceIn],
  // );

  // const convertTokenInUSD = useCallback(
  //   (amount, source) => {
  //     return convertTokenIn(amount, source, KnownTokens.USDC);
  //   },
  //   [convertTokenIn],
  // );

  const [
    wethusdcLpToken,
    wethdaiLpToken,
    usdtwethLpToken,
  //   projectToken,
  //   bondToken,
    wethToken,
    daiToken,
    usdcToken,
    usdtToken,
  ] = useMemo(() => {
    return [
      getTokenBySymbol('wethusdcLpToken'),
      getTokenBySymbol('wethdaiLpToken'),
      getTokenBySymbol('usdtwethLpToken'),
      getTokenBySymbol(KnownTokens.WETH),
  //     network.activeNetwork !== PolygonNetwork
  //       ? getTokenBySymbol(KnownTokens.STK_AAVE)
  //       : getTokenBySymbol(KnownTokens.WMATIC),
      getTokenBySymbol(KnownTokens.DAI),
      getTokenBySymbol(KnownTokens.USDC),
      getTokenBySymbol(KnownTokens.USDT),
    ];
  }, [getTokenBySymbol]);

  // useEffect(() => {
  //   (async () => {
  //     await Promise.allSettled(
  //       tokens.map(async token => {
  //         switch (token.symbol) {
  //           case KnownTokens.BOND:
  //             token.price = await getBondPrice();
  //             break;
  //           case KnownTokens.UNIV2:
  //             token.price = await getUniV2Price();
  //             break;
  //           case KnownTokens.bbcUSDC:
  //           case KnownTokens.bbcDAI:
  //           case KnownTokens.bbcrDAI:
  //           case KnownTokens.bbcrUSDC:
  //           case KnownTokens.bbcrUSDT:
  //             token.price = await getJTokenPrice(token.symbol);
  //             break;
  //           case KnownTokens.bbaDAI:
  //           case KnownTokens.bbaUSDC:
  //           case KnownTokens.bbaUSDT:
  //           case KnownTokens.bbaGUSD:
  //             token.price = await getJATokenPrice(token.symbol);
  //             break;
  //           case KnownTokens.GUSD:
  //             token.price = await getGusdPrice();
  //             break;
  //           case KnownTokens.RAI:
  //             token.price = await getRaiPrice();
  //             break;
  //           default:
  //             token.price = await getFeedPrice(token.symbol);
  //             break;
  //         }
  //       }),
  //     );

  //     tokens.forEach(token => {
  //       if (token.priceFeed && token.price === undefined) {
  //         token.price = BigNumber.ZERO;
  //       } else if (token.pricePath) {
  //         for (let path of token.pricePath) {
  //           const tk = getTokenBySymbol(path);

  //           if (!tk || !tk.price) {
  //             token.price = undefined;
  //             break;
  //           }

  //           token.price = token.price?.multipliedBy(tk.price) ?? tk.price;
  //         }
  //       }

  //       console.log(`[Token Price] ${token.symbol} = ${formatUSD(token.price)}`);
  //     });
  //     reload();
  //   })();
  // }, [getBondPrice, getFeedPrice, getJATokenPrice, getJTokenPrice, getTokenBySymbol, getUniV2Price, reload, tokens]);

  // useEffect(() => {
  //   if (projectToken) {
  //     (projectToken.contract).loadCommon().catch(Error);
  //   }
  // }, [projectToken]);

  // useEffect(() => {
  //   if (projectToken && wallet.account) {
  //     (projectToken.contract).loadBalance().then(reload);
  //   }
  // }, [projectToken, reload, wallet.account]);

  const value = {
    tokens,
    wethToken,
    usdcToken,
    daiToken,
    usdtToken,
    wethusdcLpToken, 
    wethdaiLpToken, 
    usdtwethLpToken
  };

  return (
    <Context.Provider value={value}>
      <TokensProvider>{children}</TokensProvider>
    </Context.Provider>
  );
};

export default KnownTokensProvider;