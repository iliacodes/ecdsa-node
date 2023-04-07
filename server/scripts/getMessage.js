function txMessage(sender, amount, recipient) {

  return JSON.stringify({
    sender,
    amount,
    recipient,
  });
};

module.exports = txMessage;