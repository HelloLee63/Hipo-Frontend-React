/* eslint-disable jsx-a11y/anchor-is-valid */
import { Field } from 'formik'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useDebtPool } from '../../providers/debt-pool-provider'
import { useDebtPools } from '../../providers/debt-pools-provider'

const SelectDebtDuration = ({ prevStep }) => {

  const debtPoolsCtx = useDebtPools()
  const debtDurations = debtPoolsCtx.DurationsMeta
  const debtPoolCtx = useDebtPool()
  const activePool = debtPoolCtx.debtPool

  return (
    <div className='w-100'>
      <div className='card mb-2'>
        <div className='card-body pt-3 pb-3'>
          <div className='d-flex align-items-center'>
            <div className='symbol symbol-50px me-2'>
              <KTSVG path={activePool.debtAsset.icon} className='svg-icon svg-icon-3x' />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                { activePool.debtAsset.symbol }
              </a>
              <span className='text-muted fw-bold text-muted d-block fs-7'>
                { activePool.debtAsset.name } 
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='card'>
        <div className='card-body'>
        { debtDurations.map((debtDuration) => (
          <div key={ debtDuration.id } className='mb-0 fs-6 fw-bolder fv-row'>
            <div className='mb-0'>
              <label className='d-flex flex-stack mb-5 cursor-pointer'>
                <span className='d-flex align-items-center me-2'>
                  {debtDuration.lable}
                </span>
                <span className='form-check form-check-custom form-check-solid'>
                  <Field className='form-check-input' type='radio' name='debtDuration' value={ debtDuration.duration } />
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

export {SelectDebtDuration}