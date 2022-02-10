/* eslint-disable jsx-a11y/anchor-is-valid */

const StatisticsWidget = ({
  className,
  color,
  title,
  description,
}) => {
  return (
    <a href='#' className={`card bg-${color} ${className}`}>
      {/* begin::Body */}
      <div className='card-body'>
        <div className={`fw-bold text-inverse-${color} fs-7`}>{description}</div>
        <div className={`text-inverse-${color} fw-bolder fs-2 mb-2 mt-5`}>{title}</div>        
      </div>
      {/* end::Body */}
    </a>
  )
}

export {StatisticsWidget}