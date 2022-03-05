import { Link } from "react-router-dom"
import { StatisticsWidget } from "../../../../components/statistics/StatisticsWidget"
import TokenIcon from "../../../../components/token-icon"
import { useProtocolData } from "../../../../web3/components/providers/ProtocolDataProvider"
import { formatToken } from "../../../../web3/utils"
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG"
import TransactionsList from "../../components/transactions-list"
import { useBondMarket } from "../../providers/BondMarketProvider"

const BondDetailsView = ({ pool }) => {

  const { getBondPrice } = useProtocolData()
  const { getMarketSize } = useBondMarket()

  const bondPrice = formatToken(getBondPrice(pool.bondAsset.address, pool.duration.duration), {scale: 18})

  return (
    <div>
      <div className='mr-1 pb-3'>
        <Link to='/bondmarket'>
          <button
            type='button'
            className='btn btn-lg btn-light-primary me-3'
            data-kt-stepper-action='previous'
          >
            <KTSVG
              path='/media/icons/duotune/arrows/arr063.svg'
              className='svg-icon-4 me-1'
            />
            Back
          </button>
        </Link>
      </div>
      <div className="w-100">
        <div className="card">
          <div className="card-body">
            <TokenIcon 
              tokenIcon={pool.icon}
              tokenName={`${pool.bondAsset.symbol} Bond Market`}
              tokenDesc={pool.duration.description}
            />
          </div>
        </div>
      </div>                        
      <div className='row pt-10 g-5 g-xl-8'>
        <div className='col-xl-3'>
          <StatisticsWidget
            className='card-xl-stretch mb-xl-8'
            color='white'
            iconColor='primary'
            title={getMarketSize(pool)}
            description='Market Size'
          />
        </div>

        <div className='col-xl-3'>
          <StatisticsWidget
            className='card-xl-stretch mb-xl-8'
            color='white'
            iconColor='white'
            title={bondPrice ?? '-'}
            // ${pool.bondAsset.symbol} Bond
            description='Bond Price'
          />
        </div>

        <div className='col-xl-3'>
          <StatisticsWidget
            className='card-xl-stretch mb-xl-8'
            color='white'
            iconColor='white'
            title={formatToken(pool.dToken.contract.totalSupply, {scale: pool.dToken.decimals})}
            description='Bonds Issued'
          />
        </div>

        <div className='col-xl-3'>
          <StatisticsWidget
            className='card-xl-stretch mb-5 mb-xl-8'
            color='white'
            iconColor='white'
            title={formatToken(pool.bToken.contract.totalSupply, {scale: pool.dToken.decimals})}
            description='Bonds Invested'
          />
        </div>
      </div>

      <TransactionsList pool={pool}/>
    </div>      
  )
}

export default BondDetailsView