"use strict";

const EventEmitter = require("events").EventEmitter;
const io = require("orbit-db-io");
/**
 * Interface for OrbitDB Access Controllers
 *
 * Any OrbitDB access controller needs to define and implement
 * the methods defined by the interface here.
 */
class BlocknativeAccessController extends EventEmitter {
  constructor(ipfs, options) {
    super();
    this.onboard = options.onboard;
    this._ipfs = ipfs;
  }

  /*
        Every AC needs to have a 'Factory' method
        that creates an instance of the AccessController
      */
  static async create(orbitdb, options) {
    if (!options.onboard) {
      throw new Error("you need to pass a onboard Object");
    }
    return new BlocknativeAccessController(orbitdb._ipfs, options);
  }

  /* Return the type for this controller */
  static get type() {
    return "blocknative-access-controller";
  }

  /*
        Return the type for this controller
        NOTE! This is the only property of the interface that
        shouldn't be overridden in the inherited Access Controller
      */
  get type() {
    return this.constructor.type;
  }

  /* Each Access Controller has some address to anchor to */
  //get address() {}

  /*
        Called by the databases (the log) to see if entry should
        be allowed in the database. Return true if the entry is allowed,
        false is not allowed
      */
  async canAppend(entry, identityProvider) {
    if (this.onboard.getState().address) {
      const verifiedIdentity = await identityProvider.verifyIdentity(
        entry.identity
      );
      // Allow access if identity verifies
      return Promise.resolve(verifiedIdentity);
    } else {
      // No user is signed in.
      return Promise.resolve(false);
    }
  }

  /* Add and remove access */
  async grant(access, identity) {}
  async revoke(access, identity) {}

  /* AC creation and loading */
  async load(address) {
    if (address) {
      try {
        if (address.indexOf("/ipfs") === 0) {
          address = address.split("/")[2];
        }
        // const access = await io.read(this._ipfs, address);
        // this.firebaseConfig = access.firebaseConfig;
      } catch (e) {
        console.log("BlocknativeAccessController.load ERROR:", e);
      }
    }
  }
  /* Returns AC manifest parameters object */
  async save() {
    let cid;
    try {
      cid = await io.write(this._ipfs, "dag-cbor", {});
    } catch (e) {
      console.log("BlocknativeAccessController.save ERROR:", e);
    }
    // return the manifest data
    return { address: cid };
  }
  /* Called when the database for this AC gets closed */
  //async close() {}
}

export default BlocknativeAccessController;
