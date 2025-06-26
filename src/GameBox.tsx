import { useState } from "react";
import { degenClaimAbi } from "./abi/degenClaimAbi";
import { useContractWrite } from "wagmi";

const CONTRACT_ADDRESS = "0x5e6f2f46b5c7d89495be95208ebf4204af21f764";
const CHAIN_ID = 8453; // Base Mainnet

const GameBox = () => {
  const [reward, setReward] = useState("");
  const [hasSpun, setHasSpun] = useState(false);

  const { writeContract, isPending } = useContractWrite();

  const spinBox = () => {
    const prizes = ["Try Again", "Jackpot DEGEN!"];
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    setReward(randomPrize);
    setHasSpun(true);
  };

  const claimReward = () => {
    if (reward === "Jackpot DEGEN!") {
      writeContract({
        abi: degenClaimAbi,
        address: CONTRACT_ADDRESS,
        functionName: "claim",
        chainId: CHAIN_ID,
      });
    }
  };

  return (
    <div className="text-center space-y-4">
      {!hasSpun ? (
        <button
          onClick={spinBox}
          className="bg-purple-600 text-white py-2 px-6 rounded-xl hover:bg-purple-700"
        >
          🎁 Tap to Spin
        </button>
      ) : (
        <>
          <div className="text-2xl">{reward}</div>
          {reward === "Jackpot DEGEN!" && (
            <button
              onClick={claimReward}
              className="bg-yellow-500 text-black py-2 px-6 rounded-xl hover:bg-yellow-600"
              disabled={isPending}
            >
              {isPending ? "Claiming..." : "Claim Reward"}
            </button>
          )}
          <button
            onClick={() => {
              setHasSpun(false);
              setReward("");
            }}
            className="bg-green-600 text-white py-2 px-4 rounded-lg mt-4"
          >
            Play Again
          </button>
        </>
      )}
    </div>
  );
};

export default GameBox;

