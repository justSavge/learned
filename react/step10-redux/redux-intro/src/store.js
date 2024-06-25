import { configureStore } from "@reduxjs/toolkit";

import reducerAccount from "./features/account/accountSlice";
import reducerCustomer from "./features/customer/customerSlice";

const store = configureStore({
  reducer: {
    account: reducerAccount,
    customer: reducerCustomer,
  },
});
export default store;
