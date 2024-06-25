import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; //webpack会默认导出
//jonas老哥的忠告，永远永远不要嵌套函数，比如把Pizza放在App里面显然是合乎语法可以运行使用的，但是not do it forever!!!把这些伙计们放在最外层（最顶部），不要嵌套!!!
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
function Header() {
  return (
    // <h1 style={{ color: "pink", fontSize: "36px" }}>
    <header className="header">
      <h1>河南正宗意大利披萨</h1>
    </header>
  );
}
function Menu() {
  const pizzas = pizzaData;
  const pizzasNum = pizzas.length;
  return (
    <main className="menu">
      <h2>our menu</h2>
      {/*不能使用 foreach，这哥们不返回值，只是遍历，而map会遍历并且返回*/}
      {/* jsx允许我们这样搞，<></>,只要又结束/就好 */}
      {/* <React.Fragment key={}></React.Fragment> ,如果需要渲染列表时，可以这么写*/}
      {pizzasNum > 0 ? (
        <>
          <p>一个脱离了低级趣味的，存粹的，高尚的餐厅</p>
          <ul className="pizzas">
            {pizzas.map((pz) => (
              <Pizza pizzaObj={pz} key={pz.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>出了些问题，正在抢救修复中……</p>
      )}

      {/* <Pizza name="1" detail="1" photoName="pizzas\spinaci.jpg" price={13} /> */}
    </main>
  ); //想要传递不是字符的数据使用{}
}
function Pizza({ pizzaObj: ob }) {
  return (
    <li className={`${ob.soldOut ? "pizza sold-out" : "pizza"}`}>
      <img src={ob.photoName} alt="no" />
      <div>
        <h3>{ob.name}</h3>
        <p>{ob.ingredients}</p>
        <span>{ob.soldOut ? "售罄" : ob.price + "$"}</span>
        <p>
          {ob.soldOut ? "已经卖完了哥们，下次来吧" : "还有，来一份，怎么说"}
        </p>
      </div>
    </li>
  );
}
function Footer() {
  const time = new Date();
  const now = +time.toLocaleTimeString().slice(0, 2);
  const nowSta = now < 22 && now >= 10;
  // alert(nowSta);//严格模式会渲染两次
  return (
    <footer className="footer">
      {nowSta ? (
        <Order timeToOrder={now} />
      ) : (
        <p>现在已经{now}点了，我们在10点-22点营业哦~</p>
      )}
    </footer>
  );
}
function Order({ now }) {
  return (
    <div className="order">
      <p>现在是北京时间{now}点</p>
      <p>我们开业到22点哦~,欢迎订餐</p>
      <button className="btn">订餐</button>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
//小菊花课堂开课拉，今天是jsx，jsx是什么，是基于js的拓展，为什么是基于js的拓展，那么其中的HTML语法和css语法如何被js的语法逻辑理解呢，很简单，当我们使用create-react-app做一个文件的时候，会给我们装很多东西，例如webpack...有个东西叫做babel,可以将jsx转换为js,如使用createElement创建一个h1标签，加入css,文本内容
//也就是说我们可以在没有jsx的情况下使用react,但是那就不好玩了，太蠢太麻烦了
//jsx使用声明式而不是命令式
//很喜欢jonas的一句话，react是一个远离dom的抽象，哥们不用天天跟DOM打交道
