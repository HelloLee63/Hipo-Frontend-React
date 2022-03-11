/* eslint-disable jsx-a11y/anchor-is-valid */

const StatisticsWidget = ({
  className,
  color,
  title,
  description,
}) => {
  return (
    <div className={`card bg-${color} ${className}`}>
      <div className='card-body'>
        <div className={`fw-bold fs-6`} style={{ fontFamily: 'pt sans caption', color: '#96AFFF' }}>{description}</div>
        <div className={`fs-2 mb-2 mt-5`} style={{fontFamily: 'Montserrat Semi Bold', color: '#333333', fontWeight: 900}} >{title}</div>        
      </div>
    </div>
  )
}

export {StatisticsWidget}