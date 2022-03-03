/* eslint-disable jsx-a11y/anchor-is-valid */

import BigNumber from 'bignumber.js'
import { Field, useFormik} from 'formik'
import { useEffect, useState } from 'react'
import { useConfig } from '../../../../components/providers/configProvider'
import { useKnownTokens } from '../../../../components/providers/knownTokensProvider'
import TitleLable from '../../../../components/title-lable'
import CollateralToken from '../../../../components/token-icon/CollateralToken'
import TransactionAssetDataItem from '../../../../components/transaction-data-item/TransactionAssetDataItem'
import TransactionCollateralDataItem from '../../../../components/transaction-data-item/TransactionCollateralDataItem'
import TransactionLtvDataItem from '../../../../components/transaction-data-item/TransactionLtvDataItem'
import { useWallet } from '../../../../wallets/walletProvider'
import { useWalletData } from '../../../../web3/components/providers/WalletDataProvider'
import { scaleBy } from '../../../../web3/utils'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useColPool } from '../../providers/colPool-provider'

const InputAmount = ({ prevStep }) => {

  const { colPool, tokenSymbol, tokenName, tokenIcon, setPledgeAmount } = useColPool()
  const collateralAddress = colPool.collateralAsset.address
  const { getTokenByAddress } = useKnownTokens()

  const config = useConfig()
  const wallet = useWallet()
  const walletBalance = colPool.collateralAsset.contract.balances?.get(wallet.account)
  const pledgedBalance = colPool.contract.balances?.get(wallet.account)

  const allowance = colPool.collateralAsset.contract.allowances?.get(config.contracts.financingPool.financingPool)

  const assetDecimals = colPool.collateralAsset.decimals
  const colDecimals = colPool.collateralAsset.decimals

  const walletData = useWalletData()
  const issuerLtv = walletData.getIssuerLtv(collateralAddress)
  const issuerTotalDebt = walletData.getIssuerTotalDebts(collateralAddress)

  const debtAAddress = issuerTotalDebt?.debtAAddress
  const debtBAddress = issuerTotalDebt?.debtBAddress
  const debtAAmount = issuerTotalDebt?.debtAAmount
  const debtBAmount = issuerTotalDebt?.debtBAmount

  const debtAToken = getTokenByAddress(debtAAddress?.toLowerCase())
  const debtAIcon = debtAToken?.icon
  const debtADecimals = debtAToken?.decimals

  const debtBToken = getTokenByAddress(debtBAddress?.toLowerCase())
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
      <TitleLable title='Input Amount' />      
      <div className="card mb-2">
        <div className="card-body pt-3 pb-3">
          <CollateralToken 
            tokenIcon={ tokenIcon } 
            tokenSymbol={ tokenSymbol } 
            tokenName={ tokenName }/>
        </div>
      </div>

      <div className="card mb-2">
        <div className="card-body pt-5 pb-5">
          <Field
            id='amount'
            type='text'
            className='p-0 form-control form-control-lg  fw-bolder bg-white border-0 text-primary align-center'
            placeholder='0.0'
            name='collateralAssetAmount'
            value={assetAmount.values.collateralAssetAmount}
            style={{ fontSize: 58 }}
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

          <TransactionCollateralDataItem 
            title='Your Pledged'
            tokenIcon={tokenIcon}
            decimals={colDecimals}
            balance={pledgedBalance}
          />

          <TransactionLtvDataItem 
            title='Your Collateral LTV'
            balance={issuerLtv?.ltv}
            decimals={18}
          />

          <TransactionAssetDataItem
            title='Your Debts'
            tokenIcon={debtAIcon}
            decimals={debtADecimals}
            balance={debtAAmount}  
          />

          <TransactionAssetDataItem
            title=''
            tokenIcon={debtBIcon}
            decimals={debtBDecimals}
            balance={debtBAmount}  
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