import { useEffect } from "react";
import { useLJEZContext } from "../context/QuizContextChallenge";

function Timer() {
  const { dispatch, allowTime } = useLJEZContext();
  const min = String(Math.floor(allowTime / 60)).padStart(2, "0");
  const second = String(allowTime % 60).padStart(2, "0");
  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min}:{second}
    </div>
  );
}

export default Timer;
