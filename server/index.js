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
  "0xe5a013288b65555e047e546af9e8fcddea3b87ca": 100,
  "0x7d168963e7d51a1a06756972a74055ea7b81abd8": 50,
  "0x730dfed9618801acd14039e012990ca47671ce08": 75,
};

//private Keys
const privateKeys = {
  "eb8c973850127a81dd5e26f32faccd27c2e3d9379f38874789a7ff7b6c405b9c": true,
  "262c5a95a7e4ff046dc8641a35b3f374cdd8437163da22a3e27affebfdc27c46": true,
  "57fe6d808516112ff7ebe5d476c1218d0d4a8a778250d5fb897ef2025221ea6e": true,
}

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
    res.status(400).send({ message: "Invalid private key." });
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
      res.status(400).send({ message: "Not enough funds for transfer." });
      return
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } else {
    res.status(400).send({ message: "Signature not verified. Please enter a corresponding private key." });
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