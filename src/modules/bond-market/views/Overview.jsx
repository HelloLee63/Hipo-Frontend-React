import { useKnownTokens } from "../../../components/providers/knownTokensProvider"
import { StatisticsWidget } from "../../../components/statistics/StatisticsWidget"
import { useBondMarket } from "../providers/BondMarketProvider"

const Overview = () => {

  console.log('Overview is rendered');

  // const bondMarket = useBondMarket()

  // const { 
  //   wethToken, 
  //   usdcToken, 
  //   usdtToken, 
  //   daiToken, 
  //   tokens  
  // } = useKnownTokens()

  // const totalCUSDCWETH = bondMarket.colTokens[0].contract.totalSupply?.toString()
  // const totalCWETHUSDT = bondMarket.colTokens[1].contract.totalSupply?.toString()
  // const totalCDAIWETH = bondMarket.colTokens[2].contract.totalSupply?.toString()
  // const decimalsCUSDCWETH = bondMarket.colTokens[0].decimals
  // const decimalsCWETHUSDT = bondMarket.colTokens[1].decimals
  // const decimalsCDAIWETH = bondMarket.colTokens[2].decimals

  // const totalUSDCWETHLpToken = bondMarket.uniPools[0].contract.totalSupply?.toString()
  // const totalWETHUSDTLpToken = bondMarket.uniPools[1].contract.totalSupply?.toString()
  // const totalDAIWETHLpToken = bondMarket.uniPools[2].contract.totalSupply?.toString()

  // const amountWETHInUsdcPool = wethToken.contract.getBalanceOf(tokens[0].address)?.toString()
  // const amountWETHInUsdtPool = wethToken.contract.getBalanceOf(tokens[1].address)?.toString()
  // const amountWETHInDaiPool = wethToken.contract.getBalanceOf(tokens[2].address)?.toString()
  // const amountUSDCInUsdcPool = usdcToken.contract.getBalanceOf(tokens[0].address)?.toString()
  // const amountUSDTInUsdtPool = usdtToken.contract.getBalanceOf(tokens[1].address)?.toString()
  // const amountDAIInDaiPool = daiToken.contract.getBalanceOf(tokens[2].address)?.toString()

  return (
    <>
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-3'>
          <StatisticsWidget
            className='card-xl-stretch mb-xl-8'
            color='white'
            iconColor='primary'
            title='$3,895,254,378.87'
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

export default Overview