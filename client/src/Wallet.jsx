import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  async function onPrivateKey(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input
          placeholder="Enter the sender address"
          value={address}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>

      <br />

      <label>
          Private Key
          <input
            placeholder="Enter the pivate key"
            value={privateKey}
            onChange={onPrivateKey}
            type="password"
            required
          ></input>
        </label>
    </div>
  );
}

export default Wallet;