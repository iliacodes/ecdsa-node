import React, { useState } from "react";
import server from "./server";
import { toHex } from "ethereum-cryptography/utils";

function Generate() {
  const [keys, setKeys] = useState({});
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showPublicKey, setShowPublicKey] = useState(false);

  async function generateKeys(evt) {
    evt.preventDefault();
    const { data: newKeys } = await server.get(`generate`);
    console.log(newKeys); // This is the object of keys
    setKeys({
      ...newKeys,
      privateKey: new Uint8Array(Object.values(newKeys.privateKey)),
      publicKey: new Uint8Array(Object.values(newKeys.publicKey)),
    });
  }

  function togglePrivateKey() {
    setShowPrivateKey(!showPrivateKey);
  }

  function togglePublicKey() {
    setShowPublicKey(!showPublicKey);
  }

  function formatPublicKey(key) {
    if (!showPublicKey) {
      return `${toHex(key.slice(0, 6))}********${toHex(
        key.slice(key.length - 6, key.length)
      )}`;
    }
    return toHex(key);
  }

  return (
    <div className="container wallet" style={{ width: "45%" }}>
      <button className="button" onClick={generateKeys}>
        Generate Keys
      </button>
      {Object.keys(keys).length > 0 && (
        <div className="keys-container">
          <div className="wallet">
            <h4>Address: {keys.address}</h4>
            <div className="key">
              <h4>
                Public Key:{" "}
                <span className="key-text">
                  {formatPublicKey(keys.publicKey)}
                </span>
                <button onClick={togglePublicKey}>
                  {showPublicKey ? "Hide" : "Show"}
                </button>
              </h4>
            </div>
            <div className="key">
              <h4>
                Private Key:{" "}
                <span className="key-text">
                  {showPrivateKey ? toHex(keys.privateKey) : "********"}
                </span>
                <button onClick={togglePrivateKey}>
                  {showPrivateKey ? "Hide" : "Show"}
                </button>
              </h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Generate;
