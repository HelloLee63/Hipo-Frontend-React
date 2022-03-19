/* eslint-disable jsx-a11y/anchor-is-valid */
import BigNumber from 'bignumber.js'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useConfig } from '../../../components/providers/configProvider'
import TitleLable from '../../../components/title-lable'
import TokenIcon from '../../../components/token-icon'
import TransactionAssetDataItem from '../../../components/transaction-data-item/TransactionAssetDataItem'
import TransactionCollateralDataItem from '../../../components/transaction-data-item/TransactionCollateralDataItem'
import TransactionDurationDataItem from '../../../components/transaction-data-item/TransactionDurationDataItem'
import TransactionLtvDataItem from '../../../components/transaction-data-item/TransactionLtvDataItem'
import { formatDateTime } from '../../../utils/date'
import { useWallet } from '../../../wallets/walletProvider'
import { useWalletData } from '../../../web3/components/providers/WalletDataProvider'
import { scaleBy } from '../../../web3/utils'
import { KTSVG } from '../../../_metronic/helpers/components/KTSVG'
import { useDebtPool } from '../../issue/providers/debt-pool-provider'

const RepayInputAmount = ({ prevStep }) => {

  const walletCtx = useWallet()
  const config = useConfig()
  const { bondPool, collateral, setRepayAmount } = useDebtPool()
  console.log(collateral);
  console.log(bondPool);

  const walletData = useWalletData()

  const [walletConnectVisible, setWalletConnectVisible] = useState(false)
  const [approveVisible, setApproveVisible] = useState(false)
  const [submitDisabledVisible, setSubmitDisabledVisible] = useState(false)
  const [submitVisible, setSubmitVisible] = useState(false)
  const [isEnabling, setEnabling] = useState(false)

  const walletBalance = bondPool.bondAsset.contract.balances?.get(walletCtx.account)
  const allowance = bondPool.bondAsset.contract.allowances?.get(config.contracts.financingPool.financingPool)

  const debtBalance = bondPool.dToken.contract.getBalanceOf(walletCtx.account)
  const debtData = bondPool.dToken.contract.getDebtData(walletCtx.account)
  const delay = 180

  const decimals = bondPool.bondAsset.decimals

  const bondIcon = bondPool?.icon
  const bondSymbol = bondPool.bondAsset.symbol
  const bondDurationDesc = bondPool.duration.description  

  const repayIssuerLtv = walletData.getIssuerLtv(collateral.collateralAsset.address)
  console.log(collateral.collateralAsset);
  const repayCollateralAmount = walletCtx.account ? collateral.contract?.balances?.get(walletCtx.account) : undefined

  const repayFormik = useFormik({
    initialValues: {
      debtAmount: '',
    }
  })

  const inputAmount = new BigNumber(repayFormik.values.debtAmount)
  let value = new BigNumber(scaleBy(inputAmount, decimals))


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

        if (value.gt(debtBalance)) {
          setSubmitDisabledVisible(() => true)
          setSubmitVisible(() => false)
          return
        }

        if (value.lte(walletBalance) && value.lte(debtBalance)) {
          setSubmitVisible(() => true)
          setSubmitDisabledVisible(() => false)
          return
        }
      }
    }

  }, [walletCtx.account, value, walletBalance, debtBalance, allowance])

  function handleSubmit() {
    setRepayAmount(() => inputAmount)
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
            value={repayFormik.values.debtAssetAmount}
            style={{ fontSize: 58, fontFamily: 'Montserrat Semi Bold', color: '#003EFF'}}
            autoComplete='off'
            onChange={e => {
              e.preventDefault();
              const { value } = e.target;              
              const regex =  /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)|(\s[^\f\n\r\t\v])*$/;
              if (regex.test(value)) {
                repayFormik.setFieldValue('debtAmount', value);
              }
            }}
          />
        </div>
      </div>

      <div className='card mb-2'>
        <div className='card-body'>

          <TransactionAssetDataItem
            title='You Debt Amount'
            tokenIcon={bondPool.bondAsset.icon}
            balance={debtBalance}
            decimals={decimals}           
          />

          <TransactionDurationDataItem 
            title='Purchased At'
            duration={formatDateTime(debtData ? debtData[0] * 1_000 : undefined ) ?? '-'}
          />

          <TransactionDurationDataItem 
            title='Matured At'
            duration={formatDateTime(debtData ? (debtData[0] * 1_000 + Number(bondPool.duration.duration) * 1_000) : undefined ) ?? '-'}
          />

          <TransactionDurationDataItem 
            title='Deadline'
            duration={formatDateTime(debtData ? (debtData[0] * 1_000 + Number(bondPool.duration.duration) * 1_000 + delay * 1_000) : undefined ) ?? '-'}
          />

          <div className='separator my-4'></div>

          <TransactionCollateralDataItem 
            title='Collaterals'
            tokenIcon={collateral.collateralAsset.icon}
            balance={repayCollateralAmount}
            decimals={18}
          />

          <TransactionLtvDataItem 
            title='Your Collateral LTV'
            balance={repayIssuerLtv?.ltv}
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

export {RepayInputAmount}