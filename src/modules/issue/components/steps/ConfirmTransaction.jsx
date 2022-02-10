/* eslint-disable jsx-a11y/anchor-is-valid */
import TokenIcon from '../../../../components/token-icon'
import { useWallet } from '../../../../wallets/walletProvider'
import { formatToken } from '../../../../web3/utils'
import { KTSVG } from '../../../../_metronic/helpers/components/KTSVG'
import { useDebtPool } from '../../providers/debt-pool-provider'

const ConfirmTransaction = ({ prevStep }) => {
  const debtPoolCtx = useDebtPool()
  const activePool = debtPoolCtx.debtPool
  const tokenName = activePool.debtAsset.symbol
  const tokenIcon = activePool.debtAsset.icon
  const tokenDesc = activePool.debtAsset.desc
  const walletCtx = useWallet()
  const decimals = activePool.debtAsset.contract.decimals
  const walletBalance = activePool.debtAsset.contract.balances?.get(walletCtx.account)
 
  return (
    <div className='w-100'>
      <div>
        <div className='card mb-2'>
          <div className='card-body pt-3 pb-3'>
            <TokenIcon 
            tokenName={tokenName} 
            tokenIcon={tokenIcon}
            tokenDesc={tokenDesc} 
            />
          </div>
        </div>

        <div className='card mb-2'>
          <div className='card-body p-0'>
            
          </div>
        </div>
      </div>

      <div className='pb-10 pb-lg-15'>
        
        

        {/* begin::Title */}
        <div className='d-flex align-items-sm-center mb-7'>          
          <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                Wallet
              </a>
            </div>
            <div className='symbol symbol-50px me-2'>
              <KTSVG path={activePool.debtAsset.icon} className='svg-icon svg-icon-2x' />
            </div>
            <span className='badge badge-light-success fs-6 fw-bolder my-2'>{formatToken(walletBalance, {scale: decimals, tokenName: activePool.debtAsset.symbol})}</span>
          </div>
        </div>
        {/* end::Title */}

        <div className='d-flex flex-stack pt-10'>
          <div className='mr-2'>
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
        </div>
      </div>
    </div>   
  )
}

export {ConfirmTransaction}