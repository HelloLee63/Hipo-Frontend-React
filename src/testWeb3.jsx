import TokenIcon from "./components/token-icon";
import TxStatus from "./modules/pledge/components/tx-status";
import { usePledge } from "./modules/pledge/providers/PledgeProvider"
import TestConnectWalletModal from "./testConnectWalletModal";


const TestWeb3 = props => {

    const { getCollateralsList, getCollateralConfigurationData, getIssuerLtv,getBondPrice } = usePledge()
    console.log(getCollateralsList);

    return (
        <div>
            <button onClick={getCollateralsList}>getCollateralsList</button>
            <button onClick={getCollateralConfigurationData}>getCollateralConfigurationData</button>
            <button onClick={getBondPrice}>getBondPrice</button>
            <button onClick={getIssuerLtv}>getIssuerLtv</button>
            <TokenIcon tokenName='ETH/USDC' tokenDesc='Uniswap V2' tokenIcon='media/tokens/eth-usdc.png'/>
            <TestConnectWalletModal />
            <TxStatus />
        </div>
    )
}

export default TestWeb3