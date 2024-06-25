import { useLJEZContext } from "../context/QuizContextChallenge";

function StartScreen() {
  const { length, dispatch } = useLJEZContext();
  return (
    <div className="start">
      <h2>欢迎来到智慧树乐园</h2>
      <h3>这里有{length}条问题等你来答~</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        开始
      </button>
    </div>
  );
}
export default StartScreen;
