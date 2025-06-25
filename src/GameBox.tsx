import React, { useState } from 'react';
import { useMini } from '@neynar/react-mini';

const rewards = ['+10 Points', '+20 Points', '+50 Points', 'Try Again', 'Jackpot MONAD!'];

function GameBox() {
  const { fid, isConnected, connect } = useMini();
  const [boxOpened, setBoxOpened] = useState(false);
  const [reward, setReward] = useState<string | null>(null);
  const [points, setPoints] = useState(0);

  const openBox = () => {
    if (boxOpened) return;

    const randomIndex = Math.floor(Math.random() * rewards.length);
    const selectedReward = rewards[randomIndex];

    setBoxOpened(true);
    setReward(selectedReward);

    if (selectedReward.includes('Points')) {
      const pointValue = parseInt(selectedReward.replace(/\D/g, ''), 10);
      setPoints(points + pointValue);
    }
  };

  const resetBox = () => {
    setBoxOpened(false);
    setReward(null);
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Dragon Box Spin</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => connect()}
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Dragon Box Spin</h1>
      <p className="mb-2">FID: {fid}</p>
      <p className="mb-4">Your Points: {points}</p>

      <div
        className="w-40 h-40 bg-yellow-400 rounded-lg flex items-center justify-center text-2xl font-bold cursor-pointer"
        onClick={boxOpened ? resetBox : openBox}
      >
        {boxOpened ? reward : '🎁'}
      </div>

      {reward && reward.includes('Jackpot') && (
        <div className="mt-4 text-red-600 font-bold text-xl animate-bounce">
          🎉 JACKPOT MONAD! 🎉
        </div>
      )}

      <div className="mt-4 text-gray-600">Klik box untuk membukanya!</div>
    </div>
  );
}

export default GameBox;
