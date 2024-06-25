import { useLJEZContext } from "../context/QuizContextChallenge";
import Options from "./Options";

function Questions() {
  const { question, dispatch, answer } = useLJEZContext();

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Questions;
