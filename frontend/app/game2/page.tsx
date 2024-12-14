'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const TransactionQueue = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, value: 50, fee: 10, timeToProcess: 3, priority: 1, extrafee:2 },
    { id: 2, value: 30, fee: 5, timeToProcess: 2, priority: 3, extrafee: 0 },
    { id: 3, value: 20, fee: 3, timeToProcess: 1, priority: 2, extrafee: 1 },
    { id: 4, value: 20, fee: 3, timeToProcess: 1, priority: 2, extrafee: 1 },
    { id: 5, value: 20, fee: 3, timeToProcess: 1, priority: 2, extrafee: 1 },
  ]);

  const [score, setScore] = useState(0);
  const [congestion, setCongestion] = useState(0);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [processedTransactions, setProcessedTransactions] = useState<number[]>([]); // Track processed transactions

  // Function to process transactions
  const processTransaction = (id: number) => {
    const transaction = transactions.find(tx => tx.id === id);

    if (transaction) {
      // Calculate the reward based on the transaction's value, fee, and the current order
      const baseReward = transaction.value + transaction.fee - congestion * 2;

      // Apply bonuses or penalties based on the order of transaction processing
      let orderBonusOrPenalty = 0;
      const transactionIndex = processedTransactions.length;

      // Fix the logic to correctly compare the priorities of the current and previous transaction
      if (transactionIndex === 0) {
        orderBonusOrPenalty = 10; // First processed transaction gets a bonus
      } else {
        const previousTransactionId = processedTransactions[transactionIndex - 1];
        const previousTransaction = transactions.find(tx => tx.id === previousTransactionId);
        
        if (previousTransaction && transaction.priority < previousTransaction.priority) {
          orderBonusOrPenalty = -5; // Penalize if the transaction is processed out of optimal order
        }
      }

      const reward = baseReward + orderBonusOrPenalty;

      setScore(prev => prev + reward); // Add reward to score

      // Update congestion after transaction
      setCongestion(prev => Math.max(0, prev - transaction.priority));

      // Mark the transaction as processed
      setProcessedTransactions(prev => [...prev, transaction.id]);

      // Remove the processed transaction from the queue
      setTransactions(prev => prev.filter(tx => tx.id !== id));

      // If all transactions are processed, end the game
      if (transactions.length === 1) {
        setIsGameEnded(true);
      }
    }
  };

  // Handle end of game and claim rewards
  const claimRewards = () => {
    console.log("Claiming rewards with score:", score);
    // Implement reward logic here (e.g., minting on the blockchain)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 text-white p-4">
      
      <h1 className="text-4xl font-bold mb-6">Transaction Queue</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 text-black">
        <h2 className="text-2xl font-bold mb-4">Level 2</h2>
        <ul>
          {transactions.map((tx) => (
            <li key={tx.id} className="flex justify-between items-center bg-gray-100 p-3 mb-2 rounded-lg shadow-md">
              <span style={{ display: "flex", flexDirection: "column" }}>
              <div>
                Value: {tx.value} - Fee: {tx.fee}
              </div>
              <div>
                Time: {tx.timeToProcess}s - Extra Fee: {tx.extrafee}
              </div>
            </span>
              <button 
                className="bg-green-500 text-white py-1 px-3 rounded"
                onClick={() => processTransaction(tx.id)}
              >
                Process
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <p>Your Score: {score}</p>

        </div>

      </div>
          <p className="m-4 underline decoration-blue-500 decoration-2">
      <Link href="/">Back to Home</Link>
      </p>
      {isGameEnded && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Game Over!</h2>
          <p>Your Final Score: {score}</p>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={claimRewards}
          >
            Submit to Claim Rewards
          </button>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={claimRewards}
          >
            Mine new block
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionQueue;
