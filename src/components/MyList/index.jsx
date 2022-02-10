/* eslint-disable jsx-a11y/anchor-is-valid */

import { KTSVG } from '../../_metronic/helpers/components/KTSVG'
import { Dropdown } from '../dropdown'

const MyList = ({className, tokenIcon, tokenName, tokenDesc, collateralAmount, walletAmount, maxLtv, threshold}) => {
  return (
    <div className='card card-xl-stretch mb-xl-8'>
      {/* begin::Header */}
      <div className='card-header align-items-center border-0 mt-4'>
        <div className='d-flex align-items-center'>
          <div className='symbol symbol-3x me-5'>
            <KTSVG path={tokenIcon} className='svg-icon svg-icon-3x' />
          </div>
          <div className='d-flex justify-content-start flex-column'>
            <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
              { tokenName }
            </a>
            <span className='text-muted fw-bold text-muted d-block fs-7'>
              { tokenDesc } 
            </span>
          </div>
        </div>

        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          <Dropdown />
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      <div className='separator my-2'></div>
      {/* begin::Body */}
      <div className='card-body pt-3'>
        {/* begin::Item */}
        <div className='d-flex align-items-sm-center mb-7'>
          {/* begin::Title */}
          <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                Collateral Amount
              </a>
            </div>
            <span className='badge badge-light-success fs-8 fw-bolder my-2'>{collateralAmount ?? '-'}</span>
          </div>
          {/* end::Title */}
        </div>
        {/* end::Item */}
        {/* begin::Item */}
        <div className='d-flex align-items-sm-center mb-7'>
          {/* begin::Title */}
          <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                Wallet
              </a>
            </div>
            <span className='badge badge-light-warning fs-8 fw-bolder my-2'>{ walletAmount ?? '-'}</span>
          </div>
          {/* end::Title */}
        </div>
        {/* end::Item */}
        {/* begin::Item */}
        <div className='d-flex align-items-sm-center mb-7'>
          {/* begin::Title */}
          <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                Max Ltv
              </a>
            </div>
            <span className='badge badge-light-success fs-8 fw-bolder my-2'>{maxLtv ?? '-'}</span>
          </div>
          {/* end::Title */}
        </div>
        {/* end::Item */}
        {/* begin::Item */}
        <div className='d-flex align-items-sm-center'>
          
          {/* begin::Title */}
          <div className='d-flex flex-row-fluid flex-wrap align-items-center'>
            <div className='flex-grow-1 me-2'>
              <a href='#' className='text-gray-800 fw-bolder text-hover-primary fs-6'>
                Liquidation Threshold
              </a>
              
            </div>
            <span className='badge badge-light-danger fs-8 fw-bolder my-2'>{ threshold ?? '-' }</span>
          </div>
          {/* end::Title */}
        </div>
        {/* end::Item */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {MyList}