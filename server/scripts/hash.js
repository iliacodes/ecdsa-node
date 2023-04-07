const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes);

    console.log(toHex(hash));

    return hash;
}

module.exports = hashMessage;