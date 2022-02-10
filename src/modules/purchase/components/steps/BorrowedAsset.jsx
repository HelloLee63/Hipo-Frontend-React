/* eslint-disable jsx-a11y/anchor-is-valid */
import { Field } from 'formik'
import TokenIcon from '../../../../components/token-icon'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useBondPools } from '../../providers/bond-pools-provider'

const BorrowedAsset = ({ prevStep }) => {

  const bondPoolsCtx = useBondPools()
 
  return (
    <div className='w-100'>
      <div className='card mb-2'>
        <div className='card-body'>
          { bondPoolsCtx.BondAssets.map((asset) => (
          <div key={ asset.symbol } className='mb-0 fv-row'>
            <div className='mb-0'>
              <label className='d-flex flex-stack mb-5 cursor-pointer'>
                <span className='d-flex align-items-center me-2'>
                  <TokenIcon tokenName={asset.symbol} tokenIcon={asset.icon}/>
                </span>
                <span className='form-check form-check-custom form-check-solid'>
                  <Field className='form-check-input' type='radio' name='bondAssetType' value={asset.symbol} />
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

export {BorrowedAsset}