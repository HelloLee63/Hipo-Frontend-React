

const RedeemView = () => {
  
  return (
    <div ref={stepperRef} className='stepper stepper-pills stepper-column' id='kt_create_account_stepper'>
      <div className="row">
        <div className="col-3">
          <div className="card">
            <div className="card-body">
              <div className='stepper-nav'>
                <div className='stepper-item current' data-kt-stepper-element='nav'>
                  <div className='stepper-line w-20px'></div>
                  <div className='stepper-icon w-20px h-20px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>1</span>
                  </div>

                  <div className='stepper-label d-flex align-content-center'>
                    <h6 className='stepper-title'>Select Collateral</h6>
                    {/* <div className='stepper-desc fw-bold'>Select Collateral Asset</div> */}
                  </div>      
                </div>

                <div className='stepper-item' data-kt-stepper-element='nav'>
                  <div className='stepper-line w-20px'></div>
                  <div className='stepper-icon w-20px h-20px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>2</span>
                  </div>

                  <div className='stepper-label d-flex align-content-center'>
                    <h6 className='stepper-title'>Input Amount</h6>
                    {/* <div className='stepper-desc fw-bold'>Input Amount</div> */}
                  </div>      
                </div>

                <div className='stepper-item' data-kt-stepper-element='nav'>
                  <div className='stepper-line w-20px'></div>
                  <div className='stepper-icon w-20px h-20px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>3</span>
                  </div>

                  <div className='stepper-label'>
                    <h6 className='stepper-title'>Confirm Transaciton</h6>
                    {/* <div className='stepper-desc fw-bold'>Confirm Your Transaciton</div> */}
                  </div>      
                </div>

                <div className='stepper-item' data-kt-stepper-element='nav'>
                  <div className='stepper-line w-20px'></div>
                  <div className='stepper-icon w-20px h-20px'>
                    <i className='stepper-check fas fa-check'></i>
                    <span className='stepper-number'>4</span>
                  </div>

                  <div className='stepper-label'>
                    <h6 className='stepper-title'>Complete</h6>
                    {/* <div className='stepper-desc fw-bold'>Completed</div> */}
                  </div>      
                </div>
              </div>
            </div>
          </div>            
        </div>
      </div>
    </div>
  )
}