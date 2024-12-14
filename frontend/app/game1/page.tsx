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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">Transaction Queue</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Level 1</h2>

        <ul>
          {transactions.map((tx) => (
            <li key={tx.id} className="flex justify-between items-center bg-gray-100 p-3 mb-2 rounded-lg shadow-md">
              <span style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  Value: {getRandomNumber(1, 100)} - Fee: {getRandomNumber(1, 20)}
                </div>
                <div>
                  Time: {getRandomNumber(1, 7)}s - Extra Fee: {getRandomNumber(1, 10)}
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
        <div className="mt-4 flex justify-center">
          <p>Your Score: {score}</p>
        </div>
        {isGameEnded && (
          <div className="flex justify-center">
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={claimRewards} // Save the score when claiming rewards
            >
              {rewardSubmitted ? "Submitted" : "Submit to Claim Rewards"}
            </button>
            <button
              className="mt-4 ml-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={startNewGame} // Start a new game and carry over the score
            >
              Mine more Blocks
            </button>
          </div>
        )}
      </div>
      <p className="m-4 underline text-black decoration-blue-500 decoration-2">
        <Link href="/">Back to Home</Link>
      </p>
    </div>
  );
};

export default TransactionQueue;
