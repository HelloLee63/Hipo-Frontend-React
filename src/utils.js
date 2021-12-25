import add from "date-fns/add";
import formatDuration from "date-fns/formatDuration";
import intervalToDuration from "date-fns/intervalToDuration";
import { isAddress } from "web3-utils";

const env = process.env.REACT_APP_ENV;

export const isDevelopmentMode = env === 'development';
export const isProductionMode = env === 'production';
