import { SocketProvider } from "./hooks/useSocket";
import Game from "./pages/game";
import SocketTest from "./tests/SocketTest";

export default function App() {
  return (
    <SocketProvider>
      <SocketTest />
    </SocketProvider>
  );
}
