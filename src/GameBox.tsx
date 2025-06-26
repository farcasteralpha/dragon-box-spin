import { useState } from "react";
import { motion } from "framer-motion";

const rewards = ["Jackpot DEGEN!", "Try Again", "50 Points", "10 Points", "Better Luck!"];

export default function GameBox() {
  const [spinning, setSpinning] = useState(false);
  const [reward, setReward] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (spinning) return;

    setSpinning(true);
    setReward(null);

    const spinAmount = 360 * (3 + Math.floor(Math.random() * 3));
    const newRotation = rotation + spinAmount;
    setRotation(newRotation);

    setTimeout(() => {
      const chosenReward = rewards[Math.floor(Math.random() * rewards.length)];
      setReward(chosenReward);
      setSpinning(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="w-40 h-40 bg-yellow-300 rounded-full flex items-center justify-center text-black font-bold text-xl shadow-lg"
        animate={{ rotate: rotation }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        🎁
      </motion.div>

      {reward ? (
        <>
          <div className="text-2xl font-bold text-center">{reward}</div>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-xl shadow hover:bg-purple-700"
            onClick={handleSpin}
          >
            Play Again
          </button>
        </>
      ) : (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700"
          onClick={handleSpin}
          disabled={spinning}
        >
          {spinning ? "Spinning..." : "Spin to Win"}
        </button>
      )}
    </div>
  );
}
