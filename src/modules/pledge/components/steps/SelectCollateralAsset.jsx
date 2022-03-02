/* eslint-disable jsx-a11y/anchor-is-valid */
import { Field } from 'formik'
import { usePools } from '../../../../components/providers/poolsProvider'
import TitleLable from '../../../../components/title-lable'
import CollateralToken from '../../../../components/token-icon/CollateralToken'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'

const SelectCollateralAsset = ({ prevStep }) => {

  const { collateralPools } = usePools()

  return (     
    <div className='w-100'>
      <TitleLable title='Select Collateral' />
      <div className="card mb-2">
        <div className="card-body">
          { collateralPools.map((pool) => (
            <div key={ pool.collateralAsset.symbol } className='fv-row'>
              <div className='pb-0'>
                <label className='d-flex flex-stack mb-5 cursor-pointer'>
                  <span className='d-flex align-items-center me-2'>
                    <CollateralToken
                      tokenIcon={pool.collateralAsset.icon}
                      tokenSymbol={pool.collateralAsset.symbol}
                      tokenName={pool.collateralAsset.name}
                    />
                  </span>
                  <span className='form-check form-check-custom align-items-center form-check-solid'>
                    <Field className='form-check-input' type='radio' name='collateralAssetType' value={pool.collateralAsset.symbol} />
                  </span>
                </label>
              </div>
              {pool.collateralAsset.symbol !== collateralPools[collateralPools.length - 1].collateralAsset.symbol && 
                <div className='separator my-10'></div>
              }
            </div>          
          ))}       
        </div>        
      </div>
      <div className='pt-3'>
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

        <div className='d-grid'>
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
    </div>    
  )
}

export {SelectCollateralAsset}