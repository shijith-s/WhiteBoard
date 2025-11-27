import React from "react";
import Canvas from "../components/Canvas";

const Home = () => {
  return (
    <div className="App bg-gradient-to-br from-sunset-cream via-sunset-peach to-sunset-secondary/10 min-h-screen">
      <Canvas width={1000} height={1000} />
    </div>
  );
};

export default Home;
