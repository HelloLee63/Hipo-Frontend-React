import BigNumber from "bignumber.js";
import { usePools } from "../../../../components/providers/poolsProvider";
import { StatisticsWidget } from "../../../../components/statistics/StatisticsWidget";
import { useProtocolData } from "../../../../web3/components/providers/ProtocolDataProvider";
import { formatToken, getHumanValue } from "../../../../web3/utils";

const MarketOverview = () => {

  console.log('Overview is rendered');

  // const bondMarket = useBondMarket()

  const { assets, collateralPools, bondPools } = usePools()
  const { protocolDataContract } = useProtocolData()

  const totalCUSDCWETH = collateralPools[0].contract.totalSupply?.toString()
  const totalCWETHUSDT = collateralPools[1].contract.totalSupply?.toString()
  const totalCDAIWETH = collateralPools[2].contract.totalSupply?.toString()

  console.log(totalCUSDCWETH);
  console.log(totalCWETHUSDT);
  console.log(totalCDAIWETH);

  const decimalsCUSDCWETH = collateralPools[0].collateralAsset.decimals
  const decimalsCWETHUSDT = collateralPools[1].collateralAsset.decimals
  const decimalsCDAIWETH = collateralPools[2].collateralAsset.decimals

  console.log(decimalsCUSDCWETH);

  const decimalsUSDC = assets[1].decimals
  const decimalsUSDT = assets[2].decimals
  const decimalsDAI = assets[3].decimals


  //Step 1: cal total supply of each Uniswap V2 Lp token

  const totalUSDCWETHLpToken = collateralPools[0].collateralAsset.contract.totalSupply?.toString()
  const totalWETHUSDTLpToken = collateralPools[1].collateralAsset.contract.totalSupply?.toString()
  const totalDAIWETHLpToken = collateralPools[2].collateralAsset.contract.totalSupply?.toString()

  console.log(totalUSDCWETHLpToken);
  console.log(totalWETHUSDTLpToken);
  console.log(totalDAIWETHLpToken);

  //Step 2: cal asset balance of each Uniswap V2 Lp pool

  const amountUSDCInUsdcPool = assets[1].contract.getBalanceOf(collateralPools[0].collateralAsset.address)?.toString()
  const amountUSDTInUsdtPool = assets[2].contract.getBalanceOf(collateralPools[1].collateralAsset.address)?.toString()
  const amountDAIInDaiPool = assets[3].contract.getBalanceOf(collateralPools[2].collateralAsset.address)?.toString()

  console.log(amountUSDCInUsdcPool);
  console.log(amountUSDTInUsdtPool);
  console.log(amountDAIInDaiPool);

  //Step 3: cal ratio of each collateral in Uniswap V2 Lp pool

  const rCUSDCWETH = new BigNumber(totalCUSDCWETH).dividedBy(new BigNumber(totalUSDCWETHLpToken)).toString()
  const rCUSDTWETH = new BigNumber(totalCWETHUSDT).dividedBy(new BigNumber(totalWETHUSDTLpToken)).toString()
  const rCDAIWETH = new BigNumber(totalCDAIWETH).dividedBy(new BigNumber(totalDAIWETHLpToken)).toString()

  console.log(rCUSDCWETH);
  console.log(rCUSDTWETH);
  console.log(rCDAIWETH);

  const amountUSDCFromCollateral = getHumanValue(new BigNumber(amountUSDCInUsdcPool).multipliedBy(2).multipliedBy(rCUSDCWETH), decimalsUSDC).toString()
  const amountUSDTFromCollateral = getHumanValue(new BigNumber(amountUSDTInUsdtPool).multipliedBy(2).multipliedBy(rCUSDTWETH), decimalsUSDT).toString()
  const amountDAIFromCollateral = getHumanValue(new BigNumber(amountDAIInDaiPool).multipliedBy(2).multipliedBy(rCDAIWETH), decimalsDAI).toString()

  console.log(amountUSDCFromCollateral);
  console.log(amountUSDTFromCollateral);
  console.log(amountDAIFromCollateral);
  const price = 2000
  const price2 = 1

  const amountLp0 = getHumanValue(new BigNumber(bondPools[0].lpToken.contract.totalSupply)?.multipliedBy(price), bondPools[0].lpToken.decimals).toString()
  const amountLp1 = getHumanValue(new BigNumber(bondPools[1].lpToken.contract.totalSupply)?.multipliedBy(price), bondPools[1].lpToken.decimals).toString()
  const amountLp2 = getHumanValue(new BigNumber(bondPools[2].lpToken.contract.totalSupply)?.multipliedBy(price), bondPools[2].lpToken.decimals).toString()
  const amountLp3 = getHumanValue(new BigNumber(bondPools[3].lpToken.contract.totalSupply)?.multipliedBy(price), bondPools[3].lpToken.decimals).toString()
  const amountLp4 = getHumanValue(new BigNumber(bondPools[4].lpToken.contract.totalSupply)?.multipliedBy(price), bondPools[4].lpToken.decimals).toString()
  const amountLp5 = getHumanValue(new BigNumber(bondPools[5].lpToken.contract.totalSupply)?.multipliedBy(price), bondPools[5].lpToken.decimals).toString()
  const amountLp6 = getHumanValue(new BigNumber(bondPools[6].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[6].lpToken.decimals).toString()
  const amountLp7 = getHumanValue(new BigNumber(bondPools[7].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[7].lpToken.decimals).toString()
  const amountLp8 = getHumanValue(new BigNumber(bondPools[8].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[8].lpToken.decimals).toString()
  const amountLp9 = getHumanValue(new BigNumber(bondPools[9].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[9].lpToken.decimals).toString()
  const amountLp10 = getHumanValue(new BigNumber(bondPools[10].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[10].lpToken.decimals).toString()
  const amountLp11 = getHumanValue(new BigNumber(bondPools[11].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[11].lpToken.decimals).toString()
  const amountLp12 = getHumanValue(new BigNumber(bondPools[12].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[12].lpToken.decimals).toString()
  const amountLp13 = getHumanValue(new BigNumber(bondPools[13].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[13].lpToken.decimals).toString()
  const amountLp14 = getHumanValue(new BigNumber(bondPools[14].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[14].lpToken.decimals).toString()
  const amountLp15 = getHumanValue(new BigNumber(bondPools[15].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[15].lpToken.decimals).toString()
  const amountLp16 = getHumanValue(new BigNumber(bondPools[16].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[16].lpToken.decimals).toString()
  const amountLp17 = getHumanValue(new BigNumber(bondPools[17].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[17].lpToken.decimals).toString()
  const amountLp18 = getHumanValue(new BigNumber(bondPools[18].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[18].lpToken.decimals).toString()
  const amountLp19 = getHumanValue(new BigNumber(bondPools[19].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[19].lpToken.decimals).toString()
  const amountLp20 = getHumanValue(new BigNumber(bondPools[20].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[20].lpToken.decimals).toString()
  const amountLp21 = getHumanValue(new BigNumber(bondPools[21].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[21].lpToken.decimals).toString()
  const amountLp22 = getHumanValue(new BigNumber(bondPools[22].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[22].lpToken.decimals).toString()
  const amountLp23 = getHumanValue(new BigNumber(bondPools[23].lpToken.contract.totalSupply)?.multipliedBy(price2), bondPools[23].lpToken.decimals).toString()

  const totalLp = BigNumber.sum(
    new BigNumber(amountLp0),
    new BigNumber(amountLp1),
    new BigNumber(amountLp2),
    new BigNumber(amountLp3),
    new BigNumber(amountLp4),
    new BigNumber(amountLp5),
    new BigNumber(amountLp6),
    new BigNumber(amountLp7),
    new BigNumber(amountLp8),
    new BigNumber(amountLp9),
    new BigNumber(amountLp10),
    new BigNumber(amountLp11),
    new BigNumber(amountLp12),
    new BigNumber(amountLp13),
    new BigNumber(amountLp14),
    new BigNumber(amountLp15),
    new BigNumber(amountLp16),
    new BigNumber(amountLp17),
    new BigNumber(amountLp18),
    new BigNumber(amountLp19),
    new BigNumber(amountLp20),
    new BigNumber(amountLp21),
    new BigNumber(amountLp22),
    new BigNumber(amountLp23)
  )

  const amountInvestor0 = getHumanValue(new BigNumber(bondPools[0].bToken.contract.totalSupply)?.multipliedBy(price), bondPools[0].bToken.decimals).toString()
  const amountInvestor1 = getHumanValue(new BigNumber(bondPools[1].bToken.contract.totalSupply)?.multipliedBy(price), bondPools[1].bToken.decimals).toString()
  const amountInvestor2 = getHumanValue(new BigNumber(bondPools[2].bToken.contract.totalSupply)?.multipliedBy(price), bondPools[2].bToken.decimals).toString()
  const amountInvestor3 = getHumanValue(new BigNumber(bondPools[3].bToken.contract.totalSupply)?.multipliedBy(price), bondPools[3].bToken.decimals).toString()
  const amountInvestor4 = getHumanValue(new BigNumber(bondPools[4].bToken.contract.totalSupply)?.multipliedBy(price), bondPools[4].bToken.decimals).toString()
  const amountInvestor5 = getHumanValue(new BigNumber(bondPools[5].bToken.contract.totalSupply)?.multipliedBy(price), bondPools[5].bToken.decimals).toString()
  const amountInvestor6 = getHumanValue(new BigNumber(bondPools[6].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[6].bToken.decimals).toString()
  const amountInvestor7 = getHumanValue(new BigNumber(bondPools[7].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[7].bToken.decimals).toString()
  const amountInvestor8 = getHumanValue(new BigNumber(bondPools[8].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[8].bToken.decimals).toString()
  const amountInvestor9 = getHumanValue(new BigNumber(bondPools[9].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[9].bToken.decimals).toString()
  const amountInvestor10 = getHumanValue(new BigNumber(bondPools[10].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[10].bToken.decimals).toString()
  const amountInvestor11 = getHumanValue(new BigNumber(bondPools[11].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[11].bToken.decimals).toString()
  const amountInvestor12 = getHumanValue(new BigNumber(bondPools[12].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[12].bToken.decimals).toString()
  const amountInvestor13 = getHumanValue(new BigNumber(bondPools[13].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[13].bToken.decimals).toString()
  const amountInvestor14 = getHumanValue(new BigNumber(bondPools[14].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[14].bToken.decimals).toString()
  const amountInvestor15 = getHumanValue(new BigNumber(bondPools[15].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[15].bToken.decimals).toString()
  const amountInvestor16 = getHumanValue(new BigNumber(bondPools[16].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[16].bToken.decimals).toString()
  const amountInvestor17 = getHumanValue(new BigNumber(bondPools[17].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[17].bToken.decimals).toString()
  const amountInvestor18 = getHumanValue(new BigNumber(bondPools[18].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[18].bToken.decimals).toString()
  const amountInvestor19 = getHumanValue(new BigNumber(bondPools[19].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[19].bToken.decimals).toString()
  const amountInvestor20 = getHumanValue(new BigNumber(bondPools[20].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[20].bToken.decimals).toString()
  const amountInvestor21 = getHumanValue(new BigNumber(bondPools[21].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[21].bToken.decimals).toString()
  const amountInvestor22 = getHumanValue(new BigNumber(bondPools[22].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[22].bToken.decimals).toString()
  const amountInvestor23 = getHumanValue(new BigNumber(bondPools[23].bToken.contract.totalSupply)?.multipliedBy(price2), bondPools[23].bToken.decimals).toString()

  const totalInvesor = BigNumber.sum(
    new BigNumber(amountInvestor0),
    new BigNumber(amountInvestor1),
    new BigNumber(amountInvestor2),
    new BigNumber(amountInvestor3),
    new BigNumber(amountInvestor4),
    new BigNumber(amountInvestor5),
    new BigNumber(amountInvestor6),
    new BigNumber(amountInvestor7),
    new BigNumber(amountInvestor8),
    new BigNumber(amountInvestor9),
    new BigNumber(amountInvestor10),
    new BigNumber(amountInvestor11),
    new BigNumber(amountInvestor12),
    new BigNumber(amountInvestor13),
    new BigNumber(amountInvestor14),
    new BigNumber(amountInvestor15),
    new BigNumber(amountInvestor16),
    new BigNumber(amountInvestor17),
    new BigNumber(amountInvestor18),
    new BigNumber(amountInvestor19),
    new BigNumber(amountInvestor20),
    new BigNumber(amountInvestor21),
    new BigNumber(amountInvestor22),
    new BigNumber(amountInvestor23)
  )

  console.log(amountLp0);

  const amountLp = BigNumber.sum(
    new BigNumber(amountUSDCFromCollateral), 
    new BigNumber(amountUSDTFromCollateral), 
    new BigNumber(amountDAIFromCollateral)).toString()
  console.log(amountLp);

  const total = BigNumber.sum(
    amountLp,
    totalLp,
    totalInvesor
  )

  return (
    <>
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-3'>
          <StatisticsWidget
            className='card-xl-stretch mb-xl-8'
            color='white'
            iconColor='primary'
            title={`$ ${formatToken(total, {scale: 0}) ?? '-'}`}
            description='Total Value Locked'
          />
        </div>

        <div className='col-xl-3'>
          <StatisticsWidget
            className='card-xl-stretch mb-xl-8'
            color='white'
            iconColor='white'
            title='-'
            description='Hipo Price'
          />
        </div>

        <div className='col-xl-3'>
          <StatisticsWidget
            className='card-xl-stretch mb-xl-8'
            color='white'
            iconColor='white'
            title='-'
            description='Hipo Rewards'
          />
        </div>

        <div className='col-xl-3'>
          <StatisticsWidget
            className='card-xl-stretch mb-5 mb-xl-8'
            color='white'
            iconColor='white'
            title='-'
            description='Time Left'
          />
        </div>
      </div>
    </>    
  )
}

export default MarketOverview