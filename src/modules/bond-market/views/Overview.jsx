import { StatisticsWidget } from "../../../components/statistics/StatisticsWidget"

const Overview = () => {
  return (
    <>
        <div className='row g-5 g-xl-8'>
          <div className='col-xl-3'>
            <StatisticsWidget
              className='card-xl-stretch mb-xl-8'
              color='white'
              iconColor='primary'
              title='$3,895,254,378.87'
              description='Total Value Locked'
            />
          </div>

          <div className='col-xl-3'>
            <StatisticsWidget
              className='card-xl-stretch mb-xl-8'
              color='white'
              iconColor='white'
              title='-'
              description='Hipo Price'
            />
          </div>

          <div className='col-xl-3'>
            <StatisticsWidget
              className='card-xl-stretch mb-xl-8'
              color='white'
              iconColor='white'
              title='-'
              description='Hipo Rewards'
            />
          </div>

          <div className='col-xl-3'>
            <StatisticsWidget
              className='card-xl-stretch mb-5 mb-xl-8'
              color='white'
              iconColor='white'
              title='-'
              description='Time Left'
            />
          </div>
        </div>
        {/* end::Row */}
    </>    
  )
}

export default Overview