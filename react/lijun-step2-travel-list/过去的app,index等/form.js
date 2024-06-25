import { useState } from "react";
export default function Form({ onAddItems }) {
  const [desc, setDesc] = useState("");
  const [sel, setSel] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!desc) return;
    const item = {
      description: desc,
      quantity: sel,
      packed: false,
      id: Date.now(),
    };
    onAddItems(item);
    setSel(1);
    setDesc("");
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>狗卡：你要买盒子吗</h3>
      <select value={sel} onChange={(e) => setSel(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((el) => {
          return (
            <option value={el} key={el}>
              {el}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="输入...."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
