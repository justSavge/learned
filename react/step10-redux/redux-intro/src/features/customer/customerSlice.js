import { createSlice } from "@reduxjs/toolkit";

const initialValueCustomer = {
  fullName: "",
  nationId: "",
  createAt: "",
};
const customerSlice = createSlice({
  name: "customer",
  initialState: initialValueCustomer,
  reducers: {
    createAccount: {
      prepare(fullName, nationId) {
        return {
          payload: {
            fullName,
            nationId,
            createAt: new Date().toLocaleString(), //最好在这里搞数据
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationId = action.payload.nationId;
        state.createAt = action.payload.createAt;
      },
    },
    updateAccount(state, action) {
      state.fullName = action.payload;
    },
  },
});
export default customerSlice.reducer;
export const { createAccount, updateAccount } = customerSlice.actions;
