import { memo } from "react";
import "./index.css";

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

export default Square
