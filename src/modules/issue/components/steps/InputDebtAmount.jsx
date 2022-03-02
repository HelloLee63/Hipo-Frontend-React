/* eslint-disable jsx-a11y/anchor-is-valid */
import BigNumber from 'bignumber.js'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useConfig } from '../../../../components/providers/configProvider'
import TokenIcon from '../../../../components/token-icon'
import TransactionAssetDataItem from '../../../../components/transaction-data-item/TransactionAssetDataItem'
import { useWallet } from '../../../../wallets/walletProvider'
import { useProtocolData } from '../../../../web3/components/providers/ProtocolDataProvider'
import { calAPY, formatPercent, formatToken, scaleBy } from '../../../../web3/utils'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useDebtPool } from '../../providers/debt-pool-provider'

const InputDebtAssetAmount = ({ prevStep }) => {

  const walletCtx = useWallet()
  const config = useConfig()
  const { bondPool, collateral, setIssueAmount } = useDebtPool()

  const protocolData = useProtocolData()

  const [walletConnectVisible, setWalletConnectVisible] = useState(false)
  const [approveVisible, setApproveVisible] = useState(false)
  const [submitDisabledVisible, setSubmitDisabledVisible] = useState(false)
  const [submitVisible, setSubmitVisible] = useState(false)
  const [isEnabling, setEnabling] = useState(false)

  const walletBalance = bondPool.bondAsset.contract.balances?.get(walletCtx.account)
  const allowance = bondPool.bondAsset.contract.allowances?.get(config.contracts.financingPool.financingPool)
   
  const debtAssetAddress = bondPool.bondAsset.address
  const duration = bondPool.duration.duration
  const decimals = bondPool.bondAsset.decimals

  const bondIcon = bondPool?.icon
  const bondSymbol = bondPool.bondAsset.symbol
  const bondDurationDesc = bondPool.duration.description
  
  const price = protocolData.getBondPrice(debtAssetAddress, duration)
  
  const APR = formatPercent(calAPY(price, decimals, Number(bondPool.duration.duration)))

  const issueFormik = useFormik({
    initialValues: {
      debtAssetAmount: '',
    }
  })

  const inputAmount = new BigNumber(issueFormik.values.debtAssetAmount)
  let value = new BigNumber(scaleBy(inputAmount, decimals))

  const borrowAmount = new BigNumber(scaleBy(1, 18))

  const collateralAmount = walletCtx.account ? collateral.contract.balances?.get(walletCtx.account) : undefined

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
    setIssueAmount(() => inputAmount)
  }

  async function handleApprove() {

    if(walletCtx.account) {
      
      setEnabling(() => true)

      try {
        await bondPool.bondAsset.contract.approve(config.contracts.financingPool.financingPool, true)
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
            tokenName={`${bondSymbol} Bond`} 
            tokenIcon={bondIcon}
            tokenDesc={bondDurationDesc} 
          />
        </div>
      </div>

      <div className='card mb-2'>
        <div className='card-body p-0'>
          <input
            id='amount'
            type='text'
            className='form-control form-control-lg form-control-solid fw-bolder bg-white border-0 text-primary align-center'
            placeholder='0.0'
            name='debtAssetAmount'
            value={issueFormik.values.debtAssetAmount}
            style={{ fontSize: 48 }}
            autoComplete='off'
            onChange={e => {
              e.preventDefault();
              const { value } = e.target;              
              const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
              if (regex.test(value)) {
                issueFormik.setFieldValue('debtAssetAmount', value);
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
                <div className='text-gray-800 fw-bolder fs-6'>
                  You will borrow
                </div>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={bondPool.bondAsset.icon} className='svg-icon svg-icon-1x' />
              </div>
              <span className='fs-6 fw-bolder my-2'>{formatToken(walletBalance, {scale: decimals, tokenName: bondPool.bondAsset.symbol})}</span>
            </div>
          </div>

          <TransactionAssetDataItem
            title='You will borrow'
            tokenIcon={bondPool.bondAsset.icon}
            balance={walletBalance}
            decimals={decimals}           
          />
          {/* begin::Title */}
          <div className='d-flex align-items-sm-center mb-4'>          
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                  Bond Price
                </a>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={bondPool.bondAsset.icon} className='svg-icon svg-icon-2x' />
              </div>
              <span className='fs-6 fw-bolder my-2'>{formatToken(price, {scale: 18, tokenName: bondPool.bondAsset.symbol}) ?? '-'}</span>
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
                <KTSVG path={bondPool.bondAsset.icon} className='svg-icon svg-icon-2x' />
              </div>
              <span className='fs-6 fw-bolder my-2'>{APR ?? '-'}</span>
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
                <KTSVG path={collateral.collateralAsset.icon} className='svg-icon svg-icon-2x' />
              </div>
              <span className='fs-6 fw-bolder my-2'>{formatToken(collateralAmount, { scale: 18 }) ?? '-'}</span>
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

export {InputDebtAssetAmount}