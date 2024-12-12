export default function Leaderboard() {
    const leaderboard = [
      { username: "Player1", score: 150 },
      { username: "Player2", score: 120 },
      { username: "Player3", score: 100 },
    ];
  
    return (
      <div className="h-screen bg-gradient-to-b from-purple-500 to-pink-500 p-8 text-white">
        <h1 className="text-3xl font-bold text-center mb-4">Leaderboard</h1>
        <div className="bg-white text-gray-800 p-4 rounded-lg shadow-md">
          <ul>
            {leaderboard.map((player, index) => (
              <li key={index} className="flex justify-between py-2 border-b">
                <span>{player.username}</span>
                <span>{player.score} Points</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  