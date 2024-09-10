import { evaluate } from "mathjs";
import { useState } from "react";

export const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];
export const operations = ["+", "-", "*", "/"];
export const equalSign = "=";

export const Calculator = () => {
  const [value, setValue] = useState("");
  const [isNewOperation, setIsNewOperation] = useState(false);
  const createHandleOperatorClick = (op) => () => {
    setValue(value.concat(op));
    setIsNewOperation(false);
  };
  const createHandleNumberClick = (num) => () =>
    setValue(isNewOperation ? num : value.concat(num));

  return (
    <section>
      <h1>Calculator</h1>
      <input value={value} readOnly />
      <div role="grid">
        {rows.map((row, index) => (
          <div key={index} role="row">
            {row.map((number) => (
              <button
                onClick={createHandleNumberClick(number.toString())}
                key={number}
              >
                {number}
              </button>
            ))}
          </div>
        ))}
        {operations.map((operation) => (
          <button
            onClick={createHandleOperatorClick(operation)}
            key={operation}
          >
            {operation}
          </button>
        ))}
        <button
          onClick={() => {
            setValue(evaluate(value).toString());
            setIsNewOperation(true);
          }}
        >
          {equalSign}
        </button>
        <button
          onClick={() => {
            setValue("");
            setIsNewOperation(false);
          }}
        >
          c
        </button>
      </div>
    </section>
  );
};
