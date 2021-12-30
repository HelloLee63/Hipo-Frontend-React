import DefaultTitle from "../layout-header/page-title/DefaultTile"
import { useLayout } from "../../core"
import clsx from 'clsx'

const Toolbar1 = () => {
    const {classes} = useLayout()

    return (
        <div className='toolbar' id='kt_toolbar'>
            {/* begin::Container */}
            <div
                id='kt_toolbar_container'
                className={ clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
            >
                <DefaultTitle />
                
            </div>            
        </div>
    )
}

export default Toolbar1