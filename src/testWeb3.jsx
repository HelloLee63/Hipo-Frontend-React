import TokenIcon from "./components/token-icon";
import { InputAssetAmount } from "./modules/add-liquidity/components/steps/InputAssetAmount";
import TxStatus from "./modules/pledge/components/tx-status";
import { usePledge } from "./modules/pledge/providers/PledgeProvider"
import TestConnectWalletModal from "./testConnectWalletModal";
import { useProtocolData } from "./web3/components/providers/ProtocolDataProvider";


const TestWeb3 = props => {

    const { getCollateralsList, getCollateralConfigurationData, getIssuerLtv,getBondPrice, getReservesList} = usePledge()
    // const { reserves } = useProtocolData()

    // function handleGetReserves() {
    //     console.log(reserves);
    // }

    function handleFetch(){
      fetch('https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=0x3376B3f38B2F8DeAaA0FC71aeBc5A2845178d990&startblock=0&endblock=99999999&sort=asc&apikey=T66G8AXRHGVFJ1VWWPM39PDG59Y8V747E7')
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return (
        // <div>
        //   <button onClick={getCollateralsList}>getCollateralsList</button>
        //   <button onClick={getCollateralConfigurationData}>getCollateralConfigurationData</button>
        //   <button onClick={getBondPrice}>getBondPrice</button>
        //   <button onClick={getIssuerLtv}>getIssuerLtv</button>
        //   <button onClick={getReservesList}>getReservesList</button>
        //   {/* <button onClick={handleGetReserves}>getReservesList</button> */}
        //   <TokenIcon tokenName='ETH/USDC' tokenDesc='Uniswap V2' tokenIcon='media/tokens/eth-usdc.png'/>
        //   <TestConnectWalletModal />
        //   <TxStatus />

      <div className="container">
        <div className="row">
          <div className='col-3'>
            <div className="card">  
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>

          <div className='col-6'>
            <div className="card mb-5">  
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>

            <div className="card">  
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>

          <div className='col-3'>
            <div className="card">  
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>
        <div  onClick={handleFetch} className="btn btn-lg btn-primary">API</div>
      </div>
    )
}

export default TestWeb3