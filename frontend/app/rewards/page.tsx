'use client';

import { useState, useEffect } from 'react';
import WalletConnect from '../components/WalletConnect';
import Link from 'next/link';
import Score from '../components/Score';
import Image from 'next/image';
import { ethers } from 'ethers';
import RewardNFTABI from '../abis/RewardNFT.json'; // Import the ABI of the deployed NFT contract

const Rewards = () => {
  const [userWallet, setUserWallet] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [nftClaimed, setNftClaimed] = useState<boolean>(false);
  const [showNftImage, setShowNftImage] = useState<boolean>(false);
  const [claimedNfts, setClaimedNfts] = useState<any[]>([]);
  const [claiming, setClaiming] = useState<boolean>(false); // Track claiming status

  const contractAddress = '0xC348BdE8FE8a268951313094358C386F6e523a41'; // Replace with your deployed contract address

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

  const registerUser = async (walletAddress: string) => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: walletAddress }),
      });

      if (!response.ok) {
        console.error('Failed to register wallet:', await response.text());
      } else {
        console.log('Wallet registered successfully');
      }
    } catch (err) {
      console.error('Error registering wallet:', err);
    }
  };

  const handleWalletConnect = (walletAddress: string) => {
    setUserWallet(walletAddress);
    registerUser(walletAddress);
  };

  const handleClaimNFT = async () => {
    if (score >= 500) {
      setClaiming(true); // Start claiming process
      const updatedScore = score - 500;
      setScore(updatedScore);
      localStorage.setItem('gameScore', String(updatedScore));

      // Set up Ethereum provider and contract interaction
      try {
        const provider = new ethers.BrowserProvider(window.ethereum, "any");
        const signer = await provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, RewardNFTABI, signer);

        const tokenURI = '/5pp.png'; // Replace with actual token URI (metadata or image URL)
        const transaction = await nftContract.claimNFT(tokenURI);

        await transaction.wait(); // Wait for transaction to be mined

        const claimedNFT = {
          id: Date.now(),
          image: '/5pp.png',
          claimedAt: new Date().toLocaleString(),
        };

        const newClaimedNfts = [...claimedNfts, claimedNFT];
        setClaimedNfts(newClaimedNfts);
        localStorage.setItem('claimedNfts', JSON.stringify(newClaimedNfts));

        setNftClaimed(true);
        setShowNftImage(true);
      } catch (err) {
        console.error('Error claiming NFT:', err);
        alert('Failed to claim NFT.');
      } finally {
        setClaiming(false); // End claiming process
      }
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white p-4"
      style={{
        backgroundImage: 'url("/bg2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-4xl font-bold mb-6 text-white">Claim Rewards</h1>
      <div className="">
        <div className="text-center mb-6">
          <Score />
        </div>

        <div className="w-full max-w-md bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-lg shadow-lg p-6 text-black">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Claim Your NFT</h2>
          {!nftClaimed && score >= 1000 && (
            <p className="text-lg font-semibold text-green-500">You have {score} points! Claim your NFT now!</p>
          )}
          {!nftClaimed && score >= 500 && score < 1000 && (
            <p className="text-lg font-semibold text-yellow-500">You have {score} points! Claim your first NFT now!</p>
          )}
          {!nftClaimed && score < 500 && (
            <p className="text-lg font-semibold text-red">You need at least 500 points to claim an NFT. Keep playing!</p>
          )}

          <div className="mt-4 flex justify-center">
            <button
              className="bg-purple-700 text-white py-2 px-4 rounded shadow-lg hover:bg-purple-600"
              onClick={handleClaimNFT}
              disabled={score < 500 || nftClaimed || claiming}
            >
              {claiming ? 'Claiming...' : nftClaimed ? 'Claimed' : 'Claim NFT'}
            </button>
          </div>

          {showNftImage && (
            <div className="mt-6 text-center">
              <Image src="/5pp.png" alt="Claimed NFT" className="w-32 h-32 mx-auto rounded-full" width="300" height="300" />
              <p className="mt-4 text-green-500 font-semibold">NFT Claimed!</p>
            </div>
          )}
        </div>

        {claimedNfts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-white">Your Claimed NFTs</h3>
            <div className="space-y-4">
              {claimedNfts.map((nft) => (
                <div key={nft.id} className="bg-purple-200 p-4 rounded-lg shadow-md">
                  <Image src={nft.image} alt="Claimed NFT" className="w-32 h-32 mx-auto rounded-full" width="100" height="100" />
                  <p className="mt-2 text-center text-sm text-gray-700">Claimed at: {nft.claimedAt}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-center mt-6">
          <p className="m-4 text-center underline decoration-purple-500 decoration-2">
            <Link href="/">Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
