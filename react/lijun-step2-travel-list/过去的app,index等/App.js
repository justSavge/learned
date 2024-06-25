import { useState } from "react";
import Logo from "./logo";
import Form from "./form";
import PackingList from "./packingList";
import Stats from "./stats";
export default function App() {
  const [items, setItems] = useState([]);
  function handleSubmitAdd(item) {
    setItems((i) => [...i, item]);
  }
  function deleteItem(id) {
    setItems((ies) => ies.filter((i) => i.id !== id));
  }
  function handleToggleItem(id) {
    setItems((ies) =>
      ies.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i))
    );
  }
  function handleRemoveAll() {
    const isRe = window.confirm("你真的要删除所有吗");
    isRe && setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleSubmitAdd} />
      <PackingList
        items={items}
        deleteItem={deleteItem}
        onToggleItem={handleToggleItem}
        onRemoveAll={handleRemoveAll}
      />
      <Stats items={items} />
    </div>
  );
}

//test challage
// function Days() {
//   const today = new Date("2024-4-1");
//   const [stepCount, setStepCount] = useState(1);
//   const [allStep, setAllstep] = useState(0);
//   today.setDate(today.getDate() + allStep);
//   function changeStep(e) {
//     setStepCount(Number(e.target.value));
//   }
//   function changeAll(e) {
//     setAllstep(Number(e.target.value));
//   }
//   function addAllStep() {
//     setAllstep((all) => all + stepCount);
//   }
//   function lessAllStep() {
//     setAllstep((all) => all - stepCount);
//   }

//   return (
//     <div>
//       <input
//         type="range"
//         min={0}
//         max={10}
//         value={stepCount}
//         onChange={changeStep}
//       />
//       <span>步子：{stepCount}</span>
//       <br />
//       <button onClick={addAllStep}>+</button>
//       <input type="text" value={allStep} onChange={changeAll} />
//       <button onClick={lessAllStep}>-</button>
//       <br />
//       <p>
//         {Math.abs(allStep)}
//         {allStep > 0 ? "天之后" : "天之前"}是{today.toDateString()}
//       </p>
//     </div>
//   );
// }
//学术上的问题
//state和props
//state是组件的'内存'，每次改变都要重新渲染组件
//props是属于父组件的数据，除非父组件重新渲染，组件才会跟着渲染，如上文的Item里的{item}就是一个props，
//怎么学好react
//1.熟练掌握react api
//2.react think
////
//////react think
//1.拆分ui为一个个组件，构建组件树
//2.可以先写没有state 的静态版本，然后补上
//3.使用state,什么时候使用state,全局还是局部.
//4.理解数据流，数据流的唯一路线，父组件与子组件的交互，访问全局state
//派生状态(deriving state)
