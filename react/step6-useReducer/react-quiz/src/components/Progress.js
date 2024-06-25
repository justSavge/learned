import { useLJEZContext } from "../context/QuizContextChallenge";

function Progress() {
  const { index, questionLength, allPoints, points, answer } = useLJEZContext();
  return (
    <header className="progress">
      <progress max={questionLength} value={index + Number(answer !== null)} />
      <p>
        问题<strong>{index + 1}</strong>/{questionLength}
      </p>
      <p>
        得分
        <strong>
          {points}/{allPoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
