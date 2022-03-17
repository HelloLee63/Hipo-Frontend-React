import { Link } from "react-router-dom"
import TitleLable from "../../../../components/title-lable"
import TokenIcon from "../../../../components/token-icon"
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG"
import { useLiquidityPool } from "../../../add-liquidity/providers/liquidity-pool-provider"

const RemoveCompleteTransaction = () => {
  const { pool } = useLiquidityPool()
  
  return (
    <div className='w-100'>
      <div>
        <TitleLable title='Complete'  />     
        <div className="card mb-2">
          <div className="card-body pt-3 pb-3">
            <TokenIcon 
              tokenName={ `${pool.bondAsset.symbol} Bond Pool` } 
              tokenDesc={ pool.duration.description } 
              tokenIcon={ pool.icon }/>
          </div>
        </div>

        <div className="card mb-2">
          <div className="card-body pt-15 pb-15">            
            <div className='d-flex flex-column text-center'>
              <KTSVG path='/media/spinner/sucess.svg' className='svg-icon svg-icon-5x' />
              <span className='fs-bolder fs-2 pt-0'>Congradulations</span>
              <span className='text-muted pb-5 fs-7'>Your transaction was successful</span>              
            </div>
          </div>       
        </div>
      </div>
      
      <div className='pt-3'>
        <Link to='/pools'>
          <div className='d-grid'>
            <button type='submit' className='btn btn-primary me-0'>
              <span className='indicator-label'>              
                Complete
              </span>
            </button>          
          </div>
        </Link>        
      </div>                
    </div> 
  )
}

export default RemoveCompleteTransaction