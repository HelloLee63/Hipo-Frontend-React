/* eslint-disable jsx-a11y/anchor-is-valid */
import BigNumber from 'bignumber.js'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useConfig } from '../../../../components/providers/configProvider'
import TitleLable from '../../../../components/title-lable'
import TokenIcon from '../../../../components/token-icon'
import TransactionAssetDataItem from '../../../../components/transaction-data-item/TransactionAssetDataItem'
import TransactionCollateralDataItem from '../../../../components/transaction-data-item/TransactionCollateralDataItem'
import TransactionLtvDataItem from '../../../../components/transaction-data-item/TransactionLtvDataItem'
import { useWallet } from '../../../../wallets/walletProvider'
import { useProtocolData } from '../../../../web3/components/providers/ProtocolDataProvider'
import { useWalletData } from '../../../../web3/components/providers/WalletDataProvider'
import { calAPY, scaleBy } from '../../../../web3/utils'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useDebtPool } from '../../providers/debt-pool-provider'


const InputDebtAssetAmount = ({ prevStep }) => {

  const walletCtx = useWallet()
  const config = useConfig()
  const { bondPool, collateral, setIssueAmount } = useDebtPool()

  const protocolData = useProtocolData()
  const walletData = useWalletData()

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

  const issuerLtv = walletData.getIssuerLtv(collateral.collateralAsset.address)
  
  const issueFormik = useFormik({
    initialValues: {
      debtAssetAmount: '',
    }
  })

  const inputAmount = new BigNumber(issueFormik.values.debtAssetAmount)
  let value = new BigNumber(scaleBy(inputAmount, decimals))
  const oneBigNumber = new BigNumber(scaleBy(1, decimals))

  const interestPayment = oneBigNumber.minus(new BigNumber(price)).multipliedBy(inputAmount)

  const borrowedAmount = new BigNumber(price).multipliedBy(inputAmount).minus(interestPayment)

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
      <TitleLable title='Input Amount' />
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
        <div className='card-body pt-5 pb-5'>
          <input
            id='amount'
            type='text'
            className='p-0 form-control form-control-lg form-control-solid fw-bolder bg-white border-0 text-primary align-center'
            placeholder='0.0'
            name='debtAssetAmount'
            value={issueFormik.values.debtAssetAmount}
            style={{ fontSize: 58, fontFamily: 'Montserrat Semi Bold', color: '#003EFF'}}
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

          <TransactionAssetDataItem
            title='You will borrow'
            tokenIcon={bondPool.bondAsset.icon}
            balance={borrowedAmount}
            decimals={decimals}           
          />

          <TransactionAssetDataItem
            title='Interest Payment'
            tokenIcon={bondPool.bondAsset.icon}
            balance={interestPayment}
            decimals={decimals}           
          />

          <div className='separator my-4'></div>

          <TransactionAssetDataItem
            title='Bond Price'
            tokenIcon={bondPool.bondAsset.icon}
            balance={price}
            decimals={18}           
          />

          <TransactionLtvDataItem 
            title='Interest(APR)'
            balance={calAPY(price, decimals, Number(bondPool.duration.duration))}
            decimals={0}
          />

          <div className='separator my-4'></div>

          <TransactionCollateralDataItem 
            title='Collaterals'
            tokenIcon={collateral.collateralAsset.icon}
            balance={collateralAmount}
            decimals={18}
          />

          <TransactionLtvDataItem 
            title='Your Collateral LTV'
            balance={issuerLtv?.ltv}
            decimals={18}
          />
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