import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, { payload }) => {
      state.orders = payload;
    },
  },
});

const { reducer, actions } = orderSlice;

export const { setOrder } = actions;

export default reducer;
