import { Link } from "react-router-dom"


const BondNavTab = props => {

  const {title1, className1, className2, title2} = props

  return (
    <ul className="nav nav-pills">
      <Link to='/bonds'>
        <li className="nav-item">
          <span className={`nav-link ${className1}`} aria-current="page">{title1}</span>
        </li>
      </Link>
      <Link to='/debts'>
        <li className="nav-item">
          <span className={`nav-link ${className2}`} >{title2}</span>
        </li>
      </Link>
    </ul>
  )
}

export {BondNavTab}