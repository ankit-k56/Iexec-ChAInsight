import { IExecOracleFactory, utils } from "@iexec/iexec-oracle-factory-wrapper";
import "dotenv/config";

// get web3 provider from a private key
const signer = utils.getSignerFromPrivateKey(
  "https://bellecour.iex.ec",
  process.env.PRIVATE_KEY
);
export const factory = new IExecOracleFactory(signer);
