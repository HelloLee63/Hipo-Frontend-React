import { Link } from "react-router-dom"
import { StatisticsWidget } from "../../../components/statistics/StatisticsWidget"
import { KTSVG } from "../../../_metronic/helpers/components/KTSVG"
import Transactions from "./Transactions"

const BondDetails = ({ bond }) => {

  return (
    <div>
      <Link to='/bondmarket'>
        <div className='mr-1 pb-10'>
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
        </div>
      </Link>
      <div className='d-flex align-items-center'>
        <div className='symbol symbol-50px me-5'>
          <KTSVG path={bond.icon} className=' svg-icon svg-icon-5x' />
        </div>
        <div className='d-flex justify-content-start flex-column'>
          <div to='weth5days' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
              { bond.asset.symbol } Bond
          </div>
          <span className='text-muted fw-bold text-muted d-block fs-7'>
              { bond.duration } Days
          </span> 
        </div>
        {/* <div className="d-flex">
          <a className="btn btn-primary">Bond Issue</a>
          <a className="btn btn-primary">Bond Invest</a>
          <a className="btn btn-primary">Add Liquidity</a>
        </div> */}
        
      </div>
      <div className='row pt-10 g-5 g-xl-8'>
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
              title='$8.99'
              description='Hipo Price'
            />
          </div>

          <div className='col-xl-3'>
            <StatisticsWidget
              className='card-xl-stretch mb-xl-8'
              color='white'
              iconColor='white'
              title='$50,000'
              description='Hipo Rewards'
            />
          </div>

          <div className='col-xl-3'>
            <StatisticsWidget
              className='card-xl-stretch mb-5 mb-xl-8'
              color='white'
              iconColor='white'
              title='8d 15h 34m 22s'
              description='Time Left'
            />
          </div>
      </div>
      {/* end::Row */}

      <Transactions />
    </div>      
  )
}

export default BondDetails