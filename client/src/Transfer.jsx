import { useState } from "react";
import server from "./server";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    if (sendAmount && recipient && privateKey && address) {
      try {
        const {
          data: { balance },
        } = await server.post(`send`, {
          sender: address,
          amount: parseInt(sendAmount),
          recipient,
          privateKey,
        });
        setBalance(balance);
        alert("Transfer successful.");
      } catch (ex) {
        alert(ex.response.data.message);
      }
    } else {
      alert("Please complete all fields.");
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="How much would you like to send?"
          value={sendAmount}
          onChange={setValue(setSendAmount)}
          required
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Enter the receipient address."
          value={recipient}
          onChange={setValue(setRecipient)}
          required
        ></input>
      </label>

      <input type="submit" className="button" value="transfer" />
    </form>
  );
}

export default Transfer;