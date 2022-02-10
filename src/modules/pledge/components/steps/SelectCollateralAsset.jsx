/* eslint-disable jsx-a11y/anchor-is-valid */
import { Field } from 'formik'
import TokenIcon from '../../../../components/token-icon'
import { useProtocolData } from '../../../../web3/components/providers/ProtocolDataProvider'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'

const SelectCollateralAsset = ({ prevStep }) => {

  const colPoolsCtx = useProtocolData()

  return (     
    <div className='w-100'>
      <div className="card mb-2">
        <div className="card-body">
          { colPoolsCtx.colPools.map((colPool) => (
          <div key={ colPool.lable } className='mb-0 fv-row'>
            <div className='mb-0'>
              <label className='d-flex flex-stack mb-5 cursor-pointer'>
                <span className='d-flex align-items-center me-2'>
                  <TokenIcon tokenName={colPool.lable} tokenDesc={colPool.desc} tokenIcon={colPool.tokens[0].icon}/>
                </span>
                <span className='form-check form-check-custom form-check-solid'>
                  <Field className='form-check-input' type='radio' name='collateralAssetType' value={colPool.lable} />
                </span>
              </label>
            </div>
          </div>
          ))}       
        </div>        
      </div>
      <div className='d-flex flex-stack pt-3'>
            <div className='mr-2'>
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

export {SelectCollateralAsset}