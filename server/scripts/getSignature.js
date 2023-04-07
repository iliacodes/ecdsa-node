const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak");


function getSignature(message, privateKey) {
  const msgHash = keccak256(utf8ToBytes(message));

  return secp.sign(msgHash, privateKey, { recovered: true });
};

module.exports = getSignature;