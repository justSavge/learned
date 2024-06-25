import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>
      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} key={activeTab} />
      ) : (
        <DifferentContent />
      )}
      {/* {
        TabContent({
          item: content[0],
        }) /*这样写就是一个在这里的一个函数，而不是组件，只是tabbed的一部分jsx(还有hook)而已，不再是tabbed的组件了 */}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);
  const handleUndo = function () {
    //当状态不改变的时候，组件甚至不会渲染
    setLikes(0);
    setShowDetails(true);
    // console.log(likes);
  };
  function handleInc() {
    setLikes(likes + 1);
  }
  function handleUndoLater() {
    //很难想象在React17的时候甚至不能使用计时器，因为进入批处理以后它会立刻执行，而不是等待2s
    setTimeout(handleUndo, 2000);
  }
  //  function handleIncThree() {
  //   setLikes(likes + 1);
  //   setLikes(likes + 1);
  //   setLikes(likes + 1);
  // }
  //为什么么不行，一个简单的逻辑问题，likes是一个参数，以上三次，在批处理的时候每次的调用都是likes(0)+1=1
  //下面行，因为下面每次都是对自己操作，自己+1
  function handleIncThree() {
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
  }

  return (
    <div className="tab-content" onClick={() => console.log("parent")}>
      <h4 onClick={() => console.log("son")}>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleIncThree}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>
    </div>
  );
}
// console.log(DifferentContent());//不能这么写，这么写就只是返回react元素（jsx）,而不是组件实例
// console.log(<DifferentContent />);
function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}

//回顾以下事件处理，如点击事件，先执行捕获，得到taegetEvent,然后执行冒泡，而事件默认是冒泡执行点击事件（可以修改监听事件的第三参数,改制捕获就处理事件，只是一般不使用）。所以子元素比父元素快。
//我认为还是有必要搞一下React的事件处理。
//因为React的事件都是基于('#root')的。都是绑定在root的（React开发者写了事件在这里。。。）。也就是说所有的事件都会冒泡到root然后处理。
//如在正常的js，我们使用e=>{}和React是不一样的，在React会进入合成事件（包括了点击，鼠标移动等的），主要是为了修复细微的不同的浏览器的不同事件处理导致错误，所有的事件都是冒泡的。当然也可以捕获，要使用onClickCapture(可能一辈子也用不上)
//还有再正常的html,form提交以后会自动刷新页面，返回flase即可阻止，当再React不行，需要使用preventDefault();
