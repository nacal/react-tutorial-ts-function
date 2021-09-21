import React from "react";
import ReactDOM from "react-dom";
import Game from "./Game"

const Index = () => {
  return (
    <main className="h-screen bg-gray-500">
      <Game />
    </main>
  )
}

ReactDOM.render(<Index />, document.getElementById("root"));
