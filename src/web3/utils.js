import BigNumber from "bignumber.js";

export function getExponentValue(decimals = 0) {
    return new BigNumber(10).pow(decimals);
  }
  
  export function getHumanValue(value, decimals = 0) {
    return value?.div(getExponentValue(decimals));
  }
  
  export function getNonHumanValue(value, decimals = 0) {
    return new BigNumber(value).multipliedBy(getExponentValue(decimals));
  }
  
  export function getGasValue(price) {
    return getNonHumanValue(price, 9).toNumber();
  }