import React from "react";
import "./Hero.scss";

function Hero() {
  return (
    <div className="intro">
      <h1>FreeBits</h1>
      <p>
        The ECDSA Node Project Demo is a comprehensive demonstration of how to use the Ethereum cryptography library to implement the Elliptic Curve Digital Signature Algorithm (ECDSA) in Node.js. The project showcases a secure, efficient, and easy-to-understand approach to creating, managing, and verifying digital signatures.
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
