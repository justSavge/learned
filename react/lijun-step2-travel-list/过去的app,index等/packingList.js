import { useState } from "react";
export default function PackingList({
  items,
  deleteItem,
  onToggleItem,
  onRemoveAll,
}) {
  //排序
  const [sortBy, setSortBy] = useState("input");
  let sortItem;
  if (sortBy === "input") {
    sortItem = items;
    // console.log(sortItem, 1);
  }
  if (sortBy === "description") {
    sortItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description)); //slice是为了拷贝，sort会直接改变原数组
    // console.log(sortItem, 2);
  }
  if (sortBy === "packed") {
    sortItem = items.slice().sort((a, b) => {
      return Number(a.packed) - Number(b.packed);
    }); //false:0,true:1
    // console.log(sortItem, 3);
  }

  return (
    <div className="list">
      <ul>
        {sortItem.map((el) => (
          <Item
            item={el}
            key={el.id}
            deleteItem={deleteItem}
            handleToggleItem={onToggleItem}
          />
          // 相当于给Item传入一个对象{item:el},下面直接同名解构
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="input">按输入顺序排序</option>
          <option value="description">按描述顺序排序</option>
          <option value="packed">按选中顺序排序</option>
        </select>
        {items.length !== 0 && (
          <button onClick={onRemoveAll}>删除所有商品</button>
        )}
      </div>
    </div>
  );
}
function Item({ item, deleteItem, handleToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handleToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}&nbsp;&nbsp;
        {item.description}
      </span>
      <button
        onClick={() => {
          deleteItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}
