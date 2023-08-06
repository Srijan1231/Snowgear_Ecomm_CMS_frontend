import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payment: [],
};
const paySlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, { payload }) => {
      if (state.payment.length === 0 && payload.length === 0) {
        return;
      }
      state.payment = payload;
    },
  },
});

const { reducer, actions } = paySlice;

export const { setPayment } = actions;

export default reducer;
