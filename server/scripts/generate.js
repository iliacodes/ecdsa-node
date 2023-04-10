const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const generate = function() {
  // generates a private key
    const privateKey = secp.utils.randomPrivateKey();

    // generates a public key with private key
    const publicKey = secp.getPublicKey(privateKey);

    // keccak hashed public key
    const remainingKey = publicKey.slice(1);
    const publicKeyHash = (keccak256(remainingKey)).slice(-20);
    const address = `0x${toHex(publicKeyHash)}`;

    console.log("privateKey: ", toHex(privateKey), "publicKey: ", toHex(publicKey), "address: ", address);

    return {
        privateKey,
        publicKey,
        address
    }
}

module.exports = generate;
