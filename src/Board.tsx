import { memo } from "react";
import Square from "./Square";
import { SquaresType } from "./index"
import "./index.css";

interface BoardProps {
  squares: SquaresType;
  onClick: (i: number) => void;
}

const Board = memo((props: BoardProps) => {
  const renderSquare = (i: number) => {
    return <Square id={i} value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
});

export default Board
