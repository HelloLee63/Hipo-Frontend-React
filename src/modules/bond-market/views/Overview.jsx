import { StatisticsWidget } from "../../../components/statistics/StatisticsWidget"

const Overview = () => {
  return (
    <>
        <div className='row g-5 g-xl-8'>
          <div className='col-xl-3'>
            <StatisticsWidget
              className='card-xl-stretch mb-xl-8'
              svgIcon='/media/icons/duotune/general/gen032.svg'
              color='white'
              iconColor='primary'
              title='500M$'
              description='SAP UI Progress'
            />
          </div>

          <div className='col-xl-3'>
            <StatisticsWidget
              className='card-xl-stretch mb-xl-8'
              svgIcon='/media/icons/duotune/ecommerce/ecm008.svg'
              color='dark'
              iconColor='white'
              title='+3000'
              description='New Customers'
            />
          </div>

          <div className='col-xl-3'>
            <StatisticsWidget
              className='card-xl-stretch mb-xl-8'
              svgIcon='/media/icons/duotune/finance/fin006.svg'
              color='warning'
              iconColor='white'
              title='$50,000'
              description='Milestone Reached'
            />
          </div>

          <div className='col-xl-3'>
            <StatisticsWidget
              className='card-xl-stretch mb-5 mb-xl-8'
              svgIcon='/media/icons/duotune/graphs/gra007.svg'
              color='info'
              iconColor='white'
              title='$50,000'
              description='Milestone Reached'
            />
          </div>
        </div>
        {/* end::Row */}
    </>    
  )
}

export default Overview