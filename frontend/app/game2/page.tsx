'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const TransactionQueue = () => {
  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [transactions, setTransactions] = useState([
    { id: 1, value: 50, fee: 10, timeToProcess: 3, priority: 1, extrafee: 2 },
    { id: 2, value: 30, fee: 5, timeToProcess: 2, priority: 3, extrafee: 0 },
    { id: 3, value: 20, fee: 3, timeToProcess: 1, priority: 2, extrafee: 1 },
    { id: 4, value: 20, fee: 3, timeToProcess: 1, priority: 2, extrafee: 1 },
  ]);

  const [score, setScore] = useState(0);
  const [congestion, setCongestion] = useState(19);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [processedTransactions, setProcessedTransactions] = useState<number[]>([]); // Track processed transactions
  const [rewardSubmitted, setRewardSubmitted] = useState(false); // New state for reward submission status

  let time = 0;

  // Effect to load the score from localStorage when the component mounts
  useEffect(() => {
    const storedScore = localStorage.getItem('gameScore');
    if (storedScore) {
      setScore(Number(storedScore)); // Set the score from localStorage if it exists
    }
  }, []);

  // Function to process transactions
  const processTransaction = (id: number) => {
    const transaction = transactions.find(tx => tx.id === id);

    if (transaction) {
      // Calculate the reward based on the transaction's value, fee, and the current order
      const baseReward = transaction.value + transaction.fee - congestion * 2 + transaction.extrafee - time * transaction.fee;

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

      time = time + transaction.timeToProcess;
    }
  };

  // Handle end of game and claim rewards
  const claimRewards = () => {
    // Save the current score to localStorage
    localStorage.setItem('gameScore', String(score));

    console.log("Claiming rewards with score:", score);
    // Implement reward logic here (e.g., minting on the blockchain)

    // Change rewardSubmitted state to true after claiming rewards
    setRewardSubmitted(true);
  };

  // Handle starting a new game
  const startNewGame = () => {
    // Save the current score to localStorage before starting the new game
    localStorage.setItem('gameScore', String(score));

    // Reset the game state for the new round
    setTransactions([
      { id: 1, value: 50, fee: 10, timeToProcess: 3, priority: 1, extrafee: 2 },
      { id: 2, value: 30, fee: 5, timeToProcess: 2, priority: 3, extrafee: 0 },
      { id: 3, value: 20, fee: 3, timeToProcess: 1, priority: 2, extrafee: 1 },
    ]);
    setScore(prev => prev + Number(localStorage.getItem('gameScore') || 0)); // Add the previous score to the new game
    setCongestion(19);
    setIsGameEnded(false);
    setProcessedTransactions([]);
    time = 0;
    setRewardSubmitted(false); // Reset reward submission status for the new game
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center text-white p-4"
      style={{
        background: 'linear-gradient(45deg, #ff0000, #000, #ff0000, #000, #ff0000)',  // Retro gradient background
        fontFamily: "'Press Start 2P', cursive, sans-serif", // Retro Mario-style font
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white shadow-2xl">
        Transaction Queue ⛏️
      </h1>
      
      <div className="w-full max-w-md rounded-lg shadow-lg p-6 bg-black bg-opacity-70">
        <h2 className="text-2xl font-bold mb-4 text-center text-yellow-300">Level 2</h2>

        <ul>
          {transactions.map((tx) => (
            <li key={tx.id} className="flex justify-between items-center p-3 mb-2 rounded-lg shadow-md bg-gradient-to-r from-yellow-500 to-red-500 border-2 border-red-500">
              <span style={{ display: "flex", flexDirection: "column" }}>
                <div className="text-white">
                  Value: {getRandomNumber(1, 100)} 
                </div>
                <div className="text-white">
                  Fee: {getRandomNumber(1, 20)}
                </div>
                <div className="text-white">
                  Time: {getRandomNumber(1, 7)}s 
                </div>
                <div className="text-white">
                  XFee: {getRandomNumber(1, 10)}
                </div>
              </span>
              <button 
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-400 transition-transform transform hover:scale-95"
                onClick={() => processTransaction(tx.id)}
              >
                Process
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-center">
          <p className="text-white">Your Score: {score}</p>
        </div>
        {isGameEnded && (
          <div className="flex justify-center">
            <button
              className="mt-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white py-2 px-4 rounded hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-700 transition-transform transform hover:scale-95"
              onClick={claimRewards} // Save the score when claiming rewards
            >
              {rewardSubmitted ? "Submitted" : "Submit"}
            </button>
            <button
              className="mt-4 ml-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white py-2 px-4 rounded hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-700 transition-transform transform hover:scale-95"
              onClick={startNewGame} // Start a new game and carry over the score
            >
              Keep Mining
            </button>
          </div>
        )}
      </div>
      <p className="m-4 underline decoration-yellow-500 decoration-2">
        <Link href="/">Back to Home</Link>
      </p>
    </div>
  );
};

export default TransactionQueue;
