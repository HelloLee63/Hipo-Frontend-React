import BigNumber from "bignumber.js"
import { Link } from "../../../components/button"
import { useProtocolData } from "../../../web3/components/providers/ProtocolDataProvider"
import { calAPY, formatPercent, formatToken } from "../../../web3/utils"
import { KTSVG } from "../../../_metronic/helpers/components/KTSVG"
import { useBondMarket } from "../providers/BondMarketProvider"

const Bonds = ({ className }) => {

  const bondMarket = useBondMarket()
  const bonds = bondMarket.Bonds
  const protocolData = useProtocolData()
  const bondPriceArray = protocolData.protocolDataContract.bondPriceArray

  console.log('Bonds is rendered');

  return (
    <div className={`card ${className}`}>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-4'>
            <thead>
              <tr className='fw-bolder text-muted bg-light'>
                <th className='ps-4 min-w-225px rounded-start'>BOND</th>
                <th className='min-w-175px'>Bond Price</th>
                <th className='min-w-175px'>APY</th>
                <th className='min-w-200px'>Market Size</th>
                <th className='min-w-150px'>Volumn(24H)</th>
                <th className='min-w-200px text-end rounded-end'></th>
              </tr>
            </thead>

            <tbody>
            { bonds.map((bond) => (
              <tr key={ bond.id }>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='symbol symbol-50px me-5'>
                      <KTSVG path={bond.icon} className='svg-icon svg-icon-5x' />
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                      <Link to={`${bond.asset.symbol.toLowerCase()}${bond.duration}`}>
                        <div className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                            { bond.asset.symbol } Bond
                        </div>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                            { bond.duration } Days
                        </span>
                      </Link>          
                    </div>
                  </div>
                </td>
                <td>
                  <div className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>                    
                    { formatToken(bondPriceArray?.find(
                      p => p.assetAddress === bond.asset.address && 
                      p.duration === bond.duration)?.price, {scale: 18, tokenName: bond.asset.symbol}) ?? '-' }
                  </div>
                </td>
                <td>
                  <div className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    { formatPercent(calAPY(bondPriceArray?.find(
                      p => p.assetAddress === bond.asset.address && 
                      p.duration === bond.duration)?.price, 18, Number(bond.duration))) ?? '-' }
                  </div>
                </td>
                <td>
                  <div href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    { formatToken(
                      (new BigNumber(bond.lpToken.contract.totalSupply).plus
                      (new BigNumber(bond.bondToken.contract.totalSupply))), 
                      {scale: bond.bondToken.decimals, tokenName: bond.asset.symbol} ) ?? '-' }
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

export default Bonds