
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useConfig } from "../../../../components/providers/configProvider";
import { useReload } from "../../../../hooks/useReload";
import { InvariantContext } from "../../../../utils/context";
import { useWallet } from "../../../../wallets/walletProvider";
import { useContract } from "../../../../web3/components/contractManagerProvider";
import { useProtocolData } from "../../../../web3/components/providers/ProtocolDataProvider";
import BondContract from "../../contracts/BondContract";
import { useBondPools } from "../bond-pools-provider";

function useBondContract(address) {
  return useContract(address, () => {
    return new BondContract(address)
  })
}

const Context = createContext(InvariantContext('BondPoolProvider'))

export function useBondPool() {
  return useContext(Context)
}

const BondPoolProvider = props => {

  const { children } = props
  const wallet = useWallet()
  const [reload] = useReload()
  const bondPoolsCtx = useBondPools()
  const protocolData = useProtocolData()
  const config = useConfig()
  const [approveVisible, setApproveVisible] = useState(false)

  const [bondAssetSymbol, setSymbol] = useState(bondPoolsCtx.BondAssets[0].symbol)
  const [duration, setDuration] = useState(bondPoolsCtx.BondDurations[0].duration)
  const [purchaseAmount, setPurchaseAmount] = useState(0)

  const bondAsset = useMemo(() => {
    return bondPoolsCtx.getBondAssetBySymbol(bondAssetSymbol)
  }, [bondAssetSymbol])

  const bondPool = useMemo(() => {
    return bondPoolsCtx.getBondPool(bondAssetSymbol, duration)
  }, [bondAssetSymbol, duration])

  useEffect(() => {
    if(wallet.account) {
      bondPool.bondAsset.contract.loadBalance().then(reload).catch(Error)
    }
  }, [bondPool, wallet.account])

  useEffect(() => {
    if(wallet.account) {
      bondPool.contract.loadBalance().then(reload).catch(Error)
    }
  }, [bondPool, wallet.account])

  useEffect(() => {
    if(wallet.account) {
      bondPool.bondAsset.contract.loadAllowance(config.contracts.financingPool.financingPool).then(reload).catch(Error)
    }
  }, [bondPool, wallet.account])

  // useEffect(() => {    
  //     const bondDuration = Number(bondPool.duration)
  //     protocolData.protocolDataContract.loadBondPrice(bondPool.bondAsset.address, bondDuration, config.contracts.hipoV1AMMfactory).catch(Error)
  //   }, [bondPool])
  
  const value = {
    bondPool,
    bondAssetSymbol,
    setSymbol,
    duration,
    setDuration,
    bondAsset,
    approveVisible, 
    setApproveVisible,
    purchaseAmount, 
    setPurchaseAmount
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  ) 
}

export default BondPoolProvider