import { useLJEZContext } from "../context/QuizContextChallenge";

function NextButton() {
  const { dispatch, answer, index, questionLength } = useLJEZContext();
  if (answer === null) return;
  if (index < questionLength - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "nextQuestion" });
        }}
      >
        下一个
      </button>
    );
  if (index === questionLength - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "finish" });
        }}
      >
        结束了
      </button>
    );
}

export default NextButton;
