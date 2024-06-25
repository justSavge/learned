import { useState } from "react";

const message = ["学js,青铜", "学node.js，白金", "学react，超人"];
export default function App() {
  return (
    <div>
      <Steps />
      {/* <Steps /> */}
    </div>
  );
}
function Steps() {
  //hook(钩子)，只能在函数里面写，不能再if等语句里写
  const [step, setStep] = useState(1); //1 默认值
  const [isOpen, setIsOpen] = useState(true);
  function handlePrevious() {
    step > 1 && setStep((s) => s - 1);
  }
  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
      // setStep((s) => s + 1); //可以执行2次
      // setStep(step + 1); //只执行一次
    }
  }

  return (
    <div>
      {/* 不存在，在实际html中没有这么个空标签 */}
      <button className="close" onClick={() => setIsOpen((iO) => !iO)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <div className="message">
            步骤:{step}:{message[step - 1]}
          </div>
          <div className="buttons">
            {/* 细节：html不区分大小写，jsx区分，onClick的C大写了 */}
            <Button bgcolor={"#7950f2"} color={"#fff"} onClick={handlePrevious}>
              ⬅️上一步
            </Button>
            <Button bgcolor={"#7950f2"} color={"#fff"} onClick={handleNext}>
              下一步➡️
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
function Button({ bgcolor, color, onClick, children }) {
  //children是一个react预设的值，是夹在中间的东西
  return (
    <button
      style={{ backgroundColor: bgcolor, color: color }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
//在下面做笔记更好看
// 初试state（状态）(据说是最重要的概念)
//state是组件可以随着时间保存的数据，通过state来获取软件生命周期中需要（remember）记住的信息。
//抽象的看作“组件的内存？(component memery)”
//"state variable"/"piece of state":组件中的实际变量（组件状态）
//每当更新state的时候就会重新渲染组件（就如同我在上文当中直接修改step会报错一般，举个别的例子：在vue当中修改数据也不是实时的呀，也要v-model.
//每一个view（视图)组合在一起就成了user interface(用户界面)
//总结：state可以让我们修改数据(data)达到修改界面(ui)的效果
//2.State 使得开发者能够在 React 中的多个渲染与重新渲染过程中保持局部变量的状态
////实战：step可以修改，但是有一个关键的是react 不知道它被改变了，亦或者说不会重新渲染数据
///////////////////////////////
///////////////////////////////
//////////////////////////////
//简而言之就是hook从state当中获取了数据。而每一次使用set..()的时候发生的：每当数据改变的时候，重新渲染一个组件替换原来渲染的组件（by the way,这也是为什么最早称为libray react的原因，它总是在react）
//test challage
// function Days() {
//   const today = new Date("2024-4-1");
//   const [stepCount, setStepCount] = useState(1);
//   const [allStep, setallStep] = useState(0);
//   today.setDate(today.getDate() + allStep);
//   function addStepCount() {
//     setStepCount((s) => s + 1);
//   }
//   function lessStepCount() {
//     setStepCount((s) => s - 1);
//   }
//   function addAllStep() {
//     setallStep((all) => all + stepCount);
//   }
//   function lessAllStep() {
//     setallStep((all) => all - stepCount);
//   }

//   return (
//     <div>
//       <button onClick={addStepCount}>+</button>
//       <span>步子：{stepCount}</span>
//       <button onClick={lessStepCount}>-</button>
//       <br />
//       <button onClick={addAllStep}>+</button>
//       <span>走你：{allStep}</span>
//       <button onClick={lessAllStep}>-</button>
//       <br />
//       <p>
//         {Math.abs(allStep)}
//         {allStep > 0 ? "天之后" : "天之前"}是{today.toDateString()}
//       </p>
//     </div>
//   );
// }
