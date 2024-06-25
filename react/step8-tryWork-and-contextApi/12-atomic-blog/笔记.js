// 高级的react编程
// 对于不同的 state有着不同的储存方式
// 但对于react
// 有2种 state（姑且称为 state

// ui state，远程 state
// ui state，很好理解，就是对于渲染ui的传递的数据，一般都是固定的，传递props用的比较多，一般是同步的
// 远程 state，用户用于与后端交互是用到的，如访问api，获得的这些数据，useEffect用的多，异步的，一般在大型的程序中我们都视其为全局的
// 回顾
// useRef,useEffect,useState,useReducer,useLink,useContext
//目前学过的就这些了
//useRef，只记得用来存储元素了,如获得一个input框，对其操作
// import { useRef } from "react";
// function Example() {
//   const inputRef = useRef(null);
//   function handleClick() {
//     inputRef.current.focus(); // 在点击按钮后，输入框自动获取焦点
//   }
//   return (
//     <>
//       <input type="text" ref={inputRef} />
//       <button onClick={handleClick}>Focus the input</button>
//     </>
//   );
// }
// export default Example;
//useEffect
//根据数组储存元素的变化而执行回调函数，开局执行一次，可以返回一个清理函数
// ,useState
// 不用多说，变量不能没有他，每次执行都会重新渲染对应组件，当然，虚拟dom的结构不改变的子组件（只改变props）的不会重新渲染，内容多，余者不表
// ,useReducer,
// 可以集成多个useState，对其一起搞，
// useLink,
// 对react-router的操作，通过这个，可以在不刷新网页的情况下，转入其他网址
// useContext
// 对多个props储存，操作

//优化
// <Counter>
//   <SlowComponent />
//   {/* 像这样吧组件当成props(children)传递，只改变state,(不改变<SlowComponent />的一切，state,props,父组件的结构)不会渲染他 */}
// </Counter>;
//向子组件传入的props不改变，那么子组件不会重新渲染。
//但是props不只含有明面上你传递的，如arr={arr1}，还有隐藏在幕后的props,如修改背景色，子组件当然会重新渲染
//而父组件更新state也在幕后改变了东西，子组件会渲染
//还有一个办法来使得你的子组件不会被父组件的state更新影响，（当然不能被父组件的state更新影响你传入的值,具体的我也不知道细节，但是如父组件有一个按钮，你点击以后+1这种，不算，但点击以后修改背景色，我使用react profiler,显示没有改变，但子组件的背景色变化，并且渲染时间为0.8ms,Counter只占0.4ms,消失了0.4ms）
//了解以后发现react profiler只显示渲染时间，也就是说作为children的子组件确实没有被react渲染，而是在浏览器中作为继承的css而渲染了
//那就是将子组件作为children props传递。
//超级大爆，我悟了，因为每次父组件更新，子组件收到的props都是重新被定义的，和useMemo的使用情景一样，牛的。
//memo的使用情况
//只有在频繁更新，props基本不会改变的情境下才是最合适的
//memo在参数一样时只返回缓存，不执行
//last one important thing
//尽可能少的使用useEffect,在这个滥用useEffect的时代
//1.能用函数处理就用函数
//2.fetch最好用react query
//3.不要在useEffect里为其他state设置值，使用derived state,event handler
//我已经触发了2，3多次，但以后最好少触发