import { Link } from "react-router-dom"

const TransactionLink = props => {

  const { name, transaction } = props

  return (
    <div className="d-flex pb-5 justify-content-end">
      <Link to={transaction}>
        <div type='button' className="d-flex btn btn-primary">
          {name}
        </div>
      </Link>  
    </div>
  )
}

export default TransactionLink