'use client'
import { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import Link from 'next/link';
import DisplayUsername from './components/displayUserName';
import Score from "./components/Score";
import Image from 'next/image';

const MainPage = () => {
  const [userWallet, setUserWallet] = useState<string | null>(null);

  const registerUser = async (walletAddress: string) => {
    await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet: walletAddress }),
    });
  };

  const handleWalletConnect = (walletAddress: string) => {
    setUserWallet(walletAddress);
    registerUser(walletAddress);
  };

  return (
    <div
    className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
    style={{ backgroundImage: 'url(/bg2.jpg)' }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay */}
    <div className="relative z-10">
      <h1 className="text-5xl font-extrabold mb-8 mt-0 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Mantler Mind Mining
      </h1>

      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        {!userWallet && (
          <WalletConnect onConnect={handleWalletConnect} />
        )}

        {userWallet && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-purple-500">
              <Image
                src="/5pp.png"
                alt="avatar"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p className="text-lg font-medium text-gray-300">
              {userWallet.slice(0, 6)}...{userWallet.slice(-4)}
            </p>
          </div>
        )}

        <Score />

        <Link href="/game1">
            <p className="w-full p-4 bg-purple-900 text-white text-center py-3 rounded-lg shadow-lg border-b-2 border-r-2 border-white transition-transform transform hover:bg-purple-800 hover:scale-95">
              Play Game
            </p>
          </Link>
          <Link href="/leaderboard">
            <p className="w-full p-4 bg-purple-900 text-white text-center py-3 rounded-lg shadow-lg border-b-2 border-r-2 border-white transition-transform transform hover:bg-purple-800 hover:scale-95">
              Leaderboard
            </p>
          </Link>
          <Link href="/rewards">
            <p className="w-full p-4 bg-purple-900 text-white text-center py-3 rounded-lg shadow-lg border-b-2 border-r-2 border-white transition-transform transform hover:bg-purple-800 hover:scale-95">
              Your Rewards
            </p>
          </Link>
      </div>
    </div>
    </div>
  );
};

export default MainPage;
