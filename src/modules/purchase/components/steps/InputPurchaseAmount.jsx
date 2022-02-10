/* eslint-disable jsx-a11y/anchor-is-valid */
import { ErrorMessage, Field, useFormik} from 'formik'

import TokenIcon from '../../../../components/token-icon'
import { useWallet } from '../../../../wallets/walletProvider'
import { useProtocolData } from '../../../../web3/components/providers/ProtocolDataProvider'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useBondPool } from '../../providers/bond-pool-provider'
import { useEffect, useState } from 'react'
import { useConfig } from '../../../../components/providers/configProvider'
import { calAPY, formatPercent, formatToken, scaleBy } from '../../../../web3/utils'
import BigNumber from 'bignumber.js'
import { useFinancingPool } from '../../../../web3/components/providers/FinancingPoolProvider'

const InputPurchaseAmount = ({ prevStep }) => {

  const bondPoolCtx = useBondPool()
  const activePool = bondPoolCtx.bondPool
  const wallet = useWallet()
  const config = useConfig()
  const walletBalance = activePool.bondAsset.contract.balances?.get(wallet.account)
  const protocolData = useProtocolData()
  const bondPrice = protocolData.protocolDataContract.bondPriceMap?.get(activePool.bondAsset.address)
  const decimals = activePool.bondAsset.decimals
  const allowance = activePool.bondAsset.contract.allowances.get(config.contracts.financingPool.financingPool)
  const APY = formatPercent(calAPY(bondPrice, decimals, Number(activePool.duration)))
  const financingPool = useFinancingPool()

  const [walletConnectVisible, setWalletConnectVisible] = useState(false)
  const [approveVisible, setApproveVisible] = useState(false)
  const [submitDisabledVisible, setSubmitDisabledVisible] = useState(false)
  const [submitVisible, setSubmitVisible] = useState(false)
  const [isEnabling, setEnabling] = useState(false)

  const formik = useFormik({
    initialValues: {
      bondAssetAmount: '0.0',
    }
  })

  const inputAssetAmount = new BigNumber(formik.values.bondAssetAmount)

  useEffect(() => {
    if(wallet.account) {
      if((new BigNumber(allowance).lt(inputAssetAmount)) && !walletConnectVisible){
        setApproveVisible(true)
      } else {
        setApproveVisible(false)
      }
    } else {
      setApproveVisible(false)
    }
  }, [walletConnectVisible, inputAssetAmount, wallet.account])

  useEffect(() => {
    if(!wallet.account) {
      setWalletConnectVisible(true)
    } else {
      setWalletConnectVisible(false)
    }
  }, [wallet.account])

  useEffect(() => {
    if(inputAssetAmount.eq(0) || inputAssetAmount.isNaN()) {
      if(!walletConnectVisible && !approveVisible && !submitVisible){
        setSubmitDisabledVisible(true)
      } else {
        setSubmitDisabledVisible(false)
      }
    } else {
      setSubmitDisabledVisible(false)
    }
    
  }, [inputAssetAmount, walletConnectVisible, approveVisible, submitVisible])

  useEffect(() => {
    if(wallet.account && inputAssetAmount.gt(0)) {
      if(!approveVisible && !walletConnectVisible) {
        setSubmitVisible(true)
      } else {
        setSubmitVisible(false)
      }
    } else {
      setSubmitVisible(false)
    }
  }, [inputAssetAmount, wallet.account, approveVisible, walletConnectVisible, submitDisabledVisible])


  useEffect(() => {
    if (allowance?.lte(new BigNumber(formik.values.bondAssetAmount))){
      bondPoolCtx.setApproveVisible(true)
    } else {
      bondPoolCtx.setApproveVisible(false)
    }
  }, [allowance, formik.values.bondAssetAmount])

  function handleSubmit() {
    bondPoolCtx.setPurchaseAmount(inputAssetAmount)
  }

  async function handleApprove() {

    if(wallet.account) {
      
      setEnabling(true)

      try {
        await bondPoolCtx.bondPool.bondAsset.contract.approve(config.contracts.financingPool.financingPool, true)
      } catch(e) {
        console.error(e)
      }

      setEnabling(false)      
    }     
  }

  async function handlePurchase() {
    let value = scaleBy(inputAssetAmount, decimals)
    let assetAddress = activePool.bondAsset.address
    let duration = new BigNumber(activePool.duration)

    try {
      await financingPool.financingPoolContract?.purchase(assetAddress, duration, value)
    } catch (e) {}
  }

  return (
    <div>
      <div className='card mb-2'>
        <div className='card-body pt-3 pb-3'>
          <TokenIcon 
            className='' 
            tokenName={activePool.bondAsset.symbol}
            tokenDesc={activePool.duration}
            tokenIcon={activePool.icon}
          />
        </div>
      </div>

      <div className='card mb-2'>
        <div className='card-body p-0'>
          <Field
              type='text'
              className='form-control form-control-lg fw-bolder bg-white border-0 text-primary text-center align-center'
              placeholder='0.0'
              name='bondAssetAmount'
              onChange={formik.handleChange}
              value={formik.values.bondAssetAmount}
              style={{ fontSize: 48 }}
            />
        </div>
      </div>
      
      <div className='card mb-2'>
        <div className='card-body'>
          <div className='d-flex flex-row-fluid flex-wrap align-items-center  mb-4'>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                You will deposit
              </a>
            </div>
            <div className='symbol symbol-50px me-2'>
              <KTSVG path={activePool.bondAsset.icon} className='svg-icon svg-icon-2x' />
            </div>
            <span className='fs-6 fw-bolder my-2'></span>
          </div>

          <div className='d-flex flex-row-fluid flex-wrap align-items-center mb-4'>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                Interest
              </a>
            </div>
            <div className='symbol symbol-50px me-2'>
              <KTSVG path={activePool.bondAsset.icon} className='svg-icon svg-icon-2x' />
            </div>
            <span className='fs-6 fw-bolder my-2'></span>
          </div>

          <div className='d-flex flex-row-fluid flex-wrap align-items-center mb-4'>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                Rewards (APY)
              </a>
            </div>
            <div className='symbol symbol-50px me-2'>
              <KTSVG path='' className='svg-icon svg-icon-2x' />
            </div>
            <span className='fs-6 fw-bolder my-2'>-</span>
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

export {InputPurchaseAmount}