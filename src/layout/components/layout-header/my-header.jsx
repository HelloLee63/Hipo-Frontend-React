import m from './m.module.scss'
import cn from 'classnames'

const MyHeader = () => {
    return(
        <div className='page d-flex flex-row flex-column-fluid'>
            <div className={cn('menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch', m.menu)}>        
                Hellow everybody!
            </div>
        </div>
    )
}

export default MyHeader