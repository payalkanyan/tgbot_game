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
    
      const response = await fetch('http://localhost:5000/register', {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4">
      <h1 className="text-4xl font-bold mb-6 text-white">Mantler Mind Mining</h1>
      {/* <p><DisplayUsername userId={"1"}/></p> */}
      {/* <h2 className="text-2xl font-bold text-black">earn Max Fee in less Time</h2> */}
      <div>
        

        {/* Only show WalletConnect button if the wallet is not connected */}
        {!userWallet && (
          <WalletConnect onConnect={handleWalletConnect} />
        )}

        
          
          {userWallet && (
            <div className="flex items-center">
            <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gray-300">
              <Image
                src="/5pp.png"
                alt="avatar"
                layout="fill"
                objectFit="cover"
              />
            </div>
          <p className="mt-4 text-center text-black-600 font-semibold p-6">
            {userWallet.slice(0, 6)}...{userWallet.slice(-4)}
          </p>

        </div>
          )}
        
      <Score/>
      </div>
        <Link href="/game1">
          <p className="bg-blue-600 text-center hover:bg-blue-700 p-4 rounded-lg shadow-md">Play Game</p>
        </Link>
        <Link href="/leaderboard">
          <p className="bg-purple-600 text-center hover:bg-purple-700 p-4 m-4 rounded-lg shadow-md">Leaderboard</p>
        </Link>
        <Link href="/rewards">
          <p className="bg-yellow-600 text-center hover:bg-yellow-700 p-4 rounded-lg shadow-md">Your Rewards</p>
        </Link>
      </div>
    
  );
}

export default MainPage;