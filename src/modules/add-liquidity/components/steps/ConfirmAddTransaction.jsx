/* eslint-disable jsx-a11y/anchor-is-valid */
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import TitleLable from '../../../../components/title-lable'
import TokenIcon from '../../../../components/token-icon'
import { useFinancingPool } from '../../../../web3/components/providers/FinancingPoolProvider'
import { formatToken, scaleBy } from '../../../../web3/utils'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useLiquidityPool } from '../../providers/liquidity-pool-provider'

const ConfirmAddTransaction = ({ prevStep, handleMethod }) => {
  const { pool, addAmount } = useLiquidityPool()
  const financingPool = useFinancingPool()

  const tokenName = pool.bondAsset.symbol
  const tokenIcon = pool.icon
  const tokenDesc = pool.duration.description
  const decimals = pool.bondAsset.decimals
  
  const [transacting, setTransacting] = useState(false)
  const [inputAmount, setInputAmount] = useState(addAmount)

  useEffect(() => {
    setInputAmount(() => addAmount)
  }, [addAmount])

  async function handleAddLiquidity() {
    
    setTransacting(() => true)

    let value = scaleBy(inputAmount, decimals)
    let assetAddress = pool.bondAsset.address
    let duration = new BigNumber(pool.duration.duration)

    try {
      await financingPool.financingPoolContract?.addLiquidity(assetAddress, duration, value)
    } catch (e) {}

    setTransacting(() => false)

    handleMethod.goto(5)
  } 
 
  return (
    <div className='w-100'>
      <div>
        <TitleLable title='Confirm Transaction' />
        <div className='card mb-2'>
          <div className='card-body pt-3 pb-3'>
            <TokenIcon 
            tokenName={`${tokenName} Bond Pool`} 
            tokenIcon={tokenIcon}
            tokenDesc={tokenDesc} 
            />
          </div>
        </div>

        <div className='card mb-2'>
          <div className='card-body'>
          {transacting ? (
            <div className='text-center pt-15 pb-15'>
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            ) : (
            <input
              type='text'
              className='p-0 form-control form-control-lg fw-bolder bg-white border-0 text-primary align-center'
              placeholder='0.0'
              disabled
              name='collateralAssetAmount'
              value={formatToken(inputAmount)}
              style={{ fontSize: 58 }}
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
            onClick={handleAddLiquidity}              
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

export {ConfirmAddTransaction}