/* eslint-disable jsx-a11y/anchor-is-valid */
import { Field } from 'formik'
import TokenIcon from '../../../../components/token-icon'
import { useLiquidityPools } from '../../providers/liquidity-pools-provider'

const SelectAsset = () => {

  const {assets, pools} = useLiquidityPools()
  
  return (
    <div className='w-100'>
      <div className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder d-flex align-items-center text-dark'>
          Select Asset
        </h2>
      </div>
      { pools.map((pool) => (
        <div key={ pool.symbol } className='mb-0 fv-row'>
          <div className='mb-0'>
            <label className='d-flex flex-stack mb-5 cursor-pointer'>
              <span className='d-flex align-items-center me-2'>
                <TokenIcon tokenName={pool.symbol} tokenIcon={pool.icon}/>
              </span>
              <span className='form-check form-check-custom form-check-solid'>
                <Field className='form-check-input' type='radio' name='assetType' value={pool.symbol} />
              </span>
            </label>
          </div>
        </div>
      ))}  
    </div>
  )
}

export {SelectAsset}