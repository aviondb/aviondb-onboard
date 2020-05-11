import AccessControllers from "orbit-db-access-controllers";
import BlocknativeAccessController from "../AccessController/BlocknativeAccessController";
import Onboard from "bnc-onboard";
import Web3 from "web3";
var collection, web3;

export const onboard = Onboard({
  dappId: "32dedbdd-255e-4e93-a66f-7e558c24893a", // [String] The API key created by step one above
  networkId: 4, // [Integer] The Ethereum network ID your Dapp uses.
  subscriptions: {
    wallet: (wallet) => {
      web3 = new Web3(wallet.provider);
    },
  },
});

AccessControllers.addAccessController({
  AccessController: BlocknativeAccessController,
});

export const getAvionDBCollection = async () => {
  if (!collection) {
    const ipfs = await window.Ipfs.create();
    const aviondb = await window.AvionDB.init(
      "database-test",
      ipfs,
      {
        accessController: {
          type: "blocknative-access-controller",
          onboard: onboard,
        },
      },
      { AccessControllers: AccessControllers }
    );
    collection = await aviondb.initCollection(
      "collection-test" /* ,
      {},
      {
        accessController: {
          type: "blocknative-access-controller",
          onboard: onboard,
        },
        AccessControllers: AccessControllers,
      } */
    );
    return collection;
  } else {
    return collection;
  }
};
