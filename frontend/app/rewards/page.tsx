'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Score from '../components/Score';
import Image from 'next/image';

const Rewards = () => {
  // const [userWallet, setUserWallet] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [nftClaimed, setNftClaimed] = useState<boolean>(false);
  const [showNftImage, setShowNftImage] = useState<boolean>(false);
  /* eslint-enable @typescript-eslint/no-explicit-any */
  const [claimedNfts, setClaimedNfts] = useState<any[]>([]);
  /* eslint-enable @typescript-eslint/no-explicit-any */
  const [claiming, setClaiming] = useState<boolean>(false);

  useEffect(() => {
    const storedScore = localStorage.getItem('gameScore');
    const storedClaimedNfts = localStorage.getItem('claimedNfts');
    if (storedScore) {
      setScore(Number(storedScore));
    }
    if (storedClaimedNfts) {
      setClaimedNfts(JSON.parse(storedClaimedNfts));
    }
  }, []);

  const handleClaimNFT = async () => {
    if (score >= 500) {
      setClaiming(true); // Start claiming process

      setTimeout(() => {
        // Deduct score
        const updatedScore = score - 500;
        setScore(updatedScore);
        localStorage.setItem('gameScore', String(updatedScore));

        // Simulate claimed NFT
        const claimedNFT = {
          id: Date.now(),
          image: '/5pp.png',
          claimedAt: new Date().toLocaleString(),
        };

        const newClaimedNfts = [...claimedNfts, claimedNFT];
        setClaimedNfts(newClaimedNfts);
        localStorage.setItem('claimedNfts', JSON.stringify(newClaimedNfts));

        // Update states
        setNftClaimed(true);
        setShowNftImage(true);
        setClaiming(false);

        // Show success alert
        alert('Successfully claimed!');
      }, 5000); // Simulates a delay of 5 seconds
    } else {
      alert('Not enough points to claim NFT.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white p-4"
      style={{
        background: 'linear-gradient(45deg, #ff0000, #000, #ff0000, #000, #ff0000)',  // Retro gradient background
        fontFamily: "'Press Start 2P', cursive, sans-serif", // Retro Mario-style font
      }}
    >
  <h1 className="text-4xl font-bold mb-6 text-center  text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">
    Claim Rewards
  </h1>

      <div>
        <div className="text-center mb-6">
          <Score />
        </div>

        <div className="w-full max-w-md bg-black bg-opacity-70 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-yellow-300">Claim Your NFT</h2>
          {!nftClaimed && score >= 1000 && (
            <p className="text-lg font-semibold text-green-500">You have {score} points! Claim your NFT now!</p>
          )}
          {!nftClaimed && score >= 500 && score < 1000 && (
            <p className="text-lg font-semibold text-yellow-500">You have {score} points! Claim your first NFT now!</p>
          )}
          {!nftClaimed && score < 500 && (
            <p className="text-lg font-semibold text-red-500">You need at least 500 points to claim an NFT. Keep playing!</p>
          )}

          <div className="mt-4 flex justify-center">
            <button
              className={`bg-gradient-to-r from-yellow-500 to-red-500 text-white py-2 px-4 rounded shadow-lg transition-transform transform hover:scale-95 ${
                claiming ? 'cursor-not-allowed opacity-50' : 'hover:bg-gradient-to-r hover:from-yellow-400 hover:to-red-400'
              }`}
              onClick={handleClaimNFT}
              disabled={score < 500 || nftClaimed || claiming}
            >
              {claiming ? 'Claiming...' : nftClaimed ? 'Claimed' : 'Claim NFT'}
            </button>
          </div>

          {showNftImage && (
            <div className="mt-6 text-center">
              <Image
                src="/5pp.png"
                alt="Claimed NFT"
                className="w-32 h-32 mx-auto rounded-full"
                width={300}
                height={300}
              />
              <p className="mt-4 text-green-500 font-semibold">NFT Claimed!</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center mt-6">
          <p className="m-4 text-center underline decoration-yellow-500 decoration-2">
            <Link href="/">Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
