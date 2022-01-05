import React, { useMemo } from 'react'
import { useContext } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import { RinkebyHttpsWeb3Provider, useWeb3 } from '../../../components/providers/web3Provider'
import { useWallet } from '../../../wallets/walletProvider'
import { useContractManager } from '../../../web3/components/contractManagerProvider'
import CollateralsListContract from '../contracts/CollateralsListContract'



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
  // const { getToken } = useTokens()

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
    console.log(RinkebyHttpsWeb3Provider);

    console.log(await pool.getCollateralsList(poolAddress)); 
  }

  const value = {getCollateralsList}

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )


}

export default PledgeProvider