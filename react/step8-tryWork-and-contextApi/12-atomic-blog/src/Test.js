import { useState } from "react";

function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 1000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}
function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Increase: {count}
      </button>
      {children}
    </div>
  );
}
export default function Test() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>
        Increase111: {count}
      </button>
      <Counter>
        <SlowComponent />
        {/* 像这样吧组件当成props(children)传递，只改变state,(不改变<SlowComponent />的一切，state,props,父组件的结构)不会渲染他 */}
      </Counter>
    </div>
  );
}
