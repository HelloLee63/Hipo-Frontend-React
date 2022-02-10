/* eslint-disable jsx-a11y/anchor-is-valid */
import BigNumber from 'bignumber.js'
import { Field, ErrorMessage, useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useConfig } from '../../../../components/providers/configProvider'
import TokenIcon from '../../../../components/token-icon'
import { useWallet } from '../../../../wallets/walletProvider'
import { useProtocolData } from '../../../../web3/components/providers/ProtocolDataProvider'
import { calAPY, formatPercent, formatToken } from '../../../../web3/utils'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useDebtPool } from '../../providers/debt-pool-provider'

const InputDebtAssetAmount = ({ prevStep }) => {
  const debtPoolCtx = useDebtPool()
  const activePool = debtPoolCtx.debtPool
  const tokenName = activePool.debtAsset.symbol
  const tokenIcon = activePool.debtAsset.icon
  const tokenDesc = activePool.debtAsset.desc
  const walletCtx = useWallet()
  const decimals = activePool.debtAsset.contract.decimals
  const [walletConnectVisible, setWalletConnectVisible] = useState(false)
  const [approveVisible, setApproveVisible] = useState(false)
  const [submitDisabledVisible, setSubmitDisabledVisible] = useState(false)
  const [submitVisible, setSubmitVisible] = useState(false)
  const walletBalance = activePool.debtAsset.contract.balances?.get(walletCtx.account)
  const config = useConfig()
  const allowance = activePool.debtAsset.contract.allowances?.get(config.contracts.financingPool.financingPool)
  const [isEnabling, setEnabling] = useState(false)
  const debtAssetAddress = activePool.debtAsset.address
  const duration = new BigNumber(activePool.duration)
  const protocolData = useProtocolData()
  
  const priceData = protocolData.protocolDataContract.bondPriceArray?.filter(function(data) {
    if(data.assetAddress === debtAssetAddress && BigNumber(data.duration).eq(duration)){
      return true
    }
  })

  const bondPrice = priceData[0]?.price

  const APR = formatPercent(calAPY(bondPrice, 18, Number(duration)))

  const issueFormik = useFormik({
    initialValues: {
      debtAssetAmount: '0.0',
    }
  })

  const inputAmount = new BigNumber(issueFormik.values.debtAssetAmount)

  useEffect(() => {
    if(walletCtx.account) {
      if((new BigNumber(allowance).lt(inputAmount)) && !walletConnectVisible){
        setApproveVisible(true)
      } else {
        setApproveVisible(false)
      }
    } else {
      setApproveVisible(false)
    }
  }, [walletConnectVisible, inputAmount, walletCtx.account])

  useEffect(() => {
    if(!walletCtx.account) {
      setWalletConnectVisible(true)
    } else {
      setWalletConnectVisible(false)
    }
  }, [walletCtx.account])

  useEffect(() => {
    if(inputAmount.eq(0)) {
      if(!walletConnectVisible && !approveVisible && !submitVisible){
        setSubmitDisabledVisible(true)
      } else {
        setSubmitDisabledVisible(false)
      }
    } else {
      setSubmitDisabledVisible(false)
    }
    
  }, [inputAmount, walletConnectVisible, approveVisible, submitVisible])

  useEffect(() => {
    if(walletCtx.account && inputAmount.gt(0)) {
      if(!approveVisible && !walletConnectVisible) {
        setSubmitVisible(true)
      } else {
        setSubmitVisible(false)
      }
    } else {
      setSubmitVisible(false)
    }
  }, [inputAmount, walletCtx.account, approveVisible, walletConnectVisible, submitDisabledVisible])

  async function handleApprove() {

    if(walletCtx.account) {
      
      setEnabling(true)

      try {
        await activePool.debtAsset.contract.approve(config.contracts.financingPool.financingPool, true)
      } catch(e) {
        console.error(e)
      }

      setEnabling(false)      
    }     
  }
  
  return (
    <div>
      <div className='card mb-2'>
        <div className='card-body pt-3 pb-3'>
          <TokenIcon 
            tokenName={tokenName} 
            tokenIcon={tokenIcon}
            tokenDesc={tokenDesc} 
          />
        </div>
      </div>

      <div className='card mb-2'>
        <div className='card-body p-0'>
          <Field
              type='text'
              className='form-control form-control-lg form-control-solid fw-bolder bg-white border-0 text-danger text-center align-center'
              placeholder='0.0'
              name='debtAssetAmount'
              onChange={issueFormik.handleChange}
              value={issueFormik.values.debtAssetAmount}
              style={{ fontSize: 48 }}
            />
        </div>
      </div>

      <div className='card mb-2'>
        <div className='card-body'>
          <div className='d-flex align-items-sm-center mb-4'>          
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                  Wallet
                </a>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={activePool.debtAsset.icon} className='svg-icon svg-icon-2x' />
              </div>
              <span className='badge badge-light-success fs-6 fw-bolder my-2'>{formatToken(walletBalance, {scale: decimals, tokenName: activePool.debtAsset.symbol})}</span>
            </div>
          </div>
          {/* begin::Title */}
          <div className='d-flex align-items-sm-center mb-4'>          
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                  Bond Price
                </a>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={activePool.debtAsset.icon} className='svg-icon svg-icon-2x' />
              </div>
              <span className='badge badge-light-success fs-6 fw-bolder my-2'>{formatToken(bondPrice, {scale: 18, tokenName: activePool.debtAsset.symbol}) ?? '-'}</span>
            </div>
          </div>
          {/* end::Title */}

          {/* begin::Title */}
          <div className='d-flex align-items-sm-center mb-4'>          
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                  APR
                </a>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={activePool.debtAsset.icon} className='svg-icon svg-icon-2x' />
              </div>
              <span className='badge badge-light-success fs-6 fw-bolder my-2'>{APR ?? '-'}</span>
            </div>
          </div>
          {/* end::Title */}

          {/* begin::Title */}
          <div className='d-flex align-items-sm-center mb-4'>          
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                  Collateral
                </a>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={debtPoolCtx.collateral.collateralAsset.icon} className='svg-icon svg-icon-2x' />
              </div>
              <span className='badge badge-light-success fs-6 fw-bolder my-2'>{APR ?? '-'}</span>
            </div>
          </div>
          {/* end::Title */}
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

export {InputDebtAssetAmount}