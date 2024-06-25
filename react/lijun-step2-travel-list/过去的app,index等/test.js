import { useState } from "react";

export default function Test() {
  const [consumption, setConsumption] = useState(0);
  const [myTip, setMyTip] = useState(0);
  const [girlTip, setGirlTip] = useState(0);
  const hanleReset = function () {
    setConsumption(0);
    setMyTip(0);
    setGirlTip(0);
  };
  return (
    <div>
      <Account consumption={consumption} setConsumption={setConsumption} />
      <Feeling
        myTip={myTip}
        setMyTip={setMyTip}
        girlTip={girlTip}
        setGirlTip={setGirlTip}
      >
        你的感觉
      </Feeling>
      <Result
        girlTip={girlTip}
        myTip={myTip}
        consumption={consumption}
        onReset={hanleReset}
      />
    </div>
  );
}
function Account({ consumption, setConsumption }) {
  return (
    <p>
      欢迎来到-江西大饭店
      <br />
      你的消费是
      <input
        type="text"
        onChange={(e) => setConsumption(Number(e.target.value))}
        value={consumption}
      />
    </p>
  );
}
function Feeling({ myTip, setMyTip, girlTip, setGirlTip, children }) {
  return (
    <div>
      <p>{children}</p>
      你对这次服务的感受是
      <select
        onChange={(e) => {
          setMyTip(Number(e.target.value));
        }}
        value={myTip}
      >
        <option value="0.1">一般般（10%）</option>
        <option value="0.15">还行（15%）</option>
        <option value="0.3">爽爆了（30%）</option>
      </select>
      你的女朋友对这次服务的感受是
      <select
        onChange={(e) => {
          setGirlTip(Number(e.target.value));
        }}
        value={girlTip}
      >
        <option value="0.1">一般般（10%）</option>
        <option value="0.15">还行（15%）</option>
        <option value="0.3">爽爆了（30%）</option>
      </select>
    </div>
  );
}
function Result({ myTip, girlTip, consumption, onReset }) {
  return (
    <div>
      你将给予服务员总共{((myTip + girlTip) * consumption) / 2 + consumption}
      元，其中消费
      {consumption}，小费{((myTip + girlTip) * consumption) / 2}
      <button onClick={onReset}>reset</button>
    </div>
  );
}
