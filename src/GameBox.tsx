import { useState } from "react";
import { motion } from "framer-motion";
import { useAccount, useConnect, useDisconnect, useContractWrite } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { parseAbi } from "viem";

const rewards = [
  "Try Again",
  "10 Points",
  "Jackpot DEGEN!",
  "5 Points",
  "Try Again",
  "50 Points",
  "10 Points",
  "Try Again",
];

export default function GameBox() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [reward, setReward] = useState<string | null>(null);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();

  const { writeContract, isPending } = useContractWrite();

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setReward(null);
    const resultIndex = Math.floor(Math.random() * rewards.length);
    setTimeout(() => {
      setIsSpinning(false);
      setReward(rewards[resultIndex]);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 to-black text-white p-4">
      {!isConnected ? (
        <button
          onClick={() => connect()}
          className="mb-4 bg-gray-700 px-4 py-2 rounded-xl"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="mb-2 text-sm text-green-400">
          Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
      )}

      <motion.div
        animate={{ rotate: isSpinning ? 720 : 0 }}
        transition={{ duration: 2 }}
        className="w-64 h-64 bg-yellow-400 text-black flex items-center justify-center rounded-2xl text-2xl font-bold shadow-xl mb-4"
      >
        {isSpinning ? "Spinning..." : reward ?? "🎁"}
      </motion.div>

      {!reward && (
        <button
          onClick={spin}
          className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-xl font-semibold"
        >
          Spin to Win
        </button>
      )}

      {reward && (
        <div className="flex flex-col items-center gap-3">
          <div className="text-xl font-semibold">{reward}</div>

          {isConnected && (
            <button
              onClick={() =>
                writeContract({
                  address: "0x5e6f2f46b5c7d89495be95208ebf4204af21f764",
                  abi: parseAbi(["function claim()"]),
                  functionName: "claim",
                  chainId: 8453, // Base Mainnet
                })
              }
              disabled={isPending}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
            >
              {isPending ? "Claiming..." : "Claim"}
            </button>
          )}

          <button
            onClick={() => {
              setReward(null);
            }}
            className="text-sm text-gray-300 underline mt-2"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
