import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import Generate from "./Generate";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Generate />
      <div style={{ width: "45%" }}>
        <Wallet
          balance={balance}
          setBalance={setBalance}
          address={address}
          setAddress={setAddress}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
        />
        <Transfer
          setBalance={setBalance}
          address={address}
          privateKey={privateKey}
        />
      </div>
    </div>
  );
}

export default App;