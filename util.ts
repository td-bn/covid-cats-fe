import type { BigNumberish } from "@ethersproject/bignumber";
import { Contract, providers, utils as ethersUtils } from "ethers";
// import { Export } from "hardhat-deploy/types"; // Had to comment out this line or else got error in Vercel deployment
// "Type error: Cannot find module 'hardhat/types' or its corresponding type declarations."
import deployments from "./deployments/deployments.json";

interface ContractExport {
  address: string;
  abi: any[];
  linkedData?: any;
}

interface Export {
  chainId: string;
  name: string;
  contracts: {[name: string]: ContractExport};
}

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

const formatUnits = ethersUtils.formatUnits;

type MultiExport = {
  [chainId: string]: {[name: string]: Export};
};

const deploys: MultiExport = deployments;

const ETHERSCAN_PREFIXES = {
  1: "",
  3: "ropsten.",
  4: "rinkeby.",
  5: "goerli.",
  42: "kovan.",
};

const CHAIN_PREFIXES = {
  1: "",
  3: "ropsten",
  4: "rinkeby",
  5: "goerli",
  42: "kovan",
};

export function formatEtherscanLink(
  type: "Account" | "Transaction",
  data: [number, string]
) {
  switch (type) {
    case "Account": {
      const [chainId, address] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/address/${address}`;
    }
    case "Transaction": {
      const [chainId, hash] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${hash}`;
    }
  }
}

export const parseBalance = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);

export const getContract = (chainId: any, library: providers.Provider, address: any, contractName: string)  => {
  // Default to Rinkeby
  const chain = chainId ? chainId.toString() : '4';
  const name = CHAIN_PREFIXES[chain];
  const contract = deploys[chain][name].contracts[contractName];
  return new Contract(contract.address, contract.abi, library);
}