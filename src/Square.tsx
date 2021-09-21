import { memo } from "react";
import "./index.css";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  id: number;
}

const Square = memo((props: SquareProps) => {
  return (
    <button data-e2e={`button-${props.id}`} className="w-16 h-16 font-bold border-2 -mt-1 -ml-1 float-left text-white" onClick={props.onClick}>
      {props.value}
    </button>
  );
});

export default Square
