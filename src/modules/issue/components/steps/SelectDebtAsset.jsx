import { Field } from "formik"
import TitleLable from "../../../../components/title-lable"
import TokenIcon from "../../../../components/token-icon"
import AssetToken from "../../../../components/token-icon/AssetToken"
import { KTSVG } from "../../../../_metronic/helpers/components/KTSVG"
import { useDebtPool } from "../../providers/debt-pool-provider"

const SelectDebtAsset = ({ prevStep }) => {

  const { collateral } = useDebtPool()
  const underlyingAssets = collateral.underlyingAssets
  
  return (
    <div className='w-100'>
      <TitleLable title='Select Asset' />
      <div className="card">
        <div className="card-body">
        { underlyingAssets.map((underlyingAsset) => (
          <div key={ underlyingAsset.symbol } className='mb-0 fv-row'>
            <div className='mb-0'>
              <label className='d-flex flex-stack mb-5 cursor-pointer'>
                <span className='d-flex align-items-center me-2'>
                  <AssetToken
                    tokenSymbol={underlyingAsset.symbol}
                    tokenName={underlyingAsset.name} 
                    tokenIcon={underlyingAsset.icon}
                  />
                </span>
                <span className='form-check form-check-custom form-check-solid'>
                  <Field className='form-check-input' type='radio' name='debtAssetType' value={underlyingAsset.symbol} />
                </span>
              </label>
            </div>
            {underlyingAsset.symbol !== underlyingAssets[underlyingAssets.length - 1].symbol && 
              <div className='separator my-10'></div>
            }
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
        
export default SelectDebtAsset