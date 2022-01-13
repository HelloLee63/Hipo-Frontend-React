/* eslint-disable jsx-a11y/anchor-is-valid */
import { Field } from 'formik'
import { useLiquidityPools } from '../../providers/liquidity-pools-provider'

const SelectDuration = () => {

  const { assets, pools, durations } = useLiquidityPools()

  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder d-flex align-items-center text-dark'>
          Select Duration
        </h2>
      </div>
      { durations.map((selectedDuration) => (
        <div key={ selectedDuration.id } className='mb-0 fv-row'>
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
  )
}

export {SelectDuration}