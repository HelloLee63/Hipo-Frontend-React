import { Formik } from "formik"



const PledgeWizards = () => {

  return (
    <div className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'>
      <div className='d-flex justify-content-center bg-white rounded justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9'>
        <div className='px-6 px-lg-10 px-xxl-15 py-20'>
          <div className='stepper-nav'>
            <div className='stepper-item current' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>1</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Account Type</h3>

                <div className='stepper-desc fw-bold'>Setup Your Addcount Details</div>
              </div>
      
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>2</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Account Type</h3>

                <div className='stepper-desc fw-bold'>Setup Your Addcount Details</div>
              </div>
      
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>3</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Account Type</h3>

                <div className='stepper-desc fw-bold'>Setup Your Addcount Details</div>
              </div>
      
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>4</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Account Type</h3>

                <div className='stepper-desc fw-bold'>Setup Your Addcount Details</div>
              </div>    
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex flex-row-fluid flex-center bg-white rounded'>
        <Formik></Formik> 
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </div>
      <div>3</div>

    </div>
  )
}

export default PledgeWizards