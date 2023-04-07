const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak");


function getPublicKey(message, signature, recoveryBit) {
  const msgHash = keccak256(utf8ToBytes(message));

  return secp.recoverPublicKey(msgHash, signature, recoveryBit);
};

module.exports = getPublicKey;