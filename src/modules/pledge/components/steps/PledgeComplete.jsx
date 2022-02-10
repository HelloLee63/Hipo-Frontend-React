/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useState } from 'react'
import TokenIcon from '../../../../components/token-icon'
import { formatToken, scaleBy } from '../../../../web3/utils'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useColPool } from '../../providers/colPool-provider'
import { useFinancingPool } from '../../../../web3/components/providers/FinancingPoolProvider'

const ConfirmTransaction = ({ prevStep }) => {

  const { colPool } = useColPool()
  const tokenName = colPool.lable
  const tokenDesc = colPool.desc
  const tokenIcon = colPool.tokens[0].icon

  const colPoolCtx = useColPool()  
  const assetDecimals = colPoolCtx.colPool.tokens[0].contract.decimals  
  const [inputAmount, setInputAmount] = useState(colPoolCtx.pledgeAmount)
  const financingPool = useFinancingPool()
  const [transacting, setTransacting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    setInputAmount(colPoolCtx.pledgeAmount)
  }, [colPoolCtx.pledgeAmount])

  async function handlePledge() {

    setTransacting(true)

    let value = scaleBy(inputAmount, assetDecimals)
    let assetAddress = colPoolCtx.colPool.tokens[0].address

    try {
      await financingPool.financingPoolContract?.pledge(assetAddress, value)
    } catch (e) {}

    setTransacting(false)
  }

  function handleComplete() {
    setIsCompleted(false)
  }

  return (
    // <div className='w-100'>
    //   { !isCompleted && (
    //   <div>      
    //     <div className="card mb-2">
    //       <div className="card-body pt-3 pb-3">
    //         <TokenIcon tokenName={ tokenName } tokenDesc={ tokenDesc } tokenIcon={ tokenIcon }/>
    //       </div>
    //     </div>
    //     <div className="card mb-2">
    //       <div className="card-body p-0">
    //         {transacting ? (
    //         <div className='text-center' style={{ fontSize: 65}}>
    //           <div className='align-items-center spinner-grow spinner-grow-sm text-primary'></div>
    //           <div className='align-items-center spinner-grow spinner-grow-sm text-primary'></div>
    //           <div className='align-items-center spinner-grow spinner-grow-sm text-primary'></div>
    //         </div>
    //         ) : (
    //         <input
    //           type='text'
    //           className='form-control form-control-lg  fw-bolder bg-white border-0 text-primary align-center'
    //           placeholder='0.0'
    //           disabled
    //           name='collateralAssetAmount'
    //           value={formatToken(inputAmount)}
    //           style={{ fontSize: 48 }}
    //         />)}
    //       </div>       
    //     </div>
    //   </div>)}

    //   { isCompleted && (
    //   <div>      
    //     <div className="card mb-2">
    //       <div className="card-body pt-3 pb-3">
    //         <TokenIcon tokenName={ tokenName } tokenDesc={ tokenDesc } tokenIcon={ tokenIcon }/>
    //       </div>
    //     </div>
    //     <div className="card mb-2">
    //       <div className="card-body p-0">            
    //         <div className='d-flex flex-column text-center' style={{ fontSize: 65}}>
    //           <KTSVG path='/media/spinner/sucess.svg' className='svg-icon svg-icon-5x' />
    //           <span className='fs-bolder fs-2 pt-0'>Congradulations</span>
    //           <span className='text-muted pb-3 fs-7'>Your transaction was successful</span>              
    //         </div>
    //       </div>       
    //     </div>
    //   </div>)}

    //   {isCompleted ? (
    //     <div className='d-flex flex-stack pt-5'>          
    //         <button 
    //           onClick={handleComplete} 
    //           type='submit'              
    //           className='btn btn-lg btn-primary me-0'
    //         >
    //           <span className='indicator-label'>              
    //             Complete
    //             <KTSVG
    //               path='/media/icons/duotune/arrows/arr064.svg'
    //               className='svg-icon-3 ms-2 me-0'
    //             />
    //           </span>
    //         </button>            
    //       </div>
    //   ) : (
    //     <div className='d-flex flex-stack pt-5'>
    //       <div className='mr-0'>
    //         <button
    //           onClick={prevStep}
    //           type='button'
    //           className='btn btn-lg btn-light-primary me-3'
    //           data-kt-stepper-action='previous'
    //           disabled={transacting ? true : false}
    //         >
    //           <KTSVG
    //             path='/media/icons/duotune/arrows/arr063.svg'
    //             className='svg-icon-4 me-1'
    //           />
    //           Back
    //         </button>
    //       </div>
    //       <div>
    //         <button 
    //           onClick={handlePledge} 
    //           type='button'
    //           disabled={transacting ? true : false}
    //           className='btn btn-lg btn-primary me-0'
    //         >
    //           <span className='indicator-label'>              
    //             Confirm
    //             <KTSVG
    //               path='/media/icons/duotune/arrows/arr064.svg'
    //               className='svg-icon-3 ms-2 me-0'
    //             />
    //           </span>
    //         </button>            
    //       </div>
    //     </div>)} 
                  
    // </div> 
    
    <div className='w-100'>
      <div>      
        <div className="card mb-2">
          <div className="card-body pt-3 pb-3">
            <TokenIcon tokenName={ tokenName } tokenDesc={ tokenDesc } tokenIcon={ tokenIcon }/>
          </div>
        </div>
        <div className="card mb-2">
          <div className="card-body p-0">
            {transacting ? (
            <div className='text-center' style={{ fontSize: 65}}>
              <div className='align-items-center spinner-grow spinner-grow-sm text-primary'></div>
              <div className='align-items-center spinner-grow spinner-grow-sm text-primary'></div>
              <div className='align-items-center spinner-grow spinner-grow-sm text-primary'></div>
            </div>
            ) : (
            <input
              type='text'
              className='form-control form-control-lg  fw-bolder bg-white border-0 text-primary align-center'
              placeholder='0.0'
              disabled
              name='collateralAssetAmount'
              value={formatToken(inputAmount)}
              style={{ fontSize: 48 }}
            />)}
          </div>       
        </div>
      </div>

      { isCompleted && (
      <div>      
        <div className="card mb-2">
          <div className="card-body pt-3 pb-3">
            <TokenIcon tokenName={ tokenName } tokenDesc={ tokenDesc } tokenIcon={ tokenIcon }/>
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
      </div>)}

      {isCompleted ? (
        <div className='d-flex flex-stack pt-5'>          
            <button 
              onClick={handleComplete} 
              type='submit'              
              className='btn btn-lg btn-primary me-0'
            >
              <span className='indicator-label'>              
                Complete
                <KTSVG
                  path='/media/icons/duotune/arrows/arr064.svg'
                  className='svg-icon-3 ms-2 me-0'
                />
              </span>
            </button>            
          </div>
      ) : (
        <div className='d-flex flex-stack pt-5'>
          <div className='mr-0'>
            <button
              onClick={prevStep}
              type='button'
              className='btn btn-lg btn-light-primary me-3'
              data-kt-stepper-action='previous'
              disabled={transacting ? true : false}
            >
              <KTSVG
                path='/media/icons/duotune/arrows/arr063.svg'
                className='svg-icon-4 me-1'
              />
              Back
            </button>
          </div>
          <div>
            <button 
              onClick={handlePledge} 
              type='button'
              disabled={transacting ? true : false}
              className='btn btn-lg btn-primary me-0'
            >
              <span className='indicator-label'>              
                Confirm
                <KTSVG
                  path='/media/icons/duotune/arrows/arr064.svg'
                  className='svg-icon-3 ms-2 me-0'
                />
              </span>
            </button>            
          </div>
        </div>)} 
                  
    </div> 
  )
}

export {ConfirmTransaction}