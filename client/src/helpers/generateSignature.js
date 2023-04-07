import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

export default async function generateSignature(amount, recipient, privateKey) {
  const uintArray = Uint8Array.from([amount, recipient]);
  const hash = toHex(uintArray);

  const [signature, recovery] = await secp.sign(
    hash,
    privateKey,
    { recovered: true }
  );

  const signatureHex = toHex(signature);

  const recoveryBit = recovery;

  return { signatureHex, recoveryBit };
}
