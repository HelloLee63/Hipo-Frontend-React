import { Link, useNavigate} from "react-router-dom"
import { usePools } from "../../../../components/providers/poolsProvider"
import { useProtocolData } from "../../../../web3/components/providers/ProtocolDataProvider"
import { calAPY, formatPercent, formatToken } from "../../../../web3/utils"
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG"
import { useBondMarket } from "../../providers/BondMarketProvider"

const BondsList = () => {

  const { bondPools } = usePools()
  const { getBondPrice } = useProtocolData()
  const { getMarketSize } = useBondMarket()
  const navigate = useNavigate()



  const handleNavigate = (pool) => {
    navigate(`${pool.bondAsset.symbol.toLowerCase()}${pool.duration.duration}`, { replace: true });
  }

  return (
    <div className='card'>
      <div className='card-body p-0 py-3'>
        <div className='table-responsive'>
          <table className='table table-row-bordered align-middle gs-0 gy-4'>
            <thead>
              <tr className='' style={{fontFamily: 'Montserrat Semi Bold', color: '#96AFFF', fontWeight: 900}}>
                <th className='ps-11 min-w-250px rounded-start'>BOND</th>
                <th className='min-w-175px'>BOND PRICE</th>
                <th className='min-w-175px'>APY</th>
                <th className='min-w-200px'>MARKET SIZE</th>
                <th className='min-w-150px rounded-end'>VOLUMN(24H)</th>
              </tr>
            </thead>

            <tbody style={{color: '#E9E3F4'}}>
            { bondPools.map((pool) => (
              <tr className='cursor-pointer' onClick={() => handleNavigate(pool)} key={ pool.bToken.symbol } style={{fontFamily: 'Montserrat Semi Bold', color: '#96AFFF', fontWeight: 900}}>
                <td>
                  <div className='d-flex align-items-center ps-8'>
                    <div className='symbol symbol-50px me-5'>
                      <KTSVG path={pool.icon} className='svg-icon svg-icon-5x' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                        <div className='text-dark fw-bolder mb-1 fs-6'>
                            { pool.bondAsset.symbol } Bond
                        </div>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                            { pool.duration.description }
                        </span>      
                    </div>
                  </div>
                </td>
                <td>
                  <div className='d-block mb-1 fs-6' style={{fontFamily: 'Montserrat-Regular', color: '#333333'}}>                    
                    { formatToken(getBondPrice(pool.bondAsset.address, pool.duration.duration), { scale: 18 }) ?? '-' }
                  </div>
                  <span className="fs-7" style={{fontFamily: 'PingFangSC-Semibold', color: '#999999'}}>{pool.bondAsset.symbol}</span>
                </td>
                <td>
                  <div className='d-block mb-1 fs-6' style={{fontFamily: 'Montserrat-Regular', color: '#333333'}}>
                    { formatPercent(calAPY(getBondPrice(pool.bondAsset.address, pool.duration.duration), 18, Number(pool.duration.duration))) ?? '-' }
                  </div>
                </td>
                <td>
                  <div href='#' className='d-block mb-1 fs-6' style={{fontFamily: 'Montserrat-Regular', color: '#333333'}}>
                    $ {getMarketSize(pool) ?? '-'}
                  </div>
                </td>
                <td>
                  <div className='d-block mb-1 fs-6' style={{fontFamily: 'Montserrat-Regular', color: '#333333'}}>
                    -
                  </div>
                </td>
              </tr>
            ))}
            </tbody>                       
          </table>
        </div>
      </div>
    </div>
  )
}

export default BondsList