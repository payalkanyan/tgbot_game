import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-green-500 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Transaction Tycoon</h1>
      <p className="text-lg mb-8">Build blocks, earn rewards, and become the ultimate Tycoon!</p>
      <div className="space-x-4">
        <Link href="/game">
          <p className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md">Play Game</p>
        </Link>fp
        <Link href="/leaderboard">
          <p className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg shadow-md">Leaderboard</p>
        </Link>
        <Link href="/rewards">
          <p className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg shadow-md">Claim Rewards</p>
        </Link>
      </div>
    </div>
  );
}
