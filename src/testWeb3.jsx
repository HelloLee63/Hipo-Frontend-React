import TokenIcon from "./components/token-icon";
import { usePledge } from "./modules/pledge/providers/PledgeProvider"


const TestWeb3 = props => {

    const { getCollateralsList } = usePledge()
    console.log(getCollateralsList);

    return (
        <div>
            <button onClick={getCollateralsList}>getCollateralsList</button>
            <TokenIcon tokenName='ETH/USDC' tokenDesc='Uniswap V2' tokenIcon='media/tokens/eth-usdc.png'/>
        </div>

    )
}

export default TestWeb3