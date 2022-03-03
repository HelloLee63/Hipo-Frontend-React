import { useDebtPool } from "../../providers/debt-pool-provider"
import TokenIcon from "../../../../components/token-icon"
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG"
import TitleLable from "../../../../components/title-lable"

const CompleteIssueTransaction = () => {
  const { bondPool } = useDebtPool()
  
  return (
    <div className='w-100'>
      <div>
        <TitleLable title='Complete' />       
        <div className="card mb-2">
          <div className="card-body pt-3 pb-3">
            <TokenIcon 
              tokenName={ `${bondPool.bondAsset.symbol} Bond` } 
              tokenDesc={ bondPool.duration.description } 
              tokenIcon={ bondPool.icon }/>
          </div>
        </div>

        <div className="card mb-2">
          <div className="card-body pt-15 pb-15">            
            <div className='d-flex flex-column text-center'>
              <KTSVG path='/media/spinner/sucess.svg' className='svg-icon svg-icon-5x' />
              <span className='fs-bolder fs-2 pt-0'>Congradulations</span>
              <span className='text-muted pb-5 fs-6'>Your transaction was successful</span>              
            </div>
          </div>       
        </div>     
      </div>

      <div className='pt-3'>
        <div className='d-grid'>
          <button type='submit' className='btn btn-primary me-0'>
            <span className='indicator-label'>              
              Complete
            </span>
          </button>
        </div>        
      </div>                      
    </div> 
  )
}
export default CompleteIssueTransaction