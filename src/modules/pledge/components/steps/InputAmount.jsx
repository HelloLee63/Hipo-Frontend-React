/* eslint-disable jsx-a11y/anchor-is-valid */

import BigNumber from 'bignumber.js'
import { useFormik} from 'formik'
import { useEffect, useState } from 'react'
import { useConfig } from '../../../../components/providers/configProvider'
import { useKnownTokens } from '../../../../components/providers/knownTokensProvider'
import TokenIcon from '../../../../components/token-icon'
import { useWallet } from '../../../../wallets/walletProvider'
import { useWalletData } from '../../../../web3/components/providers/WalletDataProvider'
import { formatPercent, formatToken, scaleBy } from '../../../../web3/utils'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useColPool } from '../../providers/colPool-provider'

const InputAmount = ({ prevStep }) => {

  console.log('Pledge Input Amount is rendered');

  const { colPool, tokenSymbol, tokenName, tokenIcon, setPledgeAmount } = useColPool()
  const collateralAddress = colPool.underlyingAsset.address
  const { getTokenByAddress } = useKnownTokens()

  const config = useConfig()
  const wallet = useWallet()
  const walletBalance = colPool.underlyingAsset.contract.balances?.get(wallet.account)
  const pledgedBalance = colPool.token.contract.balances?.get(wallet.account)

  const allowance = colPool.underlyingAsset.contract.allowances?.get(config.contracts.financingPool.financingPool)

  const assetDecimals = colPool.underlyingAsset.decimals
  const colDecimals = colPool.token.decimals

  const walletData = useWalletData()
  const issuerLtv = walletData.getIssuerLtv(collateralAddress)
  const issuerTotalDebt = walletData.getIssuerTotalDebts(collateralAddress)

  const debtAAddress = issuerTotalDebt?.debtAAddress
  const debtBAddress = issuerTotalDebt?.debtBAddress
  const debtAAmount = issuerTotalDebt?.debtAAmount
  const debtBAmount = issuerTotalDebt?.debtBAmount

  const debtAToken = getTokenByAddress(debtAAddress?.toLowerCase())
  const debtASymbol = debtAToken?.symbol
  const debtAIcon = debtAToken?.icon
  const debtADecimals = debtAToken?.decimals

  const debtBToken = getTokenByAddress(debtBAddress?.toLowerCase())
  const debtBSymbol = debtBToken?.symbol
  const debtBIcon = debtBToken?.icon
  const debtBDecimals = debtBToken?.decimals
  
  const [walletConnectVisible, setWalletConnectVisible] = useState(false)
  const [approveVisible, setApproveVisible] = useState(false)
  const [submitDisabledVisible, setSubmitDisabledVisible] = useState(false)
  const [submitVisible, setSubmitVisible] = useState(false)
  const [isEnabling, setEnabling] = useState(false)

  const assetAmount = useFormik({
    initialValues: {
      collateralAssetAmount: '',
    }
  })

  const inputAmount = new BigNumber(assetAmount.values.collateralAssetAmount)
  let value = new BigNumber(scaleBy(inputAmount, assetDecimals)) 

  useEffect(() => {
    if (!wallet.account) {
      setWalletConnectVisible(() => true)
      setApproveVisible(() => false)
      setSubmitDisabledVisible(() => false)
      setSubmitVisible(() => false)
      return
    }

    if (wallet.account) {

      setWalletConnectVisible(() => false)

      if (value.eq(0) || value.isNaN()) {
        setSubmitDisabledVisible(() => true)
        setSubmitVisible(() => false)
        setApproveVisible(() => false)
        return
      }

      if ((new BigNumber(allowance).lt(value))) {
        setApproveVisible(() => true)
        setSubmitDisabledVisible(() => false)
        setSubmitVisible(() => false)
        return
      }

      if ((new BigNumber(allowance).gte(value))) {
        setApproveVisible(() => false)

        if (value.eq(0) || value.isNaN()) {
          setSubmitDisabledVisible(() => true)
          setSubmitVisible(() => false)
          return
        }

        if (value.gt(0) && value.gt(new BigNumber(walletBalance))) {
          setSubmitDisabledVisible(() => true)
          setSubmitVisible(() => false)
          return
        }

        if (value.gt(0) && value.lte(new BigNumber(walletBalance))) {
          setSubmitDisabledVisible(() => false)
          setSubmitVisible(() => true)
          return
        }
      }
    }
  }, [wallet.account, value, walletBalance, allowance])

  function handleSubmit() {
    setPledgeAmount(() => inputAmount)
  }
  
  async function handleApprove() {

    if(wallet.account) {
      
      setEnabling(true)

      try {
        await colPool.underlyingAsset.contract.approve(config.contracts.financingPool.financingPool, true)
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
          <TokenIcon className='' tokenName={ tokenSymbol } tokenDesc={ tokenName } tokenIcon={ tokenIcon }/>
        </div>
      </div>

      <div className="card mb-2">
        <div className="card-body p-0">
          <input
            id='amount'
            type='text'
            className='form-control form-control-lg  fw-bolder bg-white border-0 text-primary align-center'
            placeholder='0.0'
            name='collateralAssetAmount'
            value={assetAmount.values.collateralAssetAmount}
            style={{ fontSize: 48 }}
            autoComplete='off'
            onChange={e => {
              e.preventDefault();
              const { value } = e.target;              
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
                <div className='text-muted fw-bolder fs-6'>
                  You Pledged
                </div>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={tokenIcon} className='svg-icon svg-icon-2x' />
              </div>
              <span className='fs-6 fw-bolder my-2'>{formatToken(pledgedBalance, {scale: colDecimals, tokenName: tokenSymbol}) ?? '-'}</span>
            </div>
          </div>

          <div className='d-flex align-items-sm-center mb-4'>
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <div className='text-muted fw-bolder fs-6'>
                  Your Collateral LTV
                </div>
                </div>
                  <span className='fs-6 fw-bolder my-2'>{formatPercent(formatToken(issuerLtv?.ltv, {scale: 18}), 4) ?? '-'}</span>
                </div>
          </div>

          <div className='d-flex align-items-sm-center mb-4'>
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <div className='text-muted fw-bolder fs-6'>
                  Your Debts
                </div>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={debtAIcon} className='svg-icon svg-icon-1x' />
              </div>
              <span className='fs-6 fw-bolder my-2'>{formatToken(debtAAmount, {scale: debtADecimals, tokenName: debtASymbol}) ?? '-'}</span>
            </div>
          </div>

          <div className='d-flex align-items-sm-center mb-4'>
            <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
              <div className='flex-grow-1 me-2'>
                <div className='text-muted fw-bolder text-hover-primary fs-6'>
                        
                </div>
              </div>
              <div className='symbol symbol-50px me-2'>
                <KTSVG path={debtBIcon} className='svg-icon svg-icon-1x' />
              </div>
              <span className='fs-6 fw-bolder my-2'>{formatToken(debtBAmount, {scale: debtBDecimals, tokenName: debtBSymbol}) ?? '-'}</span>
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

        { walletConnectVisible &&
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

        { approveVisible &&
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

        { submitDisabledVisible &&
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

        { submitVisible &&
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