import TokenIcon from "../../../../components/token-icon"
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG"
import { useColPool } from "../../providers/colPool-provider"

const CompleteTransaction = () => {

  const { tokenSymbol, tokenName, tokenIcon } = useColPool()

  return (
    <div className='w-100'>
      <div>      
        <div className="card mb-2">
          <div className="card-body pt-3 pb-3">
            <TokenIcon tokenName={ tokenSymbol } tokenDesc={ tokenName } tokenIcon={ tokenIcon }/>
          </div>
        </div>

        <div className="card mb-2">
          <div className="card-body p-0">            
            <div className='d-flex flex-column text-center' style={{ fontSize: 65}}>
              <KTSVG path='/media/spinner/sucess.svg' className='svg-icon svg-icon-5x' />
              <span className='fs-bolder fs-2 pt-0'>Congradulations</span>
              <span className='text-muted pb-3 fs-7'>Your transaction was successful</span>              
            </div>
          </div>       
        </div>
      </div>
      
      <div className='d-flex flex-stack pt-5'>
        <div className='mr-2'>
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

        <div>
          <button type='submit' className='btn btn-lg btn-primary me-0'>
            <span className='indicator-label'>              
              Complete
              <KTSVG
                path='/media/icons/duotune/arrows/arr064.svg'
                className='svg-icon-3 ms-2 me-0'
              />
            </span>
          </button>
        </div>        
      </div>                 
    </div> 
  )
}

export default CompleteTransaction