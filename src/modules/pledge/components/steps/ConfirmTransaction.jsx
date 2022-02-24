/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useState } from 'react'
import TokenIcon from '../../../../components/token-icon'
import { formatToken, scaleBy } from '../../../../web3/utils'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useColPool } from '../../providers/colPool-provider'
import { useFinancingPool } from '../../../../web3/components/providers/FinancingPoolProvider'

const ConfirmTransaction = ({ prevStep, handleMethod }) => {

  const { colPool, tokenSymbol, tokenName, tokenIcon, pledgeAmount } = useColPool()
  const financingPool = useFinancingPool()
  
  const assetDecimals = colPool.underlyingAsset.decimals 

  const [inputAmount, setInputAmount] = useState(pledgeAmount)  
  const [transacting, setTransacting] = useState(false)

  useEffect(() => {
    setInputAmount(() => pledgeAmount)
  }, [pledgeAmount])

  async function handlePledge() {

    setTransacting(() => true)

    let value = scaleBy(inputAmount, assetDecimals)
    let assetAddress = colPool.underlyingAsset.address

    try {
      await financingPool.financingPoolContract?.pledge(assetAddress, value)
    } catch (e) {}

    setTransacting(() => false)
    handleMethod.goto(4)
  }

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
            type='submit'
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
      </div>                  
    </div> 
  )
}

export {ConfirmTransaction}