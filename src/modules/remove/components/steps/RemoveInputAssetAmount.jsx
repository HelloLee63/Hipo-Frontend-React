/* eslint-disable jsx-a11y/anchor-is-valid */
import BigNumber from 'bignumber.js'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useConfig } from '../../../../components/providers/configProvider'
import TitleLable from '../../../../components/title-lable'
import TokenIcon from '../../../../components/token-icon'
import TransactionAssetDataItem from '../../../../components/transaction-data-item/TransactionAssetDataItem'
import { useWallet } from '../../../../wallets/walletProvider'
import { useProtocolData } from '../../../../web3/components/providers/ProtocolDataProvider'
import { scaleBy } from '../../../../web3/utils'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useLiquidityPool } from '../../../add-liquidity/providers/liquidity-pool-provider'

const RemoveInputAssetAmount = ({ prevStep }) => {

  const walletCtx = useWallet()
  const config = useConfig()

  const { pool, setAddAmount } = useLiquidityPool()
  const { getBondPrice } =useProtocolData()

  const walletBalance = pool.bondAsset.contract.balances?.get(walletCtx.account)

  const decimals = pool.bondAsset.decimals
  const allowance = pool.bondAsset.contract.allowances?.get(config.contracts.financingPool.financingPool)

  const bondPrice = getBondPrice(pool.bondAsset.address, pool.duration.duration)

  const [walletConnectVisible, setWalletConnectVisible] = useState(false)
  const [approveVisible, setApproveVisible] = useState(false)
  const [submitDisabledVisible, setSubmitDisabledVisible] = useState(false)
  const [submitVisible, setSubmitVisible] = useState(false)
  const [isEnabling, setEnabling] = useState(false)
  
  const addLiquidityFormik = useFormik({
    initialValues: {
      assetAmount: '',
    }
  })

  const inputAssetAmount = new BigNumber(addLiquidityFormik.values.assetAmount)
  let value = new BigNumber(scaleBy(inputAssetAmount, decimals))
  const oneBigNumber = new BigNumber(scaleBy(1, decimals))

  const reservePool = oneBigNumber.minus(new BigNumber(bondPrice)).multipliedBy(inputAssetAmount)

  const interestPool = new BigNumber(bondPrice).multipliedBy(inputAssetAmount)

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
    setAddAmount(() => inputAssetAmount)
  }

  async function handleApprove() {

    if(walletCtx.account) {
      
      setEnabling(() => true)

      try {
        await pool.bondAsset.contract.approve(config.contracts.financingPool.financingPool, true)
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
            tokenName={`${pool.bondAsset.symbol} Bond Pool`} 
            tokenDesc={pool.duration.description} 
            tokenIcon={pool.icon} 
          />
        </div>
      </div>

      <div className='card mb-2'>
        <div className='card-body pt-5 pb-5'>
          <input
            id='addLiquidityAmount'
            type='text'
            className='p-0 form-control form-control-lg form-control-solid fw-bolder bg-white border-0 text-primary align-center'
            placeholder='0.0'
            name='assetAmount'
            value={addLiquidityFormik.values.assetAmount}
            style={{ fontSize: 58 }}
            autoComplete='off'
            onChange={e => {
              e.preventDefault();
              const { value } = e.target;              
              const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
              if (regex.test(value)) {
                addLiquidityFormik.setFieldValue('assetAmount', value);
              }
            }}
          />
        </div>
      </div>

      <div className='card mb-2'>
        <div className='card-body'>
          <TransactionAssetDataItem
            title='Add Asset Amount'
            tokenIcon={pool.bondAsset.icon}
            balance={inputAssetAmount}
            decimals={0}
          />

          <div className='separator my-4'></div>

          <TransactionAssetDataItem
            title='Add To Interest Pool'
            tokenIcon={pool.bondAsset.icon}
            balance={interestPool}
            decimals={pool.bondAsset.decimals}
          />

          <TransactionAssetDataItem
            title='Add To Reserve Pool'
            tokenIcon={pool.bondAsset.icon}
            balance={reservePool}
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

export {RemoveInputAssetAmount}