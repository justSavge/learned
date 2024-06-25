import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [items, setItems] = useState(initialFriends);
  const [current, setCurrent] = useState(null);
  const handleSubmit = function (item) {
    setItems((its) => [...its, item]);
  };
  return (
    <div>
      <LeftPart items={items} setCurrent={setCurrent} />
      <AddPart onSubmit={handleSubmit} />
      <RightPart current={current} />
    </div>
  );
}
function Button({ children }) {
  return <button className="button">{children}</button>;
}
function LeftPart({ items, setCurrent }) {
  return (
    <div>
      {items.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.image} alt="" />
            <span>{item.name}</span>
            <span>{item.balance}</span>
            <button
              onClick={() => {
                setCurrent(item);
                console.log(item);
                alert("Button clicked!");
              }}
            >
              点
            </button>
          </div>
        );
      })}
    </div>
  );
}
function AddPart({ onSubmit }) {
  const [item, setItem] = useState({});
  return (
    <div>
      name:
      <input
        type="text"
        onChange={(e) => setItem((it) => ({ ...it, name: e.target.value }))}
      />
      balance:
      <input
        type="text"
        onChange={(e) => setItem((it) => ({ ...it, balance: e.target.value }))}
      />
      id:
      <input
        type="text"
        onChange={(e) => setItem((it) => ({ ...it, id: e.target.value }))}
      />
      <button
        onClick={() => {
          setItem((it) => ({
            ...it,
            image: (it.image = `https://i.pravatar.cc/48?u=${Math.trunc(
              Math.random() * 1000000
            )}`),
          }));
          onSubmit(item);
        }}
      >
        提交
      </button>
    </div>
  );
}
function RightPart({ current }) {
  const [pay, setPay] = useState(0);
  const [whoPay, setWhoPay] = useState("");
  return (
    current && (
      <div>
        总价:
        <input
          type="text"
          value={pay}
          onChange={(e) => setPay(Number(e.target.value))}
        />
        一起来的哥们-承担人: {current.name}
        谁会为此支付:
        <select value={whoPay} onChange={(e) => setWhoPay(e.target.value)}>
          <option value="me">我</option>
          <option value={current.name}>{current.name}</option>
        </select>
        {whoPay === "me" ? `${current.name}欠我` : `我欠${current.name}`}
        钱，金额
        {whoPay === "me" ? pay - current.balance : pay + current.balance}
      </div>
    )
  );
}
