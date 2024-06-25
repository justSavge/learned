import { createSlice } from "@reduxjs/toolkit";

const initial = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initial,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (!item.quantity) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart.length = 0;
    },
  },
});
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
export const getPizzaById = (state, id) =>
  state.cart.cart.find((pizza) => pizza.pizzaId === id);
export const getTotal = (state, want) =>
  state.cart.cart.reduce((all, crr) => all + crr[want], 0);
export const getCart = (state) => state.cart.cart;
