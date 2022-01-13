import { Formik } from "formik"
import { useRef } from "react"


const IssueWizards = () => {

  const stepperRef = useRef(null)

  return (
    <div ref={stepperRef} className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid" id='hipo_issue_bond_stepper'>
      <div className="d-flex justify-content-center bg-white rounded justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9">
        <div className='px-6 px-lg-10 px-xxl-15 py-20'>          
          <div className="stepper-nav">
            {/* step 1 start: */}
            <div className='stepper-item current' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>1</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Select Collateral</h3>
                <div className='stepper-desc fw-bold'>Select Collateral Asset</div>
              </div>      
            </div>
            {/* step 1 end */}

            {/* step 2 start: */}
            <div className='stepper-item current' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>2</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Select Asset</h3>
                <div className='stepper-desc fw-bold'>Select Asset</div>
              </div>      
            </div>
            {/* step 2 end */}

            {/* step 3 start: */}
            <div className='stepper-item current' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>3</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Select Duration</h3>
                <div className='stepper-desc fw-bold'>Select Duration</div>
              </div>      
            </div>
            {/* step 3 end */}

          </div>
        </div>        
      </div>

      <div className="d-flex flex-column flex-row-fluid flex-center bg-white rounded">
        <Formik>
          <div className="current" data-kt-stepper-element='content'>
            
          </div>
        </Formik>
      </div>
    </div>
  )
}

export default IssueWizards