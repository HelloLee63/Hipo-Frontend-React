import { useWeb3 } from "../../providers/web3Provider"
import ExternalLink from "../external-link"

const ExplorerAddressLink = props => {
  const { children, address, query = '', ...rest } = props

  const { getEtherscanAddressUrl } = useWeb3()

  if (!address) {
    return <>{children}</>
  }

  return (
    <ExternalLink href={`${getEtherscanAddressUrl(address)}${query}`} {...rest}>
      {children}
    </ExternalLink>
  )
}

export default ExplorerAddressLink