import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      if (state.product.length === 0 && payload.length === 0) {
        return;
      }
      state.product = payload;
    },
  },
});

const { reducer, actions } = productSlice;

export const { setProducts } = actions;

export default reducer;
