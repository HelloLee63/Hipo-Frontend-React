const TransactionDurationDataItem = props => {
  
  const { title, duration } = props

  return (
    <div className='d-flex pb-7 justify-content-between align-items-center'>
      <div className="fs-6 align-self-center" style={{fontFamily: 'Montserrat-Regular', color: '#666666'}}>
        {title}
      </div>

      <div className="d-flex justify-content-between symbol symbol-50px">
        <span className="align-self-center fw-bolder fs-6" style={{fontFamily: 'Montserrat Semi Bold', color: '#333333'}}>
          { duration }
        </span>
      </div>
    </div>
  )
}

export default TransactionDurationDataItem