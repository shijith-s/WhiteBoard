import "./App.css";
import Canvas from "./components/Canvas";
import { SocketProvider } from "./contexts/SocketContext";

function App() {
  return (
    <SocketProvider>
      <div className="App">
        <Canvas width={1000} height={1000} />
      </div>
    </SocketProvider>
  );
}

export default App;
