const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  //public keys
  "04d1ad362119af46977f1c2562879ac80bf3e1492db26ccb94f3f0f8acaef4f1b03657048e2d1b18ad630514920b7d355f8ec2ce0c6d85ef070c73b23ccf101e85": 1000, //user1
  "04ab26d9cf29a9688a99d5c09f336b0f5e0cf6fc3dadda4c0f68028b7a182a2367f4965df58c28b57d475f78c04e146352f6645c5f0ff32f6349c6f697509ba9dd": 500, //user2
  "04dcd17d049a37e8a83dbdf1838915b8d10d0b960a4d9fbbb5c69c79cffaf73e4663bb04da1151495da80532c4a7aaa1a1fd34da0e6095e18e00326467901b7826": 750, //user3
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // get a signature from the client-side application
  // recover the public key from the signature

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
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
