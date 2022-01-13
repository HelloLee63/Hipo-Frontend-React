import React, { useMemo } from 'react'
import { useContext } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import { RinkebyHttpsWeb3Provider, useWeb3 } from '../../../components/providers/web3Provider'
import { useWallet } from '../../../wallets/walletProvider'
import { useContractManager } from '../../../web3/components/contractManagerProvider'
import CollateralConfigurationDataContract from '../contracts/CollateralConfigurationDataContract'
import CollateralsListContract from '../contracts/CollateralsListContract'
import BondPriceContract from '../../bond-market/contracts/BondPriceContract'
import IssuerLtvContract from '../contracts/IssuerLtvContract'
import { useTokens } from '../../../components/providers/tokensProvider'

const Context = React.createContext('PledgeProvider')

export function usePledge() {
  return useContext(Context)
}



const PledgeProvider = props => {
  const { children } = props

  const history = useNavigate()
  const location = useLocation()
  const wallet = useWallet()
  const { getEtherscanTxUrl } = useWeb3()
  const { getContract } = useContractManager()
  const { getToken } = useTokens()



  const [market, token] = useMemo(() => {
    const urlQuery = new URLSearchParams(location.search)

    let marketStr = urlQuery.get('m') ?? undefined

    if (marketStr) {
      marketStr = decodeURIComponent(marketStr)
    }

    let tokenStr = urlQuery.get('t') ?? undefined

    if (tokenStr) {
      tokenStr = decodeURIComponent(tokenStr)
    }

    return [marketStr, tokenStr]
  }, [location.search])

  async function getCollateralsList () {
    const poolAddress = '0x3376B3f38B2F8DeAaA0FC71aeBc5A2845178d990'

    const pool = new CollateralsListContract(poolAddress)

    pool.setCallProvider(RinkebyHttpsWeb3Provider)
    await pool.getCollateralsList() 
  }

  async function getCollateralConfigurationData() {
    const hipoDataProviderAddress = '0x869715D590f0a400BC4839B3516347408D55f669'

    const hipoDataProvider = new CollateralConfigurationDataContract(hipoDataProviderAddress)

    hipoDataProvider.setCallProvider(RinkebyHttpsWeb3Provider)
    await hipoDataProvider.loadCollateralConfigurationData('0x5A1fcDa636294fc4DFdbe4B732488D7d4DA75099')
  }

  async function getIssuerLtv() {
    const walletDataPrividerAddress = '0xd4257Aad8D7FE85E213fe44525092fdB6c9121fD'
    const walletDataProvider = new IssuerLtvContract(walletDataPrividerAddress)

    walletDataProvider.setCallProvider(RinkebyHttpsWeb3Provider)
    await walletDataProvider.loadIssuerLtv(
      '0x8B1Cd879Ca6250cd15F98653c950C25beDD6D8a9',
      '0x81b94766463E059a4196081f88DBBF7e7c945726'
    )
  }

  async function getBondPrice() {
    const hipoDataProviderAddress = '0x869715D590f0a400BC4839B3516347408D55f669'
    const hipoDataProvider = new BondPriceContract(hipoDataProviderAddress)

    hipoDataProvider.setCallProvider(RinkebyHttpsWeb3Provider)
    await hipoDataProvider.loadBondPrice(
      '0x232bB0bBf8274342fB044FF40e716bf887fb9214',
      300,
      '0xCc4f21c5FB18330Ba23B0541c2A0ba7b9f4ef353'
    )
  }

  const value = {
    getCollateralsList,
    getCollateralConfigurationData,
    getIssuerLtv,
    getBondPrice
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )


}

export default PledgeProvider