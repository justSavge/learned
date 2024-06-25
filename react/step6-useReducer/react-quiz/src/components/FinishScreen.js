import { useLJEZContext } from "../context/QuizContextChallenge";

function FinishScreen() {
  const { points, allPoints } = useLJEZContext();
  const percentage = (points / allPoints) * 100;
  return (
    <p className="result">
      你在总分{allPoints}的测试中获得了{points}。<br />
      得分率{Math.floor(percentage)}% <br />
      最终成绩 {percentage >= 60 ? "合格，请回中心打印成绩单😋" : "不合格😡💢"}
    </p>
  );
}

export default FinishScreen;
