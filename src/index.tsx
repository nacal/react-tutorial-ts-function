import React, { useReducer, memo } from "react";
import ReactDOM from "react-dom";
import "./index.css";

type SquaresType = (string | null)[];

interface History {
  squares: SquaresType;
}

const calculateWinner = (squares: SquaresType) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

interface SquareProps {
  value: string | null;
  onClick: () => void;
  id: number;
}

const Square = memo((props: SquareProps) => {
  return (
    <button data-e2e={`button-${props.id}`} className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
});

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

interface State {
  history: History[];
  stepNumber: number;
  xIsNext: boolean;
}

type Action =
  | {
    type: 'click';
    value: number;
  }
  | {
    type: 'jump';
    value: number;
  };

const initialState: State = {
  history: [{ squares: Array(9).fill(null) }],
  stepNumber: 0,
  xIsNext: true,
}

const Game = () => {
  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'click': {
        const historyCurrent = state.history.slice(0, state.stepNumber + 1);
        const current = historyCurrent[historyCurrent.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[action.value]) return state;

        squares[action.value] = state.xIsNext ? 'X' : 'O';

        return {
          ...state,
          history: [...historyCurrent, { squares }],
          stepNumber: historyCurrent.length,
          xIsNext: !state.xIsNext,
        }
      }
      case 'jump': {
        return {
          ...state,
          stepNumber: action.value,
          xIsNext: action.value % 2 === 0,
        }
      }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (i: number) => {
    dispatch({ type: 'click', value: i });
  };

  const jumpTo = (step: number) => {
    dispatch({ type: 'jump', value: step });
  };

  const historyCurrent = [...state.history];
  const current = historyCurrent[state.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = state.history.map((_step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${state.xIsNext ? "X" : "O"}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div data-e2e="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

ReactDOM.render(<Game />, document.getElementById("root"));
