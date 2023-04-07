import React, { useState } from "react";
import server from "./server";

function Generate() {
  const [keys, setKeys] = useState([]);

  async function generateKeys(evt) {
    evt.preventDefault();
    const { data: newKeys } = await server.get(`generate`);
    setKeys(newKeys);
  }

  let generatedKeys = null;
  if (Array.isArray(keys)) {
    generatedKeys = keys.map((keys, i) => {
      return (
        <li key={i} style={{ wordBreak: "break-all" }} className='keyList'>
          <h4 className="keys">Private Key #{i + 1}:</h4> <br /> {keys.privateKey} <br />
          <h4 className="keys">Public Key #{i + 1}:</h4> <br /> {keys.publicKey} <br />
          <h4 className="keys">Wallet Address #{i + 1}:</h4> <br /> {keys.address} <br />
        </li>
      );
    });
  }

  return (
    <div className="container wallet" style={{width: '45%'}}>
      <button className="button" onClick={generateKeys}>
        Generate Keys
      </button>
      <ul>
        {generatedKeys}
      </ul>
    </div>
  );
}

export default Generate;
