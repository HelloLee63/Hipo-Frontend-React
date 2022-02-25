/* eslint-disable jsx-a11y/anchor-is-valid */
import BigNumber from 'bignumber.js'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useConfig } from '../../../../components/providers/configProvider'
import TokenIcon from '../../../../components/token-icon'
import { useWallet } from '../../../../wallets/walletProvider'
import { useFinancingPool } from '../../../../web3/components/providers/FinancingPoolProvider'
import { formatToken, scaleBy } from '../../../../web3/utils'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useLiquidityPool } from '../../providers/liquidity-pool-provider' 

const InputAssetAmount = ({ prevStep }) => {

  const walletCtx = useWallet()
  const config = useConfig()
  const financingPool = useFinancingPool()

  const { pool, setAddAmount } = useLiquidityPool()

  const walletBalance = pool.bondAsset.contract.balances?.get(walletCtx.account)

  const decimals = pool.bondAsset.decimals
  const allowance = pool.bondAsset.contract.allowances?.get(config.contracts.financingPool.financingPool)


  const [walletConnectVisible, setWalletConnectVisible] = useState(false)
  const [approveVisible, setApproveVisible] = useState(false)
  const [submitDisabledVisible, setSubmitDisabledVisible] = useState(false)
  const [submitVisible, setSubmitVisible] = useState(false)
  const [isEnabling, setEnabling] = useState(false)
  
  const addLiquidityFormik = useFormik({
    initialValues: {
      assetAmount: '',
    }
  })

  const inputAssetAmount = new BigNumber(addLiquidityFormik.values.assetAmount)
  let value = new BigNumber(scaleBy(inputAssetAmount, decimals))

  useEffect(() => {

    if (!walletCtx.account) {
      setWalletConnectVisible(() => true)
      setApproveVisible(() => false)
      setSubmitDisabledVisible(() => false)
      setSubmitVisible(() => false)
      return
    }

    if (walletCtx.account) {
      setWalletConnectVisible(() => false)

      if (value.eq(0) || value.isNaN()) {
        setSubmitDisabledVisible(() => true)
        setApproveVisible(() => false)
        setSubmitVisible(() => false)
        return
      }

      if (value.gt(0) && value.gt(allowance)) {
        setApproveVisible(() => true)
        setSubmitDisabledVisible(() => false)
        setSubmitVisible(() => false)
        return
      }

      if (value.gt(0) && value.lte(allowance)) {
        setApproveVisible(() => false)

        if (value.gt(walletBalance)) {
          setSubmitDisabledVisible(() => true)
          setSubmitVisible(() => false)
          return
        }

        if (value.lte(walletBalance)) {
          setSubmitVisible(() => true)
          setSubmitDisabledVisible(() => false)
          return
        }
      }
    }

  }, [walletCtx.account, value, walletBalance, allowance])

  function handleSubmit() {
    setAddAmount(() => inputAssetAmount)
  }

  async function handleApprove() {

    if(walletCtx.account) {
      
      setEnabling(() => true)

      try {
        await pool.bondAsset.contract.approve(config.contracts.financingPool.financingPool, true)
      } catch(e) {
        console.error(e)
      }

      setEnabling(() => false)      
    }     
  } 

  return (
    <div>
      <div className='card mb-2'>
        <div className='card-body pt-3 pb-3'>
          <TokenIcon 
            tokenName={pool.bondAsset.symbol} 
            tokenDesc={pool.duration.description} 
            tokenIcon={pool.icon} 
          />
        </div>
      </div>

      <div className='card mb-2'>
        <div className='card-body p-0'>
          <input
            id='addLiquidityAmount'
            type='text'
            className='form-control form-control-lg form-control-solid fw-bolder bg-white border-0 text-primary align-center'
            placeholder='0.0'
            name='assetAmount'
            value={addLiquidityFormik.values.assetAmount}
            style={{ fontSize: 48 }}
            autoComplete='off'
            onChange={e => {
              e.preventDefault();
              const { value } = e.target;              
              const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
              if (regex.test(value)) {
                addLiquidityFormik.setFieldValue('assetAmount', value);
              }
            }}
          />
        </div>
      </div>

      <div className='card mb-2'>
        <div className='card-body'>
          <div className='d-flex align-items-sm-center mb-4'>          
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                  Add Asset Amount
                </a>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={pool.bondAsset.icon} className='svg-icon svg-icon-2x' />
              </div>
              {/* { getHumanValue(walletBalance?, decimals).toString() ?? '-' } */}
            <span className='badge badge-light-success fs-6 fw-bolder my-2'>{formatToken(inputAssetAmount, {tokenName: pool.bondAsset.symbol})}</span>
            </div>
          </div>

          <div className='d-flex align-items-sm-center mb-4'>          
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                  Interest Pool
                </a>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={pool.bondAsset.icon} className='svg-icon svg-icon-2x' />
              </div>
              {/* { getHumanValue(walletBalance?, decimals).toString() ?? '-' } */}
              <span className='badge badge-light-success fs-6 fw-bolder my-2'></span>
            </div>
          </div>

          <div className='d-flex align-items-sm-center mb-4'>          
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                  Reserve Pool
                </a>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={pool.bondAsset.icon} className='svg-icon svg-icon-2x' />
              </div>
              {/* { getHumanValue(walletBalance?, decimals).toString() ?? '-' } */}
            <span className='badge badge-light-success fs-6 fw-bolder my-2'></span>
            </div>
          </div>

        </div>
      </div>

      <div className='d-flex flex-row-fluid flex-stack pt-2'>
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
        {walletConnectVisible &&
        <div>            
          <button 
            type='button' 
            className='btn btn-lg btn-secondary me-0'
            disabled
          >
            <span className='indicator-label'>              
              Please Connect Your Wallet
              <KTSVG
                path='/media/icons/duotune/arrows/arr064.svg'
                className='svg-icon-3 ms-2 me-0'
              />
            </span>
          </button>
        </div>}
        {approveVisible &&
        <div>            
          <button 
            type='button' 
            className='btn btn-lg btn-primary me-0'
            onClick={handleApprove}
          >
            {isEnabling ? 
            (<div>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Approving...
            </div>) 
            :              
            (<span className='indicator-label'>              
              Approve
              <KTSVG
                path='/media/icons/duotune/arrows/arr064.svg '
                className='svg-icon-3 ms-2 me-0'
              />
            </span>)}
            
          </button>
        </div>}
        {submitDisabledVisible &&
        <div>            
          <button 
            type='button' 
            className='btn btn-lg btn-primary me-0'
            disabled
          >
            <span className='indicator-label'>              
              Submit
              <KTSVG
                path='/media/icons/duotune/arrows/arr064.svg'
                className='svg-icon-3 ms-2 me-0'
              />
            </span>
          </button>
        </div>}
        {submitVisible &&
        <div>            
          <button 
            type='submit' 
            className='btn btn-lg btn-primary me-0'
            onClick={handleSubmit}
          >
            <span className='indicator-label'>              
              Submit
              <KTSVG
                path='/media/icons/duotune/arrows/arr064.svg'
                className='svg-icon-3 ms-2 me-0'
              />
            </span>
          </button>
        </div>}
      </div>
    </div>         
  )
}

export {InputAssetAmount}