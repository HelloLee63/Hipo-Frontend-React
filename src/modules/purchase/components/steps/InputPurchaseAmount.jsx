/* eslint-disable jsx-a11y/anchor-is-valid */
import { useFormik} from 'formik'
import TokenIcon from '../../../../components/token-icon'
import { useWallet } from '../../../../wallets/walletProvider'
import { useProtocolData } from '../../../../web3/components/providers/ProtocolDataProvider'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useBondPool } from '../../providers/bond-pool-provider'
import { useEffect, useState } from 'react'
import { useConfig } from '../../../../components/providers/configProvider'
import { calAPY, formatPercent, formatToken, scaleBy } from '../../../../web3/utils'
import BigNumber from 'bignumber.js'

const InputPurchaseAmount = ({ prevStep }) => {

  const walletCtx = useWallet()
  const config = useConfig()
  const bondPoolCtx = useBondPool()

  const protocolData = useProtocolData()

  const [walletConnectVisible, setWalletConnectVisible] = useState(false)
  const [approveVisible, setApproveVisible] = useState(false)
  const [submitDisabledVisible, setSubmitDisabledVisible] = useState(false)
  const [submitVisible, setSubmitVisible] = useState(false)
  const [isEnabling, setEnabling] = useState(false)

  const activePool = bondPoolCtx.pool
  const walletBalance = activePool.bondAsset.contract.balances?.get(walletCtx.account)
  const allowance = activePool.bondAsset.contract.allowances.get(config.contracts.financingPool.financingPool)

  console.log(allowance);
  const decimals = activePool.bondAsset.decimals
  
  const bondPrice = protocolData.getBondPrice(activePool.bondAsset.address, activePool.duration.duration)
  // const APY = formatPercent(calAPY(bondPrice, decimals, Number(activePool.duration)))
  const APY = protocolData.getBondPrice(activePool.bondAsset.address, activePool.duration.duration, activePool.bondAsset.symbol)?.apy

  const formik = useFormik({
    initialValues: {
      bondAssetAmount: '',
    }
  })

  const inputAssetAmount = new BigNumber(formik.values.bondAssetAmount)
  const value = new BigNumber(scaleBy(inputAssetAmount, decimals))

  function handleSubmit() {
    bondPoolCtx.setPurchaseAmount(() => inputAssetAmount)
  }

  async function handleApprove() {

    if(walletCtx.account) {
      
      setEnabling(true)

      try {
        await bondPoolCtx.pool.bondAsset.contract.approve(config.contracts.financingPool.financingPool, true)
      } catch(e) {
        console.error(e)
      }

      setEnabling(false)      
    }     
  }

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

  return (
    <div>
      <div className='card mb-2'>
        <div className='card-body pt-3 pb-3'>
          <TokenIcon 
            tokenName={activePool.bondAsset.symbol}
            tokenDesc={activePool.duration.description}
            tokenIcon={activePool.icon}
          />
        </div>
      </div>

      <div className='card mb-2'>
        <div className='card-body p-0'>
          <input
            id='purchaseAmount'
            type='text'
            className='form-control form-control-lg fw-bolder bg-white border-0 text-primary align-center'
            placeholder='0.0'
            name='bondAssetAmount'
            value={formik.values.bondAssetAmount}
            autoComplete='off'              
            style={{ fontSize: 48 }}
            onChange={e => {
              e.preventDefault();
              const { value } = e.target;              
              const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
              if (regex.test(value)) {
                formik.setFieldValue('bondAssetAmount', value);
              }
            }}
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
              <KTSVG path={activePool.bondAsset.icon} className='svg-icon svg-icon-1x' />
            </div>
            <span className='fs-6 fw-bolder my-2'></span>
          </div>

          <div className='d-flex flex-row-fluid flex-wrap align-items-center  mb-4'>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                Bond Price
              </a>
            </div>
            <div className='symbol symbol-50px me-2'>
              <KTSVG path={activePool.icon} className='svg-icon svg-icon-1x' />
            </div>
            <span className='fs-6 fw-bolder my-2'>{formatToken(bondPrice, { scale: 18, tokenName: activePool.bondAsset.symbol}) ?? '-'}</span>
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
              Submit2
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