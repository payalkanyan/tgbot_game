'use client'
import { useState } from "react";

export default function Rewards() {
  const [connected, setConnected] = useState(false);

  const connectWallet = () => {
    setConnected(true);
    alert("Wallet connected! Rewards can now be claimed.");
  };

  return (
    <div className="h-screen bg-yellow-100 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold mb-4">Claim Your Rewards</h1>
      {!connected ? (
        <button
          onClick={connectWallet}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Connect Wallet
        </button>
      ) : (
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md">
          Claim Rewards
        </button>
      )}
    </div>
  );
}
