const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak");
const getSignature = require("./scripts/getSignature");
const getPubKey = require("./scripts/getPubKey");
const getMessage = require("./scripts/getMessage");
const generate = require("./scripts/generate");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x380d8a78ff6a4cbefa6661c14936562a9af2dc41": 100,
  "0x788467abe56dd46000964daec9256a3b92836b67": 50,
  "0x344e814e23fe5f00f4aed0bc02b6778620aa3a64": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get("/generate", (req, res) => {
  const keys = generate();
  balances[keys.address] = 100;
  res.send(keys);
});

app.post("/send", async (req, res) => {
  const { privateKey, sender, amount, recipient } = req.body;

  if (!secp.utils.isValidPrivateKey(privateKey)) {
    res.status(400).send({ message: "Invalid private key!" });
    return;
  }

  const message = getMessage(sender, amount, recipient);
  const [signature, recoveryBit] = await getSignature(message, privateKey);
  const publicKey = getPubKey(message, signature, recoveryBit);
  const recoveredAddress = keccak256(publicKey.slice(-20));

  if (`0x${toHex(recoveredAddress)}` === sender) {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
      return
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } else {
    res.status(400).send({ message: "Signature not verified. Please enter a valid private key." });
    return;
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}