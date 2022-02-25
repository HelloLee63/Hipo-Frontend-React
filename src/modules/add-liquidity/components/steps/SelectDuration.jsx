/* eslint-disable jsx-a11y/anchor-is-valid */
import { Field } from 'formik'
import { DurationsMeta } from '../../../../components/providers/poolsProvider'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useLiquidityPool } from '../../providers/liquidity-pool-provider'

const SelectDuration = ({ prevStep }) => {

  const { pool } = useLiquidityPool()

  return (
    <div className='w-100'>
      <div className='card mb-2'>
        <div className='card-body pt-3 pb-3'>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-50px me-2'>
              <KTSVG path={pool.bondAsset.icon} className='svg-icon svg-icon-3x' />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <div className='text-dark fw-bolder mb-1 fs-6'>
                { pool.bondAsset.symbol }
              </div>
              <span className='text-muted fw-bold text-muted d-block fs-7'>
                { pool.bondAsset.name } 
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='card mb-1'>
        <div className='card-body'>
          { DurationsMeta.map((selectedDuration) => (
            <div key={ selectedDuration.id } className='fs-6 fw-bolder mb-0 fv-row'>
              <div className='mb-0'>
                <label className='d-flex flex-stack mb-5 cursor-pointer'>
                  <span className='d-flex align-items-center me-2 fs-5 fs-bolder'>
                    {selectedDuration.description}
                  </span>
                  <span className='form-check form-check-custom form-check-solid'>
                    <Field className='form-check-input fs-5 fs-bolder' type='radio' name='assetDuration' value={ selectedDuration.duration } />
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