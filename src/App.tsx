import { NeynarProvider } from '@neynar/react-mini';
import GameBox from './GameBox';

function App() {
  return (
    <NeynarProvider>
      <GameBox />
    </NeynarProvider>
  );
}

export default App;


