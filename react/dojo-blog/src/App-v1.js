import { useEffect, useState } from "react";
export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);
  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((x) => x + 1);
  }
  useEffect(function () {
    getAdvice();
  }, []);
  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>advice so here</button>
      <Message count={count} />
    </div>
  );
}
function Message(props) {
  return (
    <p>
      <p>哥们，你已经读了{props.count}条感悟了，想必有很多故事吧</p>
    </p>
  );
}
