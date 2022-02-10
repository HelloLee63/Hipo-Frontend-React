/* eslint-disable jsx-a11y/anchor-is-valid */
import { Field } from 'formik'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useLiquidityPool } from '../../providers/liquidity-pool-provider'
import { useLiquidityPools } from '../../providers/liquidity-pools-provider'

const SelectDuration = ({ prevStep }) => {

  const { assets, pools, durations } = useLiquidityPools()
  const liquidityPoolCtx = useLiquidityPool()
  const activePool = liquidityPoolCtx.liquidityPool

  return (
    <div className='w-100'>
      <div className='card mb-2'>
        <div className='card-body pt-3 pb-3'>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-50px me-2'>
              <KTSVG path={activePool.asset.icon} className='svg-icon svg-icon-3x' />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                { activePool.asset.symbol }
              </a>
              <span className='text-muted fw-bold text-muted d-block fs-7'>
                { activePool.asset.name } 
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='card mb-1'>
        <div className='card-body'>
          { durations.map((selectedDuration) => (
            <div key={ selectedDuration.id } className='mb-0 fv-row fs-6 fw-bolder'>
              <div className='mb-0'>
                <label className='d-flex flex-stack mb-5 cursor-pointer'>
                  <span className='d-flex align-items-center me-2'>
                    {selectedDuration.lable}
                  </span>
                  <span className='form-check form-check-custom form-check-solid'>
                    <Field className='form-check-input' type='radio' name='assetDuration' value={ selectedDuration.duration } />
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
        
      <div className='d-flex flex-stack pt-2'>
        <div className='mr-0'>
          <button
            onClick={prevStep}
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
              Continue
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

export {SelectDuration}