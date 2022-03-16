/* eslint-disable jsx-a11y/anchor-is-valid */
import BigNumber from 'bignumber.js'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import TitleLable from '../../../../components/title-lable'
import TokenIcon from '../../../../components/token-icon'
import TransactionAssetDataItem from '../../../../components/transaction-data-item/TransactionAssetDataItem'
import TransactionDurationDataItem from '../../../../components/transaction-data-item/TransactionDurationDataItem'
import { formatDateTime } from '../../../../utils/date'
import { useWallet } from '../../../../wallets/walletProvider'
import { scaleBy } from '../../../../web3/utils'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useBondPool } from '../../../purchase/providers/bond-pool-provider'

const WithdrawInputAmount = ({ prevStep }) => {

  const walletCtx = useWallet()

  const { pool, setWithdrawAmount } = useBondPool()

  const [walletConnectVisible, setWalletConnectVisible] = useState(false)
  const [submitDisabledVisible, setSubmitDisabledVisible] = useState(false)
  const [submitVisible, setSubmitVisible] = useState(false)

  const decimals = pool.bondAsset.decimals

  const bondIcon = pool.icon
  const bondSymbol = pool.bondAsset.symbol
  const bondDurationDesc = pool.duration.description

  const balance = pool.bToken.contract.getBalanceOf(walletCtx.account)
  const bondData = pool.bToken.contract.getBondData(walletCtx.account)
    
  const withdrawFormik = useFormik({
    initialValues: {
      bondAmount: '',
    }
  })

  const inputAmount = new BigNumber(withdrawFormik.values.bondAmount)
  let value = new BigNumber(scaleBy(inputAmount, decimals))

  useEffect(() => {

    if (!walletCtx.account) {
      setWalletConnectVisible(() => true)
      setSubmitDisabledVisible(() => false)
      setSubmitVisible(() => false)
      return
    }

    if (walletCtx.account) {
      setWalletConnectVisible(() => false)

      if (value.eq(0) || value.isNaN()) {
        setSubmitDisabledVisible(() => true)
        setSubmitVisible(() => false)
        return
      }

      if (!balance) {
        setSubmitDisabledVisible(() => true)
        setSubmitVisible(() => false)
        return
      }

      if(balance) {
        if (value.gt(0) && value.gt(new BigNumber(balance))) {
        
          setSubmitDisabledVisible(() => true)
          setSubmitVisible(() => false)
          return
        }
  
        if (value.gt(0) && value.lte(new BigNumber(balance))) {     
          setSubmitDisabledVisible(() => false)
          setSubmitVisible(() => true)
          return
        }
      }      
    }

  }, [walletCtx.account, value, balance])

  function handleSubmit() {
    setWithdrawAmount(() => inputAmount)
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
            value={withdrawFormik.values.bondAmount}
            style={{ fontSize: 58, fontFamily: 'Montserrat Semi Bold', color: '#003EFF'}}
            autoComplete='off'
            onChange={e => {
              e.preventDefault();
              const { value } = e.target;              
              const regex =  /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)|(\s[^\f\n\r\t\v])*$/;
              if (regex.test(value)) {
                withdrawFormik.setFieldValue('bondAmount', value);
              }
            }}
          />
        </div>
      </div>

      <div className='card mb-2'>
        <div className='card-body'>

          <TransactionAssetDataItem
            title='You Bonds Amount'
            tokenIcon={pool.icon}
            balance={balance}
            decimals={pool.bToken.decimals}           
          />

          <TransactionDurationDataItem 
            title='Purchased At'
            duration={formatDateTime (bondData ? bondData[2] * 1_000: undefined ) ?? '-'}
          />

          <TransactionDurationDataItem 
            title='Matured At'
            duration={formatDateTime (bondData ? (bondData[2] + 300) * 1_000: undefined ) ?? '-'}
          />
          {/* Number(pool.duration.duration) */}

          <TransactionDurationDataItem
            title='Bond Duration'
            duration={pool.duration.description ?? '-'}
          />

          <div className='separator my-4'></div>

          <TransactionAssetDataItem
            title='Your Principal'
            tokenIcon={pool.bondAsset.icon}
            balance={bondData ? bondData[1] : undefined}
            decimals={pool.bondAsset.decimals}           
          />

          <TransactionAssetDataItem
            title='Fixed Income'
            tokenIcon={pool.bondAsset.icon}
            balance={bondData ? (new BigNumber(bondData[0]).minus(new BigNumber(bondData[1]))) : undefined}
            decimals={pool.bondAsset.decimals}           
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

export {WithdrawInputAmount}