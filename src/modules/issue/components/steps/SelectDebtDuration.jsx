/* eslint-disable jsx-a11y/anchor-is-valid */
import { Field } from 'formik'
import { DurationsMeta } from '../../../../components/providers/poolsProvider'
import TitleLable from '../../../../components/title-lable'
import AssetToken from '../../../../components/token-icon/AssetToken'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useDebtPool } from '../../providers/debt-pool-provider'

const SelectDebtDuration = ({ prevStep }) => {

  const {bondPool} = useDebtPool()
  
  return (
    <div className='w-100'>
      <TitleLable title='Select Duration' />
      <div className='card mb-2'>
        <div className='card-body pt-3 pb-3'>
          <AssetToken
            tokenIcon={bondPool.bondAsset.icon}
            tokenSymbol={bondPool.bondAsset.symbol}
            tokenName={bondPool.bondAsset.name}           
          />
        </div>
      </div>
      <div className='card'>
        <div className='card-body'>
        { DurationsMeta.map((debtDuration) => (
          <div key={ debtDuration.id } className='mb-0 fs-6 fw-bolder fv-row'>
            <div className='mb-0'>
              <label className='d-flex flex-stack mb-1 cursor-pointer'>
                <span className='d-flex align-items-center me-2'>
                  {debtDuration.description}
                </span>
                <span className='form-check form-check-custom form-check-solid'>
                  <Field className='form-check-input' type='radio' name='debtDuration' value={ debtDuration.duration } />
                </span>
              </label>
            </div>
            {debtDuration.id !== DurationsMeta[DurationsMeta.length - 1].id && 
              <div className='separator my-6'></div>
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

export {SelectDebtDuration}