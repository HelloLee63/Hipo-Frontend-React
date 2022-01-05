const TokenIcon = ({tokenName, tokenDesc, tokenIcon}) => {
  return (
    <div className='d-flex flex-row'>
      <div className="me-3">
        <img src={tokenIcon} alt='' />
      </div>

      <div className="d-flex flex-column mt-0">
        <p className="text-gray-800 fs-5 fw-bolder mb-0">{tokenName}</p>
        <p className="text-gray-400 fs-8 fw-bolder">{tokenDesc}</p>
      </div>
    </div>
  )
}

export default TokenIcon