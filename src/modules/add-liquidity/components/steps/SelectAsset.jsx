/* eslint-disable jsx-a11y/anchor-is-valid */
import { Field } from 'formik'
import { usePools } from '../../../../components/providers/poolsProvider'
import TitleLable from '../../../../components/title-lable'
import AssetToken from '../../../../components/token-icon/AssetToken'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'

const SelectAsset = () => {

  const { assets } = usePools()
  
  return (
    <div className='w-100'>
      <TitleLable title='Select Asset' />
      <div className='card'>
        <div className='card-body'>
        { assets.map((asset) => (
          <div key={ asset.symbol } className='mb-0 fv-row'>
            <div className='mb-0'>
              <label className='d-flex flex-stack mb-5 cursor-pointer'>
                <span className='d-flex align-items-center me-2'>
                  <AssetToken 
                    tokenSymbol={asset.symbol} 
                    tokenIcon={asset.icon}
                    tokenName={asset.name}
                  />
                </span>
                <span className='form-check form-check-custom form-check-solid'>
                  <Field className='form-check-input' type='radio' name='assetType' value={asset.symbol} />
                </span>
              </label>
            </div>
            {asset.symbol !== assets[assets.length - 1].symbol && 
              <div className='separator my-10'></div>
            }
          </div>
          ))}
        </div>
      </div>
      
      <div className='d-grid pt-3'>
        <button type='submit' className='btn btn-primary'>
          <span className='indicator-label'>              
            Next
            <KTSVG
              path='/media/icons/duotune/arrows/arr064.svg'
              className='svg-icon-3 ms-2 me-0'
            />
          </span>
        </button>
      </div>  
    </div>
  )
}

export {SelectAsset}