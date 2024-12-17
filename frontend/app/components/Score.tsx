'use client';
import { useEffect, useState } from 'react';

const Score = () => {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    // Fetch the score from localStorage
    const storedScore = localStorage.getItem('gameScore');
    if (storedScore) {
      setScore(Number(storedScore));
    }
  }, []);

  return (

      
    <div className=" flex items-center justify-center">
    <div className="text text-white font-bold mb-2 text-center">
      Your Score: {score !== null ? score : '0'} pts
    </div>
  </div>
  

  );
};

export default Score;
