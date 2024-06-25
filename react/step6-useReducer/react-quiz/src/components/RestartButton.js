import { useLJEZContext } from "../context/QuizContextChallenge";

function RestartButton() {
  const { dispatch } = useLJEZContext();
  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        dispatch({ type: "restart" });
      }}
    >
      再来一遍
    </button>
  );
}

export default RestartButton;
