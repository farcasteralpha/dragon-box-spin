import { sdk } from "@farcaster/frame-sdk";
import React, { useEffect, useState } from "react";
import { useAccount, useConnect, useSignMessage } from "wagmi";

function App() {
  useEffect(() => {
    sdk.actions_ready();
  }, []);

  return (
    <div className="container">
      <h1>🎮 Dragon Box: Tap to Claim</h1>
      <ConnectMenu />
    </div>
  );
}

function ConnectMenu() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) {
    return (
      <>
        <div>Connected account:</div>
        <div>{address}</div>
        <SignButton />
      </>
    );
  }

  return (
    <button type="button" onClick={() => connect({ connector: connectors[0] })}>
      Connect Wallet
    </button>
  );
}

function SignButton() {
  const { signMessage, isPending, data, error } = useSignMessage();
  const [claimed, setClaimed] = useState(false);

  const handleSign = () => {
    signMessage({ message: "I want to claim the reward!" });
    setClaimed(true);
  };

  if (claimed) {
    return <div className="claimed">🎉 Successfully Claimed!</div>;
  }

  return (
    <button type="button" onClick={handleSign} disabled={isPending}>
      {isPending ? "Signing..." : "Tap to Claim"}
    </button>
  );
}

export default App;

