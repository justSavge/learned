//现代方式
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },

    reqeuestLoan: {
      //第一个将收到的数据转换为可以使用的数据，算是弥补了这种方式的局限性（固持己见）
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.balance += action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoad(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    changeOtherMoneyToUSDollar(state) {
      state.isLoading = true;
    },
  },
});
//直接使用即可，redux/toolkit已经包含了devtool的东西以及thunk(redux-thunk)
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch, getState) {
    dispatch({ type: "account/changeOtherMoneyToUSDollar" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    dispatch({ type: "account/deposit", payload: data.rates.USD });
  };
}
export const { withdraw, reqeuestLoan, payLoad } = accountSlice.actions;
export default accountSlice.reducer;
//以前的方式
// const initialValueAccount = {
//   balance: 0,
//   loan: 0,
//   loanPurpose: "",
//   isLoading: false,
// };
// export function reducerAccount(state = initialValueAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/reqeuestLoan":
//       return {
//         ...state,
//         loan: state.loan + action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payloan":
//       return {
//         ...state,
//         loan: 0,
//         balance: state.balance - state.loan,
//         loanPurpose: "",
//       };
//     case "account/changeOtherMoneyToUSDollar":
//       return {
//         ...state,
//         isLoading: true,
//       };
//     default:
//       return state;
//   }
// }
// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };
//   return async function (dispatch, getState) {
//     //返回一个函数说明在使用中间件(thunk的作用)，在进行异步操作
//     dispatch({ type: "account/changeOtherMoneyToUSDollar" });
//     //可以在这里任意使用dispatch，也就是useDispatch
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     dispatch({ type: "account/deposit", payload: data.rates.USD });
//   };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function reqeuestLoan(amount, purpose) {
//   return { type: "account/reqeuestLoan", payload: { amount, purpose } };
// }
// export function payload() {
//   return { type: "account/payloan" };
// }
