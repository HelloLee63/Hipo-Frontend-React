import { Link } from "react-router-dom"
import { useLayout } from '../../core'
import s from './s.module.scss'
import cn from "classnames"
import AsideMenu from "./AsideMenu"


const AsideDefault = () => {
    const {config, classes} = useLayout()

    // return (
    //     <div className={cn("aside", s.asideImg)}>
    //         {/* begin::Brand */}
    //         <div className={ s.logo }>
    //             <Link to='#'>
    //                 <img 
    //                     alt='logo'
    //                     className="h-40px logo"
    //                     src='../../../media/logos/logo.svg'
    //                 />
    //             </Link>
    //         </div>
    //         <div className='aside-menu flex-column-fluid'>
    //             <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
    //         </div>
    //     </div>
    // )
    return (
        <div className="d-flex flex-column">
            {/* begin::Brand */}
            <div className={ s.logo }>
                <Link to='#'>
                    <img 
                        alt='logo'
                        className="h-40px logo"
                        src='../../../media/logos/logo.svg'
                    />
                </Link>
            </div>
            <div>
                <AsideMenu />
            </div>
        </div>
    )
}

export default AsideDefault
