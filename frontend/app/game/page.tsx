'use client'
import { useState } from "react";
// import { Transaction } from "../types/transaction";


export interface Transaction {
    id: number;
    fee: number;
    size: number;
    priority: string;
  }

  
export default function Game() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, fee: 5, size: 200, priority: "High" },
    { id: 2, fee: 3, size: 150, priority: "Medium" },
    { id: 3, fee: 2, size: 100, priority: "Low" },
  ]);
  const [block, setBlock] = useState<Transaction[]>([]);

  const addToBlock = (transaction: Transaction) => {
    setBlock([...block, transaction]);
    setTransactions(transactions.filter((t) => t.id !== transaction.id));
  };

  const submitBlock = () => {
    alert("Block submitted!");
    setBlock([]);
  };

  return (
    <div className="h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-4">Transaction Tycoon: Game</h1>
      <div className="flex justify-between gap-8">
        <div className="w-1/2 bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Transaction Queue</h2>
          {transactions.map((t) => (
            <div
              key={t.id}
              className="bg-blue-100 p-2 mb-2 rounded-lg shadow cursor-pointer"
              onClick={() => addToBlock(t)}
            >
              <p>Fee: {t.fee} MNT</p>
              <p>Size: {t.size} bytes</p>
              <p>Priority: {t.priority}</p>
            </div>
          ))}
        </div>
        <div className="w-1/2 bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Current Block</h2>
          {block.map((t, index) => (
            <div key={index} className="bg-green-100 p-2 mb-2 rounded-lg shadow">
              <p>Fee: {t.fee} MNT</p>
              <p>Size: {t.size} bytes</p>
              <p>Priority: {t.priority}</p>
            </div>
          ))}
          <button
            onClick={submitBlock}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Submit Block
          </button>
        </div>
      </div>
    </div>
  );
}
