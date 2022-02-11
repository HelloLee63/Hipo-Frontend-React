/* eslint-disable jsx-a11y/anchor-is-valid */

import BigNumber from 'bignumber.js'
import { useFormik} from 'formik'
import { useMemo, useEffect, useState } from 'react'
import { useConfig } from '../../../../components/providers/configProvider'
import TokenIcon from '../../../../components/token-icon'
import { useWallet } from '../../../../wallets/walletProvider'
import { useProtocolData } from '../../../../web3/components/providers/ProtocolDataProvider'
import { useWalletData } from '../../../../web3/components/providers/WalletDataProvider'
import { formatPercent, formatToken, scaleBy } from '../../../../web3/utils'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useColPool } from '../../providers/colPool-provider'
import { useColPools } from '../../providers/colPools-provider'

const InputAmount = ({ prevStep }) => {

  const { colPool } = useColPool()
  const tokenName = colPool.lable
  const tokenDesc = colPool.desc
  const tokenIcon = colPool.tokens[0].icon
  const colPoolsCtx = useColPools()
  const colPoolCtx = useColPool()  
  const config = useConfig()

  const [walletConnectVisible, setWalletConnectVisible] = useState(false)
  const [approveVisible, setApproveVisible] = useState(false)
  const [submitDisabledVisible, setSubmitDisabledVisible] = useState(false)
  const [submitVisible, setSubmitVisible] = useState(false)
  const [isEnabling, setEnabling] = useState(false)

  const activeCollateralLpToken = useMemo(() =>{
    return colPoolsCtx.getColPoolByToken(colPoolCtx.poolLable)
  }, [colPoolCtx.poolLable])

  const activeCollateralLpTokenContract = activeCollateralLpToken?.tokens[0].contract 
  const collateralAddress = colPoolCtx.colPool.tokens[0].address 
  const wallet = useWallet()
  const protocolData = useProtocolData()
  const walletBalance = colPoolCtx.colPool.tokens[0].contract.balances?.get(wallet.account)
  const pledgedBalance = colPoolCtx.colPool.contract.balances?.get(wallet.account)
  const allowance = activeCollateralLpTokenContract.allowances?.get(config.contracts.financingPool.financingPool)
  const walletData = useWalletData()

  const issuerLtv = walletData.walletDataContract.issuerLtvArray?.find(data => data.issuer === wallet.account && data.collateralAssetAddress === collateralAddress)
  const assetDecimals = colPoolCtx.colPool.tokens[0].contract.decimals
  const colDecimals = colPoolCtx.colPool.contract.decimals

  const assetAmount = useFormik({
    initialValues: {
      collateralAssetAmount: '',
    }
  })


  const inputAmount = new BigNumber(assetAmount.values.collateralAssetAmount)

  let value = new BigNumber(scaleBy(inputAmount, assetDecimals)) 


  useEffect(() => {
    if(!wallet.account) {
      setWalletConnectVisible(true)
    } else {
      setWalletConnectVisible(false)
    }
  }, [wallet.account])



  useEffect(() => {
    if(wallet.account) {
      if((new BigNumber(allowance).lt(value)) && !walletConnectVisible){
        setApproveVisible(true)
      } else {
        setApproveVisible(false)
      }
    } else {
      setApproveVisible(false)
    }
  }, [walletConnectVisible, value, wallet.account, allowance])



  useEffect(() => {
    if(value.eq(0) || value.isNaN()) {
      if(!walletConnectVisible && !approveVisible && !submitVisible){
        setSubmitDisabledVisible(true)
      } else {
        setSubmitDisabledVisible(false)
      }
    } else {
      setSubmitDisabledVisible(false)
    }
    
  }, [value, walletConnectVisible, approveVisible, submitVisible])

  useEffect(() => {
    if(wallet.account && value.gt(0) && !approveVisible){
      if(value.gte(new BigNumber(walletBalance))) {
        setSubmitDisabledVisible(true)
        setSubmitVisible(false)
      }
    } 
  }, [value, walletConnectVisible, approveVisible, submitVisible])

  useEffect(() => {
    if(wallet.account && value.gt(0)) {
      if(!approveVisible && !walletConnectVisible && !submitDisabledVisible) {
        setSubmitVisible(true)
      } else {
        setSubmitVisible(false)
      }
    } else {
      setSubmitVisible(false)
    }
  }, [value, wallet.account, approveVisible, walletConnectVisible, submitDisabledVisible])

  function handleSubmit() {
    colPoolCtx.setPledgeAmount(inputAmount)
  }
  
  async function handleApprove() {

    if(wallet.account) {
      
      setEnabling(true)

      try {
        await colPoolCtx.colPool.tokens[0].contract.approve(config.contracts.financingPool.financingPool, true)
      } catch(e) {
        console.error(e)
      }

      setEnabling(false)      
    }     
  }

  return (
    <div>       
      <div className="card mb-2">
        <div className="card-body pt-3 pb-3">
          <TokenIcon className='' tokenName={ tokenName } tokenDesc={ tokenDesc } tokenIcon={ tokenIcon }/>
        </div>
      </div>

      <div className="card mb-2">
        <div className="card-body p-0">
          <input
            id='amount'
            type='text'
            className='form-control form-control-lg  fw-bolder bg-white border-0 text-primary text-center align-center'
            placeholder='0.0'
            name='collateralAssetAmount'
            value={assetAmount.values.collateralAssetAmount}
            style={{ fontSize: 48 }}
            autoComplete='off'
            // onChange={assetAmount.handleChange}
            onChange={e => {
              e.preventDefault();
              const { value } = e.target;              
              // const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
              const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
              if (regex.test(value)) {
                assetAmount.setFieldValue('collateralAssetAmount', value);
              }
            }}
          />
        </div>       
      </div>

      <div className="card mb-2">
        <div className="card-body">
          <div className='d-flex align-items-sm-center mb-4'>
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <a href='#' className='text-muted fw-bolder fs-6'>
                  You Pledged
                </a>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={tokenIcon} className='svg-icon svg-icon-2x' />
              </div>
              <span className='fs-6 fw-bolder my-2'>{formatToken(pledgedBalance, {scale: colDecimals, tokenName: colPoolCtx.colPool.tokens[0].symbol}) ?? '-'}</span>
            </div>
          </div>

          <div className='d-flex align-items-sm-center mb-4'>
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <a href='#' className='text-muted fw-bolder text-hover-primary fs-6'>
                  Your Collateral LTV
                </a>
                </div>
                  <span className='fs-6 fw-bolder my-2'>{formatPercent(formatToken(issuerLtv?.ltv, {scale: 18}), 4) ?? '-'}</span>
                </div>
          </div>

          <div className='d-flex align-items-sm-center mb-4'>
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <a href='#' className='text-muted fw-bolder text-hover-primary fs-6'>
                  Your Debts
                </a>
              </div>
              <span className='fs-6 fw-bolder my-2'>{formatPercent(formatToken(issuerLtv?.ltv, {scale: 18}), 4) ?? '-'}</span>
            </div>
          </div>

          <div className='d-flex align-items-sm-center mb-4'>
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <a href='#' className='text-muted fw-bolder text-hover-primary fs-6'>
                        
                </a>
              </div>
              <span className='fs-6 fw-bolder my-2'>{formatPercent(formatToken(issuerLtv?.ltv, {scale: 18}), 4) ?? '-'}</span>
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

export {InputAmount}


        {/* <div className='d-flex align-items-sm-center mb-1'>
          <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-5'>
                Wallet
              </a>              
            </div>
            <div className='symbol symbol-50px me-2'>
              <KTSVG path={tokenIcon} className='svg-icon svg-icon-2x' />
            </div>
            <span className='text-primary fs-5 fw-bolder my-2'>{formatToken(walletBalance, {scale: assetDecimals, tokenName: colPoolCtx.colPool.tokens[0].symbol}) ?? '-'}</span>
          </div>
        </div>
          
        <div className='d-flex align-items-sm-center mb-1'>
          <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                Max LTV
              </a>
            </div>
            <span className='badge badge-light-success fs-6 fw-bolder my-2'>{  maxLtv }%</span>
          </div>          
        </div>

        <div className='d-flex align-items-sm-center mb-1'>          
          <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                Liquidation Threshold
              </a>
            </div>
            <span className='badge badge-light-success fs-6 fw-bolder my-2'>{ liquidationThreshold }%</span>
          </div>          
        </div>         */}