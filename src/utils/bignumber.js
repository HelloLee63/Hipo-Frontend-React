import BigNumber from 'bignumber.js';

BigNumber.ZERO = new BigNumber(0);
BigNumber.MAX_UINT_256 = new BigNumber(2).pow(256).minus(1);

BigNumber.from = (value) => {
  if (value === undefined || value === null) {
    return undefined;
  }

  const bnValue = new BigNumber(value);

  if (bnValue.isNaN()) {
    return undefined;
  }

  return bnValue;
};

BigNumber.parse = (value) => {
  return new BigNumber(value);
};

BigNumber.sumEach = (items, predicate) => {
  let sum = BigNumber.ZERO;

  for (let item of items) {
    const val = predicate?.(item);

    if (!val || val.isNaN()) {
      return undefined;
    }

    sum = sum.plus(val);
  }

  return sum;
};

BigNumber.prototype.scaleBy = function (decimals) {
  if (decimals === undefined) {
    return undefined;
  }

  return this.multipliedBy(10 ** decimals);
};

BigNumber.prototype.unscaleBy = function (decimals) {
  if (decimals === undefined) {
    return undefined;
  }

  return this.dividedBy(10 ** decimals);
};