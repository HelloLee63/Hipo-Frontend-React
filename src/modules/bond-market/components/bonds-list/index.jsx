import BigNumber from "bignumber.js"
import { Link } from "react-router-dom"
import { usePools } from "../../../../components/providers/poolsProvider"
import { useProtocolData } from "../../../../web3/components/providers/ProtocolDataProvider"
import { calAPY, formatPercent, formatToken } from "../../../../web3/utils"
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG"

const BondsList = () => {

  const { bondPools } = usePools()
  const { getBondPrice } = useProtocolData()

  return (
    <div className='card'>
      <div className='card-body p-0 py-3'>
        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-4'>
            <thead>
              <tr className='' style={{fontFamily: 'Montserrat Semi Bold', color: '#96AFFF', fontWeight: 900}}>
                <th className='ps-11 min-w-250px rounded-start'>BOND</th>
                <th className='min-w-175px'>Bond Price</th>
                <th className='min-w-175px'>APY</th>
                <th className='min-w-200px'>Market Size</th>
                <th className='min-w-150px rounded-end'>Volumn(24H)</th>
              </tr>
            </thead>

            <tbody style={{color: '#E9E3F4'}}>
            { bondPools.map((pool) => (
              <tr key={ pool.bToken.symbol }>
                <td>
                  <div className='d-flex align-items-center ps-8'>
                    <div className='symbol symbol-50px me-5'>
                      <KTSVG path={pool.icon} className='svg-icon svg-icon-5x' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <Link to={`${pool.bondAsset.symbol.toLowerCase()}${pool.duration.duration}`}>
                        <div className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                            { pool.bondAsset.symbol } Bond
                        </div>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                            { pool.duration.description }
                        </span>
                      </Link>          
                    </div>
                  </div>
                </td>
                <td>
                  <div className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>                    
                    { formatToken(getBondPrice(pool.bondAsset.address, pool.duration.duration), { scale: 18 }) ?? '-' }
                  </div>
                  <span className="text-muted fs-7">{pool.bondAsset.symbol}</span>
                </td>
                <td>
                  <div className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    { formatPercent(calAPY(getBondPrice(pool.bondAsset.address, pool.duration.duration), 18, Number(pool.duration.duration))) ?? '-' }
                  </div>
                </td>
                <td>
                  <div href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    { formatToken(
                      (new BigNumber(pool.lpToken.contract.totalSupply).plus
                      (new BigNumber(pool.bToken.contract.totalSupply))), 
                      {scale: pool.bToken.decimals, tokenName: pool.bondAsset.symbol} ) ?? '-' }
                  </div>
                </td>
                <td>
                  <div href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
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