//导出
console.log('导出数据。。。');
const fkcost = 20;
export const fkcarts = [];
// if (true) {//只能再顶部运行，其他不行
// await fetch('https://jsonplaceholder.typicode.com/posts');
// console.log('结束了');//要等这位大爷走完才能执行下面的代码
//总结，这个top level await会阻碍代码，慎用
export const addToCart = function (product, quantity) {
  fkcarts.push({ product, quantity });
  console.log(`${product} ${quantity} 已经到购物车了`);
};
const beach = 'whosb';
const total = 250;
export { beach, total as all }; //这里也可以修改
//export default
export default function (product, quantity) {
  fkcarts.push({ product, quantity });
  console.log(`${product} ${quantity} 已经到购物车了,这是默认输出`);
}
//
