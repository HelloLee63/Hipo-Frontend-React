/* eslint-disable jsx-a11y/anchor-is-valid */
import { Field } from 'formik'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'


const Select = ({ title, }) => {
  
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder d-flex align-items-center text-dark'>
          { title, lable }
        </h2>
      </div>
      <div className='mb-0 fv-row'>
        <div className='mb-0'>
          <label className='d-flex flex-stack mb-5 cursor-pointer'>
            <span className='d-flex align-items-center me-2'>
              <span className='symbol symbol-50px me-6'>
                <span className='symbol-label'>
                  <KTSVG
                    path='/media/tokens/eth-usdc.svg'
                    className='svg-icon-1 svg-icon-gray-600'
                  />
                </span>
              </span>

              <span className='d-flex flex-column'>
                <span className='fw-bolder text-gray-800 text-hover-primary fs-5'>
                  { lable }
                </span>
                <span className='fs-6 fw-bold text-gray-400'>
                  Uniswap V2
                </span>
              </span>
            </span>

            <span className='form-check form-check-custom form-check-solid'>
              <Field className='form-check-input' type='radio' name='collateralAssetType' value='1' />
            </span>
          </label>

          <label className='d-flex flex-stack mb-5 cursor-pointer'>
            <span className='d-flex align-items-center me-2'>
              <span className='symbol symbol-50px me-6'>
                <span className='symbol-label'>
                  <KTSVG
                    path='/media/icons/duotune/graphs/gra006.svg'
                    className='svg-icon-1 svg-icon-gray-600'
                  />
                </span>
              </span>

              <span className='d-flex flex-column'>
                <span className='fw-bolder text-gray-800 text-hover-primary fs-5'>
                  ETH/DAI
                </span>
                <span className='fs-6 fw-bold text-gray-400'>Uniswap V2</span>
              </span>
            </span>

            <span className='form-check form-check-custom form-check-solid'>
              <Field className='form-check-input' type='radio' name='collateralAssetType' value='2' />
            </span>
          </label>

          <label className='d-flex flex-stack mb-0 cursor-pointer'>
            <span className='d-flex align-items-center me-2'>
              <span className='symbol symbol-50px me-6'>
                <span className='symbol-label'>
                  <KTSVG
                    path='/media/icons/duotune/graphs/gra008.svg'
                    className='svg-icon-1 svg-icon-gray-600'
                  />
                </span>
              </span>

              <span className='d-flex flex-column'>
                <span className='fw-bolder text-gray-800 text-hover-primary fs-5'>
                  USDT/ETH
                </span>
                <span className='fs-6 fw-bold text-gray-400'>
                  Uniswap V2
                </span>
              </span>
            </span>

            <span className='form-check form-check-custom form-check-solid'>
              <Field className='form-check-input' type='radio' name='collateralAssetType' value='3' />
            </span>
          </label>
    </div>
    </div>
    </div>
  )
}

export { Select }
