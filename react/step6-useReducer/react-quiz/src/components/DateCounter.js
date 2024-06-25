import { useReducer } from "react";

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return { count: 0, step: 1 };
    default:
      throw new Error("不知道哪来的行为");
  }
}
function DateCounter() {
  const initialValue = {
    count: 0,
    step: 1,
  };
  const [state, dispatch] = useReducer(reducer, initialValue);
  const { count, step } = state;
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);
  const dec = function () {
    dispatch({ type: "dec" });
  };
  const inc = function () {
    dispatch({ type: "inc" });
  };
  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };
  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };
  const reset = function () {
    dispatch({ type: "reset" });
  };
  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>
      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>
      <p>{date.toDateString()}</p>
      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

///////////////what can i say?
// const [count, setCount] = useState(0);

// const [step, setStep] = useState(1)
// This mutates the date object.
// dispatch(-1);
// setCount((count) => count - 1);
// setCount((count) => count - step);
// dispatch(1);
// setCount((count) => count + 1);
// setCount((count) => count + step);
// setCount(Number(e.target.value));
// setStep(Number(e.target.value));
// setCount(0);
// setStep(1);
