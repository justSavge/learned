// useReducer可以说是进入高级react的一个重要hook
// useReducer就我个人而言，属于是将useState的功能做了一个超级集合，可以同时对多个state进行多种操作，从使用角度而言，更简洁明了，逻辑清晰
//终于找到了一个相对好的中文译名
//减少者（reduce+er）,参考了数组的reduce
//默认使用
// const [state,dispatch] = useReducer(reduce,initialValue)
// function reduce(state,action){}
// dispatch({type:'',payload:''})
//用这三板斧
//都是形参，可以更改，state,不用说，就是状态，useState一样的。
//dispatch,用于想reduce传递参数，如({type:'',payload:''})，但应该不止这些
//reduce，函数，用于处理state,接受参数对其修改
//initialValue，state的初始值
//reduce(state,action)中的state和上文一致，action:dispatch({type:'',payload:''})中传的都是它接受的如：action.type，在函数中使用传参
