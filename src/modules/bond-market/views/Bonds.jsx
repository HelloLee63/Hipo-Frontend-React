// import { useProtocolData } from "../../../web3/components/providers/ProtocolDataProvider"
import { Link } from "../../../components/button"
import { useProtocolData } from "../../../web3/components/providers/ProtocolDataProvider"
import { KTSVG } from "../../../_metronic/helpers/components/KTSVG"
import { useBondMarket } from "../providers/BondMarketProvider"

const Bonds = ({ className }) => {

  const bondMarket = useBondMarket()
  const bonds = bondMarket.Bonds
  const protocolData = useProtocolData()

  return (
    <div className={`card ${className}`}>
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bolder text-muted bg-light'>
                <th className='ps-4 min-w-325px rounded-start'>BOND</th>
                <th className='min-w-125px'>Bond Price</th>
                <th className='min-w-125px'>APY</th>
                <th className='min-w-200px'>Market Size</th>
                <th className='min-w-150px'>Volumn(24H)</th>
                <th className='min-w-200px text-end rounded-end'></th>
              </tr>
            </thead>
            {/* end::Table head */}

            {/* begin::Table body */}
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
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    { protocolData.protocolDataContract.bondPriceArray?.find(
                      p => p.asset === bond.asset.address && 
                      p.duration === bond.duration) ?? '-'}
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Paid</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    $520
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Rejected</span>
                </td>
                <td>
                  <a href='#' className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                    Bradly Beal
                  </a>
                  <span className='text-muted fw-bold text-muted d-block fs-7'>Insurance</span>
                </td>
                <td>
                  <span className='badge badge-light-primary fs-7 fw-bold'>Approved</span>
                </td>
              </tr>
            ))}
            </tbody>           
            {/* end::Table body */}
            
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default Bonds