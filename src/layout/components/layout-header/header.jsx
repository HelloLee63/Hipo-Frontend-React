import NetworkAction from "./networkAction"
import DefaultTitle from "./page-title/DefaultTile"
import WalletAction from "./walletAction"

const Header = () => {
    return (
        <div className="d-flex flex-row justify-content-between">                            
            <div>
                <DefaultTitle />                
            </div>
            <div>
                <NetworkAction />                
            </div>
            <div>
                <WalletAction />
            </div>                           
        </div>
    )
}

export default Header