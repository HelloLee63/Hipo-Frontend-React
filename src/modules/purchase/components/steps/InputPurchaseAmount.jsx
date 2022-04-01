/* eslint-disable jsx-a11y/anchor-is-valid */
import { useFormik} from 'formik'
import TokenIcon from '../../../../components/token-icon'
import { useWallet } from '../../../../wallets/walletProvider'
import { useProtocolData } from '../../../../web3/components/providers/ProtocolDataProvider'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useBondPool } from '../../providers/bond-pool-provider'
import { useEffect, useState } from 'react'
import { useConfig } from '../../../../components/providers/configProvider'
import { calAPY, formatToken, scaleBy } from '../../../../web3/utils'
import BigNumber from 'bignumber.js'
import TitleLable from '../../../../components/title-lable'
import TransactionAssetDataItem from '../../../../components/transaction-data-item/TransactionAssetDataItem'
import TransactionLtvDataItem from '../../../../components/transaction-data-item/TransactionLtvDataItem'

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

  const decimals = activePool.bondAsset.decimals
  
  const bondPrice = formatToken(protocolData.getBondPrice(activePool.bondAsset.address, activePool.duration.duration), {scale: 18})
  const formik = useFormik({
    initialValues: {
      bondAssetAmount: '',
    }
  })

  const inputAssetAmount = new BigNumber(formik.values.bondAssetAmount)
  const value = new BigNumber(scaleBy(inputAssetAmount, decimals))
  const oneBigNumber = new BigNumber(scaleBy(1, decimals))
  const price = new BigNumber(scaleBy(bondPrice, decimals))

  const interest = oneBigNumber.minus(new BigNumber(price)).multipliedBy(inputAssetAmount)

  const depositedAmount = new BigNumber(price).multipliedBy(inputAssetAmount)

  function handleSubmit() {
    bondPoolCtx.setPurchaseAmount(() => inputAssetAmount)
  }

  async function handleApprove() {

    if(walletCtx.account) {
      
      setEnabling(true)

      try {
        await bondPoolCtx.pool.bondAsset.contract.approve(config.contracts.financingPool.financingPool, true)
      } catch(e) {
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
      <TitleLable title='Input Amount' />
      <div className='card mb-2'>
        <div className='card-body pt-3 pb-3'>
          <TokenIcon 
            tokenName={`${activePool.bondAsset.symbol} Bond`}
            tokenDesc={activePool.duration.description}
            tokenIcon={activePool.icon}
          />
        </div>
      </div>

      <div className='card mb-2'>
        <div className='card-body pt-5 pb-5'>
          <input
            id='purchaseAmount'
            type='text'
            className='p-0 form-control form-control-lg fw-bolder bg-white border-0 text-primary align-center'
            placeholder='0.0'
            name='bondAssetAmount'
            value={formik.values.bondAssetAmount}
            autoComplete='off'              
            style={{ fontSize: 58, fontFamily: 'Montserrat Semi Bold', color: '#003EFF'}}
            onChange={e => {
              e.preventDefault();
              const { value } = e.target;              
              const regex =  /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)|(\s[^\f\n\r\t\v])*$/;
              if (regex.test(value)) {
                formik.setFieldValue('bondAssetAmount', value);
              }
            }}
          />
        </div>
      </div>
      
      <div className='card mb-2'>
        <div className='card-body'>
          <TransactionAssetDataItem 
            title='You Will Deposit'
            tokenIcon={activePool.bondAsset.icon}
            balance={depositedAmount}
            decimals={activePool.bondAsset.decimals}          
          />

          <TransactionAssetDataItem 
            title='You Will Get Interest'
            tokenIcon={activePool.bondAsset.icon}
            balance={interest}
            decimals={activePool.bondAsset.decimals}          
          />

          <div className='separator my-4'></div>

          <TransactionAssetDataItem 
            title='Bond Price'
            balance={bondPrice}
            decimals={0}
          />

          <TransactionLtvDataItem 
            title='Interest (APY)'
            balance={calAPY(price, decimals, Number(activePool.duration.duration))}
            decimals={0}
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

export {InputPurchaseAmount}