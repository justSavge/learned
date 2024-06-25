// import { seReducer } from "react";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { reducerAccount } from "./features/account/accountSlice";
import { reducerCustomer } from "./features/customer/customerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  account: reducerAccount,
  customer: reducerCustomer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
//舍不得删除
// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 100 });
// store.dispatch({
//   type: "account/reqeuestLoan",
//   payload: { amount: 3000, purpose: "i am poor man" },
// });
// store.dispatch({ type: "account/payloan" });
// console.log(store.getState());

// store.dispatch(deposit(500));
// store.dispatch(withdraw(200));
// store.dispatch(reqeuestLoan(1000, "i want pay last loan"));
// console.log(store.getState());
// store.dispatch(payload());
// console.log(store.getState());
// const [state, dispatch] = useReducer(reduce, initialValue);
// dispatch()
// store.dispatch(createAccount("john wick", "1231321"));
// store.dispatch(updateAccount("mr.white"));
// store.dispatch(deposit(200));
// console.log(store.getState());
//通过store传递数据，不需要指定是哪一个（在这里不需要指定account或customer），按照action.type指定对应操作,得到（使用getState）的数据按照combinReducers里的名字分类
