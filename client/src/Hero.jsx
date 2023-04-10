import React from "react";
import "./Hero.scss";

function Hero() {
  return (
    <div className="intro">
      <h1>FreeBits</h1>
      <p>
        The ECDSA Node Project Demo is a comprehensive example showcasing the
        implementation of Elliptic Curve Digital Signature Algorithm (ECDSA)
        using Node.js and the Ethereum cryptography library. This project
        demonstrates how to create, manage, and verify digital signatures in a
        simple, secure, and efficient manner.
      </p>
      <p>
        Instructions:
        <ol>Create two new wallets.</ol>
        <ol>Each address, will recieve 100 FreeBits.</ol>
        <ol>Send FreeBits from one wallet to the other.</ol>
      </p>
    </div>
  );
}

export default Hero;
